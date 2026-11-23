import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findShirtSvgs } from '../lib/shirt-svg-search.mjs';

const query = { key: 'test-deepseek-key', description: '手绘读书的人', location: 'front', garmentColor: '#F1F1F1', count: 4 };
const clipartPath = '/static/clipfiles/reader/reader.svg';
const svg = x => '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0H' + x + 'V10Z"/></svg>';
const vector = (x, prefix = '') => new Response(prefix + svg(x), { headers: { 'Content-Type': 'image/svg+xml' } });
const completion = value => Response.json({ choices: [{ message: { content: JSON.stringify(value) } }] });

test('ranks live connectors and bundled collections together and checks downloaded vectors', async t => {
  const originalClipartKey = process.env.CLIPART_FREE_API_KEY;
  const originalFreeSvgToken = process.env.FREESVG_API_TOKEN;
  process.env.CLIPART_FREE_API_KEY = 'test-clipart-key';
  process.env.FREESVG_API_TOKEN = 'test-freesvg-token';
  t.after(() => {
    if (originalClipartKey === undefined) delete process.env.CLIPART_FREE_API_KEY;
    else process.env.CLIPART_FREE_API_KEY = originalClipartKey;
    if (originalFreeSvgToken === undefined) delete process.env.FREESVG_API_TOKEN;
    else process.env.FREESVG_API_TOKEN = originalFreeSvgToken;
  });

  let listing, searches = 0;
  t.mock.method(globalThis, 'fetch', async (value, options) => {
    const url = new URL(value);
    if (url.hostname === 'api.deepseek.com') {
      const body = JSON.parse(options.body);
      if (body.tools) return completion({ terms: ['sitting reading person', 'person'], pages: [] });
      listing = JSON.parse(body.messages[1].content).candidates;
      const peep = listing.find(item => item.source === 'Open Peeps' && item.tags.includes('sitting'));
      return completion({ ids: [
        'clipart-free:bad-license', 'freesvg:2', 'clipart-free:reader', 'freesvg:1', 'doodles:sitting-reading',
        'doodles:reading', peep?.id, 'invented'
      ] });
    }
    if (url.hostname === 'clipart.free') {
      if (url.pathname === clipartPath) return vector(10);
      assert.equal(url.searchParams.get('key'), 'test-clipart-key');
      if (url.pathname === '/api/clipart/search') {
        searches++;
        assert.equal(url.searchParams.get('license'), 'cc0');
        return Response.json({ results: [
          { slug: 'reader', title: 'Reader and book', tags: ['reader'], svg_url: clipartPath },
          { slug: 'bad-license', title: 'Reader sketch' }
        ] });
      }
      if (url.pathname === '/api/clipart/bad-license/') {
        return Response.json({ license: 'CC BY', svg_url: '/static/clipfiles/bad-license/reader.svg' });
      }
      assert.equal(url.pathname, '/api/clipart/reader/');
      return Response.json({ license: { code: 'CC0-1.0' }, creator: 'Clipart Artist', svg_url: clipartPath });
    }
    if (url.hostname === 'freesvg.org') {
      assert.equal(options.headers.Authorization, 'Bearer test-freesvg-token');
      if (url.pathname === '/api/v1/search') {
        searches++;
        return Response.json({ data: [
          { id: 1, name: 'Person reading', slug: 'person-reading', download_url: '/download/1' },
          { id: 2, name: 'Reading doodle', download_url: '/download/2' }
        ] });
      }
      if (url.pathname === '/download/2') return Response.redirect('https://example.com/test.svg');
      if (url.pathname === '/download/1') return new Response(null, { status: 302, headers: { location: '/storage/person-reading.svg' } });
      assert.equal(url.pathname, '/storage/person-reading.svg');
      return vector(10, '<!-- Duplicate original from another provider. -->');
    }
    if (url.hostname === 'openclipart.org') return new Response('');
    if (url.hostname === 'api.iconify.design') return Response.json({ icons: [] });
    throw new Error('Unexpected host ' + url.hostname);
  });

  const result = await findShirtSvgs({ ...query, signal: AbortSignal.timeout(5_000) });
  assert.deepEqual(new Set(listing.map(item => item.source)), new Set(['Clipart.Free', 'FreeSVG', 'Open Doodles', 'Open Peeps']));
  assert.equal(searches, 4);
  assert.deepEqual(result.assets.map(asset => asset.source), ['Clipart.Free', 'Open Doodles', 'Open Doodles', 'Open Peeps']);
  assert.equal(result.assets[0].author, 'Clipart Artist');
  assert.ok(result.assets.every(asset => asset.license === 'CC0 1.0'));
  assert.doesNotMatch(JSON.stringify(result), /test-clipart-key|test-freesvg-token/);
  assert.ok(!globalThis.fetch.mock.calls.some(call => new URL(call.arguments[0]).hostname === 'example.com'));
});

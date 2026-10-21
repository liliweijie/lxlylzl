import test from 'node:test';
import assert from 'node:assert/strict';
import {FoldPool,makeChunk,passage,segmentDistance,SEED} from '../js/brain-depth-world.mjs';
test('new depths have distinct deterministic folds; reverse restores the same space',()=>{assert.deepEqual(makeChunk(SEED,3),makeChunk(SEED,3));assert.notDeepEqual(makeChunk(SEED,3).items,makeChunk(SEED,4).items);const p=new FoldPool();p.update(0);const first=p.chunks.get(0);p.update(9000);p.update(0);assert.deepEqual(p.chunks.get(0),first);});
test('long journeys keep only seven chunks and a bounded number of objects',()=>{const p=new FoldPool();for(let d=0;d<=200000;d+=751){p.update(d);assert.equal(p.chunks.size,7);assert.ok(p.items.length<1800);assert.ok(p.notes.length<=7);}});
test('the entry starts at the center but the passage does not stay straight',()=>{assert.equal(passage(SEED,0).x,0);const xs=Array.from({length:40},(_,i)=>passage(SEED,i*6).x);assert.ok(Math.max(...xs)-Math.min(...xs)>3);});
test('a small camera can follow the entire primary crevice without a collision',()=>{const p=new FoldPool();for(let d=0;d<90;d+=.4){p.update(d);const point=passage(SEED,d);assert.ok(p.items.every(o=>Math.hypot(o.x-point.x,o.y-point.y,o.d-d)>o.r+.15));}});
test('branching crevices intersect; distance test uses all three dimensions',()=>{assert.equal(segmentDistance({x:0,y:0,d:3},{x:0,y:0,d:0},{x:0,y:0,d:6}),0);assert.equal(segmentDistance({x:2,y:0,d:3},{x:0,y:0,d:0},{x:0,y:0,d:6}),2);assert.notDeepEqual(passage(SEED,20,0),passage(SEED,20,1));});

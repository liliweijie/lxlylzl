export const letteringTreatments=['bubble','marker','spray','sticker','drip','plain'];
export const letteringArrangements=['arch','rising','bouncy','level'];
export const letteringOrnaments=['spark','swash','speckle','none'];

export const letteringArtDirection=`Design a single readable apparel lettering graphic guided by the description and supplied visual reference. A separate renderer preserves the exact supplied characters. Interpret the reference's silhouette, texture, color contrast and rhythm, without copying its words or motifs.
Choose a treatment by silhouette: bubble = plump rounded wordmark and thick contour; marker = slanted handstyle and one broad underswipe; spray = weighty stencil shapes and sparse overspray; sticker = die-cut light rim and depth; drip = pooled ink under thick letters; plain = restrained ink with a clean baseline.
Choose one arrangement for a short name or wordmark: arch, rising, bouncy, or level. Choose one supporting ornament: spark, swash, speckle, or none. Respect requested colors, direction and simplicity. For a roster (lineCount > 4), prioritize readable rows and even spacing; use color and outer decoration to convey character. Small chest/sleeve prints should avoid clutter.
Return a JSON letteringStyle with font ("sans", "serif", "mono"), weight (400 or 700), treatment, arrangement, ornament, color (#RRGGBB), optional accent (#RRGGBB), and optional composition ("stack" or "side", for lettering plus illustration). Omit arbitrary transforms and any text to print.
Example: {"font":"sans","weight":700,"treatment":"bubble","arrangement":"rising","ornament":"spark","color":"#FA684D","accent":"#142657","composition":"stack"}`;

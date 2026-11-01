// v1.16.8 - Bellum Iugurthinum 17, 18, 19 (the African excursus), 26-27
// (Cirta falls; Memmius; the senate moves out of fear), 29 (Bestia and Scaurus
// bought). Written in three parts (frags1168a/b/c.js).
// Latin from batch/passages1168.json (extract.js on sall.2); section markers
// from Perseus via tools/xml_sections.js + batch/marks1168.json (26-27 uses
// `sectionFiles`, so the numbers restart at 1 in chapter 27).
// Page quirks kept and explained: 18.11 Carthagine[m], 19.4 Hispania[m], 18.12
// bellicose (editions bellicosi), 18.7 Numidas (editions Nomadas), 29.5 relicua.
// The notes carry the user's theses: Sallust the governor of Africa Nova (17),
// fides failing (26), the senate moved only by fear (27), Scaurus bought (29).
module.exports = [].concat(require('./frags1168a.js'), require('./frags1168b.js'), require('./frags1168c.js'));

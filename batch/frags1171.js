// v1.16.11 - Bellum Iugurthinum 64 (Metellus's sneer), 66-67 (Vaga), 71-72
// (the letter on the pillow; Jugurtha's fear), 73 (Marius elected), 79 (the
// Philaeni). Written in three parts (frags1171a/b/c.js). Latin from
// batch/passages1171.json; section markers via tools/xml_sections.js +
// batch/marks1171.json (66-67 and 71-72 use sectionFiles).
// Page quirks kept as printed and explained in the notes: 64.4 full stop before
// Annos; 67.1 Arce ... fuga (Perseus arcem ... obsidebat ... fugam); 71.5
// [ex perfugis]; 73.3 qua (= quae); 79.4 attriveret (= attriverant). 73 stops
// before its damaged last sentence (Sed paulo . . . decreverat).
module.exports = [].concat(require('./frags1171a.js'), require('./frags1171b.js'), require('./frags1171c.js'));

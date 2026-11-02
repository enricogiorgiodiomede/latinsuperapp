// v1.16.9 - Bellum Iugurthinum 31.9-16, 31.21-29 (Memmius's speech), 33-34
// (the bought tribune silences Jugurtha), 35 (Massiva murdered; urbem
// venalem), 38 (the army under the yoke). Written in three parts
// (frags1169a/b/c.js). Latin from batch/passages1169.json (extract.js on
// sall.2); section markers from Perseus via tools/xml_sections.js +
// batch/marks1169.json (33-34 uses sectionFiles).
// Page quirks: the quotes opening 31.21 and 31.25 and closing 31.29 removed with
// `fix`; 35.10's real quotation kept; 31.29 *haut* kept.
// The notes carry the user's theses: Memmius as a hero fighting the nobility,
// Memmius and Cato using the same words against mercy, the tribunate bought,
// Rome for sale (8 <-> 35), the army bought from within.
module.exports = [].concat(require('./frags1169a.js'), require('./frags1169b.js'), require('./frags1169c.js'));

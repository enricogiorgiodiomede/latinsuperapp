// v1.16.7 - Bellum Iugurthinum 10, 12, 14.1-6, 14.20-25, 15: Micipsa's
// deathbed speech, Hiempsal's murder, Adherbal before the senate, and the
// senate's bought reply. Written in three parts (frags1167a/b/c.js).
// Latin from batch/passages1167.json (extract.js on sall.2); section markers
// from Perseus via tools/xml_sections.js + batch/marks1167.json.
// Page quirks: paragraph-opening quotes in the speeches of 10 and 14 removed
// with `fix`; 14.24 prints *neu vivere* where the editions read *neu iure*
// (kept, explained). The notes carry the user's theses: Jugurtha NOT innocent
// (12), the speeches to be weighed (10), the corruption of the senate in
// action (15), and Cicero's other Scaurus.
module.exports = [].concat(require('./frags1167a.js'), require('./frags1167b.js'), require('./frags1167c.js'));

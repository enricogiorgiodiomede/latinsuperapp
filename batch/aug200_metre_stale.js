/*
 * aug200_metre_stale.js - v2.0.0 follow-up. The metre pages promised that
 * Horace and the Roman elegists "are not in this app yet"; since v2.0.0 they
 * are. Exact find -> replace on the raw source text (each find must occur
 * exactly once), in both languages. The examples themselves are a later job.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..');

const EN = [
  [`the Satires of Horace. Those poets are not in the app yet; when they are, they will be added here.'`,
   `the Satires of Horace. Virgil, Ovid and Horace have been in the app since v2.0.0; their examples will be added to this page.'`],
  [`who fixed its Latin form. Horace is not in this app yet.'`,
   `who fixed its Latin form. Horace has been in the app since v2.0.0, and one of his excerpts is a Sapphic ode, *Carmina* II.10.'`],
  [`after: 'Horace, who wrote more Sapphics than any other Roman poet, is not yet in this app. When he is added, his examples will be added here.'`,
   `after: 'Horace, who wrote more Sapphics than any other Roman poet, has been in the app since v2.0.0, and his Sapphic ode *Carmina* II.10 is among the excerpts. Examples from his Sapphics will be added to this page.'`],
  [`the poem that ends on *carpe diem*. Horace is not in this app yet.'`,
   `the poem that ends on *carpe diem*. Horace has been in the app since v2.0.0, but none of these three odes is among his excerpts yet.'`],
  [`after: 'Horace, who used the greater asclepiad for three of his Odes, is not yet in this app. When he is added, his examples will be added here.'`,
   `after: 'Horace, who used the greater asclepiad for three of his Odes, has been in the app since v2.0.0, but none of those odes is among his excerpts yet. When one is added, its examples will be added here.'`],
  [`and Seneca uses them in the choruses of his tragedies. Neither is in this app yet.'`,
   `and Seneca uses them in the choruses of his tragedies. Horace has been in the app since v2.0.0, though not yet with an ode in glyconics; Seneca is not in it yet.'`],
  [`after: 'Horace and Seneca, who both used glyconics, are not yet in this app. When they are added, their examples will be added here.'`,
   `after: 'Neither Horace nor Seneca has a glyconic excerpt in the app yet (Horace has been in it since v2.0.0, Seneca not). When they do, their examples will be added here.'`],
  [`a body of poetry with no real Greek equivalent. None of those four is in this app yet.',`,
   `a body of poetry with no real Greek equivalent. All four have been in the app since v2.0.0, together with Sulpicia.',`],
  [`after: 'The Roman elegists who made this metre their own - Gallus, Tibullus, Propertius and Ovid - are not in this app yet. When they are added, their examples will be added here.'`,
   `after: 'The Roman elegists who made this metre their own - Gallus, Tibullus, Propertius and Ovid, with Sulpicia - have been in the app since v2.0.0. Their examples will be added to this page.'`]
];

const IT = [
  [`Quei poeti non sono ancora nell\\'app: quando ci saranno, verranno aggiunti qui.'`,
   `Virgilio, Ovidio e Orazio sono nell\\'app dalla v2.0.0; i loro esempi verranno aggiunti a questa pagina.'`],
  [`a fissarne la forma latina. Orazio non è ancora in questa app.'`,
   `a fissarne la forma latina. Orazio è nell\\'app dalla v2.0.0, e uno dei suoi estratti è un\\'ode saffica, *Carmina* II.10.'`],
  [`after: 'Orazio, che scrisse più saffici di qualunque altro poeta romano, non è ancora in questa app. Quando sarà aggiunto, i suoi esempi compariranno qui.'`,
   `after: 'Orazio, che scrisse più saffici di qualunque altro poeta romano, è nell\\'app dalla v2.0.0, e la sua ode saffica *Carmina* II.10 è fra gli estratti. Gli esempi dalle sue strofe saffiche verranno aggiunti a questa pagina.'`],
  [`*carpe diem*. Orazio non è ancora in questa app.'`,
   `*carpe diem*. Orazio è nell\\'app dalla v2.0.0, ma nessuna di queste tre odi è ancora fra i suoi estratti.'`],
  [`after: 'Orazio, che usò l\\'asclepiadeo maggiore per tre delle sue Odi, non è ancora in questa app. Quando sarà aggiunto, i suoi esempi compariranno qui.'`,
   `after: 'Orazio, che usò l\\'asclepiadeo maggiore per tre delle sue Odi, è nell\\'app dalla v2.0.0, ma nessuna di quelle odi è ancora fra i suoi estratti. Quando ne sarà aggiunta una, i suoi esempi compariranno qui.'`],
  [`Nessuno dei due è ancora in quest\\'app.'`,
   `Orazio è nell\\'app dalla v2.0.0, ma non ancora con un\\'ode in gliconei; Seneca non c\\'è ancora.'`],
  [`after: 'Orazio e Seneca, che usarono entrambi i gliconei, non sono ancora in questa app. Quando saranno aggiunti, i loro esempi compariranno qui.'`,
   `after: 'Né Orazio né Seneca hanno ancora un estratto in gliconei nell\\'app (Orazio c\\'è dalla v2.0.0, Seneca no). Quando lo avranno, i loro esempi compariranno qui.'`],
  [`Nessuno di quei quattro è ancora in questa app.',`,
   `Tutti e quattro sono nell\\'app dalla v2.0.0, insieme a Sulpicia.',`],
  [`after: 'Gli elegiaci romani che fecero proprio questo metro - Gallo, Tibullo, Properzio e Ovidio - non sono ancora in questa app. Quando verranno aggiunti, i loro esempi compariranno qui.'`,
   `after: 'Gli elegiaci romani che fecero proprio questo metro - Gallo, Tibullo, Properzio e Ovidio, con Sulpicia - sono nell\\'app dalla v2.0.0. I loro esempi verranno aggiunti a questa pagina.'`]
];

function apply(file, pairs) {
  const p = path.join(REPO, file);
  let s = fs.readFileSync(p, 'utf8');
  for (const [find, repl] of pairs) {
    const n = s.split(find).length - 1;
    if (n !== 1) throw new Error(file + ': expected 1 match, found ' + n + ' for: ' + find.slice(0, 80));
    s = s.replace(find, () => repl);
  }
  fs.writeFileSync(p, s);
  console.log(file + ': ' + pairs.length + ' replaced');
}
apply('js/metres.js', EN);
apply('js/metres-it.js', IT);

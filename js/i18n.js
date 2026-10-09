/*
 * i18n.js - the language layer. Holds the full English/Italian UI dictionary,
 * the active-language state (persisted in localStorage), a t() lookup helper,
 * and the header flag toggle. Loaded FIRST (before data.js / the page
 * controllers) so every module can read I18n.t(...) synchronously at render
 * time. Switching language persists the choice and reloads the page, so each
 * page simply re-renders from scratch in the new language - no per-controller
 * re-render plumbing.
 *
 * Latin excerpts are never translated; only the surrounding interface and the
 * long-form author prose (biography / works / style) have an Italian variant.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'latinapp_lang';
  var SUPPORTED = ['en', 'it'];

  // The site name, reused to build document titles.
  var SITE_EN = 'Latin Authors: Explore & Translate';
  var SITE_IT = 'Autori latini: esplora e traduci';

  var STRINGS = {
    en: {
      // --- header / chrome ---
      'site.title': SITE_EN,
      'subtitle.index': 'Explore Roman authors and practise translating them, from Livius Andronicus to Boethius',
      'subtitle.author': 'Author profile',
      'subtitle.practice': 'Translation practice',
      'subtitle.select': 'Choose what to practise',
      'subtitle.version': 'Update history',
      'subtitle.metres': 'Poetic metre',
      'footer.index': 'An interactive companion to the Latin Authors writing project.',
      'footer.author': 'An interactive companion to the Latin Authors writing project.',
      'footer.practice': 'Attempt the Latin yourself, then reveal the translations to self-check.',
      'footer.select': 'Pick a work, then practise translating its excerpts.',
      'footer.version': 'Every excerpt added in this update. Click one to practise it.',
      'footer.metres': 'How the verse is built, and how it sounded when it was read aloud.',
      'aria.eras': 'Eras',
      'aria.breadcrumb': 'Breadcrumb',

      // --- analytics consent ---
      'consent.aria': 'Analytics consent',
      'consent.text': 'This site can use Google Analytics to count visits, see which authors get read, and estimate the age, interests and country of its readers. It sets cookies and sends data to Google, which may also use it for advertising profiling. Nothing is loaded unless you accept.',
      'consent.accept': 'Accept',
      'consent.reject': 'Reject',
      'consent.manage': 'Cookies and analytics',

      // --- document titles (static) ---
      'title.index': SITE_EN,
      'title.author': 'Author - ' + SITE_EN,
      'title.practice': 'Practice - ' + SITE_EN,
      'title.select': 'Choose a text - ' + SITE_EN,
      // templated titles
      'title.version': 'Update - ' + SITE_EN,
      'title.authorNamed': function (p) { return p.name + ' - ' + SITE_EN; },
      'title.practiceNamed': function (p) { return 'Practice: ' + p.name + ' - ' + SITE_EN; },
      'title.selectNamed': function (p) { return 'Choose - ' + p.name + ' - ' + SITE_EN; },
      'title.versionNamed': function (p) { return 'Added in v' + p.version + ' - ' + SITE_EN; },
      'title.metres': 'Metre - ' + SITE_EN,
      'title.metreNamed': function (p) { return p.name + ' - ' + SITE_EN; },

      // --- meta descriptions (what a search result shows under the title) ---
      // One HTML file serves many URLs, so these are written per entity at
      // runtime by UI.setMeta; the static fallback lives in each .html head.
      'meta.author': function (p) {
        return p.name + ' (' + p.dates + '): life, main works and writing style, with a difficulty profile for translating them and Latin excerpts to practise on.';
      },
      'meta.select': function (p) {
        return 'Choose which work of ' + p.name + ' to practise translating, with the number of Latin excerpts available for each text.';
      },
      'meta.practice': function (p) {
        return 'Practise translating ' + p.name + ': the Latin text and its metre, with Italian and English translations and an analysis of the passage.';
      },
      'meta.metre': function (p) {
        return p.name + ': how this Latin metre is built, how it sounds and which Roman poets wrote in it, with scanned examples.';
      },

      // Portrait alt text. The one image that depicts somebody else entirely
      // (Pythagoras, on the Figulus page) uses its own note instead - see
      // UI.portraitAlt.
      'alt.portrait': function (p) { return 'Portrait of ' + p.name; },

      // --- loading placeholders ---
      'loading.author': 'Loading author...',
      'loading.excerpt': 'Loading excerpt...',
      'loading.generic': 'Loading...',
      'loading.authors': 'Loading authors...',

      // --- era names ---
      'era.archaic': 'Archaic Era',
      'era.caesar': "Caesar's Age",
      'era.augustus': "Augustus' Age",
      'era.earlyImperial': 'Early Imperial Era',
      'era.lateImperial': 'Late Imperial Era',

      // --- era menu ---
      'menu.soon': '(soon)',

      // --- home ---
      'home.comingSoon': 'Coming soon',
      'home.eraNotWritten': 'This era has not been written yet. Check back later.',
      'home.authorsComingSoon': 'Authors for this era will appear here once written.',
      // Possessive era names ("Caesar's Age") drop the article; "Archaic Era" keeps it.
      'home.authorsOf': function (p) { return (/'/.test(p.era) ? 'Authors of ' : 'Authors of the ') + p.era; },
      'section.authors': 'Authors',

      // --- breadcrumbs ---
      'crumb.home': 'Home',
      'crumb.practice': 'Practice',
      'crumb.choose': 'Choose',
      'crumb.metres': 'Metre',

      // --- author page ---
      'section.biography': 'Biography',
      'section.works': 'Main Works',
      'section.style': 'Style and Difficulty',
      'section.legacy': 'Legacy and Impact',
      'section.difficultyProfile': 'Difficulty profile',
      'btn.practice': 'Practice translation',
      'eval.caption': 'Overall difficulty',
      'eval.scaledNote': 'scaled to the sparse surviving fragments',
      'profile.lead': 'How hard each aspect is to translate. Bars are coloured by the level they reach.',
      'fragment.caveat': 'Only fragments of this author survive. Beyond their small quantity, the ' +
        'surviving text is often cut off from its original context, which can make ' +
        'individual passages harder to understand than the bars alone suggest.',
      'link.backAuthors': '← Back to all authors',
      'welcome.title': 'HOW TO USE THE APP:',
      'welcome.step1': 'Navigate the different eras of Latin literature by clicking the buttons on the banner',
      'welcome.step2': 'Scroll down to read the introduction to the era and the roster of authors',
      'welcome.step3': 'Click one of the authors to reach their dedicated page featuring their biography, works, style, legacy and difficulty metre',
      'welcome.step4': 'Click the "Practice Translation" button to reach the page dedicated to the works of the author, then pick one and start practicing!',
      'welcome.never': 'Never show me this again',
      'welcome.ok': 'OK',
      'aria.welcome': 'How to use the app',
      'aria.collapseMenu': 'Collapse the menu',
      'aria.expandMenu': 'Open the menu',
      'btn.backToPractice': '↑ Practice translation',
      'error.noAuthor': 'No author specified.',
      'error.authorNotFound': 'Author not found in this era.',
      'error.loadFailed': 'Could not load archaic_era_draft.md. Open the app through a local ' +
        'server, or make sure js/content.js is present.',

      // --- difficulty criteria + levels + evaluations ---
      'criteria.lexicon.label': 'Lexicon',
      'criteria.lexicon.blurb': 'Vocabulary load: archaic, rare or hapax forms, technical terms.',
      'criteria.syntax.label': 'Syntax',
      'criteria.syntax.blurb': 'Sentence structure: concinnitas, brevitas, word order. Poetry is usually harder.',
      'criteria.style.label': 'Style',
      'criteria.style.blurb': 'Figures of speech and rhetorical texture.',
      'criteria.density.label': 'Density',
      'criteria.density.blurb': 'How packed the meaning is (e.g. philosophy, or Virgilian compression).',
      'level.straightforward': 'Straightforward',
      'level.manageable': 'Manageable',
      'level.challenging': 'Challenging',
      'level.complex': 'Complex',
      'eval.praying': 'START PRAYING, BOY',
      'eval.very-difficult': 'Very Difficult',
      'eval.difficult': 'Difficult',
      'eval.manageable': 'Manageable',
      'eval.good-exercise': 'Good Exercise',
      'eval.not-assessable': 'Not Assessable (NA)',
      'chart.aria': 'Difficulty by criterion: lexicon, syntax, style, density',

      // --- practice page ---
      'practice.instruction': 'Translate the Latin, then reveal the answers to check yourself.',
      'link.chooseAnother': '← Choose another text',
      'link.backCategories': '← Back to the categories',
      'link.backToGroup': function (p) { return '← Back to ' + p.name; },
      'practice.noFragment': 'No excerpt is available here yet.',
      'practice.counter': function (p) { return 'Excerpt ' + p.n + ' of ' + p.total; },
      'practice.yourTranslation': 'Your translation',
      'practice.placeholder': 'Type your translation here...',
      'reveal.showItalian': 'Show Italian',
      'reveal.hideItalian': 'Hide Italian',
      'reveal.italianHeading': 'Italian translation',
      'reveal.showEnglish': 'Show English',
      'reveal.hideEnglish': 'Hide English',
      'reveal.englishHeading': 'English translation',
      'reveal.showAnalysis': 'Show analysis / hints',
      'reveal.hideAnalysis': 'Hide analysis / hints',
      'reveal.analysisHeading': 'Analysis',
      'practice.prev': '← Previous excerpt',
      'practice.next': 'Next excerpt →',
      'practice.latinFrom': function (p) { return 'Latin text from ' + p.source; },
      'badge.addedIn': function (p) { return 'Added in v.' + p.version; },
      'badge.new': 'NEW!',
      'badge.linkLabel': function (p) { return 'See all excerpts added in v.' + p.version; },
      'link.backTo': function (p) { return '← Back to ' + p.name; },

      // --- select page ---
      'select.lead': 'Pick a text to practise. Each one has several excerpts you can cycle through.',
      'select.leadGroups': 'Pick a category, then choose a text inside it.',
      'select.noTexts': 'No texts are available here yet.',
      'select.heading': function (p) { return 'Choose a comedy by ' + p.author; },
      'select.fragmentsCount': function (p) { return p.n + (p.n === 1 ? ' excerpt' : ' excerpts'); },
      'select.worksCount': function (p) { return p.n + (p.n === 1 ? ' text' : ' texts'); },

      // --- version list page (reached from the excerpt version badges) ---
      'version.heading': function (p) { return 'Excerpts added in v' + p.version; },
      'version.latestNote': 'the newest update',
      'version.count': function (p) { return p.n + (p.n === 1 ? ' excerpt' : ' excerpts'); },
      'version.prev': 'Previous update',
      'version.next': 'Next update',
      'version.empty': 'No excerpts were added in this version.',
      'version.notFound': 'No such version.',

      // --- metre reference (the chip on a verse excerpt, and metre.html) ---
      'metre.label': 'Metre',
      'metre.linkLabel': function (p) { return 'Read about the ' + p.name; },
      'metre.range.one': function (p) { return 'v. ' + p.from; },
      'metre.range.many': function (p) { return 'vv. ' + p.from + '-' + p.to; },
      'metre.scheme': 'Scheme',
      'metre.sec.origin': 'Where it comes from',
      'metre.sec.build': 'How it is built',
      'metre.sec.sound': 'How it sounds',
      'metre.sec.used': 'Where it is used, and who used it',
      'metre.legend.long': 'long syllable',
      'metre.legend.short': 'short syllable',
      'metre.legend.anceps': 'either, counted long (anceps)',
      'metre.legend.foot': 'foot division',
      'metre.legend.caesura': 'caesura',
      'metre.legend.marks': 'A mark over a vowel gives the value of the whole syllable, whether it is long by nature or long by position. A diphthong is always long and carries no mark, and brackets enclose a syllable elided away in reading.',
      'metre.backToExcerpt': '← Back to the excerpt',
      'metre.indexHeading': 'Metres',
      'metre.indexLead': 'The verse forms explained so far. A metre’s name appears on every excerpt written in it, and links here.',
      'metre.notFound': 'No such metre.',
      'metre.reading.quantitative': 'Read by quantity',
      'metre.reading.accentual': 'Read by stress',

      // --- what's new (changelog scroll) ---
      'whatsNew.title': 'What’s New',
      'whatsNew.version': 'Version v{version}',
      'whatsNew.released': 'Released {date}, {time} {tz}',
      'whatsNew.cat.added': 'Added',
      'whatsNew.cat.changed': 'Changed',
      'whatsNew.cat.deleted': 'Deleted',
      'whatsNew.nothing.added': 'Nothing was added.',
      'whatsNew.nothing.changed': 'Nothing was changed.',
      'whatsNew.nothing.deleted': 'Nothing was deleted.',
      'whatsNew.seePrevious': 'See previous versions',
      'whatsNew.historyTitle': 'Full version history',
      'whatsNew.close': 'Close'
    },

    it: {
      // --- header / chrome ---
      'site.title': SITE_IT,
      'subtitle.index': 'Esplora gli autori romani e allenati a tradurli, da Livio Andronico a Boezio',
      'subtitle.author': 'Profilo dell’autore',
      'subtitle.practice': 'Pratica di traduzione',
      'subtitle.select': 'Scegli su cosa esercitarti',
      'subtitle.version': 'Cronologia degli aggiornamenti',
      'subtitle.metres': 'Metrica',
      'footer.index': 'Un compagno interattivo del progetto di scrittura sugli autori latini.',
      'footer.author': 'Un compagno interattivo del progetto di scrittura sugli autori latini.',
      'footer.practice': 'Prova prima a tradurre il latino da solo, poi rivela la traduzione e confrontala con la tua versione.',
      'footer.select': 'Scegli un’opera tra quelle proposte e allenati a tradurne gli estratti proposti.',
      'footer.version': 'Tutti i brani aggiunti in questo aggiornamento. Clicca su uno per esercitarti.',
      'footer.metres': 'Come è costruito il verso, e come suonava quando lo si leggeva ad alta voce.',
      'aria.eras': 'Epoche',
      'aria.breadcrumb': 'Percorso',

      // --- consenso alle statistiche ---
      'consent.aria': 'Consenso alle statistiche',
      'consent.text': 'Questo sito può usare Google Analytics per contare le visite, capire quali autori vengono letti e stimare età, interessi e provenienza di chi legge. Usa cookie e invia dati a Google, che può usarli anche per profilazione pubblicitaria. Senza il tuo consenso non viene caricato nulla.',
      'consent.accept': 'Accetto',
      'consent.reject': 'Rifiuto',
      'consent.manage': 'Cookie e statistiche',

      // --- document titles (static) ---
      'title.index': SITE_IT,
      'title.author': 'Autore - ' + SITE_IT,
      'title.practice': 'Pratica - ' + SITE_IT,
      'title.select': 'Scegli un testo - ' + SITE_IT,
      'title.version': 'Aggiornamento - ' + SITE_IT,
      'title.authorNamed': function (p) { return p.name + ' - ' + SITE_IT; },
      'title.practiceNamed': function (p) { return 'Pratica: ' + p.name + ' - ' + SITE_IT; },
      'title.selectNamed': function (p) { return 'Scegli - ' + p.name + ' - ' + SITE_IT; },
      'title.versionNamed': function (p) { return 'Aggiunti in v' + p.version + ' - ' + SITE_IT; },
      'title.metres': 'Metrica - ' + SITE_IT,
      'title.metreNamed': function (p) { return p.name + ' - ' + SITE_IT; },

      // --- meta descriptions ---
      'meta.author': function (p) {
        return p.name + ' (' + p.dates + '): vita, opere principali e stile, con un profilo di difficoltà di traduzione ed estratti latini su cui esercitarsi.';
      },
      'meta.select': function (p) {
        return 'Scegli quale opera di ' + p.name + ' tradurre, con il numero di estratti latini disponibili per ogni testo.';
      },
      'meta.practice': function (p) {
        return 'Esercitati a tradurre ' + p.name + ': il testo latino e il suo metro, con traduzione italiana e inglese e analisi del passo.';
      },
      'meta.metre': function (p) {
        return p.name + ': come è costruito questo metro latino, come suona e quali poeti romani lo hanno usato, con esempi scanditi.';
      },

      'alt.portrait': function (p) { return 'Ritratto di ' + p.name; },

      // --- loading placeholders ---
      'loading.author': 'Caricamento autore...',
      'loading.excerpt': 'Caricamento brano...',
      'loading.generic': 'Caricamento...',
      'loading.authors': 'Caricamento autori...',

      // --- era names ---
      'era.archaic': 'Età arcaica',
      'era.caesar': 'Età di Cesare',
      'era.augustus': 'Età augustea',
      'era.earlyImperial': 'Prima età imperiale',
      'era.lateImperial': 'Tarda età imperiale',

      // --- era menu ---
      'menu.soon': '(N.D.)',

      // --- home ---
      'home.comingSoon': 'Non disponibile',
      'home.eraNotWritten': 'Quest’epoca non è ancora stata scritta. Torna in un momento successivo.',
      'home.authorsComingSoon': 'Gli autori di quest’epoca compariranno qui una volta scritti.',
      'home.authorsOf': function (p) { return 'Autori dell’' + p.era; },
      'section.authors': 'Autori',

      // --- breadcrumbs ---
      'crumb.home': 'Home',
      'crumb.practice': 'Pratica',
      'crumb.choose': 'Scegli',
      'crumb.metres': 'Metrica',

      // --- author page ---
      'section.biography': 'Biografia',
      'section.works': 'Opere principali',
      'section.style': 'Stile e difficoltà',
      'section.legacy': 'Eredità e impatto',
      'section.difficultyProfile': 'Profilo di difficoltà',
      'btn.practice': 'Esercitati a tradurre',
      'eval.caption': 'Difficoltà complessiva',
      'eval.scaledNote': 'adattata ai pochi frammenti superstiti',
      'profile.lead': 'Quanto è difficile da tradurre ciascun aspetto. Le barre sono colorate in base al livello che raggiungono.',
      'fragment.caveat': 'Di questo autore sopravvivono solo frammenti. Oltre alla loro scarsità, il testo ' +
        'superstite è spesso tagliato fuori dal suo contesto originale, il che può rendere i singoli ' +
        'passi più difficili da capire di quanto le barre da sole suggeriscano.',
      'link.backAuthors': '← Torna a tutti gli autori',
      'welcome.title': 'COME USARE L\'APP:',
      'welcome.step1': 'Naviga fra le diverse epoche della letteratura latina cliccando i pulsanti sul banner',
      'welcome.step2': 'Scorri verso il basso per leggere l\'introduzione all\'epoca e l\'elenco degli autori',
      'welcome.step3': 'Clicca su uno degli autori per raggiungere la sua pagina dedicata, con biografia, opere, stile, eredità e misuratore di difficoltà',
      'welcome.step4': 'Clicca il pulsante "Esercitati a tradurre" per raggiungere la pagina dedicata alle opere dell\'autore, poi scegline una e comincia a esercitarti!',
      'welcome.never': 'Non mostrarmelo più',
      'welcome.ok': 'OK',
      'aria.welcome': 'Come usare l\'app',
      'aria.collapseMenu': 'Riduci il menu',
      'aria.expandMenu': 'Apri il menu',
      'btn.backToPractice': '↑ Esercitati a tradurre',
      'error.noAuthor': 'Nessun autore specificato.',
      'error.authorNotFound': 'Autore non trovato in quest’epoca.',
      'error.loadFailed': 'Impossibile caricare archaic_era_draft.md. Apri l’app tramite un ' +
        'server locale, oppure assicurati che js/content.js sia presente.',

      // --- difficulty criteria + levels + evaluations ---
      'criteria.lexicon.label': 'Lessico',
      'criteria.lexicon.blurb': 'Carico lessicale: forme arcaiche, rare o hapax, termini tecnici.',
      'criteria.syntax.label': 'Sintassi',
      'criteria.syntax.blurb': 'Struttura della frase: concinnitas, brevitas, ordine delle parole. La poesia è di solito più ardua.',
      'criteria.style.label': 'Stile',
      'criteria.style.blurb': 'Figure retoriche e tessitura dello stile.',
      'criteria.density.label': 'Densità',
      'criteria.density.blurb': 'Quanto è denso il significato (per es. la filosofia, o la compressione virgiliana).',
      'level.straightforward': 'Lineare',
      'level.manageable': 'Affrontabile',
      'level.challenging': 'Impegnativo',
      'level.complex': 'Complesso',
      'eval.praying': 'IN BOCCA AL LUPO',
      'eval.very-difficult': 'Molto difficile',
      'eval.difficult': 'Difficile',
      'eval.manageable': 'Affrontabile',
      'eval.good-exercise': 'Buon esercizio',
      'eval.not-assessable': 'Non Valutabile (NA)',
      'chart.aria': 'Difficoltà per criterio: lessico, sintassi, stile, densità',

      // --- practice page ---
      'practice.instruction': 'Traduci il testo in latino, poi confronta la tua traduzione con quella proposta.',
      'link.chooseAnother': '← Scegli un altro testo',
      'link.backCategories': '← Torna alle categorie',
      'link.backToGroup': function (p) { return '← Torna a ' + p.name; },
      'practice.noFragment': 'Qui non è ancora disponibile alcun estratto.',
      'practice.counter': function (p) { return 'Estratto ' + p.n + ' di ' + p.total; },
      'practice.yourTranslation': 'La tua traduzione',
      'practice.placeholder': 'Scrivi qui la tua traduzione...',
      'reveal.showItalian': 'Mostra italiano',
      'reveal.hideItalian': 'Nascondi italiano',
      'reveal.italianHeading': 'Traduzione italiana',
      'reveal.showEnglish': 'Mostra inglese',
      'reveal.hideEnglish': 'Nascondi inglese',
      'reveal.englishHeading': 'Traduzione inglese',
      'reveal.showAnalysis': 'Mostra analisi / aiuti',
      'reveal.hideAnalysis': 'Nascondi analisi / aiuti',
      'reveal.analysisHeading': 'Analisi',
      'practice.prev': '← Estratto precedente',
      'practice.next': 'Estratto successivo →',
      'practice.latinFrom': function (p) { return 'Testo latino da ' + p.source; },
      'badge.addedIn': function (p) { return 'Aggiunto in v.' + p.version; },
      'badge.new': 'NUOVO!',
      'badge.linkLabel': function (p) { return 'Vedi tutti i brani aggiunti in v.' + p.version; },
      'link.backTo': function (p) { return '← Torna a ' + p.name; },

      // --- select page ---
      'select.lead': 'Scegli un testo su cui esercitarti. Ognuno di essi ha diversi estratti che puoi provare a tradurre.',
      'select.leadGroups': 'Scegli una categoria, poi scegli un testo al suo interno.',
      'select.noTexts': 'Qui non è ancora disponibile alcun testo.',
      'select.heading': function (p) { return 'Scegli un testo di ' + p.author; },
      'select.fragmentsCount': function (p) { return p.n + (p.n === 1 ? ' estratto' : ' estratti'); },
      'select.worksCount': function (p) { return p.n + (p.n === 1 ? ' testo' : ' testi'); },

      // --- version list page (reached from the excerpt version badges) ---
      'version.heading': function (p) { return 'Brani aggiunti in v' + p.version; },
      'version.latestNote': 'l’aggiornamento più recente',
      'version.count': function (p) { return p.n + (p.n === 1 ? ' brano' : ' brani'); },
      'version.prev': 'Aggiornamento precedente',
      'version.next': 'Aggiornamento successivo',
      'version.empty': 'Nessun brano è stato aggiunto in questa versione.',
      'version.notFound': 'Versione inesistente.',

      // --- metrica (la targhetta sui brani in versi, e metre.html) ---
      'metre.label': 'Metro',
      'metre.linkLabel': function (p) { return 'Leggi sul metro: ' + p.name; },
      'metre.range.one': function (p) { return 'v. ' + p.from; },
      'metre.range.many': function (p) { return 'vv. ' + p.from + '-' + p.to; },
      'metre.scheme': 'Schema',
      'metre.sec.origin': 'Da dove viene',
      'metre.sec.build': 'Com’è costruito',
      'metre.sec.sound': 'Come suona',
      'metre.sec.used': 'Dove si usa, e chi l’ha usato',
      'metre.legend.long': 'sillaba lunga',
      'metre.legend.short': 'sillaba breve',
      'metre.legend.anceps': 'indifferente, contata lunga (ancipite)',
      'metre.legend.foot': 'divisione di piede',
      'metre.legend.caesura': 'cesura',
      'metre.legend.marks': 'Il segno sopra una vocale dà il valore dell\'intera sillaba, che sia lunga per natura o lunga per posizione. Un dittongo è sempre lungo e non porta segno, e le parentesi racchiudono una sillaba elisa nella lettura.',
      'metre.backToExcerpt': '← Torna al brano',
      'metre.indexHeading': 'Metri',
      'metre.indexLead': 'Le forme di verso spiegate finora. Il nome di un metro compare su ogni brano scritto in quel metro, e porta qui.',
      'metre.notFound': 'Metro non trovato.',
      'metre.reading.quantitative': 'Letto per quantità',
      'metre.reading.accentual': 'Letto per accento',

      // --- what's new (changelog scroll) ---
      'whatsNew.title': 'Novità',
      'whatsNew.version': 'Versione v{version}',
      'whatsNew.released': 'Pubblicato il {date}, ore {time} {tz}',
      'whatsNew.cat.added': 'Aggiunte',
      'whatsNew.cat.changed': 'Modifiche',
      'whatsNew.cat.deleted': 'Rimozioni',
      'whatsNew.nothing.added': 'Nessuna aggiunta.',
      'whatsNew.nothing.changed': 'Nessuna modifica.',
      'whatsNew.nothing.deleted': 'Nessuna rimozione.',
      'whatsNew.seePrevious': 'Vedi le versioni precedenti',
      'whatsNew.historyTitle': 'Cronologia completa delle versioni',
      'whatsNew.close': 'Chiudi'
    }
  };

  // --- language state -----------------------------------------------------
  function readLang() {
    var stored;
    try { stored = global.localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }
    return SUPPORTED.indexOf(stored) !== -1 ? stored : 'en';
  }

  var lang = readLang();

  function t(key, params) {
    var dict = STRINGS[lang] || STRINGS.en;
    var val = dict[key];
    if (val == null) val = STRINGS.en[key];
    if (val == null) return key;
    if (typeof val === 'function') return val(params || {});
    if (params) {
      return val.replace(/\{(\w+)\}/g, function (_, k) {
        return params[k] != null ? params[k] : '{' + k + '}';
      });
    }
    return val;
  }

  function setLang(next) {
    if (SUPPORTED.indexOf(next) === -1 || next === lang) return;
    try { global.localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    global.location.reload();
  }

  // --- static-text application (data-i18n / data-i18n-attr) ----------------
  function applyStatic(scope) {
    scope = scope || global.document;
    var nodes = scope.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    var attrNodes = scope.querySelectorAll('[data-i18n-attr]');
    Array.prototype.forEach.call(attrNodes, function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });
    // Keep <title> and <html lang> in sync.
    var titleEl = global.document.querySelector('title[data-i18n]');
    if (titleEl) global.document.title = t(titleEl.getAttribute('data-i18n'));
    global.document.documentElement.setAttribute('lang', lang);
  }

  // --- header flag toggle --------------------------------------------------
  // Inline-SVG flags (regional-indicator emoji do not render as flags on
  // Windows, so we draw them). UK = English, tricolore = Italian.
  function flagSvg(code) {
    if (code === 'it') {
      return '<svg viewBox="0 0 3 2" class="flag-svg" aria-hidden="true">' +
        '<rect width="1" height="2" x="0" fill="#009246"/>' +
        '<rect width="1" height="2" x="1" fill="#ffffff"/>' +
        '<rect width="1" height="2" x="2" fill="#ce2b37"/></svg>';
    }
    // Simplified Union Flag.
    return '<svg viewBox="0 0 60 30" class="flag-svg" aria-hidden="true">' +
      '<clipPath id="uk-clip"><rect width="60" height="30"/></clipPath>' +
      '<g clip-path="url(#uk-clip)">' +
      '<rect width="60" height="30" fill="#012169"/>' +
      '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" stroke-width="6"/>' +
      '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/>' +
      '<path d="M30,0 V30 M0,15 H60" stroke="#ffffff" stroke-width="10"/>' +
      '<path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6"/>' +
      '</g></svg>';
  }

  var LANG_LABELS = { en: 'EN', it: 'IT' };

  function renderToggle() {
    var host = global.document.getElementById('lang-toggle');
    if (!host) return;
    host.innerHTML = '';
    host.setAttribute('role', 'group');
    host.setAttribute('aria-label', lang === 'it' ? 'Lingua' : 'Language');
    SUPPORTED.forEach(function (code) {
      var btn = global.document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-flag' + (code === lang ? ' active' : '');
      btn.setAttribute('aria-pressed', code === lang ? 'true' : 'false');
      btn.title = code === 'it' ? 'Italiano' : 'English';
      btn.innerHTML = flagSvg(code) + '<span class="lang-code">' + LANG_LABELS[code] + '</span>';
      btn.addEventListener('click', function () { setLang(code); });
      host.appendChild(btn);
    });
  }

  function boot() {
    applyStatic();
    renderToggle();
  }

  // i18n.js is included at end-of-body, so the header/main DOM already exists:
  // boot exactly ONCE, now. A second pass on DOMContentLoaded would re-run
  // applyStatic and clobber labels the page controllers fill in dynamically
  // (e.g. the home grid heading "Authors of the Archaic Era"). Fall back to
  // DOMContentLoaded only if, unexpectedly, the DOM isn't ready yet.
  if (global.document.getElementById('lang-toggle') || global.document.querySelector('[data-i18n]')) {
    boot();
  } else {
    global.document.addEventListener('DOMContentLoaded', boot);
  }

  global.I18n = {
    get lang() { return lang; },
    t: t,
    setLang: setLang,
    applyStatic: applyStatic,
    SUPPORTED: SUPPORTED
  };
})(window);

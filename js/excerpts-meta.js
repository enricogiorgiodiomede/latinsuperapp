/*
 * excerpts-meta.js - per-excerpt context for the translation practice page:
 * an authored title, a short "what this is about" blurb, and a citation. Keyed
 * by author slug; the array is indexed in excerpt order (combined entries have
 * two excerpts: index 0 then 1). These complement the Latin/translations/analysis
 * that data.js parses from archaic_era_draft.md.
 *
 * Citation format: (Work, structural location, verses/fragments). Fragmentary
 * works that survive only through a later author cite that preserving source.
 */
(function (global) {
  'use strict';

  var EXCERPT_META = {
    'livius-andronicus': [
      {
        title: 'Homer’s Odyssey opening, remade in Latin',
        citation: '(Odusia, frr. I.1 and V.297)',
        description: 'This fragment is about the very birth of Latin literature: Livius remaking Homer line by line. The first verse is the Odyssey’s opening invocation, asking the Muse (here the Italic Camena) to tell of Odysseus, the man of many turns; the second catches Odysseus alone at sea, his heart freezing with dread as Charybdis opens before him.'
      }
    ],
    'gnaeus-naevius': [
      {
        title: 'Naevius writes his own epitaph',
        citation: '(Epitaphium Naevii, fr. 67)',
        description: 'This fragment is about Naevius himself, in a gloriously arrogant self-epitaph. It claims that if the gods were allowed to weep for mortals, the divine Camenae would weep for the poet Naevius, and that ever since he died, Rome has forgotten how to speak the Latin tongue.'
      }
    ],
    'quintus-ennius': [
      {
        title: 'Fabius the Delayer, and Ennius on himself',
        citation: '(Annales, Books IX and XVIII)',
        description: 'This fragment is about Rome’s rescue and the poet’s own identity. The first lines praise Fabius Maximus ‘the Delayer’, who saved the state by patient tactics against Hannibal, refusing to put rumour before Rome’s safety; the closing line is Ennius reflecting that he, once a man of Rudiae, has become a Roman.'
      }
    ],
    'titus-maccius-plautus': [
      {
        title: 'A love-letter only a chicken could have written',
        citation: '(Pseudolus, Act I, scene 1, vv. 22-36)',
        description: 'This paragraph is about the opening of Pseudolus, where the sharp-tongued slave Pseudolus needles his lovesick young master Calidorus. Calidorus weeps over a wax tablet, a letter from his sweetheart, who has just been sold to a soldier. Pseudolus grabs it and mocks the ghastly handwriting, joking that a chicken must have written it and only the Sibyl could read it.'
      }
    ],
    'marcus-porcius-cato': [
      {
        title: 'Why farming beats trade and usury',
        citation: '(De Agri Cultura, Praefatio)',
        description: 'This paragraph is about Cato’s moral case for agriculture, the one moment in his farming manual where he pauses to argue values. He sets commerce and moneylending, which the ancestors punished harshly, against farming, which he says produces the toughest men and best soldiers and the most honest, secure, and least resented profit of all.'
      }
    ],
    'caecilius-statius': [
      {
        title: 'Shackled to a rich and domineering wife',
        citation: '(Plocium, fragment in Gellius, Noctes Atticae II.23)',
        description: 'This paragraph is about a henpecked husband’s lament from Caecilius’s comedy Plocium. Married to a wealthy, overbearing wife whose dowry rules him, the speaker grumbles that he lives like a prisoner of war waiting for her to die, and that her nagging made him sell off a slave girl she suspected him with, which she then bragged about to all her friends.'
      }
    ],
    'publius-terentius-afer': [
      {
        title: '‘I am human: nothing human is foreign to me’',
        citation: '(Heauton Timorumenos, Act I, scene 1, vv. 75-87)',
        description: 'This paragraph is about the opening of Terence’s Heauton Timorumenos, where Chremes pries into why his rich old neighbour Menedemus is punishing himself with brutal farm work. Told to mind his own business, Chremes answers with the famous homo sum, humani nil a me alienum puto, ‘I am human; I think nothing human foreign to me’, and gently coaxes his neighbour to share his grief.'
      }
    ],
    'marcus-pacuvius-and-lucius-accius': [
      {
        title: 'Pacuvius: complain of fortune, but do not weep',
        citation: '(Niptra, fragment in Cicero, Tusculanae Disputationes II.50)',
        description: 'This fragment is about the wounded Ulysses in Pacuvius’s tragedy Niptra, struck down by a spear thrown by his own son. The two lines state a stern Roman ideal: it is fitting to voice complaint against cruel fortune but not to wail over it, for measured protest is a man’s duty while tears belong to a woman’s nature.'
      },
      {
        title: 'Accius: ‘Let them hate, so long as they fear’',
        citation: '(Atreus, fragment in Cicero, De Officiis I.97)',
        description: 'This fragment is about tyranny in three words. Spoken by Atreus, who murdered his brother’s children and served them at a feast, oderint, dum metuant (‘let them hate, so long as they fear’) became the proverbial motto of the tyrant. Cicero cites it as the mark of illegitimate power, and the emperor Caligula later made it his favourite saying.'
      }
    ],
    'gaius-lucilius': [
      {
        title: 'What virtue really is, and where loyalty is owed',
        citation: '(Saturae, frr. 1342-1354 Krenkel)',
        description: 'This paragraph is about the meaning of virtue, the most philosophical surviving piece of Lucilius’s satire, addressed to a friend named Albinus. Pounding on the word virtus, it defines true worth as knowing right from wrong, living honestly, and serving the community, and it ranks our duties: fatherland first, then parents, and ourselves only last.'
      }
    ],
    'pomponius-bononiensis-and-quintus-novius': [
      {
        title: 'Pomponius: a mix-up in the fullers’ workshop',
        citation: '(Fullones, fr. 48-50 Ribbeck)',
        description: 'This fragment is about a scene from Pomponius’s Atellan farce Fullones, set among the cloth-fullers. A prompter tells two characters to embrace and greet each other, but one hails the other as ‘brother’ and gets ‘sister’ back, hinting at a disguise, before the scene snaps into brisk workshop orders to stoke the fire, feed the wood, and grind the grain.'
      },
      {
        title: 'Novius: Maccus the fool and the head-cracking doorway',
        citation: '(Maccus Exul, fr. 48-50 Ribbeck)',
        description: 'This fragment is about the stock clown Maccus driven into exile in Novius’s Atellan farce Maccus Exul. The speaker crows that he predicted the fellow would gallop off to Tuscany, then launches into a litany of woe about a doorway whose lintel keeps cracking his skull and whose threshold keeps smashing his toes, the repeated injuries being the whole joke.'
      }
    ]
  };

  global.ExcerptMeta = {
    forAuthor: function (slug) { return EXCERPT_META[slug] || []; },
    forExcerpt: function (slug, index) {
      var list = EXCERPT_META[slug] || [];
      return list[index] || null;
    }
  };
})(window);

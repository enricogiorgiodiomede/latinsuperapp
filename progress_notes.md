# Progress Notes — Latin Authors Tier List

## Session 1 Summary

### What we built

- **CLAUDE.md** -- full project instructions file covering: author list across all 5 eras, entry structure, length guidelines, tier system, source rules (The Latin Library, Splash Latino), language rules, and workflow.
- **archaic_era_draft.md** -- English main document, Archaic Era. Contains the era introduction and the first three author entries.
- **italian_translations_archaic.md** -- Italian parallel file. Contains the Italian era introduction and Italian drafts for all three authors (biography, works, style sections + translations of Latin passages).

### Decisions made

- **Language**: Document written in English throughout. Italian translations of Latin passages are kept (Paolo will adapt them). Full Italian parallel drafts are saved separately in `italian_translations_archaic.md` for each author.
- **Biography section**: Mainstream authors get a concise but real biography with anecdotes. Lesser-known authors with scarce fragments get a longer biography -- but the Latin excerpt is never skipped.
- **Tier scaling**: Fragmentary authors are scaled down one step from intrinsic per-line difficulty. Authors with extremely sparse material (handful of isolated lines) get NC.
- **Workflow**: Italian drafts saved to `italian_translations_archaic.md` in parallel with English entries. Era introductions written in both languages.

### Archaic Era Introduction

Covers: Rome's relationship with Greece as the defining force of the era; all early literature as adaptation or imitation of Greek models; Saturnian meter and its difficulty; the fragmentary state of most surviving material; the shift toward an original Latin voice in the second half of the era (Plautus, Terence, Cato, Lucilius).

### Authors covered (Session 1)

**Livius Andronicus (c. 284-204 BC) -- Tier: NC**
- First author of Latin literature; Greek slave freed by the Livii; staged first Latin theatrical performance in 240 BC.
- Works: Odusia (translation of Homer's Odyssey in Saturnian meter, ~80 verses survive), tragedies and comedies (all lost).
- Difficulty: archaic lexicon, Saturnian meter, ~80 verses total -- too sparse for a reliable rating.
- Excerpt: "Virum mihi, Camena, insece versutum" (Odusia I.1) and "Igitur demum Ulixi cor frixit prae pavore" (Odusia V.297).

**Gnaeus Naevius (c. 270-201 BC) -- Tier: B**
- First Roman-born Latin author; soldier in First Punic War; imprisoned and exiled for insulting the Metelli; invented the fabula praetexta.
- Works: Bellum Poenicum (~67 fragments), comedies and tragedies (lost).
- Difficulty: archaic lexicon, Saturnian meter, fragmentary -- enough connected material to rate, scaled down from A to B.
- Excerpt: Epitaphium Naevii (fragment 67) -- the self-written epitaph claiming Rome forgot how to speak Latin after his death.

**Quintus Ennius (239-169 BC) -- Tier: B (borderline A)**
- "Father of Latin poetry" for the Romans; trilingual (tria corda); brought to Rome by Cato; friend of Scipio Africanus; introduced dactylic hexameter to Latin epic.
- Works: Annales (~600 lines survive, 18 books), tragedies, Saturae, philosophical works (all lost except fragments).
- Difficulty: archaic lexicon, dactylic hexameter (more learnable than Saturnian), high allusion density -- B overall, hardest passages touch A.
- Excerpt: "Unus homo nobis cunctando restituit rem" (Annales IX, on Fabius Maximus) and "Nos sumus Romani qui fuimus ante Rudini" (Annales XVIII, autobiographical).

---

## Session 2 Summary

### What we built

- Continued **archaic_era_draft.md** with four new author entries: Plautus, Cato, Caecilius Statius, Terence.
- Continued **italian_translations_archaic.md** with the Italian parallel entries for all four authors.
- Compressed Plautus's Main Works and Style sections per user request; moved tier criteria into Style/Difficulty.
- Revised Terence's tier from C to B based on sustained archaic morphology and colloquial interjections across the full corpus.

### Decisions made

- **Caecilius before Terence**: user requested this order since Caecilius is the transitional figure between Plautus and Terence.
- **Caecilius entry**: biography-heavy (life and anecdotes) since the corpus is almost entirely lost; Latin excerpt still included (Plocium fragment via Gellius NA II.23).
- **Terence tier**: bumped from C to B -- archaic forms (*usu'*, *opu'*, *quoiquam*) and colloquial interjections (*eheu!*, *hui!*, *ah!*, *hem!*) compound across six complete plays and exceed the "read after Caesar" comfort zone. Placed above Naevius, well below Plautus.

### Authors covered (Session 2)

**Titus Maccius Plautus (c. 254-184 BC) -- Tier: A (high), borderline S**
- Born in Sarsina (Umbria); worked in a mill after failed business ventures; most popular playwright in Roman history; Varro identified 21 authentic plays; died c. 184 BC.
- Works: 21 complete fabulae palliatae -- Menaechmi, Amphitryon (first "tragicomoedia"), Miles Gloriosus, Pseudolus (his own favorite, performed at his funeral), Aulularia, Casina, Bacchides, Captivi, and others.
- Difficulty: sermo cotidianus is the core challenge -- archaic morphology + colloquial hapax + structural puns + lyric cantica. Three criteria at HIGH. High A / borderline S; individual cantica may touch S.
- Excerpt: Pseudolus I.i, vv. 22-36 (the letter-reading scene: gallina scripsit, the Sibyl, the soul in the wax).

**Marcus Porcius Cato -- Cato the Elder (234-149 BC) -- Tier: C**
- Born in Tusculum; fought under Fabius Maximus in Second Punic War; censor 184 BC; brought Ennius to Rome despite being ferociously anti-Greek; *Ceterum censeo Carthaginem esse delendam*; died 149 BC.
- Works: De Agri Cultura (complete -- oldest surviving Latin prose text), Origines (fragmentary), Speeches (fragmentary), Ad Marcum filium (fragmentary).
- Difficulty: agricultural vocabulary is main barrier (solvable with a cheat sheet); archaic forms (*quom*, *siet*, *foenerari*) are the residual challenge; syntax extremely paratactic and simple; no stylistic figures; no allusion.
- Excerpt: De Agri Cultura, Praefatio (the moral prologue praising farmers over merchants and moneylenders).

**Caecilius Statius (c. 220-166 BC) -- Tier: NC**
- Born among the Insubres in Cisalpine Gaul; came to Rome as a prisoner of war; freed by the gens Caecilia; friend of Ennius; both died c. 168-169 BC.
- The Terence dinner story (Donatus/Suetonius): young Terence read the Andria to Caecilius, was first given a stool by the door, then invited to join the table after the first few lines.
- Volcacius Sedigitus ranked him #1 comic poet (above Plautus); Varro praised his argumenta (plots); Quintilian praised his gravitas; Gellius compared him unfavorably to Menander in NA II.23.
- Works: ~42 comedies, all lost; Plocium best-attested through Gellius.
- Difficulty: NC -- ~280 lines survive, voice identifiable, material too sparse for reliable cross-criteria assessment.
- Excerpt: Plocium monologue from Gellius NA II.23 (the husband's lament: "is demum miser est...").

**Publius Terentius Afer -- Terence (c. 185-159 BC) -- Tier: B**
- Born in Carthage; came to Rome as a slave of senator Terentius Lucanus; freed and educated; connected to the Scipionic circle.
- The two accusations: contaminatio (combining multiple Greek originals) and ghostwriting (Laelius and Scipio Aemilianus as real authors). Addressed in prologues without fully denying either.
- Died c. 159 BC during or after a trip to Greece; circumstances unknown.
- Only archaic author with a fully complete surviving corpus: all 6 comedies intact. Plautus second (21 complete by Varronian canon, minor fragments from non-Varronian attributions lost).
- Central concept: humanitas -- shared human empathy as moral principle; "homo sum: humani nil a me alienum puto" (Heauton Timorumenos I.i.77).
- Style: refined vs. colloquial (Plautus), character comedy vs. situation comedy, no cantica, puri sermonis amor (Caesar's phrase).
- Excerpt: Heauton Timorumenos I.i, vv. 75-87 (Chremes/Menedemus -- the "homo sum" exchange).

---

## Session 3 Summary

### What we built

- Continued **archaic_era_draft.md** with four new author entries: Pacuvius + Accius (grouped), Lucilius, Pomponius Bononiensis.
- Continued **italian_translations_archaic.md** with the Italian parallel entries for all four.
- Lucilius excerpt: virtus fragment (frr. 1342-1354 Krenkel), sourced via Lactantius Div. Inst. VI.5. Source attributed transparently to Krenkel edition since The Latin Library has no dedicated Lucilius page.
- Pomponius excerpt: Fullones fr. 48-50 Ribbeck (Nonius Marcellus 472M), sourced via PHI Latin Texts (phi0618.phi001). Neither The Latin Library nor Splash Latino has a Pomponius page.

### Decisions made

- **Pacuvius + Accius grouped**: both NC, both tragic poets, both known primarily through Cicero's testimony. Grouped entry with individual excerpts and the famous Tarentum anecdote.
- **Pomponius source**: PHI Latin Texts used as primary source with transparent attribution; Splash Latino was unreachable throughout this session.

### Authors covered (Session 3)

**Marcus Pacuvius (c. 220-130 BC) and Lucius Accius (170-86 BC) -- Tier: NC (both) [grouped entry]**
- Pacuvius: nephew of Ennius, born in Brundisium; painter before playwright; friend of Laelius; ~13 tragedies + Paulus (praetexta); lived to ~91; retired to Tarentum.
- Accius: born in Pisaurum, son of a freedman; 45+ tragedies; refused to stand for Caesar's father at the collegium poetarum; still alive when Cicero was young; Cicero knew him personally.
- KEY anecdote: Accius visited elderly Pacuvius in Tarentum and read him the Atreus. Pacuvius praised it but called it too savage; Accius said he'd keep writing that way. Pacuvius: "My fruit has ripened; yours is still forming."
- Quintilian: Pacuvius = doctissimus, gravitas; Accius = vis, ardor. Both NC -- fragments too sparse for reliable rating.
- Excerpts: Pacuvius -- Niptra closing maxim via Cicero Tusc. II.50 ("Conqueri fortunam adversam..."); Accius -- "oderint dum metuant" from Atreus via Cicero De Officiis I.97 (Caligula's favorite line).

**Gaius Lucilius (c. 180-102 BC) -- Tier: A**
- Born in Suessa Aurunca; equestrian rank; personal friend and companion-in-arms of Scipio Aemilianus (served at Numantia 133 BC).
- The Scipio connection: effective satirical immunity -- nobody was taking Scipio's friend to court over a verse. Roman personal satire as a genre was built on this combination of talent and aristocratic protection.
- Horace's assessment (Sat. I.4, I.10): *emunctae naris* (sharp instinct) vs. *durus conponere versus* (rough execution); 200 verses per hour *stans pede in uno*; *cum flueret lutulentus, erat quod tollere velles*. Admired him enough to model his career on him; also could not stop listing everything he would have done differently.
- Works: 30 books of *Saturae*, ~1,300 fragments; books 26-30 (composed first) in hexameter; later books in mixed meters.
- Difficulty: archaic + colloquial lexicon, Greek insertions, topical allusions (named contemporary targets, context lost), fragmentary.
- Excerpt: virtus fragment (frr. 1342-1354 Krenkel, preserved by Lactantius, Div. Inst. VI.5) -- the most philosophically substantial passage in archaic Latin satire; anaphoric virtus-catalogue, archaic forms (potesse, patriai), compressed syntax.

**Pomponius Bononiensis and Quintus Novius (both fl. c. 90-80 BC) -- Tier: NC (both) [grouped entry]**
- Both from the Sullan era; co-founders of the literary fabulae Atellanae (transforming improvised Oscan masked shows into scripted Latin plays).
- Stock characters shared by both: Maccus, Bucco, Pappus, Dossennus.
- Pomponius: ~70 play titles, ~200 verses surviving; praised by Fronto, Seneca the Elder (inventor of double-meaning wordplay), Velleius Paterculus, Macrobius.
- Novius: ~43 play titles, ~100 verses surviving; praised by Fronto; quoted by Cicero (De Oratore 2.279 -- the weeping father joke) as a model of well-constructed comic reversal.
- Distinction: Pomponius -- situational/physical comedy; Novius -- sharper verbal wit.
- Both NC: avg. 2-6 lines per play, no complete scene survives for either.
- Pomponius excerpt: Fullones, fr. 48-50 Ribbeck (Nonius 472M) via PHI Latin Texts (phi0618.phi001) -- gender confusion greeting + workshop imperatives.
- Novius excerpt: Maccus Exul, fr. 48-50 Ribbeck (Nonius 4M) via PHI Latin Texts (phi0592.phi001) -- Maccus departing for Tuscany at a gallop; complaint about doorframe.
- Closing note: both NC. Genre survived as commedia dell'arte; Maccus became Pulcinella.

### THE ARCHAIC ERA IS COMPLETE.

**Next era: Caesar's Era (100-44 BC).** Confirm permission before beginning.

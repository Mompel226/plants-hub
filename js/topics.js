/* ============================================================
   Plants Hub — the topic register
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT WHEN A LAB CHANGES.
   One lab covers every plant topic, so each topic here points at a station of it.

   id      unique key
   no      Cambridge 0610 topic number, as taught here
   year    year group
   title   syllabus topic name
   lab     name of the app that covers it
   part    what it lights on the plant: a part id from js/plant.js
   stage   the growth stage the hub shows for it (js/plant.js stages)
   blurb   one or two sentences, in plain words
   detail  a short fact shown on an open lab, e.g. "12 stations · 86 questions"
   status  "live" | "build" | "planned"
   url     the published lab, opened on the station for this topic
   ============================================================ */
window.TOPICS = [
  { id: 'nutrition', no: 6, year: 'Y11', title: 'Plant nutrition', lab: 'Plants Lab',
    part: 'leaves', stage: 'leaf',
    blurb: 'How a leaf is built to catch light, the equation that turns air and water into sugar, what limits how fast it happens, and the four investigations the exam sets.',
    detail: 'Stations 4 and 5', status: 'live', url: 'https://nlcsbiology.com/plants-lab/#leaf' },

  { id: 'transport', no: 8, year: 'Y11', title: 'Transport in plants', lab: 'Plants Lab',
    part: 'stem', stage: 'water',
    blurb: 'Root hairs and the way water gets in, xylem and phloem and where they sit, transpiration and what pulls water up a tree, the potometer practical, and sugar on the move from sources to sinks.',
    detail: 'Stations 2, 3, 6, 7 and 8', status: 'live', url: 'https://nlcsbiology.com/plants-lab/#root' },

  { id: 'tropic', no: '14.5', year: 'Y11', title: 'Tropic responses', lab: 'Plants Lab',
    part: 'sun', stage: 'shoot',
    blurb: 'Why a shoot grows towards the light and a root grows down, and the hormone that bends a shoot by making one side grow faster than the other.',
    detail: 'Station 9', status: 'live', url: 'https://nlcsbiology.com/plants-lab/#tropisms' },

  { id: 'reproduction', no: '16.3', year: 'Y11', title: 'Sexual reproduction in plants', lab: 'Plants Lab',
    part: 'flower', stage: 'flower',
    blurb: 'The ten parts of a flower and their jobs, pollination by insects and by wind, the pollen tube, fertilisation, and what the ovule and the ovary become — then what a seed needs to wake.',
    detail: 'Stations 1, 10 and 11', status: 'live', url: 'https://nlcsbiology.com/plants-lab/#flower' },

  { id: 'adaptive', no: '18.2', year: 'Y11', title: 'Adaptive features', lab: 'Plants Lab',
    part: 'xerophyte', stage: 'adapted',
    blurb: 'What an adaptive feature is, how to read one off a picture, and the two extremes: a plant with almost no water and a plant with nothing but water.',
    detail: 'Station 12', status: 'live', url: 'https://nlcsbiology.com/plants-lab/#adapted' }
];

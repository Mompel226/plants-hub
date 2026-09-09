/* ============================================================
   Plants Hub — what each stage of the plant says
   ------------------------------------------------------------
   The growth stages themselves — which parts show, which light — live in the shared
   js/plant.js. This file is the hub's own words for each one: the exam's answer first,
   reality after it, a photograph, and where the lab teaches it.

   id       matches a stage in js/plant.js
   n        the number on the strip
   title    what the card says
   chip     the two or three words on the strip under the plant
   text     the exam's answer, in plain words, second person
   real     the line of reality after it (optional)
   img      the photograph: base name in assets/photos/ (900 and 1400 wide, JPEG + WebP),
            alt, caption, credit, page
   stations the stations of the Plants Lab that teach it: id (the lab's #hash), number, name
   topics   the 0610 sections it draws on
   ============================================================ */
window.STAGES = [
  { id: 'seed', n: 1, title: 'A seed wakes', chip: 'Seed',
    text: 'Here you start under the ground. A seed is a tiny plant and a store of food inside a coat, waiting. Give it water, oxygen and a suitable temperature and it germinates: the root comes out first, then the shoot. Light is not on the list — the seed is in the dark.',
    real: 'Until its first leaves open, a seedling lives on the food packed in the seed, and its dry mass falls. Then photosynthesis starts and it rises.',
    img: { base: 'assets/photos/germination', alt: 'Adzuki beans germinating on damp paper, the white radicle coming out of each', caption: 'Adzuki beans, day four: the radicle first', credit: 'Judgefloro · CC0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:1876Germination_of_Adzuki_bean_04.jpg' },
    stations: [{ id: 'seed', n: 1, title: 'A seed wakes' }], topics: ['16.3'] },

  { id: 'root', n: 2, title: 'Roots go down', chip: 'Root',
    text: 'The root grows down into the soil and grows root hairs — thousands of cells drawn out into threads, which give it a huge surface for taking things in. Water enters by osmosis, mineral ions by active transport, and both are carried up the xylem.',
    real: 'Two mineral ions have named jobs: nitrate for amino acids and proteins, magnesium for chlorophyll. Without magnesium the leaves turn yellow.',
    img: { base: 'assets/photos/root-section', alt: 'A stained section across a buttercup root: a wide cortex of starch-filled cells round a small star of xylem', caption: 'A buttercup root cut across: cortex round a star of xylem', credit: 'Berkshire Community College Bioscience Image Library · CC0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Herbaceous_Dicot_Root_Mature_Ranunculus_(35613584240).jpg' },
    stations: [{ id: 'root', n: 2, title: 'Roots and water uptake' }], topics: ['8.2', '6.1'] },

  { id: 'shoot', n: 3, title: 'The shoot finds the light', chip: 'Shoot',
    text: 'The shoot grows up and towards the light, and the root grows down towards gravity. These are tropisms: growth responses to a stimulus. A shoot bends because a hormone, auxin, made in its tip collects on the shaded side and makes those cells grow longer.',
    real: 'Lay a seedling on its side in the dark and it still turns its shoot up and its root down. Gravity is the stimulus; no light is needed.',
    img: { base: 'assets/photos/seedling', alt: 'A cucumber seedling with its two seed leaves open, in soil', caption: 'A cucumber seedling, seed leaves open, reaching up', credit: 'Peter Chastain · public domain · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Cucumber_Seedling.jpg' },
    stations: [{ id: 'tropisms', n: 8, title: 'Bending to the light' }], topics: ['14.5'] },

  { id: 'stem', n: 4, title: 'The stem carries', chip: 'Stem',
    text: 'Inside the stem run two kinds of tube, together in vascular bundles. Xylem carries water and mineral ions up from the roots, and holds the plant up; phloem carries sucrose and amino acids from the leaves to wherever they are needed — up or down.',
    real: 'Xylem is dead: hollow cells joined end to end, stiffened with lignin. Wood is years of it. Phloem is alive, and loading sugar into it takes energy.',
    img: { base: 'assets/photos/stem-section', alt: 'A stained section through a vascular bundle of a sunflower stem: large red xylem vessels beside small phloem cells', caption: 'One bundle of a sunflower stem: xylem inside, phloem outside', credit: 'Berkshire Community College Bioscience Image Library · CC0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Herbaceous_Dicot_Stem_Collateral_Vascular_Bundle_in_Young_Helianthus_(36834309183).jpg' },
    stations: [{ id: 'stem', n: 3, title: 'Xylem and phloem' }, { id: 'translocation', n: 7, title: 'Sugar on the move' }], topics: ['8.1', '8.4'] },

  { id: 'leaf', n: 5, title: 'The leaf makes food', chip: 'Leaf',
    text: 'The leaf is where the plant feeds itself. Carbon dioxide comes in through the stomata, water arrives up the xylem, and in the chloroplasts chlorophyll captures the energy of light to make glucose: carbon dioxide + water → glucose + oxygen. The glucose becomes starch, cellulose, sucrose, nectar, and the energy of every cell.',
    real: 'A leaf is broad and thin so that light reaches every cell and carbon dioxide has only a short way to diffuse. The rate is set by whichever is in shortest supply: light, carbon dioxide or warmth.',
    img: { base: 'assets/photos/leaf-backlit', alt: 'A green leaf lit from behind, every vein showing', caption: 'A leaf against the light: the veins are its plumbing', credit: 'Forest and Kim Starr · CC BY 2.0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Starr-220317-1817-Lepechinia_hastata-backlit_leaf_showing_veins-Waihou_Springs_Olinda-Maui_(52433969108).jpg' },
    stations: [{ id: 'leaf', n: 4, title: 'The leaf' }, { id: 'photosynthesis', n: 5, title: 'Photosynthesis' }], topics: ['6.2', '6.1'] },

  { id: 'water', n: 6, title: 'Water up, water out', chip: 'Water',
    text: 'Water evaporates from the cells inside the leaf and diffuses out through the stomata as vapour: transpiration. Every drop that leaves pulls the column of water below it up the xylem, because water molecules hold on to one another. That pull lifts water to the top of the tallest tree.',
    real: 'Warm, windy, dry air makes it faster; humid air slows it. Lose water faster than the roots take it in and the cells go flaccid: the plant wilts.',
    img: { base: 'assets/photos/leaf-stoma', alt: 'A section through the lower surface of a leaf: two guard cells with a pore between them', caption: 'A stoma cut across: two guard cells, one pore, and the air space above', credit: 'Berkshire Community College Bioscience Image Library · CC0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Angiosperm_Morphology_Abaxial_Epidermis_and_Guard_Cells_in_Ligustrum_Leaf_(37033388255).jpg' },
    stations: [{ id: 'transpiration', n: 6, title: 'Water up, water out' }], topics: ['8.3'] },

  { id: 'flower', n: 7, title: 'The flower', chip: 'Flower',
    text: 'The flower is where the next generation begins. Petals bring the insects; anthers on their filaments make the pollen; the carpel — stigma, style, ovary — holds the ovules with the female gametes inside. Pollination is pollen from an anther reaching a stigma; a wind-pollinated flower does the same job with feathery stigmas, dangling anthers and no petals at all.',
    real: 'A pollen grain on the stigma grows a tube down the style to an ovule, and only when its nucleus fuses with the nucleus in the ovule is the ovule fertilised.',
    img: { base: 'assets/photos/bee-flower', alt: 'A bee deep inside an orange rose', caption: 'Brought by the petals, dusted by the anthers', credit: 'Diana Măceşanu · CC0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Busy_bee_in_a_flower_(Unsplash).jpg' },
    stations: [{ id: 'flower', n: 9, title: 'The flower' }], topics: ['16.3'] },

  { id: 'fruit', n: 8, title: 'Fruit and seed', chip: 'Fruit',
    text: 'After fertilisation the petals fall. Each fertilised ovule becomes a seed, and the ovary round them swells into the fruit. A pea pod is an ovary; every pea in it was an ovule, fertilised by its own pollen grain. Sow the seed, and you are back at the start.',
    real: 'The sugar that fills a fruit was made in the leaves and carried there in the phloem: a fruit is a sink until it is ripe.',
    img: { base: 'assets/photos/wheat', alt: 'Ripe ears of wheat in a field', caption: 'Wheat: every grain is a fruit with one seed inside', credit: 'Jazzmaster1997 · CC BY 4.0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Ripe_wheat_ears.jpg' },
    stations: [{ id: 'fruit', n: 10, title: 'From flower to seed' }], topics: ['16.3'] },

  { id: 'adapted', n: 9, title: 'Built for its place', chip: 'Adapted',
    text: 'Not every plant grows in soil like this one. A cactus in a desert has leaves reduced to spines, a fat stem that stores water, a waxy skin and stomata sunk in pits — everything to keep water in. A water lily has floating leaves with their stomata on top, air spaces to float on, and stems the water holds up. An adaptive feature is an inherited feature that helps an organism survive and reproduce where it lives.',
    real: 'Every desert trick is a way of slowing transpiration; every pond trick is a way of reaching air and light. The features answer the place.',
    img: { base: 'assets/photos/water-lily', alt: 'Pink and white water lilies open on a pond among floating leaves', caption: 'Water lilies: leaves that float, stomata on top', credit: 'Делфина · CC0 · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Pink_and_white_Nymphaea_water_lily_flowers,_%D0%B1%D0%B5%D0%BB_%D0%B8_%D1%80%D0%BE%D0%B7%D0%BE%D0%B2_%D0%BB%D0%BE%D1%82%D0%BE%D1%81.jpg' },
    img2: { base: 'assets/photos/barrel-cactus', alt: 'A barrel cactus in flower, covered in spines', caption: 'A barrel cactus: spines for leaves, a stem full of water', credit: 'Gentry George, U.S. Fish and Wildlife Service · public domain · Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Close_up_of_a_flowering_barrel_cactus_with_its_thorns.jpg' },
    stations: [{ id: 'adapted', n: 11, title: 'Built for its place' }], topics: ['18.2'] }
];

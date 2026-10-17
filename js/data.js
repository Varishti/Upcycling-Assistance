/*
 * ReMake knowledge base
 * ---------------------
 * Materials, upcycling ideas, costs and selling prices.
 * Prices are approximate Indian prices (INR) for a mid-sized city and are scaled
 * by the "price region" the user picks. Weights are typical averages.
 * To add an idea, copy one below. The app reads everything from this file.
 */
window.REMAKE_DATA = {
  regions: {
    metro: { mult: 1.15 },
    city: { mult: 1.0 },
    town: { mult: 0.85 }
  },

  materials: {
    plastic: {
      name: "Plastic bottles (PET)", hi: "प्लास्टिक की बोतलें (PET)", pa: "ਪਲਾਸਟਿਕ ਦੀਆਂ ਬੋਤਲਾਂ (PET)",
      short: "Plastic", short_hi: "प्लास्टिक", short_pa: "ਪਲਾਸਟਿਕ",
      unit: "bottle", units: "bottles", bin: "#3F7CC0",
      sizes: { small: "Under 500 ml", medium: "About 1 litre", large: "1.5–2 litres" },
      kg: { small: 0.015, medium: 0.025, large: 0.04 },
      fate: "PET takes hundreds of years to break down. Bottles are often burned in the open, releasing toxic smoke, or end up blocking drains.",
      prep: {
        good: "Rinse, peel off the label (a little cooking oil removes the glue) and let it dry fully.",
        dirty: "Soak in warm soapy water for 30 minutes, scrub inside with a bottle brush, then dry upside down for a day.",
        damaged: "Cracked or crushed bottles cannot hold water or shape. Use them only as eco-brick shells."
      },
      keywords: { strong: ["plastic bottle", "pet bottle", "bisleri", "cold drink bottle", "soft drink bottle", "mineral water", "botal", "water bottle"], weak: ["bottle", "plastic", "cold drink", "soda", "pepsi", "coke", "sprite"] },
      imageHints: ["water bottle", "pop bottle", "water jug", "pill bottle", "soap dispenser"]
    },
    tyre: {
      name: "Old tyres", hi: "पुराने टायर", pa: "ਪੁਰਾਣੇ ਟਾਇਰ",
      short: "Tyres", short_hi: "टायर", short_pa: "ਟਾਇਰ",
      unit: "tyre", units: "tyres", bin: "#4A4E57",
      sizes: { small: "Two-wheeler", medium: "Car", large: "SUV / small truck" },
      kg: { small: 3, medium: 7.5, large: 12 },
      fate: "Dumped tyres collect rainwater, where dengue mosquitoes breed. Burning tyres gives off thick, toxic black smoke.",
      prep: {
        good: "Scrub with detergent and a stiff brush, rinse, and dry in the sun for a day.",
        dirty: "Wash twice with detergent, scrub mud from the inside rim, and dry for two days so no water stays inside.",
        damaged: "Avoid ideas where the tyre carries weight. Planters and tread cut-outs still work."
      },
      keywords: { strong: ["tyre", "tire", "tayar", "tyres", "tires", "inner tube", "rubber"], weak: ["wheel", "tube"] },
      imageHints: ["car wheel", "tire", "tyre", "disk brake"]
    },
    glass: {
      name: "Glass bottles and jars", hi: "काँच की बोतलें और जार", pa: "ਕੱਚ ਦੀਆਂ ਬੋਤਲਾਂ ਅਤੇ ਜਾਰ",
      short: "Glass", short_hi: "काँच", short_pa: "ਕੱਚ",
      unit: "bottle or jar", units: "bottles or jars", bin: "#3E9A6E",
      sizes: { small: "Small jar", medium: "Bottle or medium jar", large: "Large bottle" },
      kg: { small: 0.2, medium: 0.35, large: 0.6 },
      fate: "Glass never breaks down in a landfill. Broken glass in mixed waste injures waste pickers and animals.",
      prep: {
        good: "Soak in hot water to lift the label, rub off glue with oil and baking soda, and dry.",
        dirty: "Soak overnight in hot soapy water, clean inside with a brush, and dry fully.",
        damaged: "Wear thick gloves. Keep pieces in a cardboard box and use them only for mosaic work after sanding the edges."
      },
      keywords: { strong: ["glass", "kanch", "kaanch", "jar", "jars", "beer", "wine", "pickle", "achaar", "sauce bottle", "jam"], weak: [] },
      imageHints: ["beer bottle", "wine bottle", "whiskey jug", "vase", "beaker", "goblet", "pitcher", "perfume", "red wine", "beer glass", "measuring cup"]
    },
    clothes: {
      name: "Old clothes and fabric", hi: "पुराने कपड़े", pa: "ਪੁਰਾਣੇ ਕੱਪੜੇ",
      short: "Fabric", short_hi: "कपड़ा", short_pa: "ਕੱਪੜਾ",
      unit: "garment", units: "garments", bin: "#C0608A",
      sizes: { small: "Kids' or thin garment", medium: "T-shirt or shirt", large: "Jeans, saree or heavy fabric" },
      kg: { small: 0.15, medium: 0.25, large: 0.6 },
      fate: "Synthetic fabric sheds microplastics and can take decades to break down. Most old clothes in India end up in landfills or are burned.",
      prep: {
        good: "Wash and iron flat so cutting lines are straight.",
        dirty: "Wash in hot water with detergent; soak stained areas overnight before cutting.",
        damaged: "Torn clothes are fine for strips and patchwork. Cut away stained or rotten parts."
      },
      keywords: { strong: ["shirt", "t-shirt", "tshirt", "jeans", "denim", "cloth", "clothes", "kapde", "kapda", "kapra", "fabric", "saree", "sari", "kurta", "dupatta", "bedsheet", "towel", "dress", "garment", "sweater"], weak: [] },
      imageHints: ["jersey", "t-shirt", "sweatshirt", "jean", "cardigan", "pajama", "miniskirt", "trench coat", "sarong", "kimono", "suit", "poncho", "apron", "abaya", "stole", "wool"]
    },
    pallet: {
      name: "Wooden pallets", hi: "लकड़ी के पैलेट", pa: "ਲੱਕੜ ਦੇ ਪੈਲੇਟ",
      short: "Wood", short_hi: "लकड़ी", short_pa: "ਲੱਕੜ",
      unit: "pallet", units: "pallets", bin: "#A0703F",
      sizes: { small: "Half pallet", medium: "Standard pallet", large: "Heavy-duty pallet" },
      kg: { small: 12, medium: 20, large: 25 },
      fate: "Pallets are usually burned as fuel or dumped. Chemically treated wood releases harmful fumes when burned.",
      prep: {
        good: "Check the stamp: 'HT' (heat-treated) is safe; never use pallets stamped 'MB' (methyl bromide). Pull out loose nails and sand rough areas.",
        dirty: "Scrub with soapy water, rinse, and dry in the sun for two days. Check for the 'HT' stamp.",
        damaged: "Take broken pallets apart with a pry bar and use the good planks only."
      },
      keywords: { strong: ["pallet", "pallets", "wooden", "plank", "planks", "crate", "lakdi", "lakadi", "timber"], weak: ["wood"] },
      imageHints: ["crate", "chest", "pallet", "picket fence", "worm fence", "wardrobe", "plank"]
    },
    tetra: {
      name: "Tetra Pak cartons", hi: "टेट्रा पैक डिब्बे", pa: "ਟੈਟਰਾ ਪੈਕ ਡੱਬੇ",
      short: "Tetra Pak", short_hi: "टेट्रा पैक", short_pa: "ਟੈਟਰਾ ਪੈਕ",
      unit: "carton", units: "cartons", bin: "#D08A2E",
      sizes: { small: "200 ml", medium: "500 ml", large: "1 litre" },
      kg: { small: 0.02, medium: 0.028, large: 0.04 },
      fate: "Cartons are layers of paperboard, plastic and aluminium foil stuck together, so most local recyclers refuse them and they end up in landfills.",
      prep: {
        good: "Cut open along the seams, rinse out leftover juice or milk, and dry flat.",
        dirty: "Rinse twice with warm water so no milk or juice smell is left, then dry flat for a day.",
        damaged: "Torn cartons still work for small items like seed pots."
      },
      keywords: { strong: ["tetra", "tetrapak", "tetra pak", "juice box", "frooti", "milk pack", "real juice", "amul", "juice carton", "milk carton"], weak: [] },
      imageHints: ["milk can"]
    },
    cardboard: {
      name: "Cardboard boxes", hi: "गत्ते के डिब्बे", pa: "ਗੱਤੇ ਦੇ ਡੱਬੇ",
      short: "Cardboard", short_hi: "गत्ता", short_pa: "ਗੱਤਾ",
      unit: "box", units: "boxes", bin: "#B58A5A",
      sizes: { small: "Shoe box", medium: "Delivery box", large: "Large appliance box" },
      kg: { small: 0.15, medium: 0.4, large: 1.5 },
      fate: "Cardboard can be recycled, but wet or oily boxes get rejected and dumped. Rotting in landfills, paper releases methane.",
      prep: {
        good: "Remove tape and staples, and flatten the box.",
        dirty: "Cut away oily or stained parts; wet cardboard must dry flat under weight so it doesn't warp.",
        damaged: "Use the strong flat panels and save the scraps for small parts."
      },
      keywords: { strong: ["cardboard", "carton box", "gatta", "gatte", "amazon box", "flipkart box", "delivery box", "shoe box", "corrugated"], weak: ["box", "boxes", "carton"] },
      imageHints: ["carton", "envelope", "packet", "crate"]
    },
    newspaper: {
      name: "Old newspapers and magazines", hi: "पुराने अख़बार", pa: "ਪੁਰਾਣੇ ਅਖ਼ਬਾਰ",
      short: "Paper", short_hi: "अख़बार", short_pa: "ਅਖ਼ਬਾਰ",
      unit: "newspaper", units: "newspapers", bin: "#7F8794",
      sizes: { small: "Thin daily paper", medium: "Weekend edition or magazine", large: "Bundle of about 1 kg" },
      kg: { small: 0.1, medium: 0.2, large: 1 },
      fate: "Paper is recyclable, but much of it is burned or dumped with wet waste, where it rots and releases methane.",
      prep: {
        good: "Keep papers flat and dry, and sort out glossy pages, which suit beads and decor.",
        dirty: "Throw away oily or food-stained sheets; damp papers must dry fully before use.",
        damaged: "Torn sheets are fine for paper pulp and papier-mâché."
      },
      keywords: { strong: ["newspaper", "news paper", "akhbar", "akhbaar", "magazine", "old paper", "raddi", "paper waste"], weak: ["paper"] },
      imageHints: ["book jacket", "comic book", "menu", "envelope", "binder"]
    },
    cans: {
      name: "Metal cans and tins", hi: "धातु के डिब्बे (कैन)", pa: "ਧਾਤ ਦੇ ਡੱਬੇ (ਕੈਨ)",
      short: "Cans", short_hi: "कैन", short_pa: "ਕੈਨ",
      unit: "can", units: "cans", bin: "#8D99A6",
      sizes: { small: "Soft-drink can", medium: "Food tin", large: "Large oil or ghee tin" },
      kg: { small: 0.015, medium: 0.06, large: 0.3 },
      fate: "Metal can be recycled forever, but cans thrown with mixed waste rust in landfills and their sharp edges injure animals and waste pickers.",
      prep: {
        good: "Wash, remove the label, and file down any sharp edge left by the opener.",
        dirty: "Soak in hot soapy water to remove food and oil, then dry to stop rust.",
        damaged: "Dented cans still work for wind chimes and small decor; crushed ones are best sold as scrap."
      },
      keywords: { strong: ["cans", "tin", "aluminium", "aluminum", "coke can", "beer can", "soda can", "food can", "ghee tin", "oil tin", "metal", "tin can", "tin dabba"], weak: ["dabba"] },
      imageHints: ["milk can", "bucket", "tin", "can opener", "pot"]
    },
    bags: {
      name: "Plastic bags and wrappers", hi: "प्लास्टिक की थैलियाँ और रैपर", pa: "ਪਲਾਸਟਿਕ ਦੇ ਲਿਫ਼ਾਫ਼ੇ ਅਤੇ ਰੈਪਰ",
      short: "Bags", short_hi: "थैलियाँ", short_pa: "ਲਿਫ਼ਾਫ਼ੇ",
      unit: "bag or wrapper", units: "bags or wrappers", bin: "#5FA8B8",
      sizes: { small: "Small wrapper (chips, biscuits)", medium: "Carry bag", large: "Large sack or sheet" },
      kg: { small: 0.003, medium: 0.008, large: 0.03 },
      fate: "Thin bags and multilayer wrappers have almost no scrap value, so they are rarely recycled. They clog drains, choke cattle and are often burned.",
      prep: {
        good: "Shake out crumbs, wipe clean, and keep completely dry.",
        dirty: "Wash in soapy water, rinse, and hang to dry; dry plastic is essential.",
        damaged: "Torn bags are fine to cut into strips or pack into eco-bricks."
      },
      keywords: { strong: ["polythene", "polybag", "poly bag", "plastic bag", "carry bag", "thaili", "thaila", "wrapper", "chips packet", "packet", "pannee", "panni", "polythene bag"], weak: ["bag"] },
      imageHints: ["plastic bag", "packet"]
    },
    cds: {
      name: "Old CDs and DVDs", hi: "पुरानी सीडी और डीवीडी", pa: "ਪੁਰਾਣੀਆਂ ਸੀਡੀ ਅਤੇ ਡੀਵੀਡੀ",
      short: "CDs", short_hi: "सीडी", short_pa: "ਸੀਡੀ",
      unit: "disc", units: "discs", bin: "#9C84C9",
      sizes: { small: "Mini disc", medium: "CD or DVD", large: "Disc with plastic case" },
      kg: { small: 0.008, medium: 0.016, large: 0.08 },
      fate: "Discs are mixed plastic and metal, which few recyclers accept, so they are landfilled or burned.",
      prep: {
        good: "Wipe clean. Soak in warm water for 10 minutes if you want to peel off the label layer.",
        dirty: "Wash with mild soap and dry with a soft cloth.",
        damaged: "Scratched or cracked discs are fine for mosaic: cut them after warming in hot water so they don't shatter."
      },
      keywords: { strong: ["cd", "cds", "dvd", "dvds", "compact disc", "disc", "discs", "disk"], weak: [] },
      imageHints: ["cd player", "disk", "compact disc"]
    },
    coconut: {
      name: "Coconut shells", hi: "नारियल के खोल", pa: "ਨਾਰੀਅਲ ਦੇ ਖੋਲ",
      short: "Coconut", short_hi: "नारियल", short_pa: "ਨਾਰੀਅਲ",
      unit: "shell half", units: "shell halves", bin: "#7A5A3E",
      sizes: { small: "Small shell", medium: "Medium shell", large: "Large shell" },
      kg: { small: 0.1, medium: 0.15, large: 0.2 },
      fate: "Shells from temples and juice stalls pile up in drains and dumps and take years to break down; burning them adds smoke.",
      prep: {
        good: "Scrape out the leftover white flesh, dry in the sun for 2–3 days, then rub off the fibre with a wire brush.",
        dirty: "Soak for an hour, scrape clean, then dry in the sun for 3 days so it doesn't grow mould.",
        damaged: "Cracked shells are fine for planters, buttons and small decor."
      },
      keywords: { strong: ["coconut", "nariyal", "nariyal", "coconut shell", "khopra", "copra"], weak: ["shell", "shells"] },
      imageHints: ["coconut", "acorn", "buckeye"]
    }
  },

  /*
   * Idea fields
   *   difficulty: 1 easy, 2 medium, 3 hard
   *   hours: build time for one product
   *   perProduct: waste items needed for one product (0.25 = one item makes four)
   *   sizes / conditions: inputs the idea works with
   *   materials: extra things to buy, with cost in INR
   *   sell: [min, max] local selling price in INR
   */
  ideas: [
    /* ---------- Plastic bottles ---------- */
    {
      id: "pet-planter", material: "plastic",
      name: "Self-watering planter", hi: "अपने-आप पानी देने वाला गमला", pa: "ਆਪਣੇ-ਆਪ ਪਾਣੀ ਦੇਣ ਵਾਲਾ ਗਮਲਾ",
      summary: "The bottle's top half sits upside down in the bottom half, and a cloth wick pulls water up to the soil.",
      difficulty: 1, hours: 0.5, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Potting soil", cost: 20 }, { name: "Cotton wick (strip of old cloth)", cost: 0 }, { name: "Acrylic paint", cost: 15 }],
      tools: ["Scissors or cutter", "Nail heated over a candle (to pierce the cap)", "Sandpaper or tape for the cut edge"],
      steps: [
        "Mark a line one-third from the top of the bottle and cut it in two.",
        "Pierce a hole in the cap and pull a 15 cm strip of cotton cloth through it.",
        "Smooth the cut edges with sandpaper or cover them with tape.",
        "Turn the top half upside down and sit it inside the bottom half, with the wick hanging into it.",
        "Fill the bottom half with water and the top half with soil, then plant a herb or seedling.",
        "Paint the outside. Top up the water every 5–7 days."
      ],
      sell: [80, 150],
      buyers: "Hostel students, flat owners with balconies, and offices or cafés that want small desk plants.",
      channels: ["Instagram and WhatsApp status", "College fests and flea markets", "Local plant nurseries (on commission)"],
      scale: "Sell as a herb kit with seeds and soil included, or take bulk orders from offices for desk plants.",
      safety: ["Cut away from your body and keep fingers clear of the blade.", "Hold the hot nail with pliers, never bare fingers."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "pet-ecobrick-stool", material: "plastic",
      name: "Eco-brick garden stool", hi: "इको-ब्रिक बगीचा स्टूल", pa: "ਈਕੋ-ਬ੍ਰਿਕ ਬਗੀਚਾ ਸਟੂਲ",
      summary: "Bottles packed solid with dry plastic wrappers, bound together into a sturdy stool.",
      difficulty: 2, hours: 10, perProduct: 20,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Dry plastic wrappers (collected free)", cost: 0 }, { name: "Cement and sand (or clay cob)", cost: 150 }, { name: "Plywood seat top", cost: 120 }, { name: "Paint", cost: 50 }],
      tools: ["Wooden packing stick", "Kitchen scale", "Bucket and trowel", "Strong tape or rope"],
      steps: [
        "Collect clean, completely dry soft plastic: wrappers, chips packets, polybags.",
        "Cut it into small pieces and pack it into each bottle with a wooden stick, pressing hard after every handful.",
        "Weigh each bottle. It must reach at least 0.33 g per ml: 330 g for a 1-litre bottle.",
        "Squeeze test: a finished eco-brick should not dent when pressed hard.",
        "Stand 20 bricks upright in a tight circle and tie them together with tape or rope.",
        "Coat the outside with cement mortar or clay cob so no plastic is exposed to sunlight.",
        "Fix a plywood seat on top, let it cure for 3 days, then paint."
      ],
      sell: [800, 1500],
      buyers: "Schools, parks, housing societies, cafés with outdoor seating, and NGOs building eco-friendly spaces.",
      channels: ["Direct orders from schools and societies", "CSR projects of local companies", "Eco-themed exhibitions"],
      scale: "Run collection drives where people bring packed eco-bricks, then build benches and planters as a paid service.",
      safety: ["Use only clean, dry plastic so mould does not grow inside.", "Wear gloves when working with cement; it irritates skin.", "Never use eco-bricks for load-bearing house walls."],
      workshop: { team: 4, ages: "10+" }
    },
    {
      id: "pet-lamp", material: "plastic",
      name: "Bottle LED lamp", hi: "बोतल एलईडी लैंप", pa: "ਬੋਤਲ ਐਲਈਡੀ ਲੈਂਪ",
      summary: "Cut, shaped and painted bottles turned into soft decorative lamps with cool LED lights.",
      difficulty: 2, hours: 1.5, perProduct: 2,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Battery LED fairy lights", cost: 80 }, { name: "Glass or acrylic paint", cost: 40 }, { name: "Hot glue sticks", cost: 10 }],
      tools: ["Cutter", "Hot glue gun", "Hair dryer (to shape the plastic)", "Paint brushes"],
      steps: [
        "Cut the bottom off one bottle to make the lamp shade.",
        "Cut petal or strip patterns into the shade and gently warm them with a hair dryer to curl them outward.",
        "Use the second bottle's base as a stand and glue the two together.",
        "Paint patterns on the shade with glass paint and let it dry for 2 hours.",
        "Push the LED fairy lights inside and tuck the battery box into the base."
      ],
      sell: [250, 450],
      buyers: "Students decorating rooms, gift buyers, and families shopping for Diwali and wedding decor.",
      channels: ["Diwali and festival stalls", "Instagram reels showing the lamp lit up", "Gift shops (on consignment)"],
      scale: "Make themed sets of three lamps for festivals and take bulk orders for event decoration.",
      safety: ["Use only LED lights. Ordinary bulbs get hot enough to soften PET, which deforms at about 70 °C.", "Keep the hair dryer moving so the plastic doesn't melt through."],
      workshop: { team: 1, ages: "12+" }
    },
    {
      id: "pet-solar-bulb", material: "plastic",
      name: "Solar bottle bulb", hi: "सोलर बोतल बल्ब", pa: "ਸੋਲਰ ਬੋਤਲ ਬਲਬ",
      summary: "A water-filled bottle set through a tin roof bends sunlight into a dark room during the day, with no electricity.",
      difficulty: 2, hours: 3, perProduct: 1,
      sizes: ["large"], conditions: ["good"],
      materials: [{ name: "Bleach (about 10 ml)", cost: 5 }, { name: "Galvanised iron sheet, 30 × 30 cm", cost: 120 }, { name: "Silicone sealant", cost: 150 }, { name: "Rivets", cost: 30 }, { name: "Black tape or cap cover", cost: 10 }],
      tools: ["Tin snips", "Drill", "Rivet gun", "Marker and measuring tape"],
      steps: [
        "Fill a clear 1.5–2 litre bottle with clean water and add about 10 ml of bleach to stop algae.",
        "Close the cap tightly and cover it with black tape so sunlight doesn't weaken it.",
        "Cut a hole in the GI sheet the same width as the bottle.",
        "Push the bottle through until about a third sits above the sheet, then seal the joint with silicone.",
        "Cut a matching hole in the tin roof, set the sheet over it, and rivet it in place.",
        "Seal all edges with silicone so rain cannot leak in. Light enters the top and the water spreads it through the room."
      ],
      sell: [400, 700],
      buyers: "Homes and shops with tin roofs and little daylight, storerooms, cattle sheds, and NGOs working in low-income areas.",
      channels: ["Installation service through NGOs", "Word of mouth in neighbourhoods", "Partnerships with roofing contractors"],
      scale: "Offer it as a paid installation service and train local youth to install it in teams of two.",
      safety: ["Roof work is risky: always work in pairs and use a stable ladder.", "Wear gloves; cut GI sheet edges are very sharp.", "Works only in daytime and only on thin tin or sheet roofs, not concrete."],
      workshop: { team: 3, ages: "16+" }
    },
    {
      id: "pet-bird-feeder", material: "plastic",
      name: "Bird feeder", hi: "पक्षियों का दाना घर", pa: "ਪੰਛੀਆਂ ਦਾ ਦਾਣਾ ਘਰ",
      summary: "A bottle with spoon perches that releases seed slowly for birds.",
      difficulty: 1, hours: 0.5, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Two wooden spoons or sticks", cost: 10 }, { name: "String", cost: 5 }, { name: "Bird seed or grain", cost: 30 }],
      tools: ["Cutter", "Marker"],
      steps: [
        "Mark two pairs of holes on opposite sides of the bottle, one pair 5 cm above the other.",
        "Cut small holes and push a wooden spoon through each pair so it pokes out on both sides.",
        "Widen the hole above each spoon bowl slightly so seed can trickle out.",
        "Fill the bottle with grain and close the cap.",
        "Tie string around the neck and hang it from a tree or balcony."
      ],
      sell: [100, 200],
      buyers: "Families with gardens or balconies, schools teaching nature studies, and bird lovers.",
      channels: ["Instagram and local Facebook groups", "School eco-club fairs", "Pet and garden shops"],
      scale: "Sell in summer with a 'save the birds' message, bundled with a refill pack of grain.",
      safety: ["Smooth any sharp cut edges so birds are not hurt."],
      workshop: { team: 1, ages: "6+" }
    },
    {
      id: "pet-pen-stand", material: "plastic",
      name: "Desk organiser", hi: "डेस्क ऑर्गनाइज़र", pa: "ਡੈਸਕ ਆਰਗੇਨਾਈਜ਼ਰ",
      summary: "Bottle bottoms cut at different heights and joined into a neat pen and stationery holder.",
      difficulty: 1, hours: 0.75, perProduct: 3,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Acrylic paint or washi tape", cost: 30 }, { name: "Hot glue sticks", cost: 10 }, { name: "Cardboard base", cost: 0 }],
      tools: ["Cutter", "Hot glue gun", "Sandpaper"],
      steps: [
        "Cut the bottoms off three bottles at different heights: 12 cm, 9 cm and 6 cm.",
        "Sand or tape the cut edges so they are smooth.",
        "Paint or wrap each cup and let it dry.",
        "Glue the three cups side by side on a cardboard or wooden base."
      ],
      sell: [120, 220],
      buyers: "Students, offices, coaching centres and stationery shops.",
      channels: ["College fests", "Stationery shops (consignment)", "Bulk orders from schools and offices"],
      scale: "Print a school or company logo on them and sell sets for corporate gifts.",
      safety: ["Always smooth cut edges before painting."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "pet-drip", material: "plastic",
      name: "Drip irrigation feeder", hi: "ड्रिप सिंचाई बोतल", pa: "ਡ੍ਰਿੱਪ ਸਿੰਚਾਈ ਬੋਤਲ",
      summary: "A bottle with tiny holes buried beside a plant slowly waters its roots, saving up to half the water.",
      difficulty: 1, hours: 0.25, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Nothing extra to buy", cost: 0 }],
      tools: ["Hot nail or thin drill bit", "Small spade"],
      steps: [
        "Make 4–6 small holes in the cap or lower sides of the bottle with a hot nail.",
        "Cut the base off so you can refill from the top.",
        "Bury the bottle neck-down beside the plant, with the cut end just above the soil.",
        "Fill with water; it drains slowly to the roots over a day or two."
      ],
      sell: [40, 80],
      buyers: "Farmers, kitchen gardeners, nurseries and school gardens.",
      channels: ["Sell in sets of 10 to farmers and nurseries", "Village haats", "School garden programmes"],
      scale: "Partner with farmer groups to install hundreds at a time during summer.",
      safety: ["Hold the hot nail with pliers."],
      workshop: { team: 1, ages: "6+" }
    },

    /* ---------- Tyres ---------- */
    {
      id: "tyre-ottoman", material: "tyre",
      name: "Tyre ottoman", hi: "टायर ओटोमन (बैठने का स्टूल)", pa: "ਟਾਇਰ ਓਟੋਮਨ (ਬੈਠਣ ਵਾਲਾ ਸਟੂਲ)",
      summary: "A tyre with a plywood top and base, wrapped in jute rope, makes a sturdy seat or side table.",
      difficulty: 2, hours: 5, perProduct: 1,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Two plywood discs, 12 mm, cut to the tyre's outer size", cost: 250 }, { name: "Jute rope, 10 mm, about 60 m", cost: 300 }, { name: "Wood screws", cost: 40 }, { name: "Strong glue (hot glue or PU glue)", cost: 100 }, { name: "Varnish", cost: 60 }],
      tools: ["Drill and screwdriver", "Hot glue gun", "Measuring tape", "Paint brush"],
      steps: [
        "Wash and fully dry the tyre.",
        "Measure the tyre's outer diameter (a 165/80 R14 car tyre is about 58 cm) and cut two plywood discs to that size.",
        "Screw one disc to the top rim and one to the bottom, using 4–6 screws each.",
        "Starting at the centre of the top disc, glue the rope in a tight spiral, working outward.",
        "Continue down the side, row by row, with no gaps.",
        "Brush on varnish to protect the rope from dust and moisture. Add a cushion or wooden legs if you like."
      ],
      sell: [1000, 2000],
      buyers: "Cafés, home decor buyers, hostels, and boutique hotels wanting an eco-friendly look.",
      channels: ["Instagram and home decor pages", "Cafés and boutiques (display and sell)", "Exhibitions and craft melas"],
      scale: "Tyre shops give old tyres free. Build a small team, offer colour and cushion options, and sell sets of two.",
      safety: ["Keep it away from heaters and flames; burning rubber gives off toxic smoke.", "Glue and varnish in a ventilated space.", "Wear gloves when handling old tyres."],
      workshop: { team: 2, ages: "14+" }
    },
    {
      id: "tyre-planter", material: "tyre",
      name: "Tyre planter", hi: "टायर गमला", pa: "ਟਾਇਰ ਗਮਲਾ",
      summary: "Painted tyres used as large planters or stacked raised beds for flowers and vegetables.",
      difficulty: 1, hours: 1.5, perProduct: 1,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Outdoor enamel paint", cost: 150 }, { name: "Garden soil and compost", cost: 60 }, { name: "Plastic sheet liner", cost: 20 }],
      tools: ["Paint brushes", "Stiff brush for cleaning", "Spade"],
      steps: [
        "Clean the tyre and let it dry.",
        "Paint the outside in bright colours; do two coats for an even finish.",
        "Place it where it will stay, lay a plastic liner at the bottom, and poke drainage holes in it.",
        "Fill with soil and compost, then plant flowers, herbs or vegetables.",
        "Stack two or three tyres of different sizes for a tiered garden."
      ],
      sell: [350, 600],
      buyers: "Schools, housing societies, municipal parks, home gardeners and restaurants with courtyards.",
      channels: ["Direct orders from societies and schools", "Local nurseries", "Instagram before-and-after posts"],
      scale: "Offer a 'tyre garden' setup service for school campuses and housing societies.",
      safety: ["Line the tyre if growing vegetables, so soil doesn't touch the rubber.", "Paint outdoors and keep paint away from children."],
      workshop: { team: 2, ages: "8+" }
    },
    {
      id: "tyre-swing", material: "tyre",
      name: "Tyre swing", hi: "टायर झूला", pa: "ਟਾਇਰ ਝੂਲਾ",
      summary: "A cleaned tyre hung with strong rope makes a durable swing for playgrounds and gardens.",
      difficulty: 2, hours: 3, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Nylon or manila rope, about 10 m", cost: 250 }, { name: "Eye bolts and shackles", cost: 150 }, { name: "Outdoor paint", cost: 100 }],
      tools: ["Drill", "Spanner", "Ladder"],
      steps: [
        "Clean and paint the tyre.",
        "Drill three or four drainage holes along the bottom so rainwater doesn't collect inside.",
        "Fit eye bolts evenly around one sidewall, with washers on both sides.",
        "Attach ropes to the bolts with shackles and join them to one strong rope above.",
        "Tie to a healthy branch at least 20 cm thick, or a steel frame, using a secure knot.",
        "Load test with heavy bags before anyone sits on it."
      ],
      sell: [1000, 1800],
      buyers: "Schools, playschools, resorts, farmhouses and families with gardens.",
      channels: ["Direct sales to schools and playschools", "Resort and homestay owners", "Local social media groups"],
      scale: "Offer a complete tyre playground package: swings, tunnels and climbing walls for schools.",
      safety: ["Check the branch or frame is strong and replace the rope every year.", "Drainage holes are essential to stop mosquito breeding.", "Always load test before use and supervise young children."],
      workshop: { team: 3, ages: "16+" }
    },
    {
      id: "tyre-chappal", material: "tyre",
      name: "Tyre-tread chappals", hi: "टायर की चप्पलें", pa: "ਟਾਇਰ ਦੀਆਂ ਚੱਪਲਾਂ",
      summary: "Tyre tread cut into tough, long-lasting sandal soles. One car tyre makes about four pairs.",
      difficulty: 3, hours: 1.5, perProduct: 0.25,
      sizes: ["medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Straps (old inner tube or leather strips)", cost: 40 }, { name: "Strong shoe glue and small nails", cost: 20 }],
      tools: ["Heavy utility knife with spare blades", "Hacksaw", "Marker", "Hammer"],
      steps: [
        "Trace a foot outline on paper to make a pattern for each size.",
        "Cut a section of tread from the tyre, avoiding parts with exposed steel wire.",
        "Trace the pattern on the tread and cut it out, keeping the blade wet with soapy water.",
        "Cut slots for the straps.",
        "Thread the inner-tube or leather straps through, then glue and nail them underneath.",
        "Trim the edges smooth and test the fit."
      ],
      sell: [200, 400],
      buyers: "Farm and construction workers who need tough footwear, eco-fashion buyers and tourists.",
      channels: ["Weekly haats and local markets", "Eco-fashion stores", "Online craft marketplaces"],
      scale: "Partner with local cobblers, who already have the tools and skills to make them faster.",
      safety: ["Many tyres have steel belts. Don't cut through steel wire; it is sharp and can snap.", "Always cut away from your body and wear cut-resistant gloves."],
      workshop: { team: 2, ages: "16+" }
    },
    {
      id: "tyre-pet-bed", material: "tyre",
      name: "Tyre pet bed", hi: "टायर से पालतू जानवर का बिस्तर", pa: "ਟਾਇਰ ਤੋਂ ਪਾਲਤੂ ਜਾਨਵਰ ਦਾ ਬਿਸਤਰਾ",
      summary: "A painted tyre with a cushion made from old clothes becomes a cosy bed for dogs and cats.",
      difficulty: 1, hours: 2, perProduct: 1,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Outdoor paint", cost: 120 }, { name: "Plywood base disc", cost: 120 }, { name: "Cushion (old clothes stuffed in a pillow cover)", cost: 0 }],
      tools: ["Paint brush", "Drill and screws"],
      steps: [
        "Clean and dry the tyre, then paint the outside.",
        "Screw a plywood disc to the bottom rim as a base.",
        "Stuff an old pillow cover with clean old clothes to make a cushion.",
        "Push the cushion into the tyre so it fills the centre and tucks under the rim."
      ],
      sell: [600, 1200],
      buyers: "Pet owners, pet shops, animal shelters and vet clinics.",
      channels: ["Pet shops and vet clinics", "Instagram pet pages", "Pet adoption events"],
      scale: "Offer sizes for cats, small dogs and large dogs, with washable covers sold separately.",
      safety: ["Use water-based, pet-safe paint and let it dry fully before use."],
      workshop: { team: 2, ages: "10+" }
    },

    /* ---------- Glass ---------- */
    {
      id: "glass-jar-lamp", material: "glass",
      name: "Jar fairy lamp", hi: "जार फेयरी लैंप", pa: "ਜਾਰ ਫੇਅਰੀ ਲੈਂਪ",
      summary: "A glass jar filled with battery fairy lights becomes a warm night lamp in minutes.",
      difficulty: 1, hours: 0.25, perProduct: 1,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Battery LED fairy lights", cost: 80 }, { name: "Jute twine for the neck", cost: 10 }],
      tools: ["Hot glue gun (optional)"],
      steps: [
        "Clean the jar and remove the label.",
        "Wrap jute twine around the neck and glue the end in place.",
        "Feed the fairy lights into the jar in loose loops.",
        "Tuck the battery box inside the lid, or tape it under the jar."
      ],
      sell: [200, 350],
      buyers: "Gift buyers, students, and wedding and party planners.",
      channels: ["Festival stalls", "Instagram and WhatsApp", "Bulk orders for wedding table decor"],
      scale: "Sell themed sets (Diwali, weddings, birthdays) and take bulk orders from event planners.",
      safety: ["Use LED lights only; they stay cool.", "Check the jar for cracks before use."],
      workshop: { team: 1, ages: "6+" }
    },
    {
      id: "glass-tumblers", material: "glass",
      name: "Cut-glass tumbler set", hi: "काँच के गिलासों का सेट", pa: "ਕੱਚ ਦੇ ਗਲਾਸਾਂ ਦਾ ਸੈੱਟ",
      summary: "Bottles scored and cracked cleanly into drinking glasses, sold as a set of four.",
      difficulty: 3, hours: 2, perProduct: 4,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Wet-and-dry sandpaper, 120 to 400 grit", cost: 60 }],
      tools: ["Bottle cutter or glass cutter", "Kettle of hot water and bowl of ice water", "Safety goggles and thick gloves"],
      steps: [
        "Clean the bottles and remove the labels.",
        "Score one even line all the way around each bottle with the cutter. Score only once.",
        "Pour hot water over the score line, then dip it in ice water. Repeat until the bottle separates cleanly.",
        "Sand the cut edge under running water, from coarse 120 grit to fine 400 grit, until it is completely smooth.",
        "Wash and check every edge carefully before use."
      ],
      sell: [400, 700],
      buyers: "Cafés, bars, restaurants with an eco theme, and gift buyers.",
      channels: ["Cafés and restaurants (direct orders)", "Craft fairs", "Online marketplaces"],
      scale: "Offer custom engraving and sell matching sets to cafés that want a sustainable look.",
      safety: ["Always wear goggles and gloves; glass can break unpredictably.", "Sand edges under water to keep glass dust out of the air.", "Never sell a glass with a rough or chipped rim."],
      workshop: { team: 2, ages: "18+" }
    },
    {
      id: "glass-terrarium", material: "glass",
      name: "Jar terrarium", hi: "जार टेरारियम (काँच का बगीचा)", pa: "ਜਾਰ ਟੈਰੇਰੀਅਮ (ਕੱਚ ਦਾ ਬਗੀਚਾ)",
      summary: "A small glass garden with layers of pebbles, charcoal, soil and moss.",
      difficulty: 1, hours: 1, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Small pebbles", cost: 20 }, { name: "Activated charcoal", cost: 30 }, { name: "Potting soil", cost: 20 }, { name: "Small plants or moss", cost: 60 }],
      tools: ["Long spoon or chopsticks", "Spray bottle"],
      steps: [
        "Add a 2 cm layer of pebbles for drainage.",
        "Add a thin layer of activated charcoal to keep it fresh.",
        "Add 3–5 cm of potting soil.",
        "Plant small succulents, ferns or moss using chopsticks.",
        "Decorate with stones and mist lightly. Water only when the soil looks dry."
      ],
      sell: [300, 600],
      buyers: "Office workers, students, corporate gift buyers and home decor lovers.",
      channels: ["Corporate gifting orders", "Instagram reels", "Plant nurseries and gift shops"],
      scale: "Run paid terrarium-making workshops, which often earn more than selling the terrariums.",
      safety: ["Check jars for cracks before filling them."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "glass-mosaic-coasters", material: "glass",
      name: "Glass mosaic coaster set", hi: "काँच मोज़ेक कोस्टर सेट", pa: "ਕੱਚ ਮੋਜ਼ੇਕ ਕੋਸਟਰ ਸੈੱਟ",
      summary: "Broken glass pieces, sanded smooth and set in grout, become a set of four coasters.",
      difficulty: 2, hours: 3, perProduct: 2,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Four MDF or ceramic tile bases", cost: 80 }, { name: "Tile adhesive", cost: 50 }, { name: "Grout", cost: 40 }, { name: "Felt pads", cost: 20 }],
      tools: ["Tile nippers", "Sandpaper or a sanding stone", "Spatula", "Sponge", "Thick gloves and goggles"],
      steps: [
        "Wrap the bottle in a thick cloth and tap it with a hammer to make pieces (skip this if already broken).",
        "Sand every piece until no sharp edges remain.",
        "Spread adhesive on a base and press the pieces on, leaving 2–3 mm gaps.",
        "Let it dry overnight, then spread grout into the gaps.",
        "Wipe off extra grout with a damp sponge before it hardens.",
        "Stick felt pads underneath."
      ],
      sell: [350, 600],
      buyers: "Gift buyers, cafés and home decor shoppers.",
      channels: ["Craft fairs", "Gift shops", "Instagram"],
      scale: "Use the same method for table tops and wall art, which sell for more.",
      safety: ["Wear gloves and goggles at all times.", "Sand pieces under water to avoid glass dust.", "Wrap glass in cloth before breaking it."],
      workshop: { team: 2, ages: "14+" }
    },
    {
      id: "glass-hanging-vase", material: "glass",
      name: "Hanging bottle vase", hi: "लटकने वाला बोतल फूलदान", pa: "ਲਟਕਣ ਵਾਲਾ ਬੋਤਲ ਫੁੱਲਦਾਨ",
      summary: "Bottles wrapped in macramé or jute and hung on a wall as flower vases.",
      difficulty: 2, hours: 1, perProduct: 1,
      sizes: ["small", "medium"], conditions: ["good", "dirty"],
      materials: [{ name: "Jute or macramé cord, 5 m", cost: 40 }, { name: "Wooden bead or wall hook", cost: 20 }],
      tools: ["Scissors", "Measuring tape"],
      steps: [
        "Cut four lengths of cord, each 1.2 m, and tie them together at one end.",
        "Make square knots 8 cm down to form a net that holds the bottle.",
        "Sit the bottle in the net and tie the strands together above its neck.",
        "Add a bead and a loop at the top, then hang it and fill with water and flowers or a money plant cutting."
      ],
      sell: [250, 450],
      buyers: "Home decor buyers, cafés and gift shoppers.",
      channels: ["Instagram", "Craft fairs", "Cafés and boutique stores"],
      scale: "Sell sets of three with money plant cuttings already rooted.",
      safety: ["Fix the hook firmly; a falling glass bottle can injure someone."],
      workshop: { team: 1, ages: "12+" }
    },

    /* ---------- Clothes ---------- */
    {
      id: "cloth-tote", material: "clothes",
      name: "No-sew T-shirt tote bag", hi: "बिना सिलाई का टी-शर्ट थैला", pa: "ਬਿਨਾਂ ਸਿਲਾਈ ਟੀ-ਸ਼ਰਟ ਥੈਲਾ",
      summary: "An old T-shirt cut and knotted into a washable shopping bag, with no sewing needed.",
      difficulty: 1, hours: 0.5, perProduct: 1,
      sizes: ["small", "medium"], conditions: ["good", "dirty"],
      materials: [{ name: "Nothing extra to buy", cost: 0 }],
      tools: ["Sharp fabric scissors", "Chalk or marker", "Ruler"],
      steps: [
        "Lay the T-shirt flat and cut off both sleeves just inside the seam to make the handles.",
        "Cut a wide U-shaped neckline to make the bag's opening.",
        "Turn the T-shirt inside out.",
        "Cut strips about 2 cm wide and 8–10 cm deep through both layers along the bottom hem.",
        "Tie each front strip to the back strip below it with a double knot, all the way across.",
        "Turn it right side out. The knots are hidden inside."
      ],
      sell: [100, 200],
      buyers: "Shoppers avoiding plastic bags, students, and shops wanting branded cloth bags.",
      channels: ["Vegetable markets and grocery shops", "College fests", "Bulk orders from shops and events"],
      scale: "Take bulk orders from shops and events, and print logos on the bags for a higher price.",
      safety: ["Keep scissors pointed away from others."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "cloth-rag-rug", material: "clothes",
      name: "Rag rug doormat", hi: "कपड़े की दरी (डोरमैट)", pa: "ਕੱਪੜੇ ਦੀ ਦਰੀ (ਡੋਰਮੈਟ)",
      summary: "Fabric strips woven on a simple frame into a thick, washable doormat.",
      difficulty: 2, hours: 4, perProduct: 6,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Simple wooden or thick cardboard frame loom", cost: 50 }, { name: "Strong cotton thread for the warp", cost: 20 }],
      tools: ["Fabric scissors", "Large needle"],
      steps: [
        "Cut the clothes into long strips about 3 cm wide, joining strips end to end.",
        "Wind strong thread up and down the frame to make the warp (the base threads).",
        "Weave the fabric strips over and under the warp threads, row by row.",
        "Push each row down firmly so the mat is thick and tight.",
        "When full, cut the warp threads off the frame and knot them in pairs to lock the edges."
      ],
      sell: [300, 600],
      buyers: "Households, hotels and homestays, and eco-friendly shops.",
      channels: ["Weekly markets", "Online handicraft stores", "Bulk orders from hotels"],
      scale: "An ideal income skill for women's self-help groups; tailors give fabric scraps free.",
      safety: ["Wash clothes before cutting so mould and dirt aren't woven in."],
      workshop: { team: 2, ages: "10+" }
    },
    {
      id: "cloth-cushion", material: "clothes",
      name: "Patchwork cushion cover", hi: "पैचवर्क कुशन कवर", pa: "ਪੈਚਵਰਕ ਕੁਸ਼ਨ ਕਵਰ",
      summary: "Squares cut from old jeans or shirts stitched into a sturdy cushion cover.",
      difficulty: 2, hours: 2, perProduct: 2,
      sizes: ["medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Zip, 40 cm", cost: 15 }, { name: "Thread", cost: 10 }],
      tools: ["Sewing machine or needle", "Fabric scissors", "Ruler and chalk", "Pins"],
      steps: [
        "Cut 16 squares of 11 × 11 cm from the clothes (1 cm extra on each side for seams).",
        "Arrange them in a 4 × 4 pattern for the front panel.",
        "Stitch the squares into rows, then join the rows.",
        "Cut a back panel the same size from one piece of fabric.",
        "Stitch the zip along one edge, then sew the other three sides.",
        "Turn it right side out and press flat."
      ],
      sell: [250, 450],
      buyers: "Home decor buyers, cafés, homestays and gift shoppers.",
      channels: ["Instagram and online craft stores", "Craft melas", "Cafés and homestays"],
      scale: "Offer memory cushions made from a customer's own old clothes; these sell for a premium.",
      safety: ["Keep fingers clear of the sewing machine needle."],
      workshop: { team: 1, ages: "12+" }
    },
    {
      id: "cloth-scrunchies", material: "clothes",
      name: "Fabric scrunchies", hi: "कपड़े के स्क्रंचीज़ (हेयर बैंड)", pa: "ਕੱਪੜੇ ਦੇ ਸਕ੍ਰੰਚੀਜ਼ (ਹੇਅਰ ਬੈਂਡ)",
      summary: "Soft hair scrunchies sewn from shirt, kurta or dupatta fabric. One garment makes about five.",
      difficulty: 1, hours: 0.33, perProduct: 0.2,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Elastic band, 20 cm", cost: 5 }, { name: "Thread", cost: 2 }],
      tools: ["Needle or sewing machine", "Safety pin", "Scissors"],
      steps: [
        "Cut a strip of fabric 50 × 10 cm.",
        "Fold it in half lengthwise, right sides together, and stitch along the long edge to make a tube.",
        "Turn the tube right side out with a safety pin.",
        "Thread the elastic through, knot its ends, and stitch the tube ends together."
      ],
      sell: [40, 90],
      buyers: "College students, teenagers and gift shops.",
      channels: ["College fests", "Instagram", "Gift hampers with other upcycled items"],
      scale: "Sell matching sets made from one saree or kurta, packed as gifts.",
      safety: ["Keep pins and needles in a box when not in use."],
      workshop: { team: 1, ages: "10+" }
    },
    {
      id: "cloth-godhadi", material: "clothes",
      name: "Patchwork quilt (godhadi)", hi: "गुदड़ी (पैचवर्क रज़ाई)", pa: "ਗੋਦੜੀ (ਪੈਚਵਰਕ ਰਜ਼ਾਈ)",
      summary: "Layers of old sarees and cotton clothes stitched into a traditional lightweight quilt.",
      difficulty: 3, hours: 12, perProduct: 6,
      sizes: ["medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Strong thread", cost: 40 }, { name: "Edge binding fabric (optional)", cost: 60 }],
      tools: ["Large needle", "Fabric scissors", "Measuring tape", "Pins"],
      steps: [
        "Wash and iron all the fabric.",
        "Lay two old sarees or large sheets flat as the top and bottom layers.",
        "Spread 2–3 layers of old cotton clothes between them as filling.",
        "Pin the layers together and sew running stitches in rows about 2 cm apart across the whole quilt.",
        "Fold and stitch the edges, or bind them with a strip of fabric."
      ],
      sell: [800, 1800],
      buyers: "Families, boutique stores, tourists, and buyers of traditional handicrafts.",
      channels: ["Handicraft exhibitions", "Online craft stores", "Boutiques and tourist markets"],
      scale: "A traditional skill well suited to self-help groups; colourful kantha-style stitching raises the price.",
      safety: ["Take breaks; long hand-stitching strains the eyes and wrists."],
      workshop: { team: 4, ages: "14+" }
    },

    /* ---------- Pallets ---------- */
    {
      id: "pallet-shelf", material: "pallet",
      name: "Pallet wall shelf", hi: "पैलेट दीवार शेल्फ़", pa: "ਪੈਲੇਟ ਕੰਧ ਸ਼ੈਲਫ਼",
      summary: "A pallet section sanded, stained and mounted as a rustic wall shelf.",
      difficulty: 2, hours: 4, perProduct: 1,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Sandpaper, 80 and 120 grit", cost: 60 }, { name: "Screws", cost: 40 }, { name: "Wood stain or varnish", cost: 180 }, { name: "Wall brackets", cost: 80 }],
      tools: ["Saw", "Pry bar and hammer", "Drill and screwdriver", "Dust mask and goggles"],
      steps: [
        "Check the pallet stamp: use only 'HT' (heat-treated) pallets.",
        "Cut a section about 60 cm wide with two or three slats.",
        "Use spare slats to add a shelf base inside each gap.",
        "Sand all surfaces, first with 80 grit and then with 120 grit.",
        "Apply stain or varnish and let it dry overnight.",
        "Fix brackets to the wall and mount the shelf."
      ],
      sell: [800, 1500],
      buyers: "Cafés, home decor buyers, hostels and offices.",
      channels: ["Instagram and Facebook Marketplace", "Furniture and decor shops", "Café owners"],
      scale: "Factories and transporters give or sell pallets cheaply, so you can make shelves in batches.",
      safety: ["Never use pallets stamped 'MB' (methyl bromide); the chemical is toxic.", "Wear a dust mask and goggles while sanding.", "Remove every nail before cutting."],
      workshop: { team: 2, ages: "16+" }
    },
    {
      id: "pallet-table", material: "pallet",
      name: "Pallet coffee table on wheels", hi: "पहियों वाली पैलेट कॉफ़ी टेबल", pa: "ਪਹੀਆਂ ਵਾਲੀ ਪੈਲੇਟ ਕੌਫ਼ੀ ਟੇਬਲ",
      summary: "A sanded and varnished pallet on castor wheels, with storage space between the slats.",
      difficulty: 2, hours: 6, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Four castor wheels", cost: 320 }, { name: "Sandpaper", cost: 60 }, { name: "Varnish", cost: 200 }, { name: "Screws", cost: 40 }],
      tools: ["Sander or sanding block", "Drill and screwdriver", "Paint brush", "Dust mask and goggles"],
      steps: [
        "Check for the 'HT' stamp and remove loose nails.",
        "Sand the top surface until smooth, then sand the sides.",
        "Fill gaps on top with spare slats if you want a flat surface.",
        "Apply two coats of varnish, letting each dry fully.",
        "Turn the pallet over and screw a castor wheel into each corner block."
      ],
      sell: [2000, 3500],
      buyers: "Young home owners, cafés, co-working spaces and hostels.",
      channels: ["Instagram and OLX", "Cafés and co-working spaces", "Decor exhibitions"],
      scale: "Add a glass top or custom colours to raise the price, and supply cafés in bulk.",
      safety: ["Use only heat-treated ('HT') pallets.", "Wear a mask while sanding and varnishing."],
      workshop: { team: 3, ages: "16+" }
    },
    {
      id: "pallet-compost", material: "pallet",
      name: "Pallet compost bin", hi: "पैलेट कम्पोस्ट बिन", pa: "ਪੈਲੇਟ ਕੰਪੋਸਟ ਬਿਨ",
      summary: "Four pallets tied into a box make a sturdy compost bin for kitchen and garden waste.",
      difficulty: 1, hours: 2, perProduct: 4,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Strong wire or cable ties", cost: 60 }, { name: "Hinges for a front door", cost: 80 }],
      tools: ["Pliers", "Screwdriver", "Gloves"],
      steps: [
        "Stand three pallets upright in a U shape on bare soil.",
        "Tie the corners together tightly with wire or cable ties.",
        "Fix the fourth pallet as a front door using hinges, so compost is easy to remove.",
        "Add layers of dry leaves and kitchen waste, and turn the pile every two weeks."
      ],
      sell: [1200, 2000],
      buyers: "Housing societies, schools, farmers and home gardeners.",
      channels: ["Housing society committees", "Schools and colleges", "Gardening groups"],
      scale: "Sell with a composting starter guide and set-up service for societies.",
      safety: ["Wear gloves; pallets can have splinters and nails."],
      workshop: { team: 4, ages: "12+" }
    },
    {
      id: "pallet-bench", material: "pallet",
      name: "Pallet garden bench", hi: "पैलेट बगीचा बेंच", pa: "ਪੈਲੇਟ ਬਗੀਚਾ ਬੈਂਚ",
      summary: "Two pallets cut and joined into a sturdy two-seater bench with a backrest.",
      difficulty: 3, hours: 8, perProduct: 2,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Wood screws and L-brackets", cost: 150 }, { name: "Sandpaper", cost: 80 }, { name: "Outdoor varnish or wood oil", cost: 300 }],
      tools: ["Circular saw or hand saw", "Drill and screwdriver", "Measuring tape and square", "Dust mask and goggles"],
      steps: [
        "Use one whole pallet as the seat.",
        "Cut the second pallet in two lengthwise: one part becomes the backrest, the other the legs and arms.",
        "Screw the legs to the seat with L-brackets and check the seat is level.",
        "Fix the backrest at a slight angle, about 100° to the seat.",
        "Sand every surface and edge smooth.",
        "Apply two coats of outdoor varnish or oil."
      ],
      sell: [3000, 5500],
      buyers: "Cafés, restaurants, resorts, schools and home owners with gardens or terraces.",
      channels: ["Cafés and restaurants", "Interior designers", "Instagram and OLX"],
      scale: "Build matching bench, table and planter sets for café outdoor seating.",
      safety: ["Use only 'HT' pallets.", "Clamp wood firmly while sawing.", "Wear goggles and a mask when cutting and sanding."],
      workshop: { team: 3, ages: "18+" }
    },

    /* ---------- Tetra Pak ---------- */
    {
      id: "tetra-wallet", material: "tetra",
      name: "Tetra Pak wallet", hi: "टेट्रा पैक बटुआ", pa: "ਟੈਟਰਾ ਪੈਕ ਬਟੂਆ",
      summary: "A juice carton folded into a water-resistant wallet; the foil layer keeps it strong.",
      difficulty: 1, hours: 0.33, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Velcro dot or snap button", cost: 5 }, { name: "Clear tape", cost: 5 }],
      tools: ["Scissors", "Ruler"],
      steps: [
        "Cut off the top and bottom of the carton and rinse it.",
        "Flatten it and fold it in half lengthwise.",
        "Fold the bottom third up to make the pocket and tape the sides.",
        "Fold the top flap down as a cover and fix a velcro dot to close it."
      ],
      sell: [50, 120],
      buyers: "Students, children, tourists and eco-minded shoppers.",
      channels: ["School and college fairs", "Gift shops", "Eco stores"],
      scale: "Collect cartons from juice shops and canteens, and sell wallets in bundles.",
      safety: ["Cut edges can be sharp; cover them with tape."],
      workshop: { team: 1, ages: "6+" }
    },
    {
      id: "tetra-seed-tray", material: "tetra",
      name: "Seed-starter pots (set of six)", hi: "बीज उगाने के गमले (6 का सेट)", pa: "ਬੀਜ ਉਗਾਉਣ ਵਾਲੇ ਗਮਲੇ (6 ਦਾ ਸੈੱਟ)",
      summary: "Cartons cut into small pots for starting seedlings, sold as a set of six.",
      difficulty: 1, hours: 0.5, perProduct: 6,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Potting soil", cost: 20 }, { name: "Seeds", cost: 30 }],
      tools: ["Scissors", "Pen to poke drainage holes"],
      steps: [
        "Cut each carton about 8 cm from the bottom.",
        "Poke three drainage holes in the base.",
        "Fill with potting soil and sow two or three seeds in each pot.",
        "Label the pots and keep them in light shade, watering lightly."
      ],
      sell: [150, 250],
      buyers: "Home gardeners, schools teaching plant science, and nurseries.",
      channels: ["Nurseries", "School science fairs", "Instagram gardening pages"],
      scale: "Sell seasonal kits, such as winter vegetable starter sets.",
      safety: ["Rinse cartons well so leftover milk doesn't attract insects."],
      workshop: { team: 1, ages: "6+" }
    },
    {
      id: "tetra-birdhouse", material: "tetra",
      name: "Carton birdhouse", hi: "डिब्बे से पक्षी घर", pa: "ਡੱਬੇ ਤੋਂ ਪੰਛੀ ਘਰ",
      summary: "A 1-litre carton turned into a weatherproof nest box for sparrows.",
      difficulty: 1, hours: 0.75, perProduct: 1,
      sizes: ["large"], conditions: ["good", "dirty"],
      materials: [{ name: "Twig or ice-cream stick perch", cost: 0 }, { name: "Strong string or wire", cost: 10 }, { name: "Outdoor paint (outside only)", cost: 40 }],
      tools: ["Scissors or cutter", "Marker", "Hole punch"],
      steps: [
        "Rinse and dry a 1-litre carton and close the top.",
        "Cut a round entrance hole about 3.5 cm wide, 10 cm from the bottom.",
        "Poke a small hole below it and push in a twig as a perch.",
        "Punch two small drainage holes in the base.",
        "Paint the outside only, then hang it in shade 2–3 m off the ground."
      ],
      sell: [80, 180],
      buyers: "Families, schools, bird lovers and nature clubs.",
      channels: ["World Sparrow Day (20 March) stalls", "School eco-clubs", "Garden shops"],
      scale: "Run 'save the sparrow' drives with schools and sell nest boxes in bulk.",
      safety: ["Never paint the inside; fumes can harm birds."],
      workshop: { team: 1, ages: "6+" }
    },

    /* ---------- Cardboard ---------- */
    {
      id: "card-organiser", material: "cardboard",
      name: "Cardboard desk organiser", hi: "गत्ते का डेस्क ऑर्गनाइज़र", pa: "ਗੱਤੇ ਦਾ ਡੈਸਕ ਆਰਗੇਨਾਈਜ਼ਰ",
      summary: "Cardboard cut and glued into compartments for pens, phones and notebooks.",
      difficulty: 1, hours: 1, perProduct: 1,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Fevicol or hot glue", cost: 20 }, { name: "Gift paper or old magazine pages for covering", cost: 20 }],
      tools: ["Cutter", "Steel ruler", "Cutting mat or thick board"],
      steps: [
        "Draw the layout: a pen section, a phone slot and a notebook section.",
        "Cut the base and the walls, using the box's existing folds where you can.",
        "Glue the walls to the base and hold them until set.",
        "Cover the outside with gift paper or magazine pages and let it dry."
      ],
      sell: [150, 300],
      buyers: "Students, offices, and stationery and gift shops.",
      channels: ["College fests", "Instagram", "Stationery shops"],
      scale: "Make flat-pack kits that buyers assemble themselves, which are cheaper to ship.",
      safety: ["Use a steel ruler and cut on a mat, away from your fingers."],
      workshop: { team: 1, ages: "10+" }
    },
    {
      id: "card-laptop-stand", material: "cardboard",
      name: "Cardboard laptop stand", hi: "गत्ते का लैपटॉप स्टैंड", pa: "ਗੱਤੇ ਦਾ ਲੈਪਟਾਪ ਸਟੈਂਡ",
      summary: "Layered corrugated cardboard cut into a strong, angled laptop stand.",
      difficulty: 2, hours: 2, perProduct: 2,
      sizes: ["medium", "large"], conditions: ["good"],
      materials: [{ name: "Wood glue or Fevicol", cost: 30 }, { name: "Paint or kraft tape for edges", cost: 30 }],
      tools: ["Cutter with fresh blades", "Steel ruler", "Printed or drawn template", "Clamps or heavy books"],
      steps: [
        "Draw a side profile: about 25 cm long, rising from 3 cm at the front to 12 cm at the back.",
        "Cut six copies of the profile; glue them in two stacks of three for strength.",
        "Cut two cross-braces and slot them between the two sides.",
        "Press under heavy books overnight while the glue sets.",
        "Seal the edges with tape or paint."
      ],
      sell: [300, 600],
      buyers: "Students and people working from home.",
      channels: ["Instagram", "College groups", "Online marketplaces"],
      scale: "Offer custom printed designs and sell to co-working spaces.",
      safety: ["Change blades often; a blunt blade slips more easily."],
      workshop: { team: 2, ages: "12+" }
    },
    {
      id: "card-playhouse", material: "cardboard",
      name: "Kids' cardboard playhouse", hi: "बच्चों का गत्ते का घर", pa: "ਬੱਚਿਆਂ ਦਾ ਗੱਤੇ ਦਾ ਘਰ",
      summary: "A large appliance box turned into a playhouse with a door, windows and roof for children to paint.",
      difficulty: 2, hours: 3, perProduct: 1,
      sizes: ["large"], conditions: ["good"],
      materials: [{ name: "Strong packing tape", cost: 60 }, { name: "Water-based paints", cost: 150 }],
      tools: ["Cutter", "Measuring tape", "Marker"],
      steps: [
        "Stand the box upright and tape all the bottom seams firmly.",
        "Cut a door on three sides so it opens like a flap.",
        "Cut windows on the sides.",
        "Use a second piece of cardboard folded in half as a sloping roof and tape it on.",
        "Paint it, or leave it plain for children to decorate."
      ],
      sell: [800, 1500],
      buyers: "Parents, playschools and birthday party planners.",
      channels: ["Playschools", "Parent groups on WhatsApp and Facebook", "Birthday party planners"],
      scale: "Sell theme kits (castle, shop, rocket) with colouring outlines printed on.",
      safety: ["Tape over all cut edges so children don't get paper cuts.", "Keep it away from candles and heaters."],
      workshop: { team: 3, ages: "10+" }
    },
    {
      id: "card-cat-scratcher", material: "cardboard",
      name: "Cat scratcher pad", hi: "बिल्ली के खरोंचने का पैड", pa: "ਬਿੱਲੀ ਦੇ ਖੁਰਚਣ ਵਾਲਾ ਪੈਡ",
      summary: "Strips of corrugated cardboard rolled or stacked on edge into a scratching pad cats love.",
      difficulty: 1, hours: 1.5, perProduct: 2,
      sizes: ["medium", "large"], conditions: ["good"],
      materials: [{ name: "Non-toxic glue (flour paste works)", cost: 10 }, { name: "Shallow box or frame", cost: 0 }],
      tools: ["Cutter", "Steel ruler"],
      steps: [
        "Cut the cardboard into strips 5 cm wide.",
        "Stack them on edge inside a shallow box, gluing each strip to the next.",
        "Pack them tightly so the edges form a firm scratching surface.",
        "Let it dry for a day before giving it to the cat."
      ],
      sell: [250, 450],
      buyers: "Cat owners, pet shops and animal shelters.",
      channels: ["Pet shops", "Instagram pet pages", "Animal shelter events"],
      scale: "Add catnip pouches and sell refills of scratching strips.",
      safety: ["Use only non-toxic glue such as flour paste."],
      workshop: { team: 1, ages: "8+" }
    },

    /* ---------- Newspaper ---------- */
    {
      id: "paper-bags", material: "newspaper",
      name: "Newspaper bags for shops", hi: "दुकानों के लिए अख़बार की थैलियाँ", pa: "ਦੁਕਾਨਾਂ ਲਈ ਅਖ਼ਬਾਰ ਦੇ ਲਿਫ਼ਾਫ਼ੇ",
      summary: "Folded and glued paper bags that replace polythene at sweet shops, chemists and grocers. One paper makes about four bags.",
      difficulty: 1, hours: 0.1, perProduct: 0.25,
      sizes: ["small", "medium", "large"], conditions: ["good"],
      materials: [{ name: "Flour paste or glue", cost: 1 }],
      tools: ["Ruler", "Brush for glue"],
      steps: [
        "Fold a double sheet in half and glue the side edge to make a tube.",
        "Fold the bottom up about 5 cm and crease it.",
        "Open the fold into a diamond, fold the top and bottom flaps to the middle, and glue.",
        "Let the bags dry flat under weight."
      ],
      sell: [1, 3],
      buyers: "Sweet shops, chemists, grocers and street food vendors.",
      channels: ["Direct sale to local shops by the hundred", "Kirana stores", "Temple prasad stalls"],
      scale: "Profit per bag is tiny, so volume matters: an SHG can make 500 bags a day and supply a whole market.",
      safety: ["Don't use newspaper bags for wet or oily food; printing ink can transfer."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "paper-beads", material: "newspaper",
      name: "Paper-bead jewellery", hi: "काग़ज़ के मोतियों के गहने", pa: "ਕਾਗ਼ਜ਼ ਦੇ ਮਣਕਿਆਂ ਦੇ ਗਹਿਣੇ",
      summary: "Colourful magazine pages rolled into beads and strung into necklaces and bracelets.",
      difficulty: 1, hours: 1.5, perProduct: 1,
      sizes: ["medium"], conditions: ["good"],
      materials: [{ name: "Glue stick", cost: 15 }, { name: "Clear varnish or nail polish", cost: 30 }, { name: "Elastic cord or thread", cost: 15 }],
      tools: ["Scissors", "Toothpick or thin skewer", "Ruler"],
      steps: [
        "Cut long triangles from glossy pages, about 2 cm wide at the base and 25 cm long.",
        "Roll each triangle tightly around a toothpick, starting from the wide end.",
        "Glue the tip and slide the bead off.",
        "Coat the beads with varnish and let them dry.",
        "String them into a necklace or bracelet."
      ],
      sell: [100, 250],
      buyers: "College students, gift shoppers and tourists.",
      channels: ["Craft fairs", "Instagram", "Gift shops"],
      scale: "A popular SHG product; sell sets in matching colours and take orders for events.",
      safety: ["Varnish in a ventilated room."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "paper-basket", material: "newspaper",
      name: "Woven newspaper basket", hi: "अख़बार से बुनी टोकरी", pa: "ਅਖ਼ਬਾਰ ਨਾਲ ਬੁਣੀ ਟੋਕਰੀ",
      summary: "Newspaper rolled into thin tubes and woven like cane into a strong basket.",
      difficulty: 2, hours: 3, perProduct: 4,
      sizes: ["small", "medium", "large"], conditions: ["good"],
      materials: [{ name: "Fevicol", cost: 30 }, { name: "Wood stain or paint", cost: 60 }, { name: "Clear varnish", cost: 40 }],
      tools: ["Knitting needle or thin skewer", "Scissors", "Cardboard for the base", "Clothes pegs"],
      steps: [
        "Cut sheets into strips 8 cm wide and roll each diagonally around a skewer into a thin tube; glue the end.",
        "Cut two cardboard circles for the base and glue an odd number of tubes between them like sun rays.",
        "Bend the rays upward to form the uprights.",
        "Weave tubes in and out of the uprights, joining new tubes by pushing one into another.",
        "Tuck the uprights in at the top, then stain and varnish the basket."
      ],
      sell: [250, 500],
      buyers: "Home decor buyers, gift shops and boutiques.",
      channels: ["Handicraft fairs", "Online craft stores", "Gift shops"],
      scale: "Make sets of storage baskets in three sizes; they look like cane but cost far less.",
      safety: ["Work in a ventilated room while staining and varnishing."],
      workshop: { team: 1, ages: "12+" }
    },
    {
      id: "paper-seed-paper", material: "newspaper",
      name: "Plantable seed paper", hi: "बीज वाला काग़ज़", pa: "ਬੀਜਾਂ ਵਾਲਾ ਕਾਗ਼ਜ਼",
      summary: "Paper pulp mixed with seeds and pressed into sheets for cards that grow into plants. About 1 kg of paper makes 25 cards.",
      difficulty: 2, hours: 3, perProduct: 0.2,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Flower or herb seeds (tulsi, marigold)", cost: 30 }, { name: "Old net or mosquito mesh for the frame", cost: 20 }],
      tools: ["Mixer or grinder", "Bucket", "Wooden frame with mesh", "Old towels or cloth", "Sponge"],
      steps: [
        "Tear the paper into small pieces and soak overnight.",
        "Blend into a smooth pulp with plenty of water.",
        "Stir in the seeds by hand (don't blend them).",
        "Dip the mesh frame into the pulp, lift it, and let the water drain.",
        "Flip the sheet onto a cloth, press out water with a sponge, and dry in shade.",
        "Cut into cards or tags when dry."
      ],
      sell: [500, 900],
      buyers: "Wedding planners, companies wanting eco-friendly invitations and gift tags, and schools.",
      channels: ["Wedding and event planners", "Corporate gifting", "Instagram"],
      scale: "Print invitations on seed paper; eco-friendly wedding cards sell for a premium.",
      safety: ["Unplug the mixer before cleaning the blades."],
      workshop: { team: 3, ages: "10+" }
    },

    /* ---------- Cans ---------- */
    {
      id: "can-lantern", material: "cans",
      name: "Punched tin lantern", hi: "छेद वाली टिन की लालटेन", pa: "ਛੇਕਾਂ ਵਾਲੀ ਟੀਨ ਦੀ ਲਾਲਟੈਨ",
      summary: "A food tin punched with a pattern of holes glows beautifully with a tea light or LED inside.",
      difficulty: 2, hours: 1, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Spray or enamel paint", cost: 60 }, { name: "Wire for the handle", cost: 10 }, { name: "LED tea light", cost: 20 }],
      tools: ["Hammer", "Nails of different sizes", "Marker", "Pliers"],
      steps: [
        "Fill the clean tin with water and freeze it overnight; the ice stops the tin from denting.",
        "Draw a pattern on paper, tape it around the tin, and punch along it with a hammer and nail.",
        "Let the ice melt, then dry the tin.",
        "Punch two holes near the rim for the wire handle.",
        "Paint, attach the handle, and put an LED tea light inside."
      ],
      sell: [150, 300],
      buyers: "Festival shoppers, cafés and wedding decorators.",
      channels: ["Diwali stalls", "Cafés and restaurants", "Wedding decorators"],
      scale: "Sell sets of lanterns for terrace and garden decoration during the festive season.",
      safety: ["File down the cut rim; tin edges are very sharp.", "Wear gloves while punching."],
      workshop: { team: 1, ages: "12+" }
    },
    {
      id: "can-planter", material: "cans",
      name: "Painted tin planter set", hi: "रंगे हुए टिन के गमलों का सेट", pa: "ਰੰਗੇ ਹੋਏ ਟੀਨ ਦੇ ਗਮਲਿਆਂ ਦਾ ਸੈੱਟ",
      summary: "Three painted food tins with drainage holes make a bright set of herb planters.",
      difficulty: 1, hours: 1, perProduct: 3,
      sizes: ["medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Enamel paint", cost: 80 }, { name: "Potting soil", cost: 30 }],
      tools: ["Hammer and nail", "Paint brush", "File"],
      steps: [
        "File any sharp edge at the rim.",
        "Punch 4–5 drainage holes in the base with a hammer and nail.",
        "Paint the outside with two coats of enamel paint.",
        "Fill with soil and plant herbs like mint, tulsi or coriander."
      ],
      sell: [250, 450],
      buyers: "Balcony gardeners, cafés and gift buyers.",
      channels: ["Nurseries", "Instagram", "Craft fairs"],
      scale: "Sell as a kitchen herb kit with seeds and soil.",
      safety: ["Wear gloves; tin edges can cut.", "Paint outdoors."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "can-wind-chime", material: "cans",
      name: "Can wind chime", hi: "कैन से विंड चाइम", pa: "ਕੈਨ ਤੋਂ ਵਿੰਡ ਚਾਈਮ",
      summary: "Soft-drink cans and their ring-pulls painted and strung into a cheerful wind chime.",
      difficulty: 1, hours: 1, perProduct: 6,
      sizes: ["small", "medium"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Acrylic paint", cost: 40 }, { name: "Fishing line or strong thread", cost: 20 }, { name: "Small beads", cost: 20 }],
      tools: ["Hammer and nail", "Strong scissors", "Wooden ring or stick"],
      steps: [
        "Wash the cans and punch a hole in the centre of each base.",
        "Paint the cans in bright colours.",
        "Thread each can on fishing line with a bead knotted inside so it hangs.",
        "Tie the lines at different lengths to a wooden ring or stick.",
        "Hang it where the cans can touch each other in the breeze."
      ],
      sell: [150, 300],
      buyers: "Home decor buyers, children and gift shoppers.",
      channels: ["Craft fairs", "School exhibitions", "Gift shops"],
      scale: "Offer themed colour sets and sell at festivals and summer fairs.",
      safety: ["Don't cut cans open; the thin metal edges are razor sharp."],
      workshop: { team: 1, ages: "8+" }
    },

    /* ---------- Plastic bags and wrappers ---------- */
    {
      id: "bags-plarn", material: "bags",
      name: "Plarn crochet shopping bag", hi: "प्लार्न (प्लास्टिक धागे) से क्रोशिया थैला", pa: "ਪਲਾਰਨ (ਪਲਾਸਟਿਕ ਧਾਗੇ) ਨਾਲ ਕਰੋਸ਼ੀਆ ਥੈਲਾ",
      summary: "Carry bags cut into 'plastic yarn' and crocheted into a strong, waterproof shopping bag. Needs about 40 bags.",
      difficulty: 2, hours: 6, perProduct: 40,
      sizes: ["medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Crochet hook, 6 mm", cost: 40 }],
      tools: ["Scissors", "Crochet hook"],
      steps: [
        "Flatten each bag, cut off the handles and bottom seam, and cut across into loops 3 cm wide.",
        "Join the loops by passing one through another and pulling tight, making a long 'plarn' strand.",
        "Crochet a flat oval base in single crochet.",
        "Crochet round and round up the sides to about 30 cm.",
        "Crochet two handles and fasten off firmly."
      ],
      sell: [250, 500],
      buyers: "Shoppers wanting a durable bag, eco stores and tourists.",
      channels: ["Eco stores", "Craft fairs", "Online handicraft marketplaces"],
      scale: "A good SHG product; each bag removes about 40 plastic bags from the waste stream.",
      safety: ["Take breaks; crochet strains the wrists."],
      workshop: { team: 1, ages: "12+" }
    },
    {
      id: "bags-ecobrick", material: "bags",
      name: "Eco-brick", hi: "इको-ब्रिक", pa: "ਈਕੋ-ਬ੍ਰਿਕ",
      summary: "Wrappers and bags packed tightly into a bottle to make a reusable building block. A 1-litre bottle holds about 100 wrappers.",
      difficulty: 1, hours: 1.5, perProduct: 100,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Empty 1-litre PET bottle (collected free)", cost: 0 }],
      tools: ["Wooden packing stick", "Scissors", "Kitchen scale"],
      steps: [
        "Make sure every wrapper is clean and completely dry.",
        "Cut wrappers into small pieces.",
        "Pack them into the bottle with a stick, pressing hard after every handful.",
        "Weigh it: a 1-litre eco-brick must weigh at least 330 g (0.33 g per ml).",
        "Cap tightly. Collect bricks to build benches, planters or garden walls."
      ],
      sell: [10, 30],
      buyers: "NGOs, schools and community projects building eco-brick benches and gardens.",
      channels: ["School and college eco-brick drives", "NGOs", "Community building projects"],
      scale: "Bricks have little value alone; the value comes from building benches and planters with them.",
      safety: ["Wet plastic grows mould inside; use only dry plastic."],
      workshop: { team: 1, ages: "6+" }
    },
    {
      id: "bags-woven-mat", material: "bags",
      name: "Woven plastic mat", hi: "प्लास्टिक से बुनी चटाई", pa: "ਪਲਾਸਟਿਕ ਨਾਲ ਬੁਣੀ ਚਟਾਈ",
      summary: "Carry bags cut into strips and woven on a simple frame into a waterproof floor or picnic mat. Needs about 60 bags.",
      difficulty: 2, hours: 5, perProduct: 60,
      sizes: ["medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Strong nylon string for the warp", cost: 40 }, { name: "Wooden frame loom", cost: 100 }],
      tools: ["Scissors", "Large needle"],
      steps: [
        "Cut bags into strips 3 cm wide and join them end to end.",
        "String the nylon warp threads tightly across the frame.",
        "Weave the plastic strips over and under the warp, row by row.",
        "Push each row down firmly.",
        "Cut it off the frame and knot the warp ends to finish the edges."
      ],
      sell: [300, 600],
      buyers: "Families, picnickers, temples and community halls.",
      channels: ["Weekly markets", "Eco stores", "Bulk orders for community halls"],
      scale: "Mats are waterproof and washable; sell to schools and community halls in bulk.",
      safety: ["Keep scissors and needles away from small children."],
      workshop: { team: 2, ages: "10+" }
    },
    {
      id: "bags-pouch", material: "bags",
      name: "Fused-plastic pouch", hi: "प्लास्टिक जोड़कर बनी पाउच", pa: "ਪਲਾਸਟਿਕ ਜੋੜ ਕੇ ਬਣੀ ਪਾਊਚ",
      summary: "Layers of carry bags ironed together between baking paper into a tough, waterproof fabric, then sewn into pouches.",
      difficulty: 3, hours: 1.5, perProduct: 8,
      sizes: ["medium"], conditions: ["good", "dirty"],
      materials: [{ name: "Baking (parchment) paper", cost: 40 }, { name: "Zip, 20 cm", cost: 10 }, { name: "Thread", cost: 5 }],
      tools: ["Clothes iron", "Sewing machine", "Scissors"],
      steps: [
        "Cut bags open and stack 6–8 layers flat.",
        "Place the stack between two sheets of baking paper.",
        "Iron on low-medium heat for 15–20 seconds, keeping the iron moving, until the layers fuse.",
        "Let it cool, peel off the paper, and check that it is fused evenly.",
        "Cut into panels and stitch into a zipped pouch."
      ],
      sell: [150, 300],
      buyers: "Students, travellers and eco-minded shoppers.",
      channels: ["College fests", "Eco stores", "Instagram"],
      scale: "Make pencil cases, laptop sleeves and toiletry bags from the same fused material.",
      safety: ["Only adults should iron the plastic. Work in a well-ventilated room or outdoors, and never let the plastic smoke or burn.", "Use low heat; overheating releases harmful fumes."],
      workshop: { team: 2, ages: "18+" }
    },

    /* ---------- CDs ---------- */
    {
      id: "cd-mosaic-frame", material: "cds",
      name: "CD mosaic mirror frame", hi: "सीडी मोज़ेक दर्पण फ्रेम", pa: "ਸੀਡੀ ਮੋਜ਼ੇਕ ਸ਼ੀਸ਼ਾ ਫ਼ਰੇਮ",
      summary: "Shiny CD pieces glued around a mirror make a sparkling frame that reflects rainbow colours.",
      difficulty: 2, hours: 2.5, perProduct: 6,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Small round mirror", cost: 80 }, { name: "MDF or cardboard frame base", cost: 60 }, { name: "Strong glue", cost: 40 }],
      tools: ["Strong scissors", "Bowl of hot water", "Gloves"],
      steps: [
        "Soak discs in hot water for 5 minutes so they cut without shattering.",
        "Cut them into small squares and triangles with strong scissors.",
        "Glue the mirror in the centre of the base.",
        "Glue the CD pieces around it, shiny side up, leaving small gaps.",
        "Seal the edges with a strip of glue or paint."
      ],
      sell: [350, 650],
      buyers: "Home decor buyers, salons, cafés and gift shoppers.",
      channels: ["Craft fairs", "Instagram", "Gift shops"],
      scale: "Use the same technique for trays, lampshades and wall panels.",
      safety: ["Wear gloves and cut away from your face; CD shards are sharp."],
      workshop: { team: 1, ages: "12+" }
    },
    {
      id: "cd-coasters", material: "cds",
      name: "CD coasters", hi: "सीडी कोस्टर", pa: "ਸੀਡੀ ਕੋਸਟਰ",
      summary: "Whole CDs covered with fabric, paint or cork make a set of four coasters.",
      difficulty: 1, hours: 0.75, perProduct: 4,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Fabric scraps or cork sheet", cost: 30 }, { name: "Fevicol", cost: 15 }, { name: "Felt for the base", cost: 20 }],
      tools: ["Scissors", "Pencil"],
      steps: [
        "Trace the CD on fabric or cork and cut out the circle.",
        "Glue it to the label side of the disc.",
        "Glue felt to the shiny side as the base.",
        "Press under books until dry."
      ],
      sell: [120, 250],
      buyers: "Cafés, offices and gift shoppers.",
      channels: ["Cafés", "Craft fairs", "Gift hampers"],
      scale: "Print custom designs or logos for cafés and offices.",
      safety: ["No special risks; keep scissors away from small children."],
      workshop: { team: 1, ages: "6+" }
    },
    {
      id: "cd-sun-catcher", material: "cds",
      name: "CD sun catcher and bird scarer", hi: "सीडी सन कैचर और पक्षी भगाने वाला", pa: "ਸੀਡੀ ਸਨ ਕੈਚਰ ਅਤੇ ਪੰਛੀ ਭਜਾਉਣ ਵਾਲਾ",
      summary: "Discs strung together flash in the sun to decorate windows and keep birds off crops and balconies.",
      difficulty: 1, hours: 0.5, perProduct: 5,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Strong string or fishing line", cost: 15 }, { name: "Beads", cost: 15 }],
      tools: ["Scissors"],
      steps: [
        "Thread string through the centre holes of five discs.",
        "Tie a bead or knot between them so they hang 10 cm apart and can spin.",
        "Make a loop at the top for hanging.",
        "Hang in a window, balcony, or over vegetable beds."
      ],
      sell: [80, 180],
      buyers: "Farmers, balcony gardeners and families.",
      channels: ["Village haats", "Nurseries", "Garden shops"],
      scale: "Sell in bulk to farmers as a cheap, chemical-free way to protect crops from birds.",
      safety: ["Hang where the flash won't shine into drivers' eyes on a road."],
      workshop: { team: 1, ages: "6+" }
    },

    /* ---------- Coconut shells ---------- */
    {
      id: "coconut-bowl", material: "coconut",
      name: "Coconut shell bowl", hi: "नारियल के खोल का कटोरा", pa: "ਨਾਰੀਅਲ ਦੇ ਖੋਲ ਦਾ ਕਟੋਰਾ",
      summary: "A shell sanded smooth and finished with food-safe oil makes a natural serving bowl.",
      difficulty: 2, hours: 2, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good", "dirty"],
      materials: [{ name: "Sandpaper, 80 to 400 grit", cost: 40 }, { name: "Food-safe coconut oil", cost: 10 }],
      tools: ["Wire brush", "Sanding block", "Small file"],
      steps: [
        "Scrape off any leftover flesh and dry the shell in the sun for 2–3 days.",
        "Remove the outer fibre with a wire brush.",
        "Sand the outside and inside from coarse 80 grit to fine 400 grit.",
        "File the rim level so the bowl doesn't wobble, and sand a small flat spot underneath.",
        "Rub with coconut oil and let it soak in overnight."
      ],
      sell: [150, 350],
      buyers: "Cafés serving smoothie bowls, eco stores, tourists and gift buyers.",
      channels: ["Cafés and health food shops", "Eco stores", "Online marketplaces"],
      scale: "Temples and juice stalls give shells away; sell bowls with matching coconut-wood spoons.",
      safety: ["Wear a dust mask while sanding.", "Use only food-safe oil, never varnish, on bowls for food."],
      workshop: { team: 1, ages: "12+" }
    },
    {
      id: "coconut-planter", material: "coconut",
      name: "Hanging coconut planter", hi: "लटकने वाला नारियल गमला", pa: "ਲਟਕਣ ਵਾਲਾ ਨਾਰੀਅਲ ਗਮਲਾ",
      summary: "A half shell with jute hangers becomes a natural planter for succulents and small plants.",
      difficulty: 1, hours: 0.5, perProduct: 1,
      sizes: ["small", "medium", "large"], conditions: ["good", "dirty", "damaged"],
      materials: [{ name: "Jute rope, 2 m", cost: 20 }, { name: "Potting soil", cost: 15 }],
      tools: ["Hand drill or hot nail", "Scissors"],
      steps: [
        "Drill a drainage hole in the bottom of the shell.",
        "Drill three holes evenly around the rim.",
        "Thread jute rope through each hole and knot underneath; tie the three ends together above.",
        "Fill with soil and plant a succulent, money plant or herb."
      ],
      sell: [100, 220],
      buyers: "Balcony gardeners, cafés and gift buyers.",
      channels: ["Nurseries", "Instagram", "Craft fairs"],
      scale: "Sell sets of three with plants already growing.",
      safety: ["Hold the shell firmly when drilling; it can slip."],
      workshop: { team: 1, ages: "8+" }
    },
    {
      id: "coconut-lamp", material: "coconut",
      name: "Coconut shell lamp", hi: "नारियल के खोल का लैंप", pa: "ਨਾਰੀਅਲ ਦੇ ਖੋਲ ਦਾ ਲੈਂਪ",
      summary: "A shell drilled with a pattern of holes makes a lamp that throws starry shadows on the walls.",
      difficulty: 3, hours: 3, perProduct: 1,
      sizes: ["medium", "large"], conditions: ["good"],
      materials: [{ name: "LED bulb holder with cable", cost: 120 }, { name: "Warm LED bulb", cost: 60 }, { name: "Wooden base", cost: 60 }],
      tools: ["Drill with small bits (2–6 mm)", "Pencil", "Sandpaper"],
      steps: [
        "Clean, dry and sand the shell.",
        "Draw a pattern of dots or shapes on it in pencil.",
        "Drill along the pattern, starting with small bits and widening some holes.",
        "Drill a hole for the cable and fit the LED holder and bulb.",
        "Fix the shell to a wooden base and coat it lightly with oil."
      ],
      sell: [500, 900],
      buyers: "Home decor buyers, resorts, cafés and tourists.",
      channels: ["Resorts and cafés", "Handicraft exhibitions", "Online decor stores"],
      scale: "Sell as hanging pendant lamps for cafés and resorts, in sets.",
      safety: ["Use only LED bulbs, which stay cool.", "Ask an adult or electrician to check the wiring before use."],
      workshop: { team: 2, ages: "16+" }
    }
  ]
};

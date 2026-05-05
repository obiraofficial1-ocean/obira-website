// ================= OBIRA PRODUCTS DATABASE =================

const products = [

/* ================= BRACELETS ================= */

{
id: "aurelia-lock-bracelet",
name: "OBIRA Aurelia Lock Bracelet",
price: 1199,
image: "images/Bracelets-ALB-001.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Locks in elegance, effortlessly.",
images: ["images/Bracelets-ALB-001.jpg"]
},

{
id: "chic-radiance-bracelet",
name: "OBIRA Chic Radiance Bracelet",
price: 1199,
image: "images/Bracelets-CR-002.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Glow that follows you.",
images: ["images/Bracelets-CR-002.jpg"]
},

{
id: "royal-medallion-bracelet",
name: "OBIRA Royal Medallion Charm Bracelet",
price: 999,
image: "images/Bracelets-RMC-003.jpg",
category: "bracelet",
tone: "Rose-gold toned",
desc: "A charm of royalty.",
images: ["images/Bracelets-RMC-003.jpg"]
},

{
id: "golden-aura-bracelet",
name: "OBIRA Golden Aura Bracelet",
price: 1199,
image: "images/Bracelets-GA-004.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Carry your aura in gold.",
images: ["images/Bracelets-GA-004.jpg"]
},

{
id: "mystic-eye-bracelet",
name: "OBIRA Mystic Eye Bracelet",
price: 1199,
image: "images/Bracelets-ME-005.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Protection meets style.",
images: ["images/Bracelets-ME-005.jpg"]
},

{
id: "radiant-halo-bracelet",
name: "OBIRA Radiant Halo Bracelet",
price: 999,
image: "images/Bracelets-RH-006.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Radiance that surrounds you.",
images: ["images/Bracelets-RH-006.jpg"]
},

{
id: "floral-grace-bracelet",
name: "OBIRA Floral Grace Bracelet",
price: 1199,
image: "images/Bracelets-FG-007.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Soft floral elegance.",
images: ["images/Bracelets-FG-007.jpg"]
},

{
id: "midnight-bloom-bracelet",
name: "OBIRA Midnight Bloom Bracelet",
price: 1199,
image: "images/Bracelets-MB-008.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Where elegance blooms at night.",
images: ["images/Bracelets-MB-008.jpg"]
},

{
id: "luxe-horizon-bracelet",
name: "OBIRA Luxe Horizon Bracelet",
price: 999,
image: "images/Bracelets-LH-009.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Luxury at every glance.",
images: ["images/Bracelets-LH-009.jpg"]
},

{
id: "rose-eclat-bracelet",
name: "OBIRA Rose Éclat Charm Bracelet",
price: 999,
image: "images/Bracelets-REC-010.jpg",
category: "bracelet",
tone: "Rose-gold toned",
desc: "Soft rose brilliance.",
images: ["images/Bracelets-REC-010.jpg"]
},

{
id: "iconic-rose-luxe-bracelet",
name: "OBIRA Iconic Rose Luxe Bracelet",
price: 999,
image: "images/Bracelets-IRL-011.jpg",
category: "bracelet",
tone: "Rose-gold toned",
desc: "Iconic and timeless.",
images: ["images/Bracelets-IRL-011.jpg"]
},

{
id: "midnight-luxe-bracelet",
name: "OBIRA Midnight Luxe Charm Bracelet",
price: 1199,
image: "images/Bracelets-MLC-012.jpg",
category: "bracelet",
tone: "Silver toned",
desc: "Dark luxury redefined.",
images: ["images/Bracelets-MLC-012.jpg"]
},

{
id: "regal-harmony-bracelet",
name: "OBIRA Regal Harmony Bracelet",
price: 1199,
image: "images/Bracelets-RHr-013.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Balance of elegance.",
images: ["images/Bracelets-RHr-013.jpg"]
},

{
id: "timeless-elegance-bracelet",
name: "OBIRA Timeless Elegance Bracelet",
price: 1199,
image: "images/Bracelets-TE-014.jpg",
category: "bracelet",
tone: "Gold toned",
desc: "Never goes out of style.",
images: ["images/Bracelets-TE-014.jpg"]
},

/* ================= HAIR ================= */

{
id: "luna-pearl-clip",
name: "OBIRA Luna Pearl Butterfly Clip",
price: 199,
image: "images/Clip-LPB-001.jpg",
category: "hair",
desc: "Soft wings, bold charm.",
images: ["images/Clip-LPB-001.jpg"]
},

{
id: "blush-aura-clip",
name: "OBIRA Blush Aura Butterfly Clip",
price: 199,
image: "images/Clip-BAB-002.jpg",
category: "hair",
desc: "Blush that stays.",
images: ["images/Clip-BAB-002.jpg"]
},

{
id: "olive-green-clip",
name: "OBIRA Olive Green Butterfly Clip",
price: 199,
image: "images/Clip-OGB-003.jpg",
category: "hair",
desc: "Nature-inspired beauty.",
images: ["images/Clip-OGB-003.jpg"]
},

{
id: "rose-flutter-clip",
name: "OBIRA Rosé Flutter Bloop Clip",
price: 199,
image: "images/Clip-RFB-004.jpg",
category: "hair",
desc: "Playful elegance.",
images: ["images/Clip-RFB-004.jpg"]
},

{
id: "bow-bands-1",
name: "OBIRA Celestial Bow Bands (Pack of 8)",
price: 199,
image: "images/Bands-001.jpg",
category: "hair",
desc: "Cute everyday essentials.",
images: ["images/Bands-001.jpg"]
},

{
id: "bow-bands-2",
name: "OBIRA Celestial Bow Bands (Pack of 8)",
price: 199,
image: "images/Bands-002.jpg",
category: "hair",
desc: "Style in every tie.",
images: ["images/Bands-002.jpg"]
},

/* ================= CHAINS ================= */

{
id: "blue-flutter-chain",
name: "OBIRA Blue Flutter Drop Chain",
price: 999,
image: "images/Necklace-Chain-BFD-001.jpg",
category: "chain",
tone: "Gold toned",
desc: "Light and graceful.",
images: ["images/Necklace-Chain-BFD-001.jpg"]
},

{
id: "eternal-time-chain",
name: "OBIRA Eternal Time Drop Chain",
price: 999,
image: "images/Necklace-Chain-ETD-002.jpg",
category: "chain",
tone: "Gold toned",
desc: "Timeless charm.",
images: ["images/Necklace-Chain-ETD-002.jpg"]
},

{
id: "bloom-drop-chain",
name: "OBIRA Bloom Drop Chain",
price: 999,
image: "images/Necklace-Chain-BD-003.jpg",
category: "chain",
tone: "Gold toned",
desc: "Bloom with grace.",
images: ["images/Necklace-Chain-BD-003.jpg"]
},

{
id: "golden-starfall-chain",
name: "OBIRA Golden Starfall Drop Chain",
price: 999,
image: "images/Necklace-Chain-GSD-004.jpg",
category: "chain",
tone: "Gold toned",
desc: "Shine like falling stars.",
images: ["images/Necklace-Chain-GSD-004.jpg"]
},

{
id: "butterfly-shell-chain",
name: "OBIRA Butterfly Shell Lumière Chain",
price: 999,
image: "images/Necklace-Chain-BSL-005.jpg",
category: "chain",
tone: "Gold toned",
desc: "Soft luminous beauty.",
images: ["images/Necklace-Chain-BSL-005.jpg"]
},

{
id: "lunar-bloom-chain",
name: "OBIRA Lunar Bloom Chain",
price: 999,
image: "images/Necklace-Chain-LB-006.jpg",
category: "chain",
tone: "Gold toned",
desc: "Bloom under moonlight.",
images: ["images/Necklace-Chain-LB-006.jpg"]
},

{
id: "heart-of-sun-chain",
name: "OBIRA Heart Of The Sun Chain",
price: 999,
image: "images/Necklace-Chain-HOS-007.jpg",
category: "chain",
tone: "Gold toned",
desc: "Radiance from within.",
images: ["images/Necklace-Chain-HOS-007.jpg"]
},

{
id: "starlight-chain",
name: "OBIRA Starlight Drop Chain",
price: 999,
image: "images/Necklace-Chain-SD-008.jpg",
category: "chain",
tone: "Gold toned",
desc: "Glow like stars.",
images: ["images/Necklace-Chain-SD-008.jpg"]
},

{
id: "soaring-peace-chain",
name: "OBIRA Soaring Peace Chain",
price: 999,
image: "images/Necklace-Chain-SP-009.jpg",
category: "chain",
tone: "Gold toned",
desc: "Freedom in style.",
images: ["images/Necklace-Chain-SP-009.jpg"]
},

{
id: "midnight-heart-chain",
name: "OBIRA Midnight Heart Chain",
price: 999,
image: "images/Necklace-Chain-MH-010.jpg",
category: "chain",
tone: "Gold toned",
desc: "Love after dark.",
images: ["images/Necklace-Chain-MH-010.jpg"]
},

{
id: "bamboo-heart-chain",
name: "OBIRA Bamboo Heart Chain",
price: 999,
image: "images/Necklace-Chain-BH-011.jpg",
category: "chain",
tone: "Gold toned",
desc: "Nature meets love.",
images: ["images/Necklace-Chain-BH-011.jpg"]
}

];

const products = [

{
id:"alb001",
name:"OBIRA Aurelia Lock Bracelet",
price:1199,
image:"images/Bracelets-ALB-001.jpg"
},

{
id:"cr002",
name:"OBIRA Chic Radiance Bracelet",
price:1199,
image:"images/Bracelets-CR-002.jpg"
},

{
id:"rmc003",
name:"OBIRA Royal Medallion Charm Bracelet",
price:999,
image:"images/Bracelets-RMC-003.jpg"
},

{
id:"ga004",
name:"OBIRA Golden Aura Bracelet",
price:1199,
image:"images/Bracelets-GA-004.jpg"
},

{
id:"me005",
name:"OBIRA Mystic Eye Bracelet",
price:1199,
image:"images/Bracelets-ME-005.jpg"
},

{
id:"rh006",
name:"OBIRA Radiant Halo Bracelet",
price:999,
image:"images/Bracelets-RH-006.jpg"
},

{
id:"fg007",
name:"OBIRA Floral Grace Bracelet",
price:1199,
image:"images/Bracelets-FG-007.jpg"
},

{
id:"mb008",
name:"OBIRA Midnight Bloom Bracelet",
price:1199,
image:"images/Bracelets-MB-008.jpg"
},

{
id:"lh009",
name:"OBIRA Luxe Horizon Bracelet",
price:999,
image:"images/Bracelets-LH-009.jpg"
},

{
id:"rec010",
name:"OBIRA Rose Éclat Bracelet",
price:999,
image:"images/Bracelets-REC-010.jpg"
},

{
id:"irl011",
name:"OBIRA Iconic Rose Luxe Bracelet",
price:999,
image:"images/Bracelets-IRL-011.jpg"
},

{
id:"mlc012",
name:"OBIRA Midnight Luxe Bracelet",
price:1199,
image:"images/Bracelets-MLC-012.jpg"
},

{
id:"rhr013",
name:"OBIRA Regal Harmony Bracelet",
price:1199,
image:"images/Bracelets-RHr-013.jpg"
},

{
id:"te014",
name:"OBIRA Timeless Elegance Bracelet",
price:1199,
image:"images/Bracelets-TE-014.jpg"
}

];
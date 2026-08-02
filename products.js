const products = [

/* ================= BRACELETS ================= */

{ id:"alb001", name:"OBIRA Aurelia Lock Bracelet - Gold toned", price:1199, image:"images/Bracelets-ALB-001.jpg", category:"bracelets", description:"Elegant lock-design bracelet in gold tone. Perfect for everyday elegance." },
{ id:"cr002", name:"OBIRA Chic Radiance Bracelet - Gold toned", price:1199, image:"images/Bracelets-CR-002.jpg", category:"bracelets", description:"Radiant design bracelet that brings shine to your wrist." },
{ id:"rmc003", name:"OBIRA Royal Medallion Charm Bracelet - Rose-gold toned", price:999, image:"images/Bracelets-RMC-003.jpg", category:"bracelets", description:"Charming medallion bracelet in rose-gold. A royal touch to your style." },
{ id:"ga004", name:"OBIRA Golden Aura Bracelet - Gold toned", price:1199, image:"images/Bracelets-GA-004.jpg", category:"bracelets", description:"Radiant aura with golden glow. Perfect for special occasions." },
{ id:"me005", name:"OBIRA Mystic Eye Bracelet - Gold toned", price:1199, image:"images/Bracelets-ME-005.jpg", category:"bracelets", description:"Mystical eye design. An eye-catching accessory." },
{ id:"rh006", name:"OBIRA Radiant Halo Bracelet - Gold toned", price:999, image:"images/Bracelets-RH-006.jpg", category:"bracelets", description:"Halo-inspired design for a heavenly look." },
{ id:"fg007", name:"OBIRA Floral Grace Bracelet - Gold toned", price:1199, image:"images/Bracelets-FG-007.jpg", category:"bracelets", description:"Beautiful floral patterns for grace and elegance." },
{ id:"mb008", name:"OBIRA Midnight Bloom Bracelet - Gold toned", price:1199, image:"images/Bracelets-MB-008.jpg", category:"bracelets", description:"Blooming elegance for midnight occasions." },
{ id:"lh009", name:"OBIRA Luxe Horizon Bracelet - Gold toned", price:999, image:"images/Bracelets-LH-009.jpg", category:"bracelets", description:"Luxurious horizon design. Timeless and elegant." },
{ id:"rec010", name:"OBIRA Rose Éclat Charm Bracelet - Rose-gold toned", price:999, image:"images/Bracelets-REC-010.jpg", category:"bracelets", description:"Rose-gold charm bracelet with elegant appeal." },
{ id:"irl011", name:"OBIRA Iconic Rose Luxe Bracelet - Rose-gold toned", price:999, image:"images/Bracelets-IRL-011.jpg", category:"bracelets", description:"Iconic rose design in luxe rose-gold." },
{ id:"mlc012", name:"OBIRA Midnight Luxe Charm Bracelet - Silver toned", price:1199, image:"images/Bracelets-MLC-012.jpg", category:"bracelets", description:"Silver charm bracelet for sophisticated style." },
{ id:"rhr013", name:"OBIRA Regal Harmony Bracelet - Gold toned", price:1199, image:"images/Bracelets-RHr-013.jpg", category:"bracelets", description:"Regal harmony in gold tone. Perfect balance." },
{ id:"te014", name:"OBIRA Timeless Elegance Bracelet - Gold toned", price:1199, image:"images/Bracelets-TE-014.jpg", category:"bracelets", description:"Timeless classic design that never goes out of style." },

/* ================= HAIR CLIPS ================= */

{ id:"clip001", name:"OBIRA Luna Pearl Butterfly Clip (Pair)", price:199, image:"images/Clip-LPB-001.jpg", category:"clips", description:"Pearl butterfly clips set. Delicate and charming." },
{ id:"clip002", name:"OBIRA Blush Aura Butterfly Clip (Pair)", price:199, image:"images/Clip-BAB-002.jpg", category:"clips", description:"Blush pink butterfly clips for a cute look." },
{ id:"clip003", name:"OBIRA Olive Green Butterfly Clip (Pair)", price:199, image:"images/Clip-OGB-003.jpg", category:"clips", description:"Olive green butterfly clips. Nature-inspired." },
{ id:"clip004", name:"OBIRA Rosé Flutter Bloop Clip (Pair)", price:199, image:"images/Clip-RFB-004.jpg", category:"clips", description:"Rosé flutter clips with playful design." },

/* ================= HAIR BANDS ================= */

{ id:"band001", name:"OBIRA Celestial Bow Bands (Pack of 8)", price:199, image:"images/Bands-001.jpg", category:"bands", description:"Set of 8 celestial bow hair bands. Perfect for styling." },
{ id:"band002", name:"OBIRA Celestial Bow Bands (Pack of 8)", price:199, image:"images/Bands-002.jpg", category:"bands", description:"Celestial bow bands pack for everyday use." },

/* ================= NECKLACE CHAINS ================= */

{ id:"n001", name:"OBIRA Blue Flutter Drop Chain - Gold toned", price:999, image:"images/Necklace-Chain-BFD-001.jpg", category:"chains", description:"Blue flutter drop pendant. Elegant and light." },
{ id:"n002", name:"OBIRA Eternal Time Drop Chain - Gold toned", price:999, image:"images/Necklace-Chain-ETD-002.jpg", category:"chains", description:"Eternal time design. A meaningful piece." },
{ id:"n003", name:"OBIRA Bloom Drop Chain - Gold toned", price:999, image:"images/Necklace-Chain-BD-003.jpg", category:"chains", description:"Blooming drop pendant. Fresh and beautiful." },
{ id:"n004", name:"OBIRA Golden Starfall Drop Chain - Gold toned", price:999, image:"images/Necklace-Chain-GSD-004.jpg", category:"chains", description:"Starfall design in gold. Celestial elegance." },
{ id:"n005", name:"OBIRA Butterfly Shell Lumière Chain - Gold toned", price:999, image:"images/Necklace-Chain-BSL-005.jpg", category:"chains", description:"Butterfly shell pendant. Luminous and beautiful." },
{ id:"n006", name:"OBIRA Lunar Bloom Chain - Gold toned", price:999, image:"images/Necklace-Chain-LB-006.jpg", category:"chains", description:"Lunar bloom design. Mystical and serene." },
{ id:"n007", name:"OBIRA Heart Of The Sun Chain - Gold toned", price:999, image:"images/Necklace-Chain-HOS-007.jpg", category:"chains", description:"Heart of the sun pendant. Warm and radiant." },
{ id:"n008", name:"OBIRA Starlight Drop Chain - Gold toned", price:999, image:"images/Necklace-Chain-SD-008.jpg", category:"chains", description:"Starlight drop pendant. Sparkling charm." },
{ id:"n009", name:"OBIRA Soaring Peace Chain - Gold toned", price:999, image:"images/Necklace-Chain-SP-009.jpg", category:"chains", description:"Soaring peace design. Calming and beautiful." },
{ id:"n010", name:"OBIRA Midnight Heart Chain - Gold toned", price:999, image:"images/Necklace-Chain-MH-010.jpg", category:"chains", description:"Midnight heart pendant. Deep and romantic." },
{ id:"n011", name:"OBIRA Bamboo Heart Chain - Gold toned", price:999, image:"images/Necklace-Chain-BH-011.jpg", category:"chains", description:"Bamboo heart pendant. Eco-inspired elegance." },

/* ================= POMELI PRODUCTS ================= */

{ id:"pomeli001", name:"OBIRA Pomeli Essential Kit - Skincare Set", price:1999, image:"images/Pomeli-001.jpg", category:"pomeli", description:"Complete pomeli skincare kit with moisturizer and cleanser." },

];

// Bundle discount configuration
const bundleDiscounts = {
  "bracelets+chains": 300,  // ₹300 discount when buying bracelet + chain together
};

// Function to check and apply bundle discounts
function calculateBundleDiscount(cartItems) {
  let discount = 0;
  
  // Check if cart has both bracelets and chains
  const hasBracelet = cartItems.some(item => {
    const product = products.find(p => p.id === item.id);
    return product && product.category === "bracelets";
  });
  
  const hasChain = cartItems.some(item => {
    const product = products.find(p => p.id === item.id);
    return product && product.category === "chains";
  });
  
  // Apply bundle discount if both categories present
  if (hasBracelet && hasChain) {
    discount += bundleDiscounts["bracelets+chains"];
  }
  
  return discount;
}

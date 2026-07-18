/**
 * RentIt – Multi-Category Online Rental Marketplace
 * Core JavaScript Library (Shared Functionality, Data & State Management)
 */

// --- INITIAL DATA SEEDING ---
const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    title: "Sony Alpha 7 IV Mirrorless Camera",
    category: "Cameras",
    categoryKey: "camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    price: 45, // per day
    rating: 4.9,
    reviewsCount: 38,
    location: "Downtown, Seattle",
    availability: "Available",
    securityDeposit: 250,
    owner: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0142",
      email: "marcus.v@rentit.com",
      rating: 4.8
    },
    description: "The Sony Alpha 7 IV is the ideal all-rounder, offering breathtaking photo performance and high-quality 4K 60p video recording. Perfect for weddings, travel photography, and professional videography.",
    specifications: [
      { key: "Sensor", value: "33 MP Full-Frame Exmor R CMOS" },
      { key: "Video", value: "4K 60p 10-bit 4:2:2" },
      { key: "ISO Range", value: "100 - 51,200 (expandable to 204,800)" },
      { key: "Lens Mount", value: "Sony E-Mount" }
    ],
    reviews: [
      { author: "Sarah Jenkins", rating: 5, date: "2026-06-12", text: "Amazing condition! Lens was pristine and battery was fully charged. Marcus was very flexible with pickup.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
      { author: "Liam O'Connor", rating: 4.8, date: "2026-05-28", text: "Excellent camera, worked flawlessly. Highly recommended for weekend shoots.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-2",
    title: "Tesla Model 3 Long Range (2023)",
    category: "Cars",
    categoryKey: "vehicle",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    price: 85,
    rating: 4.8,
    reviewsCount: 54,
    location: "Greenlake, Seattle",
    availability: "Available",
    securityDeposit: 500,
    owner: {
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0189",
      email: "sophia.c@rentit.com",
      rating: 4.9
    },
    description: "Experience the premium electric drive with this gorgeous Tesla Model 3 Long Range. Features Autopilot, dual-motor AWD, an elegant white interior, and a 350-mile real-world range. Clean, sanitised, and fully charged on delivery.",
    specifications: [
      { key: "Range", value: "358 miles (EPA)" },
      { key: "Drivetrain", value: "Dual Motor AWD" },
      { key: "0-60 mph", value: "4.2 seconds" },
      { key: "Autopilot", value: "Enabled" }
    ],
    reviews: [
      { author: "David Kim", rating: 5, date: "2026-07-02", text: "Sophia made everything seamless! The car was super clean and the Autopilot was amazing for my road trip.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-3",
    title: "Specialized Stumpjumper EVO Comp MTB",
    category: "Bikes",
    categoryKey: "vehicle",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    price: 35,
    rating: 4.7,
    reviewsCount: 19,
    location: "Capitol Hill, Seattle",
    availability: "Available",
    securityDeposit: 150,
    owner: {
      name: "Tyler Cross",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0112",
      email: "tyler.c@rentit.com",
      rating: 4.6
    },
    description: "Unrivalled control, suspension, and adjustable geometry are the hallmarks of this professional mountain trail bike. Includes FOX FLOAT suspension, SRAM Code RS brakes, and rugged tubeless tires.",
    specifications: [
      { key: "Frame Size", value: "Medium (S3)" },
      { key: "Fork", value: "FOX FLOAT 36 Rhythm (160mm)" },
      { key: "Brakes", value: "SRAM Code RS 4-piston" },
      { key: "Weight", value: "31.5 lbs" }
    ],
    reviews: [
      { author: "Alex Reed", rating: 4, date: "2026-06-25", text: "Great trail bike! Suspenion felt smooth. Had some minor scratches on the frame but performed incredibly.", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-4",
    title: "Cozy Beachfront Cabin with Hot Tub",
    category: "Houses",
    categoryKey: "house",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    price: 180,
    rating: 4.95,
    reviewsCount: 112,
    location: "Alki Beach, Seattle",
    availability: "Available",
    securityDeposit: 400,
    owner: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0199",
      email: "elena.r@rentit.com",
      rating: 5.0
    },
    description: "Unwind at this stunning beachfront escape. Features modern timber styling, a fully private cedar hot tub, panoramic sunset views of Puget Sound, and direct kayak/paddleboard launch from the backyard.",
    specifications: [
      { key: "Capacity", value: "4 Guests" },
      { key: "Beds", value: "2 Queen Beds" },
      { key: "Amenities", value: "Private Hot Tub, WiFi, Fireplace" },
      { key: "Pet Friendly", value: "Yes" }
    ],
    reviews: [
      { author: "Michael Smith", rating: 5, date: "2026-07-10", text: "Hands down the best rental we've ever stayed at! Sunset from the hot tub is unforgettable.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-5",
    title: "DJI Mavic 3 Pro Cine Drone Kit",
    category: "Drones",
    categoryKey: "drone",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    price: 75,
    rating: 4.88,
    reviewsCount: 29,
    location: "Fremont, Seattle",
    availability: "Available",
    securityDeposit: 300,
    owner: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0142",
      email: "marcus.v@rentit.com",
      rating: 4.8
    },
    description: "The ultimate flagship camera drone. Features a triple-camera system with Apple ProRes encoding, a 43-minute flight time, and omnidirectional obstacle sensing. Included is the DJI RC Pro screen controller and 3 batteries.",
    specifications: [
      { key: "Video Resolution", value: "5.1K / 50fps Apple ProRes" },
      { key: "Optical Zoom", value: "3x and 7x Medium/Telephoto" },
      { key: "Flight Time", value: "Up to 43 mins per battery" },
      { key: "Transmission Range", value: "Up to 15 km (O3+)" }
    ],
    reviews: [
      { author: "Emma Watson", rating: 5, date: "2026-07-01", text: "Absolutely stunning footage. The Cine ProRes version is worth every penny. Marcus is a great owner.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-6",
    title: "Modern Luxury 2-Bedroom Penthouse",
    category: "Apartments",
    categoryKey: "house",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    price: 150,
    rating: 4.79,
    reviewsCount: 42,
    location: "Pike Place, Seattle",
    availability: "Available",
    securityDeposit: 350,
    owner: {
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0189",
      email: "sophia.c@rentit.com",
      rating: 4.9
    },
    description: "This fully furnished high-rise penthouse boasts floor-to-ceiling windows overlooking downtown Seattle. Fully loaded designer kitchen, smart home automated lights, and a private balcony.",
    specifications: [
      { key: "Size", value: "1,200 sq. ft." },
      { key: "Sleeps", value: "4 Guests" },
      { key: "Bathroom", value: "2 Premium Bathrooms" },
      { key: "Tech", value: "Gigabit WiFi, Apple TV, Sonos System" }
    ],
    reviews: [
      { author: "Daniel Craig", rating: 5, date: "2026-06-18", text: "A phenomenal stay! Safe, high security, and spectacular panoramic views. Excellent value.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-7",
    title: "Apple MacBook Pro 16\" M3 Max",
    category: "Electronics",
    categoryKey: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    price: 60,
    rating: 4.92,
    reviewsCount: 15,
    location: "Ballard, Seattle",
    availability: "Available",
    securityDeposit: 400,
    owner: {
      name: "Liam Foster",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0155",
      email: "liam.f@rentit.com",
      rating: 4.7
    },
    description: "Rent the ultimate workhorse for heavy 3D rendering, video editing, or software development. Featuring the top-tier Apple M3 Max chip, 64GB of Unified Memory, and an incredibly bright 16-inch Liquid Retina XDR display.",
    specifications: [
      { key: "Processor", value: "Apple M3 Max 16-Core CPU" },
      { key: "Memory", value: "64 GB Unified RAM" },
      { key: "Storage", value: "2 TB Ultra-Fast SSD" },
      { key: "Battery Life", value: "Up to 22 hours" }
    ],
    reviews: [
      { author: "Julia Roberts", rating: 5, date: "2026-06-30", text: "Saved my life during a client-side video crisis! Processed heavy 8K timelines without spinning its fans.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-8",
    title: "Mid-Century Modern Eames Lounge Chair",
    category: "Furniture",
    categoryKey: "furniture",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    price: 25,
    rating: 4.85,
    reviewsCount: 22,
    location: "South Lake Union, Seattle",
    availability: "Available",
    securityDeposit: 150,
    owner: {
      name: "Tyler Cross",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0112",
      email: "tyler.c@rentit.com",
      rating: 4.6
    },
    description: "An icon of modern design. This Eames Lounge Chair and Ottoman is upholstered in top-grain black leather with a beautiful walnut wood veneer frame. Ideal for real estate staging, commercial photography, or luxury comfort.",
    specifications: [
      { key: "Designer", value: "Charles and Ray Eames" },
      { key: "Materials", value: "7-ply Walnut Veneer & Italian Leather" },
      { key: "Includes", value: "Matching Ottoman" },
      { key: "Condition", value: "Pristine Showcase Condition" }
    ],
    reviews: [
      { author: "Stacy Carter", rating: 5, date: "2026-07-05", text: "Used this to stage a luxury condo listing. It completely transformed the space!", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-9",
    title: "DeWalt Cordless 5-Tool Combo Kit",
    category: "Power Tools",
    categoryKey: "equipment",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    price: 18,
    rating: 4.68,
    reviewsCount: 31,
    location: "Queen Anne, Seattle",
    availability: "Available",
    securityDeposit: 80,
    owner: {
      name: "Dave Miller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0167",
      email: "dave.m@rentit.com",
      rating: 4.5
    },
    description: "Ready to tackle any DIY home improvement or repair project. This professional-grade 20V MAX DeWalt kit contains a brushless drill/driver, impact driver, circular saw, reciprocating saw, and LED worklight. Includes 2 high-capacity batteries and dual-bay fast charger.",
    specifications: [
      { key: "Voltage", value: "20V MAX" },
      { key: "Drill Motor", value: "Brushless 3-Speed" },
      { key: "Saw Blade Size", value: "6-1/2 Inch Circular" },
      { key: "Batteries", value: "2x 4.0 Ah Lithium-Ion" }
    ],
    reviews: [
      { author: "Robert Vance", rating: 4.5, date: "2026-06-15", text: "Tools were powerful and batteries held an amazing charge. Ideal for installing my wooden fence.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-10",
    title: "Fender Player Stratocaster Electric Guitar",
    category: "Musical Instruments",
    categoryKey: "music",
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    price: 22,
    rating: 4.81,
    reviewsCount: 14,
    location: "University District, Seattle",
    availability: "Available",
    securityDeposit: 100,
    owner: {
      name: "Tyler Cross",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0112",
      email: "tyler.c@rentit.com",
      rating: 4.6
    },
    description: "The inspiring sound of a Stratocaster is one of the foundations of Fender. Featuring classic high-end bell-like chime, punchy mids, and robust low-end. Rented with a premium gig bag, strap, and 10ft cable.",
    specifications: [
      { key: "Body", value: "Alder with Gloss Polyester Finish" },
      { key: "Neck", value: "Maple 'Modern C' Shape" },
      { key: "Pickups", value: "3 Player Series Alnico 5 Strat Single-Coil" },
      { key: "Controls", value: "5-Position Pickup Selector Switch" }
    ],
    reviews: [
      { author: "Jimmy Page", rating: 5, date: "2026-07-04", text: "Perfect action, brand new strings, clean fretboard! Absolute joy to play in my studio session.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-11",
    title: "Coleman 4-Person Cabin Tent & Camping Set",
    category: "Camping Equipment",
    categoryKey: "camp",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    price: 20,
    rating: 4.75,
    reviewsCount: 26,
    location: "West Seattle, Seattle",
    availability: "Available",
    securityDeposit: 60,
    owner: {
      name: "Dave Miller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0167",
      email: "dave.m@rentit.com",
      rating: 4.5
    },
    description: "This instant cabin tent sets up in under 60 seconds! Rented with an essential camping bundle: 2 comfortable thermal sleeping pads, 2 folding camp chairs, and a camping gas stove with lantern.",
    specifications: [
      { key: "Setup Time", value: "60 Seconds Instant Setup" },
      { key: "Material", value: "Double-thick WeatherTec waterproof fabric" },
      { key: "Sleeping Pads", value: "2 Self-Inflating Pads" },
      { key: "Dimensions", value: "8 x 7 feet with 4 ft 11 in center height" }
    ],
    reviews: [
      { author: "Nancy Drew", rating: 5, date: "2026-06-19", text: "Tent was incredibly easy to pitch. Dave had even packed some clean matches and campfire starters for us. Awesome host!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: "prod-12",
    title: "Caterpillar 301.5 Mini Excavator",
    category: "Construction Equipment",
    categoryKey: "equipment",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=800&q=80",
    price: 195,
    rating: 4.91,
    reviewsCount: 12,
    location: "Industrial District, Seattle",
    availability: "Available",
    securityDeposit: 800,
    owner: {
      name: "Dave Miller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      phone: "+1 (206) 555-0167",
      email: "dave.m@rentit.com",
      rating: 4.5
    },
    description: "High-performance heavy machinery in a compact size. The Cat 301.5 delivers high digging power and stability. Features retractable undercarriage, expanding blade, and a comfortable, heated cab. Delivered directly to your worksite (delivery fee applies).",
    specifications: [
      { key: "Operating Weight", value: "3,891 lbs" },
      { key: "Net Power", value: "19.2 HP" },
      { key: "Max Dig Depth", value: "7 ft 10 in" },
      { key: "Fuel Type", value: "Diesel" }
    ],
    reviews: [
      { author: "Frank Builder", rating: 5, date: "2026-05-11", text: "Excellent excavator. Clean engine, zero issues with hydraulic systems. Excavated our garage foundation in one afternoon.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" }
    ]
  }
];

const DEFAULT_USER = {
  name: "Alexander Pierce",
  email: "alex.p@google.com",
  phone: "+1 (415) 555-0133",
  address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  type: "renter"
};

const DEFAULT_BOOKINGS = [
  {
    id: "BK-948102",
    productId: "prod-1",
    productTitle: "Sony Alpha 7 IV Mirrorless Camera",
    productImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-07-20",
    endDate: "2026-07-23",
    days: 3,
    pricePerDay: 45,
    quantity: 1,
    couponCode: "WELCOME10",
    securityDeposit: 250,
    subtotal: 135,
    discount: 13.5,
    taxes: 12.15,
    total: 158.65,
    status: "Confirmed",
    qrCode: "BK948102-SONY7IV-CONFIRMED-RENTIT",
    ownerName: "Marcus Vance"
  },
  {
    id: "BK-831940",
    productId: "prod-4",
    productTitle: "Cozy Beachfront Cabin with Hot Tub",
    productImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-08-01",
    endDate: "2026-08-05",
    days: 4,
    pricePerDay: 180,
    quantity: 1,
    couponCode: "NONE",
    securityDeposit: 400,
    subtotal: 720,
    discount: 0,
    taxes: 72,
    total: 1192,
    status: "Completed",
    qrCode: "BK831940-ALKIHOUSE-COMPLETED-RENTIT",
    ownerName: "Elena Rostova"
  }
];

const DEFAULT_WISHLIST = ["prod-2", "prod-5"];

// --- INITIALIZE DATA ON LOAD ---
function initStorage() {
  if (!localStorage.getItem("rentit_products")) {
    localStorage.setItem("rentit_products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("rentit_user")) {
    localStorage.setItem("rentit_user", JSON.stringify(DEFAULT_USER));
  }
  if (!localStorage.getItem("rentit_bookings")) {
    localStorage.setItem("rentit_bookings", JSON.stringify(DEFAULT_BOOKINGS));
  }
  if (!localStorage.getItem("rentit_wishlist")) {
    localStorage.setItem("rentit_wishlist", JSON.stringify(DEFAULT_WISHLIST));
  }
  if (!localStorage.getItem("rentit_darkmode")) {
    localStorage.setItem("rentit_darkmode", "false");
  }
}

// Invoke instantly on script load
initStorage();

// --- DATA ACCESS OPERATIONS ---
function getProducts() {
  return JSON.parse(localStorage.getItem("rentit_products")) || DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem("rentit_products", JSON.stringify(products));
}

function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("rentit_user")) || DEFAULT_USER;
}

function saveCurrentUser(user) {
  localStorage.setItem("rentit_user", JSON.stringify(user));
}

function getBookings() {
  return JSON.parse(localStorage.getItem("rentit_bookings")) || DEFAULT_BOOKINGS;
}

function saveBookings(bookings) {
  localStorage.setItem("rentit_bookings", JSON.stringify(bookings));
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("rentit_wishlist")) || DEFAULT_WISHLIST;
}

function saveWishlist(wishlist) {
  localStorage.setItem("rentit_wishlist", JSON.stringify(wishlist));
}

function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter(item => item !== id);
    showToast("Removed from wishlist", "success");
  } else {
    list.push(id);
    showToast("Added to wishlist", "success");
  }
  saveWishlist(list);
  updateWishlistBadges();
  return list.includes(id);
}

function isInWishlist(id) {
  return getWishlist().includes(id);
}

// --- SYSTEM UTILITIES ---

// Toast Notifications System
function showToast(message, type = "success") {
  // Check if standard container exists, if not create it
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "position-fixed bottom-0 start-50 translate-middle-x p-3 z-3";
    document.body.appendChild(container);
  }

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-white border-0 shadow-lg ${
    type === "success" ? "bg-emerald" : type === "error" ? "bg-danger" : "bg-primary"
  }`;
  toastEl.role = "alert";
  toastEl.ariaLive = "assertive";
  toastEl.ariaAtomic = "true";

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body fs-7 font-poppins d-flex align-items-center gap-2">
        <i class="fa-solid ${
          type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info"
        }"></i>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  container.appendChild(toastEl);
  const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
  bsToast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}

// Badge Syncing
function updateWishlistBadges() {
  const count = getWishlist().length;
  const badges = document.querySelectorAll(".wishlist-badge");
  badges.forEach(b => {
    b.textContent = count;
    if (count === 0) {
      b.classList.add("d-none");
    } else {
      b.classList.remove("d-none");
    }
  });
}

function updateBookingBadges() {
  const count = getBookings().length;
  const badges = document.querySelectorAll(".bookings-badge");
  badges.forEach(b => {
    b.textContent = count;
    if (count === 0) {
      b.classList.add("d-none");
    } else {
      b.classList.remove("d-none");
    }
  });
}

// Dark Mode Toggle Trigger
function applyDarkMode() {
  const isDark = localStorage.getItem("rentit_darkmode") === "true";
  const body = document.body;
  if (isDark) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }

  // Update toggle icons across the board if any
  const toggles = document.querySelectorAll(".dark-mode-toggle i");
  toggles.forEach(icon => {
    if (isDark) {
      icon.className = "fa-solid fa-sun text-amber";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  });
}

function toggleDarkMode() {
  const isDark = localStorage.getItem("rentit_darkmode") === "true";
  localStorage.setItem("rentit_darkmode", (!isDark).toString());
  applyDarkMode();
  showToast(!isDark ? "Dark mode activated" : "Light mode activated", "info");
}

// Loading Spinner Control
function showLoadingScreen() {
  const loader = document.getElementById("loading-screen");
  if (loader) {
    loader.classList.remove("fade-out-loader");
    loader.style.display = "flex";
  }
}

function hideLoadingScreen() {
  const loader = document.getElementById("loading-screen");
  if (loader) {
    loader.classList.add("fade-out-loader");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}

// Expose core variables and functions to window (global scope) for module/non-module compatibility
window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;
window.DEFAULT_USER = DEFAULT_USER;
window.DEFAULT_BOOKINGS = DEFAULT_BOOKINGS;
window.DEFAULT_WISHLIST = DEFAULT_WISHLIST;
window.initStorage = initStorage;
window.getProducts = getProducts;
window.saveProducts = saveProducts;
window.getProductById = getProductById;
window.getCurrentUser = getCurrentUser;
window.saveCurrentUser = saveCurrentUser;
window.getBookings = getBookings;
window.saveBookings = saveBookings;
window.getWishlist = getWishlist;
window.saveWishlist = saveWishlist;
window.toggleWishlist = toggleWishlist;
window.isInWishlist = isInWishlist;
window.showToast = showToast;
window.updateWishlistBadges = updateWishlistBadges;
window.updateBookingBadges = updateBookingBadges;
window.applyDarkMode = applyDarkMode;
window.toggleDarkMode = toggleDarkMode;
window.showLoadingScreen = showLoadingScreen;
window.hideLoadingScreen = hideLoadingScreen;

// On document loaded behaviors
document.addEventListener("DOMContentLoaded", () => {
  applyDarkMode();
  updateWishlistBadges();
  updateBookingBadges();

  // Populate dynamic header profile info
  const headerUser = getCurrentUser();
  const avatarElements = document.querySelectorAll(".nav-avatar-img");
  avatarElements.forEach(img => {
    if (headerUser && headerUser.avatar) {
      img.src = headerUser.avatar;
    }
  });

  const nameElements = document.querySelectorAll(".nav-user-name");
  nameElements.forEach(el => {
    if (headerUser && headerUser.name) {
      el.textContent = headerUser.name.split(" ")[0]; // just first name
    }
  });

  // Attach Dark Mode switchers if present
  const darkToggles = document.querySelectorAll(".dark-mode-toggle");
  darkToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleDarkMode();
    });
  });

  // Hide loading spinner after brief delay
  setTimeout(hideLoadingScreen, 400);
});

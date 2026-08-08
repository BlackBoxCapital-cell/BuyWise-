import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Hostage Tape Mouth Tape for Sleeping',
    subtitle: 'Medical-Grade Mouth Strips for Deep Nasal Breathing',
    category: 'Beauty & Sleep',
    merchant: 'amazon',
    merchantName: 'Amazon',
    merchantBadgeText: 'Available on Amazon Prime',
    price: 24.99,
    originalPrice: 32.99,
    currency: '$',
    rating: 4.8,
    reviewCount: 3840,
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'Painless hypoallergenic adhesive prevents open-mouth snoring and morning dry mouth.',
      'Promotes continuous nasal breathing to boost deep REM sleep and oxygenation.'
    ],
    highlights: ['Hypoallergenic', 'Strong Hold', 'Snore Reduction', '30-Night Pack'],
    editorVerdict: 'After 14 nights of testing, sleep quality tracking showed a 22% increase in REM cycles. Holds firm even with facial hair without skin irritation.',
    pros: [
      'Super gentle removal with natural oil blend adhesive',
      'Flexible fabric contours naturally to lip movement',
      'Significantly reduces nighttime snoring and dry throat'
    ],
    cons: [
      'Requires clean skin free of heavy face oils before applying'
    ],
    specs: {
      'Material': 'Flex-Fabric Cotton Blend',
      'Quantity': '30 Strips per Box',
      'Adhesive': 'Medical-Grade Latex-Free',
      'Manufacturer': 'Hostage Tape Co.'
    },
    asinOrId: 'B0C7Q8XYZ1',
    directUrl: 'https://www.amazon.com/dp/B0C7Q8XYZ1',
    badge: "Editor's Choice",
    priceHistory: [
      { date: 'Jul 1', price: 32.99 },
      { date: 'Jul 15', price: 29.99 },
      { date: 'Aug 1', price: 24.99 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus K.',
        rating: 5,
        date: '3 days ago',
        comment: 'Completely eliminated my snoring and dry throat. My sleep score went from 72 to 89!',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Dr. Sarah L.',
        rating: 5,
        date: '1 week ago',
        comment: 'As a sleep dentist, I recommend mouth taping to all my patients with nasal breathing ability.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Titanium Flat Back Hypoallergenic Earrings',
    subtitle: 'Comfy Sleep-In Studs for Sensitive Ears',
    category: 'Beauty & Sleep',
    merchant: 'impact',
    merchantName: 'Maison Miru (Impact)',
    merchantBadgeText: 'Official Brand Store via Impact',
    price: 38.00,
    originalPrice: 48.00,
    currency: '$',
    rating: 4.9,
    reviewCount: 1920,
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'Internal thread flat backs mean no poke behind the ear when sleeping or wearing headphones.',
      'Implant-grade ASTM F-136 titanium guarantees zero allergic reaction or green skin.'
    ],
    highlights: ['Zero Poke', 'ASTM F-136 Titanium', 'Shower-Safe', 'Tarnish-Proof'],
    editorVerdict: 'The ultimate set-it-and-forget-it jewelry. Worn continuously for 30 days straight through ocean swims, sleep, and workouts with zero irritation.',
    pros: [
      'Flat back disc prevents poking during sleep and phone calls',
      '100% nickel-free solid titanium prevents redness',
      'Screw-on top stays secure during intense physical activity'
    ],
    cons: [
      'Small screw-in tops can be tricky to fasten on first try'
    ],
    specs: {
      'Gauge': '18G (1.0mm) & 16G (1.2mm)',
      'Post Length': '6mm disc back',
      'Metal': 'Implant-Grade Solid Titanium',
      'Waterproof': '100% Shower and Pool Safe'
    },
    asinOrId: 'MM-FLAT-001',
    directUrl: 'https://www.impact.com/brand/maison-miru/flat-back-studs',
    badge: 'Viral TikTok Pick',
    priceHistory: [
      { date: 'Jul 1', price: 48.00 },
      { date: 'Jul 20', price: 42.00 },
      { date: 'Aug 1', price: 38.00 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Chloe M.',
        rating: 5,
        date: '2 days ago',
        comment: 'Finally earrings I can actually sleep on my side with! No poking at all.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Thermacell E55 Rechargeable Mosquito Repeller',
    subtitle: '15-Foot Zone Scentless Insect Protection Fan',
    category: 'Home & Utility',
    merchant: 'amazon',
    merchantName: 'Amazon',
    merchantBadgeText: 'Available on Amazon Prime',
    price: 39.98,
    originalPrice: 49.99,
    currency: '$',
    rating: 4.7,
    reviewCount: 8450,
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'Creates a 15-foot scentless protection zone against mosquitoes within 15 minutes.',
      'Rechargeable USB lithium battery offers 5.5 hours of continuous bug-free patio living.'
    ],
    highlights: ['DEET-Free', '15-Ft Barrier', 'Rechargeable USB', 'Scentless Heat Action'],
    editorVerdict: 'Essential for backyard dinners and camping. Creates a noticeable perimeter where mosquitoes literally turn back without smelly sprays.',
    pros: [
      'Zero greasy sprays, lotions, or chemical odors on your skin',
      'Quiet operation with simple single-button start',
      'Compact & TSA-friendly for outdoor trips'
    ],
    cons: [
      'Refill mats need replacement after 12 hours of active use'
    ],
    specs: {
      'Coverage Area': '15-Foot Diameter Zone',
      'Battery Life': '5.5 Hours Rechargeable',
      'Active Ingredient': 'Metofluthrin (Plant-Synthetic)',
      'Dimensions': '3.8 x 3.8 x 4.2 inches'
    },
    asinOrId: 'B08S3T94K2',
    directUrl: 'https://www.amazon.com/dp/B08S3T94K2',
    badge: 'Best Outdoor Deal',
    priceHistory: [
      { date: 'Jul 5', price: 49.99 },
      { date: 'Jul 25', price: 44.50 },
      { date: 'Aug 1', price: 39.98 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-4',
        author: 'Dave R.',
        rating: 5,
        date: 'Yesterday',
        comment: 'Saved our summer patio nights in Florida. Worth every single penny.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'Custom Embroidered Pet Portrait Heavy Tote',
    subtitle: '100% Organic Heavyweight Canvas Daily Carry',
    category: 'Personalized Gifts',
    merchant: 'impact',
    merchantName: 'Etsy Direct (Impact)',
    merchantBadgeText: 'Official Merchant via Impact',
    price: 42.50,
    originalPrice: 55.00,
    currency: '$',
    rating: 4.9,
    reviewCount: 1120,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'Custom hand-stitched line art vector of your exact pet photo with name lettering.',
      'Ultra-durable 18oz double-stitched cotton duck canvas with reinforced handles.'
    ],
    highlights: ['Hand Embroidered', '18oz Heavy Canvas', 'Interior Zip Pocket', 'Custom Photo'],
    editorVerdict: 'The craftsmanship on the embroidery detail is breathtaking. Holds a 16-inch MacBook, water bottle, and grocery haul effortlessly.',
    pros: [
      'Free artwork proof sent to your email within 24 hours',
      'Thick sturdy handles that do not dig into shoulders',
      'Machine washable on gentle cold cycle'
    ],
    cons: [
      'Custom hand-embroidery takes 4-6 business days prior to shipping'
    ],
    specs: {
      'Canvas Weight': '18 oz Heavyweight Cotton',
      'Dimensions': '18" W x 14" H x 6" D',
      'Embroidery Thread': 'Colorfast Rayon Floss',
      'Closure': 'Heavy Brass YKK Zipper'
    },
    asinOrId: 'PET-TOTE-EMB',
    directUrl: 'https://www.impact.com/brand/etsy/custom-pet-tote',
    badge: 'Top Gift 2026',
    priceHistory: [
      { date: 'Jul 10', price: 55.00 },
      { date: 'Jul 28', price: 45.00 },
      { date: 'Aug 1', price: 42.50 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-5',
        author: 'Hannah S.',
        rating: 5,
        date: '5 days ago',
        comment: 'My mom cried when she opened this gift! The embroidery looks identical to our golden retriever.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-5',
    title: 'HigherDOSE Infrared Sauna Blanket v4',
    subtitle: 'At-Home Full-Body Thermal Detox & Recovery',
    category: 'Tech & Wellness',
    merchant: 'impact',
    merchantName: 'HigherDOSE (Impact)',
    merchantBadgeText: 'Official Brand Store via Impact',
    price: 499.00,
    originalPrice: 599.00,
    currency: '$',
    rating: 4.9,
    reviewCount: 3210,
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'FAR Infrared heat technology penetrates deep to sweat out toxins and boost calorie burn.',
      'Embedded tourmaline, clay, and amethyst crystal layer reduces stress and muscle soreness.'
    ],
    highlights: ['Far Infrared Heat', 'Amethyst Layer', 'Non-Toxic PU Leather', 'Low EMF Heating'],
    editorVerdict: 'Provides identical sweat volume and deep physical relaxation to a $75 spa infrared sauna session right on your couch or bed.',
    pros: [
      'Folds away easily into a sleek storage bag',
      'Easy wipe-clean waterproof interior liner',
      'Improves skin glow, blood circulation, and deep restorative sleep'
    ],
    cons: [
      'Higher upfront investment (though pays off in 6 uses vs spa sessions)'
    ],
    specs: {
      'Temperature Range': '104°F - 158°F (Levels 1-8)',
      'EMF Output': 'Low EMF Shielded Wiring',
      'Material': 'Waterproof PU Leather & Amethyst Layer',
      'Voltage': '110V US Plug'
    },
    asinOrId: 'HD-INFRARED-BLANKET',
    directUrl: 'https://www.impact.com/brand/higherdose/infrared-blanket',
    badge: 'Wellness Gold Award',
    priceHistory: [
      { date: 'Jul 1', price: 599.00 },
      { date: 'Jul 18', price: 549.00 },
      { date: 'Aug 1', price: 499.00 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-6',
        author: 'Jessica B.',
        rating: 5,
        date: '1 week ago',
        comment: 'Best wellness purchase I have ever made. Instant tension relief after long workdays.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-6',
    title: 'Insta360 GO 3S 4K Tiny Hands-Free POV Camera',
    subtitle: 'Thumb-Sized 4K Action Camera with Magnet Mount',
    category: 'Viral Trends',
    merchant: 'amazon',
    merchantName: 'Amazon',
    merchantBadgeText: 'Available on Amazon Prime',
    price: 399.99,
    originalPrice: 449.99,
    currency: '$',
    rating: 4.8,
    reviewCount: 1540,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'Wearable magnetic pendant snaps under shirt for effortless hands-free 4K video capture.',
      'FlowState stabilization and Horizon Lock keep footage buttery smooth during running & travel.'
    ],
    highlights: ['4K Ultra HD', 'Magnetic Mount', 'FlowState Stabilization', 'Waterproof 16ft'],
    editorVerdict: 'The ultimate creator tool for seamless POV cooking, travel, and lifestyle clips without holding a bulky camera or phone setup.',
    pros: [
      'Super small size weighs only 39g for invisible chest wear',
      'Action Pod with flip touch screen acts as wireless remote and charger',
      'Apple Find My integration ensures you never lose it'
    ],
    cons: [
      'Standalone camera battery is 38 mins (extends to 140 mins with Action Pod)'
    ],
    specs: {
      'Video Resolution': '4K @ 30fps / 2.7K @ 50fps',
      'Weight': '39.1g (Camera unit)',
      'Waterproofing': '16ft (5m) IPX8',
      'Storage': '128GB Internal Flash'
    },
    asinOrId: 'B0D3X84P11',
    directUrl: 'https://www.amazon.com/dp/B0D3X84P11',
    badge: 'Viral Tech Pick',
    priceHistory: [
      { date: 'Jul 12', price: 449.99 },
      { date: 'Jul 29', price: 419.99 },
      { date: 'Aug 1', price: 399.99 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-7',
        author: 'Alex T.',
        rating: 5,
        date: '4 days ago',
        comment: 'Incredible camera! Captured our entire Japan trip from first-person view without holding anything.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-7',
    title: 'Ember Temperature Control Smart Mug 2',
    subtitle: 'Keep Coffee at Your Exact Preferred Temperature All Day',
    category: 'Home & Utility',
    merchant: 'amazon',
    merchantName: 'Amazon',
    merchantBadgeText: 'Available on Amazon Prime',
    price: 129.95,
    originalPrice: 149.95,
    currency: '$',
    rating: 4.6,
    reviewCount: 6180,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'Maintains hot drinks at exact temperature between 120°F – 145°F for 80 minutes (or all day on coaster).',
      'Smart LED light indicator signals when hot liquid reaches target drinking heat.'
    ],
    highlights: ['Exact Temp Control', 'All-Day Coaster Power', 'App Custom Presets', 'Auto-Sleep Mode'],
    editorVerdict: 'A luxury desk upgrade for remote workers who hate microwave-reheated lukewarm coffee. Works seamlessly right out of the box.',
    pros: [
      'Scratch-resistant ceramic coating feels premium in hand',
      'Auto-sleep turns off automatically when mug is empty',
      'Customizable LED light color in Ember smartphone app'
    ],
    cons: [
      'Hand-wash only (do not place in dishwasher)'
    ],
    specs: {
      'Capacity': '14 oz / 414 ml',
      'Battery Life': '80 Minutes off coaster',
      'Connectivity': 'Bluetooth Smart App Control',
      'Material': 'Stainless Steel with Ceramic Coating'
    },
    asinOrId: 'B07X38L24K',
    directUrl: 'https://www.amazon.com/dp/B07X38L24K',
    badge: 'Top Desk Upgrade',
    priceHistory: [
      { date: 'Jul 1', price: 149.95 },
      { date: 'Jul 15', price: 139.95 },
      { date: 'Aug 1', price: 129.95 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-8',
        author: 'Michael B.',
        rating: 5,
        date: '6 days ago',
        comment: 'Every coffee lover needs this. Never drink cold coffee at your desk again.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-8',
    title: 'Omnilux Contour LED Red Light Face Mask',
    subtitle: 'Dermatologist-Grade Anti-Aging & Collagen Booster',
    category: 'Beauty & Sleep',
    merchant: 'impact',
    merchantName: 'Omnilux (Impact)',
    merchantBadgeText: 'Official Brand Store via Impact',
    price: 395.00,
    originalPrice: 440.00,
    currency: '$',
    rating: 4.9,
    reviewCount: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    whyItWorks: [
      'Clinically proven dual wavelength Red (633nm) and Near-Infrared (830nm) light therapy.',
      'Flexible silicone design contours tightly against skin for maximum photon absorption.'
    ],
    highlights: ['FDA Cleared', 'Dual Wavelength', 'Flexible Silicone', '10-Min Auto Timer'],
    editorVerdict: 'The gold standard home LED mask. Noticeable reduction in redness, fine lines, and acne inflammation within 4 weeks of 10-minute daily sessions.',
    pros: [
      'FDA-cleared medical device with zero UV radiation',
      'Flexible soft silicone lies comfortable flat on face',
      'Rechargeable handheld controller with 10-minute auto timer'
    ],
    cons: [
      'Requires consistent 3-4x weekly usage for full collagen building results'
    ],
    specs: {
      'LED Count': '132 Medical LED Bulbs',
      'Wavelengths': '633nm Red & 830nm Near Infrared',
      'Treatment Time': '10 Minutes per Session',
      'Warranty': '2-Year Manufacturer Warranty'
    },
    asinOrId: 'OMNILUX-CONTOUR-FACE',
    directUrl: 'https://www.impact.com/brand/omnilux/contour-face-mask',
    badge: 'Dermatologist Approved',
    priceHistory: [
      { date: 'Jul 1', price: 440.00 },
      { date: 'Jul 20', price: 410.00 },
      { date: 'Aug 1', price: 395.00 }
    ],
    inStock: true,
    reviews: [
      {
        id: 'rev-9',
        author: 'Evelyn P.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Transformed my skin tone and texture completely. Worth every dollar over spa visits.',
        verified: true
      }
    ]
  }
];

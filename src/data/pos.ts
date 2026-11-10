export type IndustryGroup = "Retail" | "Food & Hospitality" | "Services" | "Health admin";

export interface PosIndustry {
  slug: string;
  name: string;
  group: IndustryGroup;
  valueProp: string;
  capabilities: string[];
  heroTitle: string;
  heroCopy: string;
  problems: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  workflow: { title: string; desc: string }[];
  mockup: {
    screen: string;
    items: { name: string; meta: string; amount: number }[];
    stats: { label: string; value: string }[];
  };
  notes: string[];
  faqs: { q: string; a: string }[];
  suggestedPackage: "pos-basic" | "pos-professional" | "pos-premium" | "custom";
}

const COMMON_FAQ = {
  q: "Is this software already running in other stores?",
  a: "SYNX builds and configures each POS around the business it is for. What you see here are proposed features and concept screens; your final scope is agreed in writing before work begins.",
};

export const POS_INDUSTRIES: PosIndustry[] = [
  {
    slug: "clothing",
    name: "Clothing Stores",
    group: "Retail",
    valueProp: "Bill fast at the counter while sizes, colours and stock stay accurate.",
    capabilities: ["Size & colour variants", "Returns and exchanges", "Daily sales dashboard"],
    heroTitle: "Billing designed for fashion retail.",
    heroCopy:
      "Fast checkout, clear size and colour variants, and an owner dashboard that shows what is actually selling.",
    problems: [
      { title: "Variant confusion", desc: "The same shirt in five sizes and four colours is hard to track on paper." },
      { title: "Slow counters on busy days", desc: "Manual bills create queues during festive and weekend rush." },
      { title: "No clear view of sales", desc: "Owners can't easily see which styles move and which sit on shelves." },
    ],
    features: [
      { title: "Fast billing", desc: "Search or select products and generate a bill in a few taps." },
      { title: "Receipt generation", desc: "Printed or shareable digital receipts with your store details." },
      { title: "Size and colour variants", desc: "Each variant has its own stock count and price if needed." },
      { title: "Inventory tracking", desc: "Stock reduces automatically with each sale." },
      { title: "Cash and UPI recording", desc: "Record how each bill was paid for accurate day-end totals." },
      { title: "Returns and exchanges", desc: "Where included, process exchanges without breaking stock counts." },
      { title: "Sales history", desc: "Look up any past bill by date, product or amount." },
      { title: "Owner reporting", desc: "Daily sales, best sellers and payment-method summaries." },
    ],
    workflow: [
      { title: "Add products", desc: "Create items with their sizes, colours and prices." },
      { title: "Bill the customer", desc: "Select variants, apply any discount, record payment." },
      { title: "Stock updates", desc: "Variant stock reduces with each bill." },
      { title: "Review the day", desc: "The owner sees totals and best sellers at closing." },
    ],
    mockup: {
      screen: "Counter · New bill",
      items: [
        { name: "Linen Shirt", meta: "M · Sky", amount: 1499 },
        { name: "Slim Chinos", meta: "32 · Sand", amount: 1899 },
        { name: "Cotton Tee", meta: "L · Navy", amount: 599 },
      ],
      stats: [
        { label: "Payment", value: "UPI" },
        { label: "Variants in stock", value: "Tracked" },
      ],
    },
    notes: ["Barcode label printing and hardware are scoped separately if required."],
    faqs: [
      {
        q: "Can I manage sizes and colours for every product?",
        a: "Yes. Variants are part of the Professional package and above, each with its own stock count.",
      },
      {
        q: "Do I need special hardware?",
        a: "A computer or tablet is enough to start. Receipt printers and barcode scanners can be added and are purchased separately.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-professional",
  },
  {
    slug: "supermarkets",
    name: "Supermarkets",
    group: "Retail",
    valueProp: "Barcode billing and stock control built for high-volume counters.",
    capabilities: ["Barcode-based billing", "Stock & price updates", "Payment summaries"],
    heroTitle: "High-volume billing without the queue.",
    heroCopy:
      "Scan, bill and move on. Keep thousands of products, prices and discounts organised from one place.",
    problems: [
      { title: "Long checkout lines", desc: "Typing product names at the counter slows every customer." },
      { title: "Price changes everywhere", desc: "Updating prices across a large range is error-prone." },
      { title: "Stock surprises", desc: "Fast movers run out before anyone notices." },
    ],
    features: [
      { title: "Barcode-based billing", desc: "Scan products to add them instantly to the bill." },
      { title: "Product catalogue", desc: "Organise products by category, brand and unit." },
      { title: "Stock management", desc: "Track quantities and spot low-stock items." },
      { title: "Price updates", desc: "Change prices centrally so every counter bills correctly." },
      { title: "Discounts", desc: "Item-level and bill-level discounts with clear records." },
      { title: "Daily transactions", desc: "Every bill recorded with time and payment method." },
      { title: "Payment-method summaries", desc: "Cash, UPI and card totals at day end." },
      { title: "Cashier management", desc: "Where included, track bills by cashier." },
    ],
    workflow: [
      { title: "Load the catalogue", desc: "Import or add products with barcodes and prices." },
      { title: "Scan and bill", desc: "Cashiers scan items and record payment." },
      { title: "Print receipts", desc: "Receipts print on a supported thermal printer." },
      { title: "Close the day", desc: "Payment summaries and stock levels for the owner." },
    ],
    mockup: {
      screen: "Counter 1 · Scanning",
      items: [
        { name: "Basmati Rice 5kg", meta: "8901234 · 1", amount: 649 },
        { name: "Sunflower Oil 1L", meta: "8905678 · 2", amount: 318 },
        { name: "Toor Dal 1kg", meta: "8909012 · 1", amount: 165 },
      ],
      stats: [
        { label: "Items", value: "4" },
        { label: "Payment", value: "Cash + UPI" },
      ],
    },
    notes: [
      "Hardware requirements: a barcode scanner and thermal receipt printer are recommended and purchased separately.",
      "Offline billing availability depends on the deployment chosen and is confirmed during scoping.",
      "Multi-counter setups fall under the Premium package.",
    ],
    faqs: [
      {
        q: "Does it work without internet?",
        a: "Offline capability depends on how the system is deployed. We confirm what works offline during scoping — we won't promise it before then.",
      },
      {
        q: "Can I import my existing product list?",
        a: "Yes, from a spreadsheet. Bulk import is planned as part of setup.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-premium",
  },
  {
    slug: "hotels",
    name: "Hotels",
    group: "Food & Hospitality",
    valueProp: "Restaurant and service billing for hotels, with guest billing scoped separately.",
    capabilities: ["Dining billing", "Order management", "Cashier reporting"],
    heroTitle: "Clear billing for hospitality operations.",
    heroCopy:
      "Start with dining and service billing. Room or guest billing is offered as a separately scoped module — not a full property-management system.",
    problems: [
      { title: "Mixed billing points", desc: "Restaurant, room service and counters billed in different ways." },
      { title: "Cashier reconciliation", desc: "Day-end totals don't match without clear records." },
      { title: "Unclear scope", desc: "Many tools promise everything; hotels need what fits their operation." },
    ],
    features: [
      { title: "Restaurant or dining billing", desc: "Menu-based billing for your in-house restaurant." },
      { title: "Order management", desc: "Track orders from taking to settlement." },
      { title: "Room or guest billing", desc: "A separately scoped module, quoted on its own." },
      { title: "Cashier reporting", desc: "Shift and day-end totals by payment method." },
      { title: "Reservation or occupancy tools", desc: "Only where explicitly scoped and offered in your proposal." },
    ],
    workflow: [
      { title: "Map your billing points", desc: "We list every place your hotel bills customers." },
      { title: "Scope the modules", desc: "Choose dining billing and any separately quoted modules." },
      { title: "Configure and train", desc: "Menus, taxes and staff roles set up." },
      { title: "Go live", desc: "Billing starts with cashier reports from day one." },
    ],
    mockup: {
      screen: "Dining · Table 6",
      items: [
        { name: "Paneer Tikka", meta: "Starter · 1", amount: 320 },
        { name: "Veg Biryani", meta: "Main · 2", amount: 560 },
        { name: "Fresh Lime Soda", meta: "Beverage · 2", amount: 180 },
      ],
      stats: [
        { label: "Order", value: "Settled" },
        { label: "Shift report", value: "Ready" },
      ],
    },
    notes: [
      "SYNX does not offer a complete hotel property-management system (PMS).",
      "Room billing, reservations and occupancy tools are scoped and quoted individually.",
    ],
    faqs: [
      {
        q: "Is this a full hotel management system?",
        a: "No. Dining billing and order management are the core. Guest or room billing is a separately scoped module, and reservations only where explicitly offered.",
      },
      {
        q: "Can it handle room service orders?",
        a: "Room service can be billed through the dining module. Charging it to a room is part of the separately scoped guest billing module.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "custom",
  },
  {
    slug: "restaurants",
    name: "Restaurants & Cafés",
    group: "Food & Hospitality",
    valueProp: "Table orders, takeaway and kitchen tickets in one calm workflow.",
    capabilities: ["Table-based ordering", "Kitchen order tickets", "Dine-in & takeaway"],
    heroTitle: "From table to kitchen to bill, without the chaos.",
    heroCopy:
      "Manage your menu, take table and takeaway orders, and see the day's sales when service ends.",
    problems: [
      { title: "Lost orders", desc: "Handwritten orders get misread or missed during rush hours." },
      { title: "Menu changes", desc: "Prices and items change, but printed menus and bills don't keep up." },
      { title: "End-of-day guesswork", desc: "Totals are calculated manually after a long service." },
    ],
    features: [
      { title: "Menu management", desc: "Categories, items, prices and availability." },
      { title: "Table-based ordering", desc: "Open orders per table and add items as guests order." },
      { title: "Kitchen order tickets", desc: "Where included, send orders to the kitchen clearly." },
      { title: "Dine-in and takeaway", desc: "Bill both from the same counter." },
      { title: "Payment recording", desc: "Cash, UPI and card recorded per bill." },
      { title: "Daily sales summaries", desc: "Sales by item, category and payment method." },
    ],
    workflow: [
      { title: "Set the menu", desc: "Add items and categories with prices." },
      { title: "Take orders", desc: "Open a table or takeaway order." },
      { title: "Kitchen ticket", desc: "Orders reach the kitchen where included." },
      { title: "Settle and review", desc: "Bill, record payment and review the day." },
    ],
    mockup: {
      screen: "Tables · Floor",
      items: [
        { name: "Cappuccino", meta: "T3 · 2", amount: 360 },
        { name: "Masala Omelette", meta: "T3 · 1", amount: 220 },
        { name: "Cold Coffee", meta: "Takeaway · 1", amount: 190 },
      ],
      stats: [
        { label: "Open tables", value: "3" },
        { label: "KOT", value: "Sent" },
      ],
    },
    notes: ["Kitchen printers or displays are hardware purchases scoped separately."],
    faqs: [
      {
        q: "Can I update the menu myself?",
        a: "Yes. Menu items, prices and availability can be updated by the owner.",
      },
      {
        q: "Does it support online food delivery platforms?",
        a: "Integration with delivery platforms is not included by default and would be scoped separately where technically possible.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-professional",
  },
  {
    slug: "salons",
    name: "Salons & Spas",
    group: "Services",
    valueProp: "Appointments, staff and service billing in one tidy system.",
    capabilities: ["Appointments", "Staff management", "Package management"],
    heroTitle: "Bookings and billing for beauty and wellness.",
    heroCopy:
      "Keep appointments organised, know which stylist served whom, and bill services and packages cleanly.",
    problems: [
      { title: "Double bookings", desc: "Paper diaries and phone calls lead to clashing appointments." },
      { title: "Staff performance", desc: "Hard to see services and revenue by staff member." },
      { title: "Forgotten customers", desc: "No easy record of a regular customer's past services." },
    ],
    features: [
      { title: "Service catalogue", desc: "Services with duration and price." },
      { title: "Appointments", desc: "Book, reschedule and view the day's calendar." },
      { title: "Staff management", desc: "Assign services and see work by staff member." },
      { title: "Customer history", desc: "Past services and visits for each customer." },
      { title: "Service billing", desc: "Bill services, products and add-ons together." },
      { title: "Package management", desc: "Prepaid packages with remaining sessions tracked." },
      { title: "Daily revenue tracking", desc: "Totals by service, staff and payment method." },
    ],
    workflow: [
      { title: "Book", desc: "Create an appointment with a service and staff member." },
      { title: "Serve", desc: "Mark the appointment in progress and completed." },
      { title: "Bill", desc: "Bill the service, apply packages, record payment." },
      { title: "Review", desc: "See daily revenue and staff summaries." },
    ],
    mockup: {
      screen: "Today · Appointments",
      items: [
        { name: "Haircut & Styling", meta: "10:30 · Priya", amount: 699 },
        { name: "Facial — Hydrating", meta: "12:00 · Anu", amount: 1499 },
        { name: "Manicure", meta: "15:15 · Rekha", amount: 499 },
      ],
      stats: [
        { label: "Booked", value: "3 slots" },
        { label: "Packages", value: "Tracked" },
      ],
    },
    notes: ["Online self-booking for customers can be scoped as an add-on with a website."],
    faqs: [
      {
        q: "Can customers book online?",
        a: "The core system is for your front desk. A customer booking page can be scoped together with a website.",
      },
      {
        q: "Can I track prepaid packages?",
        a: "Yes. Package sessions used and remaining are tracked per customer.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-professional",
  },
  {
    slug: "dental-clinics",
    name: "Dental Clinics",
    group: "Health admin",
    valueProp: "Front-desk administration: appointments, billing and collections.",
    capabilities: ["Appointment scheduling", "Service billing", "Daily collections"],
    heroTitle: "Calmer front-desk administration for clinics.",
    heroCopy:
      "Scheduling, administrative patient records, service billing and payment history — deliberately without clinical data.",
    problems: [
      { title: "Scheduling by phone", desc: "Appointment books get messy when the clinic is busy." },
      { title: "Payment follow-ups", desc: "Treatments paid in parts are hard to track." },
      { title: "Daily collections", desc: "Reconciling the day's payments takes time." },
    ],
    features: [
      { title: "Appointment scheduling", desc: "Book and manage visits by chair or doctor." },
      { title: "Administrative records", desc: "Name, contact and visit history only." },
      { title: "Service billing", desc: "Bill consultations and procedures by service." },
      { title: "Payment history", desc: "Track part payments and balances." },
      { title: "Daily collections", desc: "Totals by payment method at day end." },
    ],
    workflow: [
      { title: "Schedule", desc: "Book an appointment for the patient." },
      { title: "Visit", desc: "Check in and mark the visit complete." },
      { title: "Bill", desc: "Bill services and record payment or balance." },
      { title: "Collect", desc: "Review daily collections." },
    ],
    mockup: {
      screen: "Front desk · Today",
      items: [
        { name: "Consultation", meta: "09:30 · Chair 1", amount: 500 },
        { name: "Scaling & Polishing", meta: "11:00 · Chair 2", amount: 1800 },
        { name: "Follow-up visit", meta: "16:00 · Chair 1", amount: 300 },
      ],
      stats: [
        { label: "Balances", value: "Tracked" },
        { label: "Clinical data", value: "Not stored" },
      ],
    },
    notes: [
      "Medical records, prescriptions, diagnoses and clinical notes are not included.",
      "Advanced clinical functionality would require a separate privacy, regulatory and security review.",
    ],
    faqs: [
      {
        q: "Can it store treatment notes or prescriptions?",
        a: "No. This system is for administration only. Clinical functionality needs a separate privacy, regulatory and security review before it could be considered.",
      },
      {
        q: "Can patients receive appointment reminders?",
        a: "Reminders by SMS or WhatsApp can be scoped where a provider is configured; they are not included by default.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "custom",
  },
  {
    slug: "general-retail",
    name: "General Retail",
    group: "Retail",
    valueProp: "Dependable billing and stock for everyday neighbourhood stores.",
    capabilities: ["Quick billing", "Stock tracking", "Daily summaries"],
    heroTitle: "Everyday billing, done properly.",
    heroCopy:
      "For stationery, gift, hardware and general stores that want clean bills, simple stock and a clear daily total.",
    problems: [
      { title: "Handwritten bills", desc: "Slow to write and impossible to analyse later." },
      { title: "Unknown stock", desc: "Reordering is guesswork without counts." },
      { title: "Mixed payments", desc: "Cash and UPI totals don't reconcile at closing." },
    ],
    features: [
      { title: "Quick billing", desc: "Fast product search and bill creation." },
      { title: "Receipts", desc: "Printed or digital receipts." },
      { title: "Stock tracking", desc: "Quantities update with every sale." },
      { title: "Low-stock view", desc: "See what needs reordering." },
      { title: "Payment recording", desc: "Cash and UPI recorded per bill." },
      { title: "Daily summaries", desc: "Clear totals at the end of the day." },
    ],
    workflow: [
      { title: "Add products", desc: "Enter items and prices." },
      { title: "Bill", desc: "Create bills and record payment." },
      { title: "Track", desc: "Stock updates automatically." },
      { title: "Close", desc: "Review the day's totals." },
    ],
    mockup: {
      screen: "Counter · New bill",
      items: [
        { name: "A4 Notebook", meta: "Qty 3", amount: 270 },
        { name: "Gel Pen Pack", meta: "Qty 1", amount: 120 },
        { name: "Gift Wrap", meta: "Qty 2", amount: 80 },
      ],
      stats: [
        { label: "Low stock", value: "Flagged" },
        { label: "Payment", value: "Cash" },
      ],
    },
    notes: ["Start with Basic and upgrade as needs grow."],
    faqs: [
      {
        q: "Is Basic enough for a small store?",
        a: "Basic covers billing, receipts and daily summaries. If you want stock tracking, Professional is the better fit.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-basic",
  },
  {
    slug: "electronics",
    name: "Electronics Stores",
    group: "Retail",
    valueProp: "Track models, serial numbers and warranties alongside every bill.",
    capabilities: ["Model & serial tracking", "Warranty reference", "Sales history"],
    heroTitle: "Billing that keeps up with every model number.",
    heroCopy:
      "Record models and serial numbers on the bill so warranty and service questions are answered in seconds.",
    problems: [
      { title: "Warranty lookups", desc: "Finding when and to whom a device was sold takes too long." },
      { title: "High-value stock", desc: "Each unit matters; counts must be exact." },
      { title: "Accessory upsells", desc: "Bundles and accessories are hard to track on paper." },
    ],
    features: [
      { title: "Model catalogue", desc: "Brands, models and specifications." },
      { title: "Serial number on bill", desc: "Where included, capture serials for each unit sold." },
      { title: "Warranty reference", desc: "Look up sale date for warranty claims." },
      { title: "Inventory tracking", desc: "Unit-level stock for high-value items." },
      { title: "Sales history", desc: "Search by customer phone, model or serial." },
      { title: "Owner reporting", desc: "Sales by brand and category." },
    ],
    workflow: [
      { title: "Add models", desc: "Create products with specs and prices." },
      { title: "Sell", desc: "Bill the unit and capture its serial." },
      { title: "Look up", desc: "Find any sale by serial or phone." },
      { title: "Report", desc: "Review brand and category performance." },
    ],
    mockup: {
      screen: "Counter · New bill",
      items: [
        { name: "Wireless Earbuds", meta: "SN · EB21-0457", amount: 2499 },
        { name: "Type-C Charger 25W", meta: "Accessory", amount: 899 },
        { name: "Screen Guard", meta: "Accessory", amount: 299 },
      ],
      stats: [
        { label: "Serials", value: "Captured" },
        { label: "Warranty lookup", value: "By phone" },
      ],
    },
    notes: ["Manufacturer warranty processing itself is outside the system's scope."],
    faqs: [
      {
        q: "Can I search a sale by serial number?",
        a: "Yes, when serial capture is included in your scope.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-professional",
  },
  {
    slug: "boutiques",
    name: "Boutiques",
    group: "Retail",
    valueProp: "Elegant billing for designer pieces, alterations and loyal clients.",
    capabilities: ["Client history", "Alteration notes", "Custom branding"],
    heroTitle: "Billing as considered as your collection.",
    heroCopy:
      "For designer and occasion-wear boutiques: branded receipts, client purchase history and alteration notes on every order.",
    problems: [
      { title: "One-of-a-kind pieces", desc: "Unique items need precise records, not generic stock counts." },
      { title: "Alterations", desc: "Measurements and delivery dates get lost between staff." },
      { title: "Client relationships", desc: "Regular clients expect you to remember their preferences." },
    ],
    features: [
      { title: "Branded receipts", desc: "Receipts that match your boutique's identity." },
      { title: "Client history", desc: "Past purchases for every regular client." },
      { title: "Alteration notes", desc: "Where included, notes and promised dates per order." },
      { title: "Piece-level stock", desc: "Track individual designer pieces." },
      { title: "Payment recording", desc: "Advances and balances on custom orders." },
      { title: "Owner reporting", desc: "Sales by collection and designer." },
    ],
    workflow: [
      { title: "Catalogue pieces", desc: "Add each piece with its details." },
      { title: "Sell or order", desc: "Bill ready pieces or take a custom order." },
      { title: "Track alterations", desc: "Record notes and delivery dates." },
      { title: "Hand over", desc: "Settle balance and close the order." },
    ],
    mockup: {
      screen: "Client · Order",
      items: [
        { name: "Silk Saree — Ivory", meta: "Piece #B-112", amount: 18500 },
        { name: "Blouse Stitching", meta: "Ready 24 Nov", amount: 1800 },
        { name: "Fall & Pico", meta: "Alteration", amount: 250 },
      ],
      stats: [
        { label: "Advance", value: "Recorded" },
        { label: "Receipt", value: "Branded" },
      ],
    },
    notes: ["Custom branding is part of the Premium package."],
    faqs: [
      {
        q: "Can receipts carry my boutique's branding?",
        a: "Yes. Custom branding is included in Premium and can be scoped for other packages.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-premium",
  },
  {
    slug: "pharmacy",
    name: "Pharmacies",
    group: "Health admin",
    valueProp: "Retail billing and stock for the shop counter — not regulated dispensing.",
    capabilities: ["Retail billing", "Batch & expiry reference", "Stock alerts"],
    heroTitle: "Retail billing for the pharmacy counter.",
    heroCopy:
      "Clean bills, stock levels and expiry references for over-the-counter retail. Regulated dispensing is not part of this offering.",
    problems: [
      { title: "Expiry tracking", desc: "Expired stock on shelves is a costly mistake." },
      { title: "Many similar items", desc: "Products with similar names need clear, searchable records." },
      { title: "Day-end totals", desc: "Mixed payment methods complicate closing." },
    ],
    features: [
      { title: "Retail billing", desc: "Fast billing with product search." },
      { title: "Batch and expiry reference", desc: "Where included, record batch and expiry per stock entry." },
      { title: "Stock alerts", desc: "See low-stock and near-expiry items." },
      { title: "Payment recording", desc: "Cash, UPI and card totals." },
      { title: "Sales history", desc: "Search past bills by date or product." },
    ],
    workflow: [
      { title: "Stock in", desc: "Add items with batch and expiry where included." },
      { title: "Bill", desc: "Search, bill and record payment." },
      { title: "Monitor", desc: "Review low-stock and near-expiry lists." },
      { title: "Close", desc: "Daily totals for the owner." },
    ],
    mockup: {
      screen: "Counter · Retail bill",
      items: [
        { name: "Hand Sanitizer 500ml", meta: "Batch HS24 · Exp 08/27", amount: 240 },
        { name: "Digital Thermometer", meta: "Retail", amount: 349 },
        { name: "Cotton Roll 100g", meta: "Retail", amount: 85 },
      ],
      stats: [
        { label: "Near expiry", value: "Listed" },
        { label: "Dispensing", value: "Not included" },
      ],
    },
    notes: [
      "Regulated pharmacy dispensing, prescription handling and compliance reporting are not included.",
      "Any regulated functionality would require a separately defined, compliant implementation.",
    ],
    faqs: [
      {
        q: "Does it handle prescriptions and regulated dispensing?",
        a: "No. This is retail billing and stock only. Regulated functionality would need a separately defined, compliant implementation.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "custom",
  },
  {
    slug: "fitness",
    name: "Gyms & Fitness Studios",
    group: "Services",
    valueProp: "Memberships, renewals and collections without spreadsheets.",
    capabilities: ["Membership plans", "Renewal tracking", "Collections"],
    heroTitle: "Memberships and renewals, organised.",
    heroCopy:
      "Know who is active, who is due for renewal and what was collected this month — at a glance.",
    problems: [
      { title: "Missed renewals", desc: "Expired memberships go unnoticed for weeks." },
      { title: "Plan variety", desc: "Monthly, quarterly and personal-training plans get complicated." },
      { title: "Collections", desc: "Hard to see the month's collections clearly." },
    ],
    features: [
      { title: "Membership plans", desc: "Define plans with duration and price." },
      { title: "Member records", desc: "Contact details and plan history." },
      { title: "Renewal tracking", desc: "See upcoming and overdue renewals." },
      { title: "Billing", desc: "Bill memberships, PT sessions and products." },
      { title: "Collections", desc: "Daily and monthly collection summaries." },
    ],
    workflow: [
      { title: "Set plans", desc: "Create your membership options." },
      { title: "Enroll", desc: "Add a member and bill their plan." },
      { title: "Renew", desc: "Follow up on upcoming renewals." },
      { title: "Review", desc: "See collections for the period." },
    ],
    mockup: {
      screen: "Members · Renewals",
      items: [
        { name: "Quarterly Plan", meta: "Renews in 3 days", amount: 4500 },
        { name: "Monthly Plan", meta: "Due today", amount: 1600 },
        { name: "PT · 8 sessions", meta: "5 remaining", amount: 6000 },
      ],
      stats: [
        { label: "Due this week", value: "Listed" },
        { label: "Attendance", value: "Optional module" },
      ],
    },
    notes: ["Attendance or access-control hardware integration is scoped separately."],
    faqs: [
      {
        q: "Can members be reminded about renewals?",
        a: "The system lists upcoming renewals. Automated SMS or WhatsApp reminders can be scoped where a provider is configured.",
      },
      COMMON_FAQ,
    ],
    suggestedPackage: "pos-professional",
  },
];

export const INDUSTRY_GROUPS: ("All" | IndustryGroup)[] = [
  "All",
  "Retail",
  "Food & Hospitality",
  "Services",
  "Health admin",
];

export const getIndustry = (slug: string) => POS_INDUSTRIES.find((i) => i.slug === slug);

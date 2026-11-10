export interface WebsiteService {
  slug: "business" | "catalogue" | "ecommerce" | "seo-domains";
  name: string;
  short: string;
  heroTitle: string;
  heroCopy: string;
  idealFor: string[];
  includes: { title: string; desc: string }[];
  process: string[];
  notes: string[];
  faqs: { q: string; a: string }[];
  packageHint: string;
}

export const WEBSITE_SERVICES: WebsiteService[] = [
  {
    slug: "business",
    name: "Business & Corporate Websites",
    short: "Premium landing pages and company websites that make a credible first impression.",
    heroTitle: "A website that represents your business properly.",
    heroCopy:
      "Clear structure, refined typography and fast pages — designed so customers understand what you do and how to reach you within seconds.",
    idealFor: ["Service businesses", "Consultancies and agencies", "Local brands", "New ventures"],
    includes: [
      { title: "Premium landing pages", desc: "Focused pages built around one clear action." },
      { title: "Company websites", desc: "Home, about, services and contact with a consistent system." },
      { title: "Mobile-responsive layouts", desc: "Designed for phones first, refined for large screens." },
      { title: "Contact forms", desc: "Inquiry forms with validation and spam protection." },
      { title: "Services pages", desc: "Each service explained on its own shareable page." },
      { title: "Professional typography", desc: "A type system that reads well and feels considered." },
      { title: "SEO foundations", desc: "Titles, descriptions, headings and clean page structure." },
      { title: "Performance optimization", desc: "Optimized images and lean pages for fast loading." },
    ],
    process: ["Content and structure", "Visual direction", "Build and review", "Launch"],
    notes: ["Domain registration and hosting fees are separate where applicable."],
    faqs: [
      {
        q: "Do I need to provide the content?",
        a: "We work from the information you share about your business and help structure it. Professional copywriting or photography can be scoped separately.",
      },
      {
        q: "Can I update the website later?",
        a: "Yes. Content updates can be handled through a website care plan, or an editing setup can be scoped for your team.",
      },
      {
        q: "How long does a business website take?",
        a: "It depends on the number of pages and how quickly content is ready. A timeline is agreed in the proposal before work begins.",
      },
    ],
    packageHint: "Usually Launch or Growth",
  },
  {
    slug: "catalogue",
    name: "Premium Product Catalogue Websites",
    short: "Elegant online catalogues for brands that sell through inquiries rather than checkout.",
    heroTitle: "Show your full range. Take inquiries, not payments.",
    heroCopy:
      "For wholesalers, manufacturers, showrooms and brands that need a polished online catalogue without a standard online checkout.",
    idealFor: ["Wholesalers", "Manufacturers", "Showrooms", "Brands selling through dealers"],
    includes: [
      { title: "Product collections", desc: "Curated groupings that mirror how you sell." },
      { title: "Categories", desc: "Clear navigation across large product ranges." },
      { title: "High-quality product images", desc: "Galleries that present products at their best." },
      { title: "Product detail pages", desc: "Specifications, variants and downloadable details." },
      { title: "Search and filtering", desc: "Where appropriate for the size of your catalogue." },
      { title: "Inquiry and quotation workflows", desc: "Customers request a quote for specific products." },
      { title: "WhatsApp contact", desc: "Direct product inquiries on WhatsApp, if requested." },
    ],
    process: ["Catalogue structure", "Product data and images", "Design and build", "Launch"],
    notes: [
      "Product photography is not included unless scoped.",
      "Domain registration and hosting fees are separate where applicable.",
    ],
    faqs: [
      {
        q: "How many products can the catalogue hold?",
        a: "Catalogues are planned around your actual range. Very large catalogues may need bulk import, which is scoped in the proposal.",
      },
      {
        q: "Can customers buy directly?",
        a: "A catalogue website focuses on inquiries. If you want online payments, an e-commerce website is the right fit.",
      },
    ],
    packageHint: "Usually Growth",
  },
  {
    slug: "ecommerce",
    name: "E-Commerce Websites",
    short: "Online storefronts with cart, checkout, payments and order management — scoped and tested.",
    heroTitle: "An online store built around how you actually sell.",
    heroCopy:
      "A responsive shopping experience with secure checkout and store management. Payment processing and commerce operations are quoted and tested per project.",
    idealFor: ["Retail brands", "D2C businesses", "Stores moving online", "Specialty sellers"],
    includes: [
      { title: "Product catalogue", desc: "Products, categories and collections." },
      { title: "Cart and checkout", desc: "A clear, mobile-friendly purchase flow." },
      { title: "Secure payment integration", desc: "With an approved payment provider of your choice." },
      { title: "Orders", desc: "Order records and status updates for the store owner." },
      { title: "Customer accounts", desc: "Where needed for repeat purchases and order history." },
      { title: "Product variants", desc: "Sizes, colours and options with their own stock." },
      { title: "Store-owner management", desc: "Manage products, prices and orders yourself." },
      { title: "Responsive shopping", desc: "Designed for customers browsing on their phones." },
    ],
    process: ["Store planning", "Payment-provider approval", "Design and build", "Test orders", "Launch"],
    notes: [
      "Payment-provider transaction fees are charged by the provider, not SYNX.",
      "Complex logistics and custom ERP integrations are quoted separately.",
    ],
    faqs: [
      {
        q: "Which payment providers can you integrate?",
        a: "We integrate an Indian payment provider that approves your business. Approval, KYC and transaction fees are handled with the provider directly.",
      },
      {
        q: "Is shipping included?",
        a: "Basic shipping options can be configured. Courier integrations and complex logistics are scoped separately.",
      },
      {
        q: "Will the store be tested before launch?",
        a: "Yes. Checkout, payments and order records are tested end to end before the store goes live.",
      },
    ],
    packageHint: "Commerce",
  },
  {
    slug: "seo-domains",
    name: "Domain, SEO & Website Care",
    short: "Domains, DNS, HTTPS, technical SEO and ongoing maintenance handled properly.",
    heroTitle: "The technical foundations, handled with care.",
    heroCopy:
      "From choosing a domain to keeping your website fast, secure and up to date. We improve how search engines understand your site — we never guarantee rankings or traffic.",
    idealFor: ["New websites", "Existing websites that need care", "Businesses changing domains"],
    includes: [
      { title: "Domain selection assistance", desc: "Help choosing a clear, available domain." },
      { title: "Domain connection and DNS", desc: "Correct DNS configuration for website and email." },
      { title: "Hosting configuration", desc: "Set up and verified on a suitable host." },
      { title: "HTTPS setup", desc: "Secure connections on every page." },
      { title: "Search-friendly structure", desc: "Clean URLs, headings and internal linking." },
      { title: "Metadata optimization", desc: "Titles and descriptions for every important page." },
      { title: "Sitemap and robots", desc: "Configured so search engines can crawl properly." },
      { title: "Search Console setup", desc: "Verification and monitoring with Google Search Console." },
      { title: "Technical SEO audits", desc: "A clear report of issues and fixes." },
      { title: "Core Web Vitals", desc: "Speed and stability improvements." },
      { title: "Maintenance plans", desc: "Content updates, backups and security support." },
    ],
    process: ["Audit", "Fix foundations", "Monitor", "Maintain"],
    notes: [
      "Domain registration, renewal, external hosting fees and paid tools are separate costs.",
      "SEO work improves foundations; no ranking or traffic outcome is guaranteed.",
    ],
    faqs: [
      {
        q: "Can you guarantee first-page Google rankings?",
        a: "No one can honestly guarantee rankings. We fix technical foundations and structure so your website is properly understood by search engines.",
      },
      {
        q: "Who owns the domain?",
        a: "The domain is registered in your business's name. You keep full ownership.",
      },
    ],
    packageHint: "Website care from ₹499/month",
  },
];

export const getWebsiteService = (slug: string) => WEBSITE_SERVICES.find((s) => s.slug === slug);

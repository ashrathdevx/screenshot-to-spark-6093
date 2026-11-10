import { formatINR } from "@/lib/site";

export type ServiceKey = "pos" | "ai-saas" | "websites" | "unified" | "not-sure";

export const SERVICE_OPTIONS: { value: ServiceKey; label: string }[] = [
  { value: "pos", label: "POS & Business Software" },
  { value: "ai-saas", label: "AI SaaS & Automation" },
  { value: "websites", label: "Websites & Digital Experiences" },
  { value: "unified", label: "Unified Commerce" },
  { value: "not-sure", label: "Not sure yet" },
];

export interface Price {
  amount: number;
  /** "From ₹X" — final price depends on scope */
  from?: boolean;
  /** "₹X+" — starting point for larger scopes */
  plus?: boolean;
}

export interface Package {
  id: string;
  service: Exclude<ServiceKey, "not-sure" | "ai-saas">;
  name: string;
  summary: string;
  setup: Price | null;
  monthly: Price | null;
  monthlyLabel?: string;
  recommended?: boolean;
  includes: string[];
  excludes: string[];
}

export const formatPrice = (p: Price) => {
  const value = formatINR(p.amount);
  if (p.from) return `From ${value}`;
  if (p.plus) return `${value}+`;
  return value;
};

export const POS_PACKAGES: Package[] = [
  {
    id: "pos-basic",
    service: "pos",
    name: "Basic",
    summary: "Essential billing for a single store getting started with digital records.",
    setup: { amount: 4999 },
    monthly: { amount: 499 },
    monthlyLabel: "per month",
    includes: [
      "Billing and receipts",
      "Daily sales summary",
      "Basic customer support",
      "Single-store use",
    ],
    excludes: [
      "Inventory management",
      "Hardware such as printers, scanners or cash drawers",
    ],
  },
  {
    id: "pos-professional",
    service: "pos",
    name: "Professional",
    summary: "Billing plus stock, variants and owner visibility for growing stores.",
    setup: { amount: 9999 },
    monthly: { amount: 999 },
    monthlyLabel: "per month",
    recommended: true,
    includes: [
      "Everything in Basic",
      "Inventory management",
      "Product variants where relevant",
      "Returns and exchanges where relevant",
      "Daily sales dashboard",
      "Owner access",
    ],
    excludes: ["Multi-counter setup", "Hardware such as printers, scanners or cash drawers"],
  },
  {
    id: "pos-premium",
    service: "pos",
    name: "Premium",
    summary: "Advanced reporting and scoped custom features for established businesses.",
    setup: { amount: 19999, plus: true },
    monthly: { amount: 1999, plus: true },
    monthlyLabel: "per month",
    includes: [
      "Everything in Professional",
      "Advanced reports",
      "Multi-counter support where required",
      "Custom branding",
      "Priority support",
      "Custom feature scoping",
    ],
    excludes: [
      "Custom features are quoted after a written scope",
      "Hardware such as printers, scanners or cash drawers",
    ],
  },
];

export const WEBSITE_PACKAGES: Package[] = [
  {
    id: "web-launch",
    service: "websites",
    name: "Launch",
    summary: "For small businesses that need a professional online presence.",
    setup: { amount: 12999, from: true },
    monthly: { amount: 499, from: true },
    monthlyLabel: "website care per month",
    includes: [
      "Responsive business website",
      "Up to five primary pages",
      "Contact links",
      "Basic inquiry form",
      "Foundational on-page SEO",
      "Basic deployment assistance",
    ],
    excludes: [
      "Domain registration and renewal",
      "Third-party hosting fees",
      "Online checkout and payments",
    ],
  },
  {
    id: "web-growth",
    service: "websites",
    name: "Growth",
    summary: "For businesses requiring stronger branding and a larger digital presence.",
    setup: { amount: 29999, from: true },
    monthly: { amount: 1499, from: true },
    monthlyLabel: "website care per month",
    recommended: true,
    includes: [
      "Custom visual direction",
      "Enhanced animations",
      "Up to ten core pages",
      "Product or service catalogue",
      "Inquiry management",
      "Advanced on-page SEO setup",
      "Performance optimization",
    ],
    excludes: [
      "Domain registration and renewal",
      "Third-party hosting or paid tools",
      "Online checkout and payments",
    ],
  },
  {
    id: "web-commerce",
    service: "websites",
    name: "Commerce",
    summary: "For businesses requiring a full online selling experience.",
    setup: { amount: 59999, from: true },
    monthly: { amount: 2999, from: true },
    monthlyLabel: "website care per month",
    includes: [
      "E-commerce storefront",
      "Product and category management",
      "Cart and checkout",
      "Payment-provider integration subject to approval",
      "Order management",
      "Store administration",
      "Technical SEO foundations",
    ],
    excludes: [
      "Payment-provider transaction fees",
      "Complex logistics and custom ERP integrations",
      "Domain, hosting and paid tool costs",
    ],
  },
];

export const UNIFIED_PACKAGES: Package[] = [
  {
    id: "connect-starter",
    service: "unified",
    name: "Connect Starter",
    summary:
      "For a physical store that wants to establish an online presence: an initial POS setup plus a professional catalogue or business website.",
    setup: null,
    monthly: null,
    includes: [
      "Initial POS setup for your store",
      "Professional catalogue or business website",
      "Consistent branding across store and web",
    ],
    excludes: ["Automatic stock sync between store and website"],
  },
  {
    id: "connect-growth",
    service: "unified",
    name: "Connect Growth",
    summary:
      "For businesses that need in-store billing and an online storefront, planned as two parts of one business workflow.",
    setup: null,
    monthly: null,
    recommended: true,
    includes: [
      "In-store billing software",
      "Online storefront with orders",
      "A shared product structure planned from day one",
      "Owner view across store and online orders",
    ],
    excludes: ["Real-time inventory sync unless scoped and implemented"],
  },
  {
    id: "connect-custom",
    service: "unified",
    name: "Connect Custom",
    summary: "For businesses requiring advanced integration across channels and locations.",
    setup: null,
    monthly: null,
    includes: [
      "Connected product data",
      "Shared inventory, when implemented",
      "Online order management",
      "Multi-location requirements",
      "Business-specific dashboards",
      "Advanced reporting",
    ],
    excludes: ["Every integration is scoped, quoted and tested per project"],
  },
];

export const ALL_PACKAGES = [...POS_PACKAGES, ...WEBSITE_PACKAGES, ...UNIFIED_PACKAGES];

export const packagesForService = (service: ServiceKey | undefined) =>
  ALL_PACKAGES.filter((p) => p.service === service);

export const PRICING_NOTE =
  "Final pricing depends on specifications, integrations and deployment requirements. Some industries require a custom quotation.";

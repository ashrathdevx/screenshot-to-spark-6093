export const SITE = {
  name: "SYNX",
  statement: "Built to Move Business Forward.",
  tagline: "Software. Commerce. Digital Experiences.",
  contactName: "Shaik Ashrath",
  phoneDisplay: "+91 7680876505",
  phoneHref: "tel:+917680876505",
  email: "synexis96@gmail.com",
  emailHref: "mailto:synexis96@gmail.com",
  whatsappHref: "https://wa.me/917680876505",
} as const;

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

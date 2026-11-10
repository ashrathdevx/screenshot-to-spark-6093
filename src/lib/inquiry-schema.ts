import { z } from "zod";

export const INDUSTRY_OPTIONS = [
  "Clothing Stores",
  "Supermarkets",
  "Hotels",
  "Restaurants & Cafés",
  "Salons & Spas",
  "Dental Clinics",
  "General Retail",
  "Electronics Stores",
  "Boutiques",
  "Pharmacies",
  "Gyms & Fitness Studios",
  "Other",
] as const;

export const CONTACT_METHODS = [
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;

const phoneRegex = /^\+?[0-9\s-]{8,20}$/;

export const inquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(100),
    businessName: z.string().trim().min(2, "Please enter your business name").max(120),
    phone: z
      .string()
      .trim()
      .regex(phoneRegex, "Enter a valid phone number, e.g. +91 98765 43210"),
    email: z
      .string()
      .trim()
      .max(254)
      .email("Enter a valid email address")
      .or(z.literal(""))
      .optional(),
    industry: z.string().min(1, "Select your industry").max(60),
    service: z.string().min(1, "Select a service").max(60),
    package: z.string().max(60).optional(),
    requirements: z
      .string()
      .trim()
      .min(10, "Tell us a little more (at least 10 characters)")
      .max(2000, "Please keep it under 2000 characters"),
    preferredContact: z.enum(["phone", "whatsapp", "email"], {
      errorMap: () => ({ message: "Choose how we should contact you" }),
    }),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please agree to be contacted about your inquiry" }),
    }),
  })
  .refine((v) => v.preferredContact !== "email" || (v.email && v.email.length > 0), {
    path: ["email"],
    message: "Add an email address to be contacted by email",
  });

export type InquiryInput = z.infer<typeof inquirySchema>;

/** Server payload: form fields plus anti-spam signals */
export const inquiryServerSchema = z.object({
  values: inquirySchema,
  website: z.string().max(200).optional(), // honeypot — must stay empty
  elapsedMs: z.number().int().nonnegative(),
});

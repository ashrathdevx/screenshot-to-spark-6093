import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { inquiryServerSchema } from "./inquiry-schema";

type Result = { ok: true } | { ok: false; error: string };

async function sha256(input: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquiryServerSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    // Spam protection: hidden honeypot field and a minimum fill time.
    if (data.website && data.website.length > 0) {
      return { ok: false, error: "Your inquiry could not be accepted." };
    }
    if (data.elapsedMs < 3000) {
      return { ok: false, error: "That was quick — please review your details and submit again." };
    }

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      console.error("[inquiry] backend configuration missing");
      return { ok: false, error: "Inquiries are temporarily unavailable. Please call or WhatsApp us." };
    }

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const ua = getRequestHeader("user-agent") ?? "";
    const sourceHash = await sha256(`${ip}|${ua}`);

    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const v = data.values;
    const { error } = await supabase.rpc("submit_inquiry", {
      _full_name: v.fullName,
      _business_name: v.businessName,
      _phone: v.phone.replace(/\s+/g, " "),
      _email: v.email ?? "",
      _industry: v.industry,
      _service: v.service,
      _package: v.package ?? "",
      _requirements: v.requirements,
      _preferred_contact: v.preferredContact,
      _consent: v.consent,
      _source_hash: sourceHash,
    });

    if (error) {
      if (error.message.includes("rate_limited")) {
        return {
          ok: false,
          error: "We've received several inquiries from you recently. Please try again later or contact us directly.",
        };
      }
      console.error("[inquiry] save failed", error.message);
      return { ok: false, error: "We couldn't save your inquiry. Please try again or contact us directly." };
    }

    return { ok: true };
  });

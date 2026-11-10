import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { packagesForService, SERVICE_OPTIONS, type ServiceKey } from "@/data/pricing";
import { CONTACT_METHODS, INDUSTRY_OPTIONS, inquirySchema, type InquiryInput } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiry.functions";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}

const fieldClass =
  "h-12 rounded-xl border-border bg-background px-4 text-[1rem] shadow-none focus-visible:ring-2 focus-visible:ring-ring";

export function InquiryForm({
  defaultService,
  defaultPackage,
}: {
  defaultService?: ServiceKey | undefined;
  defaultPackage?: string | undefined;
}) {
  const submit = useServerFn(submitInquiry);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      phone: "",
      email: "",
      industry: "",
      service: defaultService ?? "",
      package: defaultPackage ?? "",
      requirements: "",
      preferredContact: "whatsapp",
      consent: false as unknown as true,
    },
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Keep preselection in sync when arriving from a pricing card
  useEffect(() => {
    if (defaultService) setValue("service", defaultService);
    setValue("package", defaultPackage ?? "");
  }, [defaultService, defaultPackage, setValue]);

  const service = watch("service") as ServiceKey | "";
  const packages = packagesForService(service || undefined);

  const onSubmit = async (values: InquiryInput) => {
    setServerError(null);
    try {
      const res = await submit({
        data: { values, website: honeypot, elapsedMs: Date.now() - startedAt.current },
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setServerError(res.error);
      }
    } catch {
      setServerError("We couldn't save your inquiry. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="surface-card flex flex-col items-start p-8 md:p-10">
        <CheckCircle2 className="size-10 text-steel" aria-hidden />
        <h3 className="text-h3 mt-6">Thank you — your inquiry has been received.</h3>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Your details were saved securely. SYNX will review your requirements and reach out using your preferred
          contact method. For anything urgent, call or WhatsApp directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="navy">
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden /> WhatsApp
            </a>
          </Button>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another inquiry
          </Button>
        </div>
      </div>
    );
  }

  const describe = (name: keyof InquiryInput) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="surface-card p-6 sm:p-8 md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            className={cn(fieldClass, "mt-2")}
            aria-invalid={!!errors.fullName}
            aria-describedby={describe("fullName")}
            {...register("fullName")}
          />
          <FieldError id="fullName-error" message={errors.fullName?.message} />
        </div>
        <div>
          <Label htmlFor="businessName">Business name</Label>
          <Input
            id="businessName"
            autoComplete="organization"
            className={cn(fieldClass, "mt-2")}
            aria-invalid={!!errors.businessName}
            aria-describedby={describe("businessName")}
            {...register("businessName")}
          />
          <FieldError id="businessName-error" message={errors.businessName?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            className={cn(fieldClass, "mt-2")}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
        <div>
          <Label htmlFor="email">
            Email address <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className={cn(fieldClass, "mt-2")}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="industry">Business industry</Label>
          <Controller
            control={control}
            name="industry"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="industry"
                  className={cn(fieldClass, "mt-2 w-full")}
                  aria-invalid={!!errors.industry}
                  aria-describedby={describe("industry")}
                >
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRY_OPTIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError id="industry-error" message={errors.industry?.message} />
        </div>
        <div>
          <Label htmlFor="service">Interested service</Label>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  setValue("package", "");
                }}
              >
                <SelectTrigger
                  id="service"
                  className={cn(fieldClass, "mt-2 w-full")}
                  aria-invalid={!!errors.service}
                  aria-describedby={describe("service")}
                >
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError id="service-error" message={errors.service?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="package">
            Interested package <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Controller
            control={control}
            name="package"
            render={({ field }) => (
              <Select
                value={field.value || "none"}
                onValueChange={(v) => field.onChange(v === "none" ? "" : v)}
                disabled={packages.length === 0}
              >
                <SelectTrigger id="package" className={cn(fieldClass, "mt-2 w-full")}>
                  <SelectValue
                    placeholder={packages.length ? "Select package" : "Choose a service with packages first"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Not sure yet</SelectItem>
                  {packages.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="requirements">Project requirements</Label>
          <Textarea
            id="requirements"
            rows={5}
            placeholder="What does your business do, and what would you like to improve?"
            className="mt-2 min-h-36 rounded-xl border-border bg-background px-4 py-3 text-[1rem] shadow-none"
            aria-invalid={!!errors.requirements}
            aria-describedby={describe("requirements")}
            {...register("requirements")}
          />
          <FieldError id="requirements-error" message={errors.requirements?.message} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium">Preferred contact method</legend>
          <Controller
            control={control}
            name="preferredContact"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="mt-3 flex flex-wrap gap-3"
                aria-describedby={describe("preferredContact")}
              >
                {CONTACT_METHODS.map((m) => (
                  <Label
                    key={m.value}
                    htmlFor={`contact-${m.value}`}
                    className={cn(
                      "flex h-11 cursor-pointer items-center gap-2.5 rounded-full border px-4 text-[0.9375rem] font-normal transition-colors",
                      field.value === m.value ? "border-navy bg-muted" : "border-border",
                    )}
                  >
                    <RadioGroupItem id={`contact-${m.value}`} value={m.value} />
                    {m.label}
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
          <FieldError id="preferredContact-error" message={errors.preferredContact?.message} />
        </fieldset>

        {/* Honeypot: hidden from people, tempting for bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={field.value === true}
                  onCheckedChange={(c) => field.onChange(c === true)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={describe("consent")}
                  className="mt-0.5 size-5"
                />
                <Label htmlFor="consent" className="text-[0.9375rem] font-normal leading-relaxed text-muted-foreground">
                  I agree to be contacted by SYNX about this inquiry using the details I've provided.
                </Label>
              </div>
            )}
          />
          <FieldError id="consent-error" message={errors.consent?.message} />
        </div>
      </div>

      {serverError && (
        <div role="alert" className="mt-8 rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-[0.9375rem]">
          <p className="text-destructive">{serverError}</p>
          <p className="mt-2 text-muted-foreground">
            You can also reach SYNX directly:{" "}
            <a className="underline underline-offset-4" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>{" "}
            ·{" "}
            <a className="underline underline-offset-4" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Prefer to talk?{" "}
          <a href={SITE.phoneHref} className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline">
            <Phone className="size-3.5" aria-hidden /> {SITE.phoneDisplay}
          </a>
        </p>
        <Button type="submit" variant="navy" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            "Send inquiry"
          )}
        </Button>
      </div>
    </form>
  );
}

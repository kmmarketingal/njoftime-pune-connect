import { MessageCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppLink } from "@/lib/jobs";

const schema = z.object({
  firstName: z.string().trim().min(2, { message: "Shkruaj emrin (min. 2 karaktere)" }).max(60),
  lastName: z.string().trim().min(2, { message: "Shkruaj mbiemrin (min. 2 karaktere)" }).max(60),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Shkruaj një numër telefoni të vlefshëm" })
    .max(25)
    .regex(/^[0-9+\s()-]+$/, { message: "Numri i telefonit ka karaktere të pavlefshme" }),
  city: z.string().trim().min(2, { message: "Shkruaj qytetin" }).max(60),
  message: z.string().trim().max(800, { message: "Mesazhi është shumë i gjatë" }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const EMPTY = { firstName: "", lastName: "", phone: "", city: "", message: "" };

export function ApplyForm({ jobTitle }: { jobTitle: string }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});

  function set(key: keyof typeof EMPTY, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Plotëso saktë fushat e formularit");
      return;
    }

    setErrors({});
    const url = buildWhatsAppLink({ jobTitle, ...parsed.data });
    toast.success("Po hapim WhatsApp me aplikimin tuaj…");
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-whatsapp/15 text-whatsapp">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold">Apliko Tani</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pa regjistrim. Plotëso të dhënat dhe aplikimi dërgohet direkt në WhatsApp — përgjigjen e
            merr shpejt nga ekipi jonë.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Emri" error={errors.firstName}>
          <Input
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Arben"
            maxLength={60}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Mbiemri" error={errors.lastName}>
          <Input
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Hoxha"
            maxLength={60}
            autoComplete="family-name"
          />
        </Field>
        <Field label="Telefoni" error={errors.phone}>
          <Input
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+355 6X XXX XXXX"
            inputMode="tel"
            maxLength={25}
            autoComplete="tel"
          />
        </Field>
        <Field label="Qyteti" error={errors.city}>
          <Input
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Tiranë"
            maxLength={60}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Eksperienca / mesazh i shkurtër" error={errors.message}>
            <Textarea
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Shkurtimisht: eksperienca, disponibiliteti, gjuhët që flisni…"
              rows={4}
              maxLength={800}
            />
          </Field>
        </div>
      </div>

      <Button type="submit" variant="whatsapp" size="lg" className="mt-5 w-full">
        <MessageCircle className="h-5 w-5" />
        Dërgo aplikimin në WhatsApp
      </Button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" />
        Të dhënat nuk ruhen në sistem — dërgohen vetëm si mesazh WhatsApp.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

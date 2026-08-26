import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/jobs";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Njoftime Pune" },
      {
        name: "description",
        content:
          "Kontaktoni agjencine Njoftime Pune ne WhatsApp +355 68 950 4445, me telefon ose email per oferta pune dhe bashkepunime me kompani.",
      },
      { property: "og:title", content: "Kontakt — Njoftime Pune" },
      {
        property: "og:description",
        content: "Shkruaj ne WhatsApp per oferta pune ose bashkepunim si punedhenes.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Pershendetje! Kam nje pyetje per ofertat e punes.",
  )}`;

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(211,148,36,0.18),transparent_40%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Kontakt</p>
          <h1 className="mt-3 font-display text-4xl font-normal sm:text-5xl">Fol me ne</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Rruga me e shpejte per t'u pergjigjur eshte WhatsApp. Shkruani per ofertat e punes,
            statusin e aplikimit ose per bashkepunim si punedhenes.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="font-display text-2xl font-normal">Te dhenat e kontaktit</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            <ContactItem icon={Phone} label="Telefon">
              <a href="tel:+355689504445" className="hover:text-primary">
                +355 68 950 4445
              </a>
            </ContactItem>
            <ContactItem icon={MessageCircle} label="WhatsApp">
              <a href={waLink} target="_blank" rel="noreferrer" className="hover:text-primary">
                +355 68 950 4445
              </a>
            </ContactItem>
            <ContactItem icon={Mail} label="Email">
              <a href="mailto:info@njoftimepune.al" className="hover:text-primary">
                info@njoftimepune.al
              </a>
            </ContactItem>
            <ContactItem icon={MapPin} label="Zonat e sherbimit">
              Tirane, Durres, Vlore · Prishtine, Ferizaj · Pozicione jashte vendit
            </ContactItem>
            <ContactItem icon={Clock} label="Orari">
              E hene – E shtune, 09:00 – 19:00
            </ContactItem>
            <ContactItem icon={Instagram} label="Instagram">
              <a
                href="https://www.instagram.com/njoftime_per_punetor"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                @njoftime_per_punetor
              </a>
            </ContactItem>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground shadow-[var(--shadow-lift)]">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/15 blur-2xl" />
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15">
            <MessageCircle className="h-5 w-5" />
          </span>
          <h2 className="relative mt-5 font-display text-2xl font-normal">
            Shkruaj direkt ne WhatsApp
          </h2>
          <p className="relative mt-2 text-sm text-primary-foreground/80">
            Pergjigjemi brenda orarit te punes, zakonisht ne pak minuta.
          </p>
          <Button asChild variant="whatsapp" size="lg" className="relative mt-6 w-full rounded-full">
            <a href={waLink} target="_blank" rel="noreferrer">
              Hap WhatsApp
            </a>
          </Button>
          <a
            href="https://www.instagram.com/njoftime_per_punetor"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="relative mt-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/12 transition-colors hover:bg-primary-foreground/25"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </section>
    </SiteShell>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-foreground">{children}</p>
      </div>
    </li>
  );
}

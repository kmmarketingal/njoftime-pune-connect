import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

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
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold">Kontakt</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Rruga me e shpejte per t'u pergjigjur eshte WhatsApp. Shkruani per ofertat e punes,
            statusin e aplikimit ose per bashkepunim si punedhenes.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="text-xl font-bold">Te dhenat e kontaktit</h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
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
            <ContactItem icon={Instagram} label="Rrjetet sociale">
              <span className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                  Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                  Facebook
                </a>
              </span>
            </ContactItem>
          </ul>
        </div>

        <div className="rounded-2xl bg-gradient-hero p-6 text-primary-foreground shadow-[var(--shadow-lift)]">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/15">
            <MessageCircle className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-xl font-bold">Shkruaj direkt ne WhatsApp</h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Pergjigjemi brenda orarit te punes, zakonisht ne pak minuta.
          </p>
          <Button asChild variant="whatsapp" size="lg" className="mt-5 w-full">
            <a href={waLink} target="_blank" rel="noreferrer">
              Hap WhatsApp
            </a>
          </Button>
          <div className="mt-4 flex gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/12 hover:bg-primary-foreground/25"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/12 hover:bg-primary-foreground/25"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
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
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-4.5 w-4.5" />
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

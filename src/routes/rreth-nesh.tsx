import { createFileRoute, Link } from "@tanstack/react-router";
import { Handshake, HeartHandshake, ShieldCheck, Target } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rreth-nesh")({
  head: () => ({
    meta: [
      { title: "Rreth Nesh — Njoftime Pune, agjenci punesimi" },
      {
        name: "description",
        content:
          "Njoftime Pune eshte agjenci punesimi qe ndermjeteson mes kompanive dhe punekerkuesve ne Shqiperi dhe Kosove, me proces transparent dhe pa pagese per kandidatet.",
      },
      { property: "og:title", content: "Rreth Nesh — Njoftime Pune" },
      {
        property: "og:description",
        content: "Njihu me agjencine qe ka vendosur mijera punetore ne pune te rregullt.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparence",
    text: "Publikojme vetem oferta reale, te konfirmuara nga punedhenesi ose agjencia partnere.",
  },
  {
    icon: HeartHandshake,
    title: "Pa pagese per kandidatet",
    text: "Aplikimi eshte gjithmone falas. Shperblimi jone vjen nga punedhenesi.",
  },
  {
    icon: Target,
    title: "Perputhje e sakte",
    text: "Nuk dergojme kandidate sa per numra — kerkojme perputhjen e duhur per te dyja palet.",
  },
  {
    icon: Handshake,
    title: "Mbeshtetje deri ne fund",
    text: "Ndihmojme me intervisten, dokumentacionin dhe fillimin e punes.",
  },
];

function About() {
  return (
    <SiteShell>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold">Rreth Nesh</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Njoftime Pune eshte agjenci punesimi me fokus ne tregun shqiptar dhe kosovar. Ndermjetesojme
            mes kompanive, agjencive partnere dhe punekerkuesve, duke e bere procesin sa me te thjeshte:
            pa llogari, pa formulare te gjate, me komunikim direkt ne WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Misioni jone</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Besojme se gjetja e nje pune te rregullt nuk duhet te varet nga njohjet apo nga nje CV
              perfekte. Per kete arsye e kemi ndertuar sherbimin tone mbi nje ide te thjeshte: sa me
              pak barriera midis kandidatit dhe punedhenesit. Ju shihni oferten, plotesoni pese fusha
              dhe biseda vazhdon direkt me nje person real.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Punojme me kompani ne hoteleri, restorante, ndertim, prodhim, logjistike dhe shitje me
              pakice, si brenda vendit, edhe per pozicione jashte vendit ku kerkohet dokumentacion i
              rregullt pune.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-6">
              <Link to="/pune">Shiko ofertat aktive</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <value.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">Per punedhenesit dhe agjencite</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Kerkoni staf? Ne e publikojme pozicionin, filtrojme kandidatet dhe ju dergojme vetem profile
            qe perputhen me kerkesat. Bashkepunimi mund te jete per nje pozicion te vetem ose per
            rekrutime te vazhdueshme sezonale.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-6">
            <Link to="/kontakt">Bashkepunoni me ne</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

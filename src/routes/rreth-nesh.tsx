import { createFileRoute, Link } from "@tanstack/react-router";
import { Handshake, HeartHandshake, ShieldCheck, Target } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rreth-nesh")({
  head: () => ({
    meta: [
      { title: "Rreth Nesh — Njoftime Pune, agjenci punësimi" },
      {
        name: "description",
        content:
          "Njoftime Pune është agjenci punësimi që ndërmjetëson mes kompanive dhe punëkërkuesve në Shqipëri dhe Kosovë, me proces transparent dhe pa pagesë për kandidatët.",
      },
      { property: "og:title", content: "Rreth Nesh — Njoftime Pune" },
      {
        property: "og:description",
        content: "Njihu me agjencinë që ka vendosur mijëra punëtorë në punë të rregullt.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparencë",
    text: "Publikojmë vetëm oferta reale, të konfirmuara nga punëdhënësi ose agjencia partnere.",
  },
  {
    icon: HeartHandshake,
    title: "Pa pagesë për kandidatët",
    text: "Aplikimi është gjithmonë falas. Shpërblimi jonë vjen nga punëdhënësi.",
  },
  {
    icon: Target,
    title: "Përputhje e saktë",
    text: "Nuk dërgojmë kandidatë sa për numra — kërkojmë përputhjen e duhur për të dyja palët.",
  },
  {
    icon: Handshake,
    title: "Mbështetje deri në fund",
    text: "Ndihmojmë me intervistën, dokumentacionin dhe fillimin e punës.",
  },
];

function About() {
  return (
    <SiteShell>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold">Rreth Nesh</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Njoftime Pune është agjenci punësimi me fokus në tregun shqiptar dhe kosovar. Ndërmjetësojmë
            mes kompanive, agjencive partnere dhe punëkërkuesve, duke e bërë procesin sa më të thjeshtë:
            pa llogari, pa formularë të gjatë, me komunikim direkt në WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Misioni jonë</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Besojmë se gjetja e një pune të rregullt nuk duhet të varet nga njohjet apo nga një CV
              perfekte. Për këtë arsye e kemi ndërtuar shërbimin tonë mbi një ide të thjeshtë: sa më
              pak barriera midis kandidatit dhe punëdhënësit. Ju shihni ofertën, plotësoni pesë fusha
              dhe biseda vazhdon direkt me një person real.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Punojmë me kompani në hoteleri, restorante, ndërtim, prodhim, logjistikë dhe shitje me
              pakicë, si brenda vendit, edhe për pozicione jashtë vendit ku kërkohet dokumentacion i
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
          <h2 className="text-2xl font-bold">Për punëdhënësit dhe agjencitë</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Kërkoni staf? Ne e publikojmë pozicionin, filtrojmë kandidatët dhe ju dërgojmë vetëm profile
            që përputhen me kërkesat. Bashkëpunimi mund të jetë për një pozicion të vetëm ose për
            rekrutime të vazhdueshme sezonale.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-6">
            <Link to="/kontakt">Bashkëpunoni me ne</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

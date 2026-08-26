import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  MessageCircle,
  Quote,
  Search,
  Send,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-workers.jpg";
import { JobCard } from "@/components/job-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { activeJobsQuery } from "@/lib/jobs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Njoftime Pune — Oferta pune në Shqipëri dhe Kosovë" },
      {
        name: "description",
        content:
          "Agjenci punësimi që lidh kompanitë me punëkërkues në Shqipëri dhe Kosovë. Shiko ofertat aktive dhe apliko direkt në WhatsApp, pa regjistrim.",
      },
      { property: "og:title", content: "Njoftime Pune — Oferta pune në Shqipëri dhe Kosovë" },
      {
        property: "og:description",
        content:
          "Oferta pune të verifikuara. Apliko pa regjistrim dhe merr përgjigje direkt në WhatsApp.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(activeJobsQuery),
  component: Home,
});

const STATS = [
  { icon: BadgeCheck, value: "1.200+", label: "Punë të plotësuara" },
  { icon: Users, value: "3.500+", label: "Punëtorë të vendosur" },
  { icon: Building2, value: "180+", label: "Partnerë & kompani" },
];

const STEPS = [
  {
    icon: Search,
    title: "1. Shiko ofertën",
    text: "Zgjidh nga ofertat aktive sipas qytetit dhe llojit të punës që të përshtatet.",
  },
  {
    icon: Send,
    title: "2. Apliko në 1 minutë",
    text: "Plotëso formularin e shkurtër — pa llogari, pa CV të detyrueshme.",
  },
  {
    icon: MessageCircle,
    title: "3. Merr përgjigje në WhatsApp",
    text: "Aplikimi shkon direkt në WhatsApp-in tonë dhe ju kontaktojmë shpejt.",
  },
];

const TESTIMONIALS = [
  {
    name: "Arben K.",
    role: "Murator — vendosur në Gjermani",
    text: "Brenda dy javësh më ndihmuan me kontratën dhe dokumentet. Komunikim korrekt dhe i shpejtë në WhatsApp.",
  },
  {
    name: "Elona M.",
    role: "Kameriere — Tiranë",
    text: "Apliko pa CV, brenda ditës më telefonuan. Puna është pikërisht si e përshkruan njoftimi.",
  },
  {
    name: "Driton S.",
    role: "Operator prodhimi — Prishtinë",
    text: "Më pëlqeu që gjithçka ndodhi në WhatsApp, pa forma të gjata. Sot punoj me kontratë të rregullt.",
  },
];

function Home() {
  const { data: jobs } = useSuspenseQuery(activeJobsQuery);
  const featured = jobs.slice(0, 3);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold">
              <BadgeCheck className="h-3.5 w-3.5" />
              Agjenci punësimi · Shqipëri & Kosovë
            </span>
            <h1 className="mt-5 text-balance-tight text-4xl font-extrabold leading-[1.08] sm:text-5xl">
              Puna e duhur, pa humbur kohë me formularë të gjatë.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              Njoftime Pune bashkëpunon me kompani dhe agjenci partnere për të plotësuar pozicione
              reale në Shqipëri, Kosovë dhe jashtë vendit. Zgjidh ofertën, apliko në një minutë dhe
              merr përgjigje direkt në WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <Link to="/pune">
                  Shiko Ofertat e Punës
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="onDark" size="xl">
                <Link to="/rreth-nesh">Rreth agjencisë</Link>
              </Button>
            </div>
            <ul className="mt-8 grid gap-2 text-sm text-primary-foreground/80 sm:grid-cols-2">
              {[
                "Pa regjistrim, pa pagesë për punëkërkuesin",
                "Oferta të verifikuara nga partnerë",
                "Përgjigje e shpejtë në WhatsApp",
                "Ndihmë me dokumentacionin",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-in">
            <div className="overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-[var(--shadow-lift)]">
              <img
                src={heroImage}
                alt="Punëtorë të vendosur në punë nga agjencia Njoftime Pune"
                width={1600}
                height={1104}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-2xl bg-card px-4 py-3 text-card-foreground shadow-[var(--shadow-lift)] sm:left-8">
              <p className="text-xs font-medium text-muted-foreground">Oferta aktive tani</p>
              <p className="font-display text-2xl font-bold text-primary">{jobs.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-soft">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <stat.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-display text-3xl font-extrabold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Ofertat më të reja</h2>
            <p className="mt-2 text-muted-foreground">
              Pozicione të hapura tani nga partnerët tanë.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/pune">
              Të gjitha ofertat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featured.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Së shpejti do publikohen oferta të reja. Shkruani në WhatsApp për t'u njoftuar të parët.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/60 py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">Si Funksionon</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Tre hapa të thjeshtë nga oferta deri në kontakt.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent text-accent-foreground shadow-[var(--shadow-glow)]">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">Çfarë thonë punëtorët</h2>
        <p className="mt-2 text-muted-foreground">Përvoja reale nga kandidatë të vendosur në punë.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <Quote className="h-6 w-6 text-accent" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-hero px-6 py-12 text-center text-primary-foreground shadow-[var(--shadow-lift)] sm:px-12">
          <h2 className="text-3xl font-bold">Gati për hapin tjetër?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Zgjidh një ofertë dhe kliko “Apliko Tani” — aplikimi dërgohet direkt në WhatsApp për
            përgjigje të shpejtë.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/pune">Shiko Ofertat e Punës</Link>
            </Button>
            <Button asChild variant="onDark" size="xl">
              <Link to="/kontakt">Kontakto agjencinë</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  MessageCircle,
  Quote,
  Search,
  Send,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-workers.png";
import { JobCard } from "@/components/job-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { activeJobsQuery } from "@/lib/jobs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Njoftime Pune — Oferta pune ne Shqiperi dhe Kosove" },
      {
        name: "description",
        content:
          "Agjenci punesimi qe lidh kompanite me punekerkues ne Shqiperi dhe Kosove. Shiko ofertat aktive dhe apliko direkt ne WhatsApp, pa regjistrim.",
      },
      { property: "og:title", content: "Njoftime Pune — Oferta pune ne Shqiperi dhe Kosove" },
      {
        property: "og:description",
        content:
          "Oferta pune te verifikuara. Apliko pa regjistrim dhe merr pergjigje direkt ne WhatsApp.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(activeJobsQuery),
  component: Home,
});

const STATS = [
  { icon: BadgeCheck, value: "1.200+", label: "Pune te plotesuara" },
  { icon: Users, value: "3.500+", label: "Punetore te vendosur" },
  { icon: Building2, value: "180+", label: "Partnere & kompani" },
];

const STEPS = [
  {
    icon: Search,
    title: "1. Shiko oferten",
    text: "Zgjidh nga ofertat aktive sipas qytetit dhe llojit te punes qe te pershtatet.",
  },
  {
    icon: Send,
    title: "2. Apliko ne 1 minute",
    text: "Ploteso formularin e shkurter — pa llogari, pa CV te detyrueshme.",
  },
  {
    icon: MessageCircle,
    title: "3. Merr pergjigje ne WhatsApp",
    text: "Aplikimi shkon direkt ne WhatsApp-in tone dhe ju kontaktojme shpejt.",
  },
];

const TESTIMONIALS = [
  {
    name: "Arben K.",
    role: "Murator — vendosur ne Gjermani",
    text: "Brenda dy javesh me ndihmuan me kontraten dhe dokumentet. Komunikim korrekt dhe i shpejte ne WhatsApp.",
  },
  {
    name: "Elona M.",
    role: "Kameriere — Tirane",
    text: "Apliko pa CV, brenda dites me telefonuan. Puna eshte pikerisht si e pershkruan njoftimi.",
  },
  {
    name: "Driton S.",
    role: "Operator prodhimi — Prishtine",
    text: "Me pelqeu qe gjithçka ndodhi ne WhatsApp, pa forma te gjata. Sot punoj me kontrate te rregullt.",
  },
];

function Home() {
  const { data: jobs } = useSuspenseQuery(activeJobsQuery);
  const featured = jobs.slice(0, 3);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#162b42] text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <h1 className="text-balance-tight text-3xl font-extrabold leading-[1.1] sm:text-4xl">
              Puna e duhur, pa humbur kohe.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              Oferta pune reale ne Shqiperi dhe Kosove. Apliko dhe merr pergjigje ne WhatsApp.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <Link to="/pune">
                  Shiko Ofertat e Punes
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-[var(--shadow-lift)]">
              <img
                src={heroImage}
                alt="Punetore te vendosur ne pune nga agjencia Njoftime Pune"
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
            <h2 className="text-3xl font-bold">Ofertat me te reja</h2>
            <p className="mt-2 text-muted-foreground">
              Pozicione te hapura tani nga partneret tane.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/pune">
              Te gjitha ofertat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featured.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Se shpejti do publikohen oferta te reja. Shkruani ne WhatsApp per t'u njoftuar te paret.
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
            Tre hapa te thjeshte nga oferta deri ne kontakt.
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
        <h2 className="text-3xl font-bold">Çfare thone punetoret</h2>
        <p className="mt-2 text-muted-foreground">Pervoja reale nga kandidate te vendosur ne pune.</p>
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
          <h2 className="text-3xl font-bold">Gati per hapin tjeter?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Zgjidh nje oferte dhe kliko “Apliko Tani” — aplikimi dergohet direkt ne WhatsApp per
            pergjigje te shpejte.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/pune">Shiko Ofertat e Punes</Link>
            </Button>
            <Button asChild variant="onDark" size="xl">
              <Link to="/kontakt">Kontakto agjencine</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

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

import heroAsset from "@/assets/direction_1_hero.png.asset.json";
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
    title: "Shiko oferten",
    text: "Zgjidh nga ofertat aktive sipas qytetit dhe llojit te punes qe te pershtatet.",
  },
  {
    icon: Send,
    title: "Apliko ne 1 minute",
    text: "Ploteso formularin e shkurter — pa llogari, pa CV te detyrueshme.",
  },
  {
    icon: MessageCircle,
    title: "Merr pergjigje ne WhatsApp",
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

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 420 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <circle cx="320" cy="95" r="52" fill="url(#sun)" />
      <path
        d="M280 80 h8 M300 72 h14 M338 68 h10 M355 78 h12"
        stroke="#D39424"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M0 330 C120 310 160 250 200 210 C240 170 260 150 300 140 C340 130 380 145 420 150"
        stroke="#D39424"
        strokeWidth="3"
        strokeDasharray="8 6"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M180 328 C210 300 230 260 260 235 C290 210 330 200 360 195"
        stroke="#D39424"
        strokeWidth="3"
        fill="none"
      />
      <g transform="translate(152, 262)">
        <circle cx="18" cy="14" r="10" fill="#D39424" />
        <path
          d="M18 24 L18 50 M8 36 L28 36 M12 70 L18 50 L24 70"
          stroke="#F5F0E0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M24 28 L36 22" stroke="#D39424" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="22" r="3" fill="#D39424" />
      </g>
      <path
        d="M310 328 L322 300 H346 L358 328 M330 300 V285 M326 285 H334"
        stroke="#D39424"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M360 328 V295 H380 V328 M370 295 V285 M366 285 H374"
        stroke="#D39424"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <circle cx="40" cy="80" r="3" fill="#D39424" opacity="0.5" />
      <circle cx="72" cy="120" r="2" fill="#D39424" opacity="0.4" />
      <circle cx="28" cy="180" r="2.5" fill="#D39424" opacity="0.35" />
      <defs>
        <radialGradient id="sun" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(320 95) rotate(90) scale(52)">
          <stop stopColor="#F5D78C" />
          <stop offset="1" stopColor="#D39424" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Home() {
  const { data: jobs } = useSuspenseQuery(activeJobsQuery);
  const featured = jobs.slice(0, 3);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(211,148,36,0.18),transparent_40%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="max-w-xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Agjenci punesimi
            </p>
            <h1 className="mt-4 text-balance-tight font-display text-4xl font-normal leading-[1.05] sm:text-5xl lg:text-6xl">
              Puna e duhur,{" "}
              <span className="relative inline-block">
                pa humbur kohe
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent" />
              </span>
              .
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/80">
              Oferta pune reale ne Shqiperi dhe Kosove. Apliko dhe merr pergjigje ne WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg" className="rounded-full px-8">
                <Link to="/pune">
                  Shiko Ofertat e Punes
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="onDark" size="lg" className="rounded-full px-8">
                <Link to="/kontakt">Kontakto agjencine</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/3] rounded-3xl border border-primary-foreground/10 bg-gradient-to-br from-primary-deep/40 to-transparent p-6 shadow-[var(--shadow-lift)] lg:p-10">
              <HeroIllustration />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-primary-foreground/10 bg-card px-5 py-4 text-card-foreground shadow-[var(--shadow-lift)]">
              <p className="text-xs font-medium text-muted-foreground">Oferta aktive tani</p>
              <p className="font-display text-3xl font-normal text-primary">{jobs.length}</p>
            </div>
            <div className="absolute -right-2 top-8 hidden rounded-xl border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur sm:block">
              Apliko pa regjistrim
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`relative flex items-start gap-5 ${
                  i !== STATS.length - 1 ? "md:border-r md:border-border md:pr-8" : ""
                }`}
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-4xl font-normal leading-none text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Ofertat me te reja
            </p>
            <h2 className="mt-2 font-display text-3xl font-normal sm:text-4xl">
              Pozicione te hapura tani
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/pune">
              Te gjitha ofertat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featured.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Se shpejti do publikohen oferta te reja. Shkruani ne WhatsApp per t'u njoftuar te paret.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Procesi
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-normal sm:text-4xl">
            Si Funksionon
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            Tre hapa te thjeshte nga oferta deri ne kontakt.
          </p>

          <div className="relative mt-14">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-accent/50 to-transparent md:left-1/2 md:block" />
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] md:text-center"
                >
                  <span className="absolute -top-5 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-accent text-sm font-bold text-accent-foreground shadow-[var(--shadow-glow)] md:left-1/2 md:-translate-x-1/2">
                    {i + 1}
                  </span>
                  <div className="pt-4">
                    <step.icon className="mb-3 h-5 w-5 text-accent md:mx-auto" />
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Cfare thone punetoret
        </p>
        <h2 className="mt-2 font-display text-3xl font-normal sm:text-4xl">
          Pervoja reale nga kandidate te vendosur
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <figure
              key={item.name}
              className={`relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] ${
                i === 0 ? "md:row-span-2 lg:row-span-1" : ""
              }`}
            >
              <Quote className="h-8 w-8 text-accent/60" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-normal sm:text-4xl">
              Gati per hapin tjeter?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Zgjidh nje oferte dhe kliko “Apliko Tani” — aplikimi dergohet direkt ne WhatsApp per
              pergjigje te shpejte.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl" className="rounded-full px-9">
                <Link to="/pune">Shiko Ofertat e Punes</Link>
              </Button>
              <Button asChild variant="onDark" size="xl" className="rounded-full px-9">
                <Link to="/kontakt">Kontakto agjencine</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

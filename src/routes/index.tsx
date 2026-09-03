import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarDays,
  Clock,
  Globe,
  GraduationCap,
  Home as HomeIcon,
  Users,
  Utensils,
} from "lucide-react";


import heroMarketingAsset from "@/assets/hero-marketing-v2.png.asset.json";
import { JobCard } from "@/components/job-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { activeJobsQuery, ALBANIA_CITIES, KOSOVO_CITIES } from "@/lib/jobs";


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


const QUICK_CATEGORIES = [
  { icon: Clock, label: "Part-time" },
  { icon: HomeIcon, label: "Nga shtepia" },
  { icon: Building2, label: "Kompanite" },
  { icon: Users, label: "Pa eksperience" },
  { icon: CalendarDays, label: "Pune dite" },
  { icon: Globe, label: "Jashte vendit" },
  { icon: Utensils, label: "HOREKA" },
  { icon: GraduationCap, label: "Internship" },
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
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("__all__");
  const [location, setLocation] = useState("__all__");

  const runSearch = () => {
    const term = keyword.trim().toLowerCase();
    const city = location.startsWith("__") ? "" : location;
    const type = category === "__all__" ? "" : category;

    const matches = jobs.filter((job) => {
      const matchesTerm =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        (job.company?.toLowerCase().includes(term) ?? false);
      const matchesCity = !city || job.city === city;
      const matchesType = !type || job.job_type === type;
      return matchesTerm && matchesCity && matchesType;
    });

    // Nese perputhet vetem nje oferte, hape direkt detajin e ofertes.
    const only = matches.length === 1 ? matches[0] : undefined;
    if (only) {
      navigate({ to: "/pune/$id", params: { id: only.id } });
      return;
    }


    navigate({ to: "/pune", search: { q: keyword.trim(), type, city } });
  };


  return (
    <SiteShell>
      {/* HERO SEARCH */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroMarketingAsset.url})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-primary/80" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance-tight font-display text-2xl font-normal leading-[1.1] sm:text-3xl lg:text-4xl">
              Oferta pune ne Shqiperi dhe Kosove
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground/80 sm:text-base">
              Apliko pa regjistrim — pergjigja vjen ne WhatsApp.
            </p>

            {/* Search bar */}
            <div className="mt-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-2 backdrop-blur-sm sm:rounded-full">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/60" />
                  <Input
                    placeholder="Pozicion, kompani..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") runSearch();
                    }}
                    className="h-11 rounded-xl border-primary-foreground/10 bg-primary-foreground/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent sm:rounded-full"
                  />
                </div>
                <div className="flex-1 sm:max-w-[180px]">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11 rounded-xl border-primary-foreground/10 bg-primary-foreground/10 text-primary-foreground focus:ring-accent sm:rounded-full [&>span]:text-primary-foreground/50">
                      <SelectValue placeholder="Kategoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">Te gjitha</SelectItem>
                      <SelectItem value="Kohe e plote">Kohe e plote</SelectItem>
                      <SelectItem value="Kohe e pjesshme">Kohe e pjesshme</SelectItem>
                      <SelectItem value="Sezonale">Sezonale</SelectItem>
                      <SelectItem value="Praktike">Internship</SelectItem>
                      <SelectItem value="Jashte vendit">Jashte vendit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 sm:max-w-[180px]">
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-11 rounded-xl border-primary-foreground/10 bg-primary-foreground/10 text-primary-foreground focus:ring-accent sm:rounded-full [&>span]:text-primary-foreground/50">
                      <SelectValue placeholder="Qyteti" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">Te gjitha</SelectItem>
                      <SelectItem value="__albania__">Shqiperi</SelectItem>
                      {ALBANIA_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                      <SelectItem value="__kosovo__">Kosove</SelectItem>
                      {KOSOVO_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="h-11 rounded-xl px-6 sm:rounded-full"
                  onClick={runSearch}
                >
                  Kërko
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                to="/pune"
                className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-all hover:border-accent/40 hover:bg-primary-soft hover:text-primary"
              >
                <cat.icon className="h-4 w-4 shrink-0 text-accent transition-colors group-hover:text-primary" />
                <span className="truncate">{cat.label}</span>
              </Link>
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
          <div className="mt-10 grid gap-5">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
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
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <Briefcase className="h-8 w-8 text-accent/60" />
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

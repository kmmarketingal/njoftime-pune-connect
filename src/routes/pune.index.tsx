import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  Globe,
  Home as HomeIcon,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Utensils,
  Users,
  X,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { JobCard } from "@/components/job-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALBANIA_CITIES, KOSOVO_CITIES, activeJobsQuery, WHATSAPP_NUMBER } from "@/lib/jobs";

export const Route = createFileRoute("/pune/")({
  head: () => ({
    meta: [
      { title: "Ofertat e Punes — Njoftime Pune" },
      {
        name: "description",
        content:
          "Te gjitha ofertat aktive te punes ne Shqiperi, Kosove dhe jashte vendit. Filtro sipas qytetit dhe llojit te punes, apliko direkt ne WhatsApp.",
      },
      { property: "og:title", content: "Ofertat e Punes — Njoftime Pune" },
      {
        property: "og:description",
        content: "Oferta pune aktive me filtra sipas qytetit dhe llojit te kontrates.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(activeJobsQuery),
  component: JobsPage,
});

const ALL = "__all__";
const ALBANIA = "__albania__";
const KOSOVO = "__kosovo__";

const QUICK_CATEGORIES = [
  { icon: Clock, label: "Pune part-time" },
  { icon: HomeIcon, label: "Pune nga shtepia" },
  { icon: Building2, label: "Kompanite" },
  { icon: Users, label: "Pa eksperience" },
  { icon: CalendarDays, label: "Punet e dites" },
  { icon: Globe, label: "Pune jashte vendit" },
  { icon: Utensils, label: "HOREKA" },
  { icon: GraduationCap, label: "Internship" },
];


function JobsPage() {
  const { data: jobs } = useSuspenseQuery(activeJobsQuery);

  const [keyword, setKeyword] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState<string>(ALL);
  const [city, setCity] = useState<string>(ALL);
  const [type, setType] = useState<string>(ALL);

  const otherCities = useMemo(() => {
    const known = new Set<string>([...ALBANIA_CITIES, ...KOSOVO_CITIES]);
    return Array.from(new Set(jobs.map((j) => j.city).filter((c) => c && !known.has(c)))).sort();
  }, [jobs]);

  const types = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.job_type).filter(Boolean))).sort(),
    [jobs],
  );

  const filtered = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    const comp = company.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesKeyword =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        (job.company?.toLowerCase().includes(term) ?? false);

      const matchesCompany =
        !comp || (job.company?.toLowerCase().includes(comp) ?? false);

      const matchesCountry =
        country === ALL ||
        (country === ALBANIA && ALBANIA_CITIES.some((c) => c === job.city)) ||
        (country === KOSOVO && KOSOVO_CITIES.some((c) => c === job.city));



      const matchesCity = city === ALL || job.city === city;
      const matchesType = type === ALL || job.job_type === type;

      return matchesKeyword && matchesCompany && matchesCountry && matchesCity && matchesType;
    });
  }, [jobs, keyword, company, country, city, type]);

  const activeFiltersCount = [keyword, company, country, city, type].filter(
    (v) => v && v !== ALL,
  ).length;

  const clearFilters = () => {
    setKeyword("");
    setCompany("");
    setCountry(ALL);
    setCity(ALL);
    setType(ALL);
  };

  return (
    <SiteShell>
      {/* PAGE HEADER */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(211,148,36,0.18),transparent_40%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Ofertat</p>
          <h1 className="mt-3 font-display text-3xl font-normal sm:text-4xl lg:text-5xl">
            Pozicione aktive
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            {jobs.length} oferta aktive nga partneret tane. Zgjidh pozicionin, lexo kerkesat dhe
            apliko ne nje minute — pergjigjen e merr direkt ne WhatsApp.
          </p>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {QUICK_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => {
                  // Map quick chip to a keyword or type filter
                  const map: Record<string, { type?: string; keyword?: string }> = {
                    "Pune part-time": { type: "Kohe e pjesshme" },
                    "Pune nga shtepia": { keyword: "shtepi" },
                    Kompanite: { keyword: "" },
                    "Pa eksperience": { keyword: "pa eksperience" },
                    "Punet e dites": { keyword: "dite" },
                    "Pune jashte vendit": { type: "Jashte vendit" },
                    HOREKA: { keyword: "horeka" },
                    Internship: { type: "Praktike" },
                  };
                  const rule = map[cat.label];
                  if (rule?.type) setType(rule.type);
                  if (rule?.keyword !== undefined) setKeyword(rule.keyword);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-all hover:border-accent/40 hover:bg-primary-soft hover:text-primary"
              >
                <cat.icon className="h-4 w-4 shrink-0 text-accent transition-colors group-hover:text-primary" />
                <span className="whitespace-nowrap">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN 3-COLUMN LAYOUT */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr_300px]">
          {/* LEFT SIDEBAR — ADVANCED SEARCH */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="text-base font-bold">Kerkim i avancuar</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Emri i kompanise</label>
                  <Input
                    placeholder="Kerko kompani..."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Fjale kyce</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Titulli ose pershkrimi..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Shteti</label>
                  <Select value={country} onValueChange={(v) => {
                    setCountry(v);
                    setCity(ALL);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Zgjidhni shtetin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL}>Te gjitha shtetet</SelectItem>
                      <SelectItem value={ALBANIA}>Shqiperi</SelectItem>
                      <SelectItem value={KOSOVO}>Kosove</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Qyteti</label>
                  <CityFilter value={city} onChange={setCity} country={country} otherCities={otherCities} />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Kategoria</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Zgjidhni kategorine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL}>Te gjitha kategorite</SelectItem>
                      {types.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="hero"
                  className="w-full rounded-full"
                  onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
                >
                  Kërko
                </Button>
              </div>
            </div>

            {/* Active filters */}
            {activeFiltersCount > 0 && (
              <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">Filtra aktive</span>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-0 text-xs text-muted-foreground">
                    Pastro
                    <X className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{activeFiltersCount} filter{activeFiltersCount === 1 ? "" : "a"} te zgjedhur</p>
              </div>
            )}
          </aside>

          {/* CENTER — JOB LIST */}
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <p className="text-sm text-muted-foreground">
                {filtered.length} rezultat{filtered.length === 1 ? "" : "e"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
                <p>Nuk kemi oferta qe perputhen me filtrat.</p>
                <Button variant="outline" className="mt-4 rounded-full" onClick={clearFilters}>
                  Pastro filtrat
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4">
            {/* WhatsApp CTA */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">Apliko pa regjistrim</h3>
                  <p className="text-xs text-muted-foreground">Shkruaj direkt ne WhatsApp</p>
                </div>
              </div>
              <Button asChild variant="whatsapp" className="mt-4 w-full rounded-full">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                  Shkruaj tani
                </a>
              </Button>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-border bg-primary p-5 text-primary-foreground shadow-[var(--shadow-card)]">
              <h3 className="mb-3 text-sm font-bold text-accent">Pse Njoftime Pune?</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Pune te verifikuara",
                  "Aplikim pa regjistrim",
                  "Pergjigje ne WhatsApp",
                  "Oferta nga Shqiperi & Kosove",
                ].map((b) => (
                  <li key={b} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}

function CityFilter({
  value,
  onChange,
  country,
  otherCities,
}: {
  value: string;
  onChange: (value: string) => void;
  country: string;
  otherCities: string[];
}) {
  const [open, setOpen] = useState(false);

  const allLabel = "Zgjidhni qytetin";
  const selectedLabel = value === ALL ? allLabel : value;

  const albaniaCities = country === ALL || country === ALBANIA ? ALBANIA_CITIES : [];
  const kosovoCities = country === ALL || country === KOSOVO ? KOSOVO_CITIES : [];
  const showOther = country === ALL;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        aria-label="Filtro sipas qytetit"
        className="w-full justify-between bg-transparent font-normal"
        onClick={() => setOpen(true)}
      >
        <span className={value === ALL ? "text-muted-foreground" : ""}>{selectedLabel}</span>
        <span className="text-muted-foreground">▼</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Kerko qytetin..." />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>Nuk u gjet qytet.</CommandEmpty>
          <CommandItem
            value={allLabel}
            onSelect={() => {
              onChange(ALL);
              setOpen(false);
            }}
          >
            {allLabel}
          </CommandItem>
          {albaniaCities.length > 0 && (
            <CommandGroup heading="Shqiperi">
              {albaniaCities.map((c) => (
                <CommandItem
                  key={c}
                  value={c}
                  onSelect={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                >
                  {c}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {kosovoCities.length > 0 && (
            <CommandGroup heading="Kosove">
              {kosovoCities.map((c) => (
                <CommandItem
                  key={c}
                  value={c}
                  onSelect={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                >
                  {c}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {showOther && otherCities.length > 0 && (
            <CommandGroup heading="Jashte vendit">
              {otherCities.map((c) => (
                <CommandItem
                  key={c}
                  value={c}
                  onSelect={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                >
                  {c}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { JobCard } from "@/components/job-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
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
import { ALBANIA_CITIES, KOSOVO_CITIES, activeJobsQuery } from "@/lib/jobs";

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

function JobsPage() {
  const { data: jobs } = useSuspenseQuery(activeJobsQuery);
  const [city, setCity] = useState(ALL);
  const [type, setType] = useState(ALL);

  const otherCities = useMemo(() => {
    const known = new Set<string>([...ALBANIA_CITIES, ...KOSOVO_CITIES]);
    return Array.from(new Set(jobs.map((j) => j.city).filter((c) => c && !known.has(c)))).sort();
  }, [jobs]);

  const types = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.job_type).filter(Boolean))).sort(),
    [jobs],
  );

  const filtered = jobs.filter(
    (job) => (city === ALL || job.city === city) && (type === ALL || job.job_type === type),
  );

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(211,148,36,0.18),transparent_40%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Ofertat</p>
          <h1 className="mt-3 font-display text-4xl font-normal sm:text-5xl">
            Pozicione aktive
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {jobs.length} oferta aktive nga partneret tane. Zgjidh pozicionin, lexo kerkesat dhe
            apliko ne nje minute — pergjigjen e merr direkt ne WhatsApp.
          </p>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:p-6">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            Filtra
          </span>
          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            <CityFilter
              value={city}
              onChange={(v) => {
                setCity(v);
              }}
              otherCities={otherCities}
            />
            <Select value={type} onValueChange={setType}>
              <SelectTrigger aria-label="Filtro sipas llojit te punes">
                <SelectValue placeholder="Lloji i punes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Te gjitha llojet</SelectItem>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(city !== ALL || type !== ALL) && (
            <Button
              variant="ghost"
              onClick={() => {
                setCity(ALL);
                setType(ALL);
              }}
            >
              Pastro filtrat
            </Button>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between border-b border-border pb-3">
          <p className="text-sm text-muted-foreground">
            {filtered.length} rezultat{filtered.length === 1 ? "" : "e"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-6 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Nuk kemi oferta qe perputhen me filtrat. Provo t'i pastrosh filtrat ose kthehu me vone.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}

function CityFilter({
  value,
  onChange,
  otherCities,
}: {
  value: string;
  onChange: (value: string) => void;
  otherCities: string[];
}) {
  const [open, setOpen] = useState(false);

  const allLabel = "Te gjitha qytetet";
  const selectedLabel = value === ALL ? allLabel : value;

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
          <CommandGroup heading="Shqiperi">
            {ALBANIA_CITIES.map((c) => (
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
          <CommandGroup heading="Kosove">
            {KOSOVO_CITIES.map((c) => (
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
          {otherCities.length > 0 && (
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

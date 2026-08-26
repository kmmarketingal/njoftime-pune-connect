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
      { title: "Ofertat e Punës — Njoftime Pune" },
      {
        name: "description",
        content:
          "Të gjitha ofertat aktive të punës në Shqipëri, Kosovë dhe jashtë vendit. Filtro sipas qytetit dhe llojit të punës, apliko direkt në WhatsApp.",
      },
      { property: "og:title", content: "Ofertat e Punës — Njoftime Pune" },
      {
        property: "og:description",
        content: "Oferta pune aktive me filtra sipas qytetit dhe llojit të kontratës.",
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
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold">Ofertat e Punës</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            {jobs.length} oferta aktive nga partnerët tanë. Zgjidh pozicionin, lexo kërkesat dhe
            apliko në një minutë — përgjigjen e merr direkt në WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center">
          <span className="flex items-center gap-2 text-sm font-semibold">
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
              <SelectTrigger aria-label="Filtro sipas llojit të punës">
                <SelectValue placeholder="Lloji i punës" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Të gjitha llojet</SelectItem>
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

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} rezultat{filtered.length === 1 ? "" : "e"}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Nuk kemi oferta që përputhen me filtrat. Provo t'i pastrosh filtrat ose kthehu më vonë.
          </p>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

  const allLabel = "Të gjitha qytetet";
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
        <CommandInput placeholder="Kërko qytetin..." />
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
          <CommandGroup heading="Shqipëri">
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
          <CommandGroup heading="Kosovë">
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
            <CommandGroup heading="Jashtë vendit">
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

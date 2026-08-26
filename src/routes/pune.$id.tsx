import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";

import { ApplyForm } from "@/components/apply-form";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, jobByIdQuery } from "@/lib/jobs";

export const Route = createFileRoute("/pune/$id")({
  loader: async ({ context, params }) => {
    const job = await context.queryClient.ensureQueryData(jobByIdQuery(params.id));
    if (!job || !job.is_active) throw notFound();
    return { title: job.title, city: job.city, jobType: job.job_type };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Oferta nuk u gjet — Njoftime Pune" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.title} — ${loaderData.city} | Njoftime Pune`;
    const description = `${loaderData.title} në ${loaderData.city} · ${loaderData.jobType}. Apliko direkt në WhatsApp, pa regjistrim.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: JobNotFound,
  component: JobDetail,
});

function JobNotFound() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Kjo ofertë nuk është më aktive</h1>
        <p className="mt-3 text-muted-foreground">
          Oferta mund të jetë plotësuar ose çaktivizuar. Shiko ofertat e tjera aktive.
        </p>
        <Button asChild variant="hero" size="lg" className="mt-7">
          <Link to="/pune">Shiko ofertat aktive</Link>
        </Button>
      </div>
    </SiteShell>
  );
}

function JobDetail() {
  const { id } = Route.useParams();
  const { data: job } = useSuspenseQuery(jobByIdQuery(id));

  if (!job) return <JobNotFound />;

  const requirements = job.requirements
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <SiteShell>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <Link
            to="/pune"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Të gjitha ofertat
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15">
              {job.job_type}
            </Badge>
            {job.salary ? (
              <Badge className="bg-accent text-accent-foreground hover:bg-accent">
                {job.salary}
              </Badge>
            ) : null}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{job.title}</h1>
          {job.company ? (
            <p className="mt-2 text-primary-foreground/80">{job.company}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {job.city || "Sipas marrëveshjes"}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" /> {job.job_type}
            </span>
            <span className="flex items-center gap-1.5">
              <Banknote className="h-4 w-4" /> {job.salary ?? "Diskutohet në intervistë"}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> Publikuar: {formatDate(job.created_at)}
            </span>
            {job.expires_at ? (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Afati: {formatDate(job.expires_at)}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-xl font-bold">Përshkrimi i pozicionit</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {job.description.split("\n").filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {requirements.length > 0 && (
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-xl font-bold">Kërkesat</h2>
              <ul className="mt-3 space-y-2.5">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <ApplyForm jobTitle={job.title} />
        </div>
      </section>
    </SiteShell>
  );
}

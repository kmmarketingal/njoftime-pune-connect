import { Link } from "@tanstack/react-router";
import { ArrowRight, Banknote, Briefcase, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDate, type JobOffer } from "@/lib/jobs";

export function JobCard({ job }: { job: JobOffer }) {
  return (
    <Link
      to="/pune/$id"
      params={{ id: job.id }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="absolute right-0 top-0 h-16 w-16 translate-x-8 translate-y-[-50%] rounded-full bg-accent/10 transition-transform group-hover:translate-x-6 group-hover:translate-y-[-40%]" />

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full bg-primary-soft px-3 py-1 text-xs text-secondary-foreground hover:bg-primary-soft">
          {job.job_type}
        </Badge>
        {job.salary ? (
          <Badge className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent-foreground hover:bg-accent/15">
            <span className="text-accent">{job.salary}</span>
          </Badge>
        ) : null}
      </div>

      <h3 className="mt-4 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
        {job.title}
      </h3>
      {job.company ? (
        <p className="mt-1 text-sm font-medium text-muted-foreground">{job.company}</p>
      ) : null}

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {job.description}
      </p>

      <dl className="mt-5 grid gap-2.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" />
          <dd>{job.city || "Sipas marreveshjes"}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-accent" />
          <dd>{job.job_type}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="h-4 w-4 text-accent" />
          <dd>{job.salary ?? "Diskutohet ne interviste"}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-accent" />
          <dd>Publikuar: {formatDate(job.created_at)}</dd>
        </div>
      </dl>

      <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Shiko detajet & apliko
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

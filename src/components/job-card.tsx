import { Link } from "@tanstack/react-router";
import { ArrowRight, Banknote, Briefcase, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDate, type JobOffer } from "@/lib/jobs";

export function JobCard({ job }: { job: JobOffer }) {
  return (
    <Link
      to="/pune/$id"
      params={{ id: job.id }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-primary-soft text-secondary-foreground hover:bg-primary-soft">
          {job.job_type}
        </Badge>
        {job.salary ? (
          <Badge className="bg-accent/15 text-accent-foreground hover:bg-accent/15">
            <span className="text-accent">{job.salary}</span>
          </Badge>
        ) : null}
      </div>

      <h3 className="mt-3 text-lg font-bold leading-snug text-foreground group-hover:text-primary">
        {job.title}
      </h3>
      {job.company ? (
        <p className="mt-1 text-sm font-medium text-muted-foreground">{job.company}</p>
      ) : null}

      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {job.description}
      </p>

      <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <dd>{job.city || "Sipas marrëveshjes"}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <dd>{job.job_type}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="h-4 w-4 text-primary" />
          <dd>{job.salary ?? "Diskutohet në intervistë"}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <dd>Publikuar: {formatDate(job.created_at)}</dd>
        </div>
      </dl>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Shiko detajet & apliko
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

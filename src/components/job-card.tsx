import { Link } from "@tanstack/react-router";
import { CalendarDays, Heart, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobImage } from "@/components/job-image";
import { formatDate, type JobOffer } from "@/lib/jobs";

function daysRemaining(dateValue: string | null) {
  if (!dateValue) return null;
  const end = new Date(dateValue);
  if (Number.isNaN(end.getTime())) return null;
  const diff = Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function companyInitial(company: string | null) {
  return (company || "?").charAt(0).toUpperCase();
}

export function JobCard({ job }: { job: JobOffer }) {
  const remaining = daysRemaining(job.expires_at);

  return (
    <div className="group relative flex items-start gap-4 rounded-xl bg-accent/15 p-4 transition-colors duration-200 hover:bg-accent/25 sm:items-center sm:gap-5">
      {/* Logo / foto e ofertes */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-card sm:h-16 sm:w-16">
        {job.image_path ? (
          <JobImage path={job.image_path} alt={job.title} className="h-full w-full" />
        ) : (
          <span className="text-lg font-bold text-primary">{companyInitial(job.company)}</span>
        )}
      </div>

      {/* Titulli / kompania / kategoria */}
      <div className="min-w-0 flex-1 pr-8 sm:pr-0">
        <h3 className="text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
          <Link to="/pune/$id" params={{ id: job.id }}>
            {job.title}
          </Link>
        </h3>
        {job.company ? (
          <p className="truncate text-sm font-medium text-muted-foreground">{job.company}</p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge className="rounded-md bg-card px-2.5 py-0.5 text-xs font-medium text-foreground hover:bg-card">
            {job.job_type}
          </Badge>
          {job.salary ? (
            <Badge className="rounded-md bg-card px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-card">
              {job.salary}
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Info: vendndodhje / data / afati */}
      <div className="hidden w-44 shrink-0 flex-col gap-1 text-sm text-muted-foreground sm:flex">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-primary" />
          {job.city || "Sipas marreveshjes"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-primary" />
          {formatDate(job.created_at)}
        </span>
        {remaining !== null && remaining > 0 && (
          <span className="text-xs font-medium text-foreground/70">edhe {remaining} dite</span>
        )}
      </div>

      {/* Aksionet */}
      <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
        <Button asChild variant="hero" size="sm" className="rounded-md px-4">
          <Link to="/pune/$id" params={{ id: job.id }}>
            Me shume
          </Link>
        </Button>
      </div>

      <button
        type="button"
        aria-label="Ruaj oferten"
        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
      >
        <Heart className="h-4 w-4" />
      </button>

      {/* Info mobile */}
      <div className="absolute bottom-3 right-3 flex items-center gap-3 text-xs text-muted-foreground sm:hidden">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {job.city || "—"}
        </span>
      </div>
    </div>
  );
}

import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react";

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
  const navigate = useNavigate();
  const remaining = daysRemaining(job.expires_at);

  const openDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({ to: "/pune/$id", params: { id: job.id } });
  };

  return (
    <div className="group relative flex flex-col gap-4 border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-primary/30 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      {/* Zona e klikueshme e tere karteses */}
      <Link
        to="/pune/$id"
        params={{ id: job.id }}
        className="absolute inset-0 z-0"
        aria-label={`Shiko oferten ${job.title}`}
      >
        <span className="sr-only">Shiko oferten</span>
      </Link>

      {/* Logo / foto e ofertes */}
      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-border bg-muted sm:h-20 sm:w-20">
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
          {companyInitial(job.company)}
        </span>
        {job.image_path ? (
          <JobImage path={job.image_path} alt={job.title} className="relative z-10 h-full w-full" />
        ) : null}
      </div>

      {/* Titulli / kompania / kategoria */}
      <div className="relative z-10 min-w-0 flex-1">
        <h3 className="font-display text-xl font-normal leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
          {job.title}
        </h3>
        {job.company ? (
          <p className="mt-1 truncate text-sm font-medium text-muted-foreground sm:text-base">
            {job.company}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground hover:bg-card">
            {job.job_type}
          </Badge>
          {job.salary ? (
            <Badge className="rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary hover:bg-card">
              {job.salary}
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Info: vendndodhje / data / afati */}
      <div className="relative z-10 flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground sm:w-44 sm:flex-col sm:items-start sm:gap-2">
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
      <div className="relative z-10 flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
        <Button
          type="button"
          variant="hero"
          size="sm"
          className="h-10 flex-1 rounded-lg px-5 text-sm sm:flex-initial"
          onClick={openDetail}
        >
          Me shume
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <button
        type="button"
        aria-label="Ruaj oferten"
        className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Heart className="h-4 w-4" />
      </button>
    </div>
  );
}

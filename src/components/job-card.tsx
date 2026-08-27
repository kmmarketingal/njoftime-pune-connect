import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <div className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-accent/40 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      {/* Company logo placeholder */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg font-bold text-primary">
        {companyInitial(job.company)}
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
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

        <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {job.title}
        </h3>
        {job.company ? (
          <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-accent" />
            {job.city || "Sipas marreveshjes"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-accent" />
            {formatDate(job.created_at)}
          </span>
          {remaining !== null && remaining > 0 && (
            <span className="text-xs font-medium text-whatsapp">edhe {remaining} dite</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end md:flex-row md:items-center">
        <button
          type="button"
          aria-label="Ruaj oferten"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <Heart className="h-5 w-5" />
        </button>
        <Button asChild variant="hero" size="sm" className="rounded-full px-5">
          <Link to="/pune/$id" params={{ id: job.id }}>
            Me shume
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

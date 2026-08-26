import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { allJobsQuery, formatDate, JOB_TYPES, type JobOffer } from "@/lib/jobs";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Paneli i Administratorit — Njoftime Pune" },
      { name: "description", content: "Menaxho ofertat e punës: shto, edito, aktivizo ose fshi." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Paneli i Administratorit — Njoftime Pune" },
      { property: "og:description", content: "Menaxhimi i ofertave të punës." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(allJobsQuery),
  component: AdminPage,

});

type FormState = {
  title: string;
  company: string;
  description: string;
  requirements: string;
  job_type: string;
  city: string;
  salary: string;
  expires_at: string;
  is_active: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  company: "",
  description: "",
  requirements: "",
  job_type: JOB_TYPES[0],
  city: "",
  salary: "",
  expires_at: "",
  is_active: true,
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: jobs } = useSuspenseQuery(allJobsQuery);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<JobOffer | null>(null);

  const activeCount = jobs.filter((j) => j.is_active).length;

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["job_offers"] });
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title.trim(),
        company: form.company.trim() || null,
        description: form.description.trim(),
        requirements: form.requirements.trim(),
        job_type: form.job_type,
        city: form.city.trim(),
        salary: form.salary.trim() || null,
        expires_at: form.expires_at || null,
        is_active: form.is_active,
      };
      if (editingId) {
        const { error } = await supabase.from("job_offers").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("job_offers").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingId ? "Oferta u përditësua" : "Oferta u shtua");
      setOpen(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      invalidate();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Ndodhi një gabim"),
  });

  const toggleMutation = useMutation({
    mutationFn: async (job: JobOffer) => {
      const { error } = await supabase
        .from("job_offers")
        .update({ is_active: !job.is_active })
        .eq("id", job.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Statusi i ofertës u ndryshua");
      invalidate();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Ndodhi një gabim"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_offers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Oferta u fshi");
      setDeleteTarget(null);
      invalidate();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Ndodhi një gabim"),
  });

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(job: JobOffer) {
    setEditingId(job.id);
    setForm({
      title: job.title,
      company: job.company ?? "",
      description: job.description,
      requirements: job.requirements,
      job_type: job.job_type,
      city: job.city,
      salary: job.salary ?? "",
      expires_at: job.expires_at ?? "",
      is_active: job.is_active,
    });
    setOpen(true);
  }

  async function signOut() {
    await supabase.auth.signOut();
    queryClient.clear();
    navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15">
              <Briefcase className="h-4.5 w-4.5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold">Paneli i Administratorit</h1>
              <p className="text-xs text-primary-foreground/70">Njoftime Pune</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="onDark">
              <Link to="/">Faqja publike</Link>
            </Button>
            <Button variant="onDark" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Dil
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Oferta aktive" value={activeCount} tone="active" />
          <StatCard label="Oferta joaktive" value={jobs.length - activeCount} tone="muted" />
          <StatCard label="Totali i ofertave" value={jobs.length} tone="muted" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Menaxhimi i Ofertave</h2>
          <Button variant="hero" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Shto ofertë të re
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {jobs.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
              Nuk ka oferta. Kliko “Shto ofertë të re” për të publikuar të parën.
            </p>
          )}
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold">{job.title}</h3>
                  {job.is_active ? (
                    <Badge className="bg-whatsapp/15 text-whatsapp hover:bg-whatsapp/15">
                      Aktive
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Joaktive</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.city || "—"} · {job.job_type} · {job.salary ?? "Pa pagë të publikuar"}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Publikuar: {formatDate(job.created_at)}
                  {job.expires_at ? ` · Skadon: ${formatDate(job.expires_at)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => toggleMutation.mutate(job)}>
                  {job.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {job.is_active ? "Çaktivizo" : "Aktivizo"}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => openEdit(job)}>
                  <Pencil className="h-4 w-4" />
                  Edito
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setDeleteTarget(job)}>
                  <Trash2 className="h-4 w-4" />
                  Fshi
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create / edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edito ofertën" : "Shto ofertë të re"}</DialogTitle>
            <DialogDescription>
              Plotëso të dhënat e pozicionit. Kërkesat shkruaji një në çdo rresht.
            </DialogDescription>
          </DialogHeader>

          <form
            id="job-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (form.title.trim().length < 3) {
                toast.error("Titulli duhet të ketë minimum 3 karaktere");
                return;
              }
              saveMutation.mutate();
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Titulli i pozicionit *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                maxLength={140}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Kompania / partneri</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                maxLength={140}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Qyteti / vendndodhja</Label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                maxLength={100}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Lloji i punës</Label>
              <Select
                value={form.job_type}
                onValueChange={(value) => setForm({ ...form, job_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Paga (opsionale)</Label>
              <Input
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                placeholder="60.000 - 80.000 Lekë"
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Data e skadencës</Label>
              <Input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Statusi</Label>
              <Select
                value={form.is_active ? "active" : "inactive"}
                onValueChange={(value) => setForm({ ...form, is_active: value === "active" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktive (shfaqet publikisht)</SelectItem>
                  <SelectItem value="inactive">Joaktive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Përshkrimi</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
                maxLength={4000}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Kërkesat (një në çdo rresht)</Label>
              <Textarea
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                rows={5}
                maxLength={2000}
                placeholder={"Eksperiencë 1 vit\nKomunikim i mirë"}
              />
            </div>
          </form>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} type="button">
              Anulo
            </Button>
            <Button type="submit" form="job-form" variant="hero" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Duke ruajtur…" : "Ruaj ofertën"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={deleteTarget !== null} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fshi ofertën?</DialogTitle>
            <DialogDescription>
              “{deleteTarget?.title}” do fshihet përgjithmonë. Ky veprim nuk mund të kthehet.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Anulo
            </Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
            >
              Fshi përfundimisht
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "active" | "muted";
}) {
  const Icon = tone === "active" ? CheckCircle2 : XCircle;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <span
        className={
          tone === "active"
            ? "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-whatsapp/15 text-whatsapp"
            : "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"
        }
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 font-display text-3xl font-extrabold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

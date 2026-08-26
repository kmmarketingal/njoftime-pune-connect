import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Briefcase, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Hyrje Administratori — Njoftime Pune" },
      {
        name: "description",
        content: "Hyrje e mbrojtur vetëm për administratorët e Njoftime Pune.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Hyrje Administratori — Njoftime Pune" },
      { property: "og:description", content: "Paneli i administrimit të ofertave të punës." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (password.length < 6) {
      toast.error("Fjalëkalimi duhet të ketë minimum 6 karaktere");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Hyrja u krye me sukses");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Llogaria u krijua. Provo të hysh tani.");
        setMode("login");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ndodhi një gabim");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mx-auto flex w-fit items-center gap-2.5 text-primary-foreground"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15">
            <Briefcase className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-lg font-bold">Njoftime Pune</span>
        </Link>

        <div className="mt-7 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-4 text-2xl font-bold">
            {mode === "login" ? "Hyrje Administratori" : "Krijo llogari admini"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Panel i mbrojtur për menaxhimin e ofertave të punës.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@njoftimepune.al"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Fjalëkalimi</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Duke procesuar…" : mode === "login" ? "Hyr në panel" : "Krijo llogarinë"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="mt-4 w-full text-center text-sm font-medium text-primary hover:underline"
          >
            {mode === "login"
              ? "Nuk ke llogari admini? Krijoje tani"
              : "Ke llogari? Kthehu në hyrje"}
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-primary-foreground/70">
          <Link to="/" className="hover:text-primary-foreground">
            ← Kthehu në faqen publike
          </Link>
        </p>
      </div>
    </div>
  );
}

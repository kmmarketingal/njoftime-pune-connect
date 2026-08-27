import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe,
  GraduationCap,
  Home as HomeIcon,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Send,
  Users,
  Utensils,
} from "lucide-react";


import heroMarketingAsset from "@/assets/hero-marketing-v2.png.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";
import { JobCard } from "@/components/job-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { activeJobsQuery, ALBANIA_CITIES, KOSOVO_CITIES, WHATSAPP_NUMBER } from "@/lib/jobs";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Njoftime Pune — Oferta pune ne Shqiperi dhe Kosove" },
      {
        name: "description",
        content:
          "Agjenci punesimi qe lidh kompanite me punekerkues ne Shqiperi dhe Kosove. Shiko ofertat aktive dhe apliko direkt ne WhatsApp, pa regjistrim.",
      },
      { property: "og:title", content: "Njoftime Pune — Oferta pune ne Shqiperi dhe Kosove" },
      {
        property: "og:description",
        content:
          "Oferta pune te verifikuara. Apliko pa regjistrim dhe merr pergjigje direkt ne WhatsApp.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(activeJobsQuery),
  component: Home,
});

const STATS = [
  { icon: BadgeCheck, value: "1.200+", label: "Pune te plotesuara" },
  { icon: Users, value: "3.500+", label: "Punetore te vendosur" },
  { icon: Building2, value: "180+", label: "Partnere & kompani" },
];

const QUICK_CATEGORIES = [
  { icon: Clock, label: "Pune part-time" },
  { icon: HomeIcon, label: "Pune nga shtepia" },

  { icon: Building2, label: "Kompanite" },
  { icon: Users, label: "Pa eksperience" },
  { icon: CalendarDays, label: "Punet e dites" },
  { icon: Globe, label: "Pune jashte vendit" },
  { icon: Utensils, label: "HOREKA" },
  { icon: GraduationCap, label: "Internship" },
];

const PROMO_BENEFITS = [
  "Pune te verifikuara",
  "Njoftime te perditesuara",
  "Publikim i lehte",
  "Njoftime te besueshme",
  "Njoftime sipas profilit",
  "Dhe me shume...",
];

const STEPS = [
  {
    icon: Search,
    title: "Shiko oferten",
    text: "Zgjidh nga ofertat aktive sipas qytetit dhe llojit te punes qe te pershtatet.",
  },
  {
    icon: Send,
    title: "Apliko ne 1 minute",
    text: "Ploteso formularin e shkurter — pa llogari, pa CV te detyrueshme.",
  },
  {
    icon: MessageCircle,
    title: "Merr pergjigje ne WhatsApp",
    text: "Aplikimi shkon direkt ne WhatsApp-in tone dhe ju kontaktojme shpejt.",
  },
];

const TESTIMONIALS = [
  {
    name: "Arben K.",
    role: "Murator — vendosur ne Gjermani",
    text: "Brenda dy javesh me ndihmuan me kontraten dhe dokumentet. Komunikim korrekt dhe i shpejte ne WhatsApp.",
  },
  {
    name: "Elona M.",
    role: "Kameriere — Tirane",
    text: "Apliko pa CV, brenda dites me telefonuan. Puna eshte pikerisht si e pershkruan njoftimi.",
  },
  {
    name: "Driton S.",
    role: "Operator prodhimi — Prishtine",
    text: "Me pelqeu qe gjithçka ndodhi ne WhatsApp, pa forma te gjata. Sot punoj me kontrate te rregullt.",
  },
];

function Home() {
  const { data: jobs } = useSuspenseQuery(activeJobsQuery);
  const featured = jobs.slice(0, 3);
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("__all__");
  const [location, setLocation] = useState("__all__");

  const runSearch = () => {
    const term = keyword.trim().toLowerCase();
    const city = location.startsWith("__") ? "" : location;
    const type = category === "__all__" ? "" : category;

    const matches = jobs.filter((job) => {
      const matchesTerm =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        (job.company?.toLowerCase().includes(term) ?? false);
      const matchesCity = !city || job.city === city;
      const matchesType = !type || job.job_type === type;
      return matchesTerm && matchesCity && matchesType;
    });

    // Nese perputhet vetem nje oferte, hape direkt detajin e ofertes.
    if (matches.length === 1) {
      navigate({ to: "/pune/$id", params: { id: matches[0].id } });
      return;
    }

    navigate({ to: "/pune", search: { q: keyword.trim(), type, city } });
  };


  return (
    <SiteShell>
      {/* HERO SEARCH */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroMarketingAsset.url})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-primary/80" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance-tight font-display text-3xl font-normal leading-[1.1] sm:text-4xl lg:text-5xl">
              Gjej punen e duhur, pa humbur kohe
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
              Oferta pune reale ne Shqiperi dhe Kosove. Apliko dhe merr pergjigje ne WhatsApp.
            </p>

            {/* Search bar */}
            <div className="mt-8 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-2 backdrop-blur-sm sm:rounded-full">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/60" />
                  <Input
                    placeholder="Fjale kyce, pozicion, kompani..."
                    className="h-12 rounded-xl border-primary-foreground/10 bg-primary-foreground/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent sm:rounded-full"
                  />
                </div>
                <div className="flex-1 sm:max-w-[200px]">
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-primary-foreground/10 bg-primary-foreground/10 text-primary-foreground focus:ring-accent sm:rounded-full [&>span]:text-primary-foreground/50">
                      <SelectValue placeholder="Zgjidh kategorine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">Te gjitha kategorite</SelectItem>
                      <SelectItem value="Kohe e plote">Kohe e plote</SelectItem>
                      <SelectItem value="Kohe e pjesshme">Kohe e pjesshme</SelectItem>
                      <SelectItem value="Sezonale">Sezonale</SelectItem>
                      <SelectItem value="Praktike">Internship</SelectItem>
                      <SelectItem value="Jashte vendit">Jashte vendit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 sm:max-w-[200px]">
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-primary-foreground/10 bg-primary-foreground/10 text-primary-foreground focus:ring-accent sm:rounded-full [&>span]:text-primary-foreground/50">
                      <SelectValue placeholder="Vendndodhje" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">Te gjitha qytetet</SelectItem>
                      <SelectItem value="__albania__">Shqiperi</SelectItem>
                      {ALBANIA_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                      <SelectItem value="__kosovo__">Kosove</SelectItem>
                      {KOSOVO_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button asChild variant="hero" size="lg" className="h-12 rounded-xl px-7 sm:rounded-full">
                  <Link to="/pune">Kërko</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                to="/pune"
                className="group flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-all hover:border-accent/40 hover:bg-primary-soft hover:text-primary"
              >
                <cat.icon className="h-4 w-4 shrink-0 text-accent transition-colors group-hover:text-primary" />
                <span className="truncate">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-background pb-6 pt-2">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="mb-1 text-xs text-muted-foreground">Reklame</p>
          <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-[var(--shadow-lift)] sm:px-10 lg:py-10">
            <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 right-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-center gap-4">
                <img
                  src={logoAsset.url}
                  alt="Logo Njoftime Pune"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-2xl bg-primary-foreground object-contain p-1"
                />
                <div>
                  <p className="font-sans text-lg font-bold">NJOFTIME PUNE</p>
                  <p className="text-xs uppercase tracking-wider text-primary-foreground/70">
                    Gjej punen tende
                  </p>
                </div>
              </div>

              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {PROMO_BENEFITS.map((b) => (
                  <span key={b} className="inline-flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <p className="text-sm font-semibold text-accent">Gjej punen tende!</p>
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="rounded-full px-7"
                >
                  <Link to="/pune">
                    KLIKO KETU
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex flex-col gap-1 text-xs text-primary-foreground/70">
                  <a href="mailto:info@njoftimepune.al" className="inline-flex items-center gap-1.5 hover:text-primary-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    info@njoftimepune.al
                  </a>
                  <a href="tel:+355689504445" className="inline-flex items-center gap-1.5 hover:text-primary-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    +355 68 950 4445
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`relative flex items-start gap-5 ${
                  i !== STATS.length - 1 ? "md:border-r md:border-border md:pr-8" : ""
                }`}
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-4xl font-normal leading-none text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Ofertat me te reja
            </p>
            <h2 className="mt-2 font-display text-3xl font-normal sm:text-4xl">
              Pozicione te hapura tani
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/pune">
              Te gjitha ofertat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featured.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Se shpejti do publikohen oferta te reja. Shkruani ne WhatsApp per t'u njoftuar te paret.
          </p>
        ) : (
          <div className="mt-10 grid gap-5">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Procesi
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-normal sm:text-4xl">
            Si Funksionon
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            Tre hapa te thjeshte nga oferta deri ne kontakt.
          </p>

          <div className="relative mt-14">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-accent/50 to-transparent md:left-1/2 md:block" />
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] md:text-center"
                >
                  <span className="absolute -top-5 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-accent text-sm font-bold text-accent-foreground shadow-[var(--shadow-glow)] md:left-1/2 md:-translate-x-1/2">
                    {i + 1}
                  </span>
                  <div className="pt-4">
                    <step.icon className="mb-3 h-5 w-5 text-accent md:mx-auto" />
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Cfare thone punetoret
        </p>
        <h2 className="mt-2 font-display text-3xl font-normal sm:text-4xl">
          Pervoja reale nga kandidate te vendosur
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <Briefcase className="h-8 w-8 text-accent/60" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-normal sm:text-4xl">
              Gati per hapin tjeter?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Zgjidh nje oferte dhe kliko “Apliko Tani” — aplikimi dergohet direkt ne WhatsApp per
              pergjigje te shpejte.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl" className="rounded-full px-9">
                <Link to="/pune">Shiko Ofertat e Punes</Link>
              </Button>
              <Button asChild variant="onDark" size="xl" className="rounded-full px-9">
                <Link to="/kontakt">Kontakto agjencine</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Kryefaqja", hasDropdown: false },
  { to: "/pune", label: "Ofertat e Punes", hasDropdown: true },
  { to: "/rreth-nesh", label: "Rreth Nesh", hasDropdown: true },
  { to: "/kontakt", label: "Na kontaktoni", hasDropdown: true },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="Logo Njoftime Pune"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-base font-bold tracking-tight">NJOFTIME PUNE</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Gjej punen tende
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" className="rounded-full px-5">
            <Link to="/admin">Paneli Admin</Link>
          </Button>

          <Button asChild variant="hero" className="rounded-full px-5">
            <Link to="/pune">Shiko Ofertat</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Hap menune"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                className="inline-flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-4 w-4 opacity-60" />}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/auth">Identifikohu</Link>
              </Button>
              <Button asChild variant="hero" className="w-full rounded-full">
                <Link to="/pune">Shiko Ofertat</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/logo.png";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { WHATSAPP_NUMBER } from "@/lib/jobs";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-gradient-hero text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img
              src={logoUrl}
              alt="Logo Njoftime Pune"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl bg-primary-foreground/95 object-contain p-0.5"
            />

            <span className="font-display text-lg font-bold">Njoftime Pune</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            Agjenci punësimi që lidh punëdhënësit dhe agjencitë partnere me punëkërkues në Shqipëri
            dhe Kosovë. Apliko pa regjistrim — përgjigjen e merr direkt në WhatsApp.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/12 transition-colors hover:bg-primary-foreground/25"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/njoftime_per_punetor"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/12 transition-colors hover:bg-primary-foreground/25"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
            Faqet
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li>
              <Link to="/" className="hover:text-primary-foreground">
                Kryefaqja
              </Link>
            </li>
            <li>
              <Link to="/pune" className="hover:text-primary-foreground">
                Ofertat e Punës
              </Link>
            </li>
            <li>
              <Link to="/rreth-nesh" className="hover:text-primary-foreground">
                Rreth Nesh
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="hover:text-primary-foreground">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="tel:+355689504445" className="hover:text-primary-foreground">
                +355 68 950 4445
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="mailto:info@njoftimepune.al" className="hover:text-primary-foreground">
                info@njoftimepune.al
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Tiranë, Shqipëri · Prishtinë, Kosovë</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Njoftime Pune. Të gjitha të drejtat e rezervuara.</p>
          <p className="flex flex-wrap gap-4">
            <span>Kushtet e përdorimit</span>
            <span>Politika e privatësisë</span>
            <Link to="/admin" className="hover:text-primary-foreground">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

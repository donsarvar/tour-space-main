import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Building2, Globe } from "lucide-react";
import { useLanguage } from "../lib/i18n";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const links = [
    { to: "/", label: t("catalog") },
    { to: "/map", label: t("map") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground transition-all duration-300 group-hover:scale-105">
            <Building2 className="w-5 h-5" />
          </span>
          <span className="font-semibold text-lg text-foreground">Vista360</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setLang(lang === "UZ" ? "EN" : "UZ")}
            className="flex items-center gap-1.5 px-3 py-2 mr-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 border border-border"
            aria-label="Change language"
          >
            <Globe className="w-4 h-4" />
            <span>{lang}</span>
          </button>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
              activeProps={{ className: "px-4 py-2 rounded-lg text-sm font-medium text-primary bg-accent transition-all duration-300" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
          <a href="#contact" className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary-hover transition-all duration-300">
            {t("contact")}
          </a>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-all duration-300"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col p-4 gap-1">
            <button
              onClick={() => {
                setLang(lang === "UZ" ? "EN" : "UZ");
                setOpen(false);
              }}
              className="flex items-center justify-start gap-2 px-4 py-3 mb-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 w-full text-left border border-border"
            >
              <Globe className="w-5 h-5" />
              <span>{t("language")}: {lang}</span>
            </button>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                activeProps={{ className: "px-4 py-3 rounded-lg text-sm font-medium text-primary bg-accent transition-all duration-300" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

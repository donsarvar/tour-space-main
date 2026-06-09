import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, View } from "lucide-react";
import { properties } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vista360 — Browse Properties in Immersive 360°" },
      { name: "description", content: "Explore apartments and houses with 360° virtual tours. Filter by rooms, price and location." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState<number | "any">("any");
  const [maxPrice, setMaxPrice] = useState<number | "any">("any");
  const { lang, t } = useLanguage();
  const currentLang = lang.toLowerCase() as "en" | "uz";

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !p.title[currentLang].toLowerCase().includes(q) && !p.location[currentLang].toLowerCase().includes(q)) return false;
      if (rooms !== "any" && p.rooms !== rooms) return false;
      if (maxPrice !== "any" && p.price > maxPrice) return false;
      return true;
    });
  }, [query, rooms, maxPrice, currentLang]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary">
              <View className="w-3.5 h-3.5" /> {t("heroBadge")}
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              {t("heroTitle1")}<span className="text-primary">{t("heroTitle2")}</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              {t("heroDesc")}
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-8 bg-card border border-border rounded-2xl p-3 md:p-4 shadow-lg shadow-primary/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value === "any" ? "any" : Number(e.target.value))}
                className="md:col-span-3 px-3 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              >
                <option value="any">{t("anyRooms")}</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r} {t("roomS")}</option>
                ))}
              </select>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "any" ? "any" : Number(e.target.value))}
                className="md:col-span-3 px-3 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              >
                <option value="any">{t("anyPrice")}</option>
                <option value={50000}>{t("upTo")} $50,000</option>
                <option value={100000}>{t("upTo")} $100,000</option>
                <option value={200000}>{t("upTo")} $200,000</option>
                <option value={500000}>{t("upTo")} $500,000</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {filtered.length} {t("propertiesFound")}
          </h2>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" /> {t("sortedBy")}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">{t("noMatch")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

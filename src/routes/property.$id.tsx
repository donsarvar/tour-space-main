import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BedDouble, Heart, MapPin, Maximize, Phone, Check } from "lucide-react";
import { properties } from "../data/properties";
import { PanoramaViewer } from "../components/PanoramaViewer";
import { PropertyMap } from "../components/PropertyMap";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title.en} — Vista360` },
          { name: "description", content: `${loaderData.property.title.en} in ${loaderData.property.location.en}. Explore in 360°.` },
          { property: "og:title", content: `${loaderData.property.title.en} — Vista360` },
          { property: "og:description", content: `Explore ${loaderData.property.title.en} in immersive 360°.` },
          { property: "og:image", content: loaderData.property.thumbnail },
        ]
      : [],
  }),
  component: PropertyDetails,
  notFoundComponent: () => {
    const { t } = useLanguage();
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-foreground">{t("propertyNotFound")}</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> {t("backToCatalog")}
        </Link>
      </div>
    );
  },
  errorComponent: ({ error, reset }) => {
    const { t } = useLanguage();
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">{t("couldNotLoad")}</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold">{t("tryAgain")}</button>
      </div>
    );
  },
});

function PropertyDetails() {
  const { property } = Route.useLoaderData();
  const [saved, setSaved] = useState(false);
  const { lang, t } = useLanguage();
  const currentLang = lang.toLowerCase() as "en" | "uz";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300">
        <ArrowLeft className="w-4 h-4" /> {t("backToCatalog")}
      </Link>

      {/* 360 viewer */}
      <div className="mt-5">
        <PanoramaViewer imageUrl={property.panoramaUrl} title={property.title[currentLang]} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info */}
        <div className="lg:col-span-2 space-y-8">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{property.title[currentLang]}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" /> {property.location[currentLang]}
            </p>
          </header>

          <div className="grid grid-cols-3 gap-4">
            <Stat label={t("price")} value={`$${property.price.toLocaleString()}`} />
            <Stat label={t("rooms")} value={`${property.rooms}`} icon={<BedDouble className="w-4 h-4" />} />
            <Stat label={t("area")} value={`${property.area} ${t("sqm")}`} icon={<Maximize className="w-4 h-4" />} />
          </div>

          {property.description && (
            <section>
              <h2 className="text-xl font-semibold">{t("aboutProperty")}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{property.description[currentLang]}</p>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold">{t("features")}</h2>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.features.map((f: any) => (
                <li key={f.en} className="flex items-center gap-2 text-sm text-foreground bg-card border border-border rounded-lg px-3 py-2.5">
                  <span className="w-6 h-6 rounded-md bg-accent text-primary inline-flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  {f[currentLang]}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">{t("location")}</h2>
            <div className="mt-4">
              <PropertyMap
                properties={[property]}
                height="360px"
                center={[property.coordinates.lat, property.coordinates.lng]}
                zoom={14}
              />
            </div>
          </section>
        </div>

        {/* CTA */}
        <aside className="lg:sticky lg:top-24 h-fit bg-card border border-border rounded-2xl p-6 shadow-md">
          <div className="text-sm text-muted-foreground">{t("listedPrice")}</div>
          <div className="mt-1 text-3xl font-bold text-foreground">${property.price.toLocaleString()}</div>

          <div className="mt-6 space-y-3" id="contact">
            <a
              href="tel:+998000000000"
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary-hover transition-all duration-300"
            >
              <Phone className="w-4 h-4" /> {t("contactAgent")}
            </a>
            <button
              onClick={() => setSaved((s) => !s)}
              className={`w-full inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-lg border transition-all duration-300 ${
                saved
                  ? "bg-accent border-primary/30 text-primary"
                  : "bg-background border-border text-foreground hover:bg-secondary"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              {saved ? t("savedToFavs") : t("saveToFavs")}
            </button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            {t("scheduleWalkthrough")}
          </p>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}

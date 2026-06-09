import { Link } from "@tanstack/react-router";
import { MapPin, BedDouble, Maximize, View } from "lucide-react";
import type { Property } from "../data/properties";
import { useLanguage } from "../lib/i18n";

export function PropertyCard({ property }: { property: Property }) {
  const { lang, t } = useLanguage();
  const currentLang = lang.toLowerCase() as "en" | "uz";

  return (
    <article className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <Link to="/property/$id" params={{ id: property.id }} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={property.thumbnail}
          alt={property.title[currentLang]}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
          <View className="w-3.5 h-3.5" /> 360°
        </span>
        <span className="absolute bottom-3 right-3 bg-background/95 text-foreground font-bold px-3 py-1.5 rounded-lg shadow-md">
          ${property.price.toLocaleString()}
        </span>
      </Link>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">{property.title[currentLang]}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="line-clamp-1">{property.location[currentLang]}</span>
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="w-4 h-4" /> {property.rooms} {t("roomUnit")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Maximize className="w-4 h-4" /> {property.area} {t("sqm")}
          </span>
        </div>

        <Link
          to="/property/$id"
          params={{ id: property.id }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary-hover transition-all duration-300"
        >
          <View className="w-4 h-4" /> {t("viewTour")}
        </Link>
      </div>
    </article>
  );
}

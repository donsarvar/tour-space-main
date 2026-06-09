import { createFileRoute } from "@tanstack/react-router";
import { properties } from "../data/properties";
import { PropertyMap } from "../components/PropertyMap";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map View — Vista360" },
      { name: "description", content: "Browse all 360° properties on an interactive map." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("propertiesOnMap")}</h1>
        <p className="mt-2 text-muted-foreground">
          {t("clickPinMap")}
        </p>
      </header>
      <PropertyMap properties={properties} height="75vh" />
    </div>
  );
}

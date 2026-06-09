import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "@tanstack/react-router";
import type { Property } from "../data/properties";
import { useLanguage } from "../lib/i18n";

// Fix default icon paths for Leaflet bundled via Vite
const icon = L.divIcon({
  className: "",
  html: `<div style="background:#2563EB;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 10px rgba(37,99,235,0.4);display:flex;align-items:center;justify-content:center;"><div style="transform:rotate(45deg);color:white;font-weight:700;font-size:12px;">●</div></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export function PropertyMap({
  properties,
  height = "70vh",
  center,
  zoom = 12,
}: {
  properties: Property[];
  height?: string;
  center?: [number, number];
  zoom?: number;
}) {
  const { lang, t } = useLanguage();
  const currentLang = lang.toLowerCase() as "en" | "uz";

  const mapCenter: [number, number] =
    center ??
    (properties[0]
      ? [properties[0].coordinates.lat, properties[0].coordinates.lng]
      : [41.3111, 69.2797]);

  useEffect(() => {
    // ensure layout reflow
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-md" style={{ height }}>
      <MapContainer center={mapCenter} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((p) => (
          <Marker key={p.id} position={[p.coordinates.lat, p.coordinates.lng]} icon={icon}>
            <Popup>
              <div className="w-56">
                <img src={p.thumbnail} alt={p.title[currentLang]} className="w-full h-28 object-cover" />
                <div className="p-3">
                  <div className="font-semibold text-sm text-foreground line-clamp-1">{p.title[currentLang]}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.location[currentLang]}</div>
                  <div className="mt-1 font-bold text-primary">${p.price.toLocaleString()}</div>
                  <Link
                    to="/property/$id"
                    params={{ id: p.id }}
                    className="mt-2 inline-flex w-full items-center justify-center bg-primary text-primary-foreground text-xs font-semibold py-2 rounded-md hover:bg-primary-hover transition-all duration-300"
                  >
                    {t("viewTour")}
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

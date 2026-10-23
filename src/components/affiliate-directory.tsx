"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Phone, Search } from "lucide-react";
import type * as Leaflet from "leaflet";
import type { Affiliate } from "@/content/affiliates";
import limpopoBoundary from "@/content/limpopo-boundary.json";

type DirectoryEntry = Omit<Affiliate, "phone"> & { phone?: string };

function matchesSearch(affiliate: DirectoryEntry, query: string) {
  const text = [affiliate.name, affiliate.location, affiliate.district, affiliate.municipality]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
  return text.includes(query);
}

function createPopupContent(affiliates: DirectoryEntry[], selectedId?: string) {
  const content = document.createElement("div");
  content.className = "affiliate-leaflet-popup";

  const label = document.createElement("span");
  label.className = "affiliate-popup-label";
  label.textContent = affiliates.length === 1 ? "LSTA member" : `${affiliates.length} LSTA members in this area`;
  content.append(label);

  const ordered = selectedId
    ? [...affiliates].sort((a, b) => Number(b.id === selectedId) - Number(a.id === selectedId))
    : affiliates;
  for (const affiliate of ordered) {
    const member = document.createElement("div");
    member.className = "affiliate-popup-member";

    const name = document.createElement("strong");
    name.textContent = affiliate.name;
    member.append(name);

    const location = document.createElement("span");
    location.textContent = affiliate.location ?? affiliate.municipality ?? affiliate.district ?? "Limpopo";
    member.append(location);

    if (affiliate.phone) {
      const phone = document.createElement("a");
      phone.href = `tel:+27${affiliate.phone.replace(/\D/g, "").slice(1)}`;
      phone.textContent = affiliate.phone;
      member.append(phone);
    }
    content.append(member);
  }

  return content;
}

export function AffiliateDirectory({ affiliates }: { affiliates: DirectoryEntry[] }) {
  const [search, setSearch] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Leaflet.Map | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<Map<string, Leaflet.Marker>>(new Map());
  const markerGroupsRef = useRef<Map<string, DirectoryEntry[]>>(new Map());
  const query = search.trim().toLocaleLowerCase();

  const results = useMemo(
    () => affiliates.filter((affiliate) => matchesSearch(affiliate, query)),
    [affiliates, query],
  );
  const mapped = useMemo(
    () => results.filter((affiliate) => affiliate.coordinates !== null),
    [results],
  );
  const groups = useMemo(() => {
    const grouped = new Map<string, DirectoryEntry[]>();
    for (const affiliate of results) {
      const district = affiliate.district ?? "Area to be confirmed";
      grouped.set(district, [...(grouped.get(district) ?? []), affiliate]);
    }
    return [...grouped.entries()].sort(([a], [b]) =>
      a === "Area to be confirmed" ? 1 : b === "Area to be confirmed" ? -1 : a.localeCompare(b),
    );
  }, [results]);

  useEffect(() => {
    let disposed = false;
    const markers = markersRef.current;
    const markerGroups = markerGroupsRef.current;

    async function initializeMap() {
      const L = await import("leaflet");
      if (disposed || !mapElementRef.current) return;

      const map = L.map(mapElementRef.current, {
        minZoom: 6,
        maxZoom: 16,
        zoomControl: true,
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      L.geoJSON(limpopoBoundary as GeoJSON.GeoJsonObject, {
        interactive: false,
        style: { color: "#9c6534", weight: 3, fillColor: "#c9955f", fillOpacity: 0.08 },
      }).addTo(map);
      map.setView([-23.77, 29.16], 8);

      leafletRef.current = L;
      mapInstanceRef.current = map;
      setMapReady(true);
    }

    void initializeMap();
    return () => {
      disposed = true;
      markers.clear();
      markerGroups.clear();
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapInstanceRef.current;
    if (!mapReady || !L || !map) return;

    for (const marker of new Set(markersRef.current.values())) marker.remove();
    markersRef.current.clear();
    markerGroupsRef.current.clear();

    const locations = new Map<string, DirectoryEntry[]>();
    for (const affiliate of mapped) {
      if (!affiliate.coordinates) continue;
      const { latitude, longitude } = affiliate.coordinates;
      const key = `${latitude},${longitude}`;
      locations.set(key, [...(locations.get(key) ?? []), affiliate]);
    }

    for (const group of locations.values()) {
      const { latitude, longitude } = group[0].coordinates!;
      const icon = L.divIcon({
        className: `affiliate-leaflet-marker${group.length > 1 ? " affiliate-leaflet-marker-group" : ""}`,
        html: group.length > 1 ? `<span><b>${group.length}</b></span>` : "<span></span>",
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -39],
      });
      const title = group.length === 1 ? group[0].name : `${group.length} LSTA members in ${group[0].location}`;
      const marker = L.marker([latitude, longitude], { icon, title, keyboard: true })
        .addTo(map)
        .bindPopup(createPopupContent(group), { maxWidth: 320 });
      for (const affiliate of group) {
        markersRef.current.set(affiliate.id, marker);
        markerGroupsRef.current.set(affiliate.id, group);
      }
    }
  }, [mapReady, mapped]);

  function showOnMap(affiliate: DirectoryEntry) {
    if (!affiliate.coordinates) return;
    const marker = markersRef.current.get(affiliate.id);
    const group = markerGroupsRef.current.get(affiliate.id);
    const map = mapInstanceRef.current;
    if (!marker || !group || !map) return;
    const { latitude, longitude } = affiliate.coordinates;
    map.flyTo([latitude, longitude], Math.max(map.getZoom(), 10), { duration: 0.8 });
    marker.setPopupContent(createPopupContent(group, affiliate.id));
    marker.openPopup();
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="affiliate-directory">
      <div className="affiliate-map-section" ref={sectionRef} id="member-map">
        <div className="affiliate-map-heading">
          <div><span className="eyebrow">Explore Limpopo</span><h2>Our members on the map</h2></div>
        </div>
        <div className="affiliate-map-frame">
          <div className="affiliate-map" ref={mapElementRef} role="region" aria-label="Interactive map of Limpopo and member organizations" />
        </div>
        <p className="affiliate-map-credit">Drag to explore; use the map controls to zoom. Province boundary: <a href="https://www.geoboundaries.org/" target="_blank" rel="noopener noreferrer">geoBoundaries</a> (CC BY 3.0 IGO), sourced from OCHA ROSEA and the South African Municipal Demarcation Board. Pins represent confirmed areas, not office addresses.</p>
      </div>

      <div className="affiliate-list-heading">
        <div><span className="eyebrow">Member register</span><h2>Browse organizations</h2></div>
        <label className="affiliate-search" htmlFor="affiliate-search">
          <Search aria-hidden="true" size={20} />
          <span className="sr-only">Search member organizations by name or area</span>
          <input id="affiliate-search" type="search" placeholder="Search by name or area" value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
      </div>
      <p className="affiliate-result-count" aria-live="polite">{results.length} {results.length === 1 ? "organization" : "organizations"}</p>

      {results.length === 0 ? (
        <div className="affiliate-empty"><h3>No matching organizations</h3><p>Try another name or area.</p></div>
      ) : groups.map(([district, members]) => (
        <section className="affiliate-group" key={district} aria-label={district}>
          <div className="affiliate-group-heading"><h3>{district}</h3><span>{members.length} {members.length === 1 ? "member" : "members"}</span></div>
          <ul className="affiliate-grid">
            {members.map((affiliate) => (
              <li className="affiliate-card" key={affiliate.id}>
                <h4>{affiliate.name}</h4>
                <p className="affiliate-location"><MapPin aria-hidden="true" size={16} />{affiliate.location ?? affiliate.municipality ?? "Location details pending"}</p>
                {affiliate.phone && <a href={`tel:+27${affiliate.phone.replace(/\D/g, "").slice(1)}`} className="affiliate-phone"><Phone aria-hidden="true" size={16} />{affiliate.phone}</a>}
                <button className="affiliate-show-map" type="button" onClick={() => showOnMap(affiliate)} disabled={!affiliate.coordinates || !mapReady}>
                  <MapPin aria-hidden="true" size={16} />{affiliate.coordinates ? "Show on map" : "Map pin pending"}<ArrowUpRight aria-hidden="true" size={15} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

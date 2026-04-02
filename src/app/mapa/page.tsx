"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import api from "@/lib/axios";
import Navbar from "@/components/Navbar";
import {
  MapPin,
  Globe2,
  Satellite,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPinned,
} from "lucide-react";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
}

interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  launches: Launch[];
}

export default function MapaPage() {
  const [pads, setPads] = useState<Launchpad[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPadId, setSelectedPadId] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());

  const defaultMarkerIcon =
    "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  const activeMarkerIcon =
    "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

  const selectedMarkerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: padsData } = await api.get("/launchpads");
        const { data: allLaunches } = await api.get("/launches");

        const launchpadMap = new Map<string, Launchpad>();

        padsData.forEach((pad: any) => {
          launchpadMap.set(pad.id, {
            id: pad.id,
            name: pad.name,
            full_name: pad.full_name,
            region: pad.region,
            timezone: pad.timezone,
            latitude: pad.latitude,
            longitude: pad.longitude,
            launches: [],
          });
        });

        allLaunches.forEach((launch: any) => {
          const pad = launchpadMap.get(launch.launchpad);
          if (pad) {
            pad.launches.push({
              id: launch.id,
              name: launch.name,
              date_utc: launch.date_utc,
              success: launch.success,
            });
          }
        });

        const finalPads = Array.from(launchpadMap.values());
        setPads(finalPads);

        if (finalPads.length > 0) {
          setSelectedPadId(finalPads[0].id);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectedPad = useMemo(
    () => pads.find((pad) => pad.id === selectedPadId) ?? null,
    [pads, selectedPadId],
  );

  const focusPad = (pad: Launchpad) => {
    setSelectedPadId(pad.id);

    if (!mapInstance.current) return;

    const map = mapInstance.current;
    const target = {
      lat: pad.latitude,
      lng: pad.longitude,
    };

    const nextMarker = markersRef.current.get(pad.id);

    // Restaurar marcador anterior
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setIcon(defaultMarkerIcon);
    }

    // Activar marcador nuevo en verde
    if (nextMarker) {
      nextMarker.setIcon(activeMarkerIcon);
      selectedMarkerRef.current = nextMarker;
    }

    // Movimiento del mapa
    map.panTo(target);

    // Cuando termina el pan, aplicar zoom
    google.maps.event.addListenerOnce(map, "idle", () => {
      map.setZoom(6);
    });
  };

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.google ||
      !mapRef.current ||
      mapInstance.current ||
      loading
    ) {
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 18, lng: -40 },
      zoom: 2,
      backgroundColor: "#1a2a33",
      gestureHandling: "greedy",
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          elementType: "geometry",
          stylers: [{ color: "#111315" }],
        },
        {
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3f4f6" }],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [{ color: "#111315" }],
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ color: "#8e99a3" }, { weight: 0.7 }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#d9e0e6" }, { weight: 1.2 }],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [{ color: "#7f8b96" }, { weight: 0.8 }],
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#e5e7eb" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#111315" }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#161a1d" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#b6c0c9" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#5f6b75" }, { weight: 0.55 }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#2a3137" }, { weight: 0.2 }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d6dde3" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#3d4750" }],
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [{ color: "#c5ced6" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#1a2a33" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#dbe7ef" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1a2a33" }],
        },
      ],
    });

    mapInstance.current = map;

    const bounds = new window.google.maps.LatLngBounds();

    pads.forEach((pad) => {
      const position = { lat: pad.latitude, lng: pad.longitude };
      bounds.extend(position);

      const marker = new window.google.maps.Marker({
        position,
        map,
        title: pad.name,
        animation: window.google.maps.Animation.DROP,
        icon: defaultMarkerIcon,
      });

      marker.addListener("click", () => {
        focusPad(pad);
      });

      markersRef.current.set(pad.id, marker);
    });

    if (pads.length > 0) {
      map.fitBounds(bounds, 80);
    }

    if (selectedPadId) {
      const initialMarker = markersRef.current.get(selectedPadId);
      if (initialMarker) {
        initialMarker.setIcon(activeMarkerIcon);
        selectedMarkerRef.current = initialMarker;
      }
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current.clear();
    };
  }, [loading, pads]);

  return (
    <div className="h-screen overflow-hidden bg-[#111315] text-white">
      <Navbar />

      <main className="h-[calc(100vh-88px)] overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col gap-6">
          <section className="min-h-0 flex-1 grid grid-cols-1 gap-6 xl:grid-cols-[460px_minmax(0,1fr)]">
            {/* Panel izquierdo */}
            <aside className="min-h-0 h-full">
              {loading ? (
                <div className="rounded-[32px] border border-white/10 bg-[#14171a] p-6 text-white/60">
                  Cargando información...
                </div>
              ) : selectedPad ? (
                <div className="flex h-full min-h-0 flex-col rounded-[32px] border border-white/10 bg-[#14171a] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.22)]">
                  <div className="shrink-0">
                    <div className="mb-5 border-b border-white/10 pb-4">
                      <p className="text-sm uppercase tracking-[0.2em] text-white/30">
                        Launchpad seleccionado
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        {selectedPad.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-white/55">
                        {selectedPad.full_name}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-[#1a1d21] p-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35">
                          <MapPinned size={14} />
                          Región
                        </div>
                        <p className="mt-2 text-sm text-white/85">
                          {selectedPad.region}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#1a1d21] p-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35">
                          <Clock3 size={14} />
                          Zona horaria
                        </div>
                        <p className="mt-2 text-sm text-white/85">
                          {selectedPad.timezone}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#1a1d21] p-4 sm:col-span-2">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35">
                          <MapPin size={14} />
                          Coordenadas
                        </div>
                        <p className="mt-2 text-sm text-white/85">
                          {selectedPad.latitude.toFixed(4)},{" "}
                          {selectedPad.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">
                          Lanzamientos
                        </h3>
                        <span className="rounded-full border border-white/10 bg-[#1a1d21] px-3 py-1 text-xs text-white/60">
                          {selectedPad.launches.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Solo lanzamientos con scroll */}
                  <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                    <div className="space-y-3">
                      {selectedPad.launches.length > 0 ? (
                        selectedPad.launches.map((launch) => (
                          <div
                            key={launch.id}
                            className="rounded-2xl border border-white/10 bg-[#1a1d21] p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-medium text-white">
                                  {launch.name}
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-sm text-white/55">
                                  <CalendarDays size={14} />
                                  <span>
                                    {new Date(
                                      launch.date_utc,
                                    ).toLocaleDateString("es-ES")}
                                  </span>
                                </div>
                              </div>

                              <span
                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                                  launch.success === true
                                    ? "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300"
                                    : launch.success === false
                                      ? "border border-red-500/20 bg-red-500/15 text-red-300"
                                      : "border border-white/10 bg-white/5 text-white/60"
                                }`}
                              >
                                {launch.success === true
                                  ? "Éxito"
                                  : launch.success === false
                                    ? "Fracaso"
                                    : "Sin dato"}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-white/10 bg-[#1a1d21] p-4 text-sm text-white/55">
                          No hay lanzamientos asociados a esta base.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-[28px] border border-white/10 bg-[#14171a] p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1b1f24] text-white">
                      <Globe2 size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-white">
                      Explora ubicaciones
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      Haz clic sobre cualquier marcador o card para ver la
                      información detallada de la base en este panel.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-[#14171a] p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1b1f24] text-white">
                      <MapPin size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-white">
                      Selección dual
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      Puedes seleccionar una base desde el mapa o desde las
                      cards integradas dentro del contenedor derecho.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-[#14171a] p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1b1f24] text-white">
                      <Satellite size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-white">
                      Seguimiento visual
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      Usa el mapa como explorador y este panel como visor de
                      información estructurada.
                    </p>
                  </div>
                </div>
              )}
            </aside>

            {/* Mapa + cards */}
            <section className="min-h-0 h-full flex flex-col rounded-[32px] border border-white/10 bg-[#14171a] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.22)]">
              <div className="mb-4 flex shrink-0 flex-col gap-2 border-b border-white/10 px-2 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/30">
                    Launchpads
                  </p>
                  <h2 className="text-2xl font-semibold text-white">
                    Vista global del mapa
                  </h2>
                </div>

                <p className="flex items-center gap-2 text-sm text-white/50">
                  <ChevronRight size={14} />
                  Selecciona una base desde las cards o desde el mapa.
                </p>
              </div>

              {/* Cards de bases dentro del contenedor derecho */}
              <div className="mb-4 shrink-0">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {pads.map((pad) => {
                    const isActive = pad.id === selectedPadId;

                    return (
                      <button
                        key={pad.id}
                        onClick={() => focusPad(pad)}
                        className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                          isActive
                            ? "border-white/20 bg-[#20242a] text-white"
                            : "border-white/10 bg-[#1a1d21] text-white/80 hover:bg-[#20242a] hover:text-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-medium">{pad.name}</p>
                            <p className="mt-1 truncate text-sm text-white/50">
                              {pad.region}
                            </p>
                          </div>

                          <div className="mt-0.5 shrink-0 text-white/45">
                            <MapPin size={16} />
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-white/45">
                          {pad.launches.length} lanzamiento
                          {pad.launches.length === 1 ? "" : "s"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mapa */}
              <div className="min-h-0 flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-[#1a2a33]">
                {loading ? (
                  <div className="flex h-full items-center justify-center px-6 text-center text-white/70">
                    Cargando mapa...
                  </div>
                ) : (
                  <div
                    ref={mapRef}
                    className="h-full w-full bg-[#1a2a33]"
                    style={{ backgroundColor: "#1a2a33" }}
                  />
                )}
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}

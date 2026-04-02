"use client";

import { useEffect, useState } from "react";
import { Heart, Search, Star } from "lucide-react";
import LaunchCard from "@/components/LaunchCard";
import { EnrichedLaunch } from "@/types/launch";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<EnrichedLaunch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedIds = JSON.parse(localStorage.getItem("favorites") || "[]");

        const enrichedFavorites = await Promise.all(
          storedIds.map(async (id: string) => {
            const { data: launch } = await api.get(`/launches/${id}`);

            const [rocketRes, padRes] = await Promise.all([
              api.get(`/rockets/${launch.rocket}`),
              api.get(`/launchpads/${launch.launchpad}`),
            ]);

            return {
              id: launch.id,
              name: launch.name,
              date_utc: launch.date_utc,
              success: launch.success,
              rocketName: rocketRes.data.name,
              launchpadName: padRes.data.name,
              latitude: padRes.data.latitude,
              longitude: padRes.data.longitude,
            };
          }),
        );

        setFavorites(enrichedFavorites);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = (id: string) => {
    const updated = favorites.filter((launch) => launch.id !== id);
    setFavorites(updated);

    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = stored.filter((favId: string) => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const filtered = favorites.filter((launch) =>
    launch.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#111315] text-white">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#181b1f] px-4 py-2 text-sm text-white/70">
                <Heart size={16} className="text-white/50" />
                {loading
                  ? "Cargando..."
                  : `${filtered.length} favorito${filtered.length === 1 ? "" : "s"}`}
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#181b1f] px-4 py-2 text-sm text-white/70">
                <Star size={16} className="text-white/50" />
                SpaceX Saved Launches
              </div>
            </div>
          </section>

          {/* Search */}
          <section className="max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Buscar favorito..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#181b1f] pl-12 pr-4 text-base text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-white/20 focus:bg-[#1d2126]"
              />
            </div>
          </section>

          {/* Content */}
          <section className="rounded-[32px] border border-white/10 bg-[#14171a] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.22)] sm:p-5 lg:p-6">
            {loading ? (
              <div className="rounded-[28px] border border-white/10 bg-[#1a1d21] p-8 text-center text-white/60">
                Cargando favoritos...
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-[28px] border border-white/10 bg-[#1a1d21] p-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#20242a] text-white/70">
                  <Heart size={24} />
                </div>

                <h2 className="text-xl font-semibold text-white">
                  No hay favoritos por mostrar
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/55">
                  Aún no has guardado lanzamientos o no hay coincidencias con tu
                  búsqueda actual.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((launch) => (
                  <LaunchCard
                    key={launch.id}
                    launch={launch}
                    onRemoveFavorite={handleRemove}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

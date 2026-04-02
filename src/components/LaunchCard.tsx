"use client";

import { Rocket, Calendar, MapPin, Star } from "lucide-react";
import { EnrichedLaunch } from "@/types/launch";
import { useFavorites } from "@/hooks/useFavorites";

type Props = {
  launch: EnrichedLaunch;
  onRemoveFavorite?: (id: string) => void;
};

export default function LaunchCard({ launch, onRemoveFavorite }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(launch.id);

  const handleToggle = () => {
    toggleFavorite(launch.id);
    // Si se estaba quitando de favoritos y hay un callback de remoción, lo llamamos
    if (active && onRemoveFavorite) {
      onRemoveFavorite(launch.id);
    }
  };

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#14171a] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <button
        onClick={handleToggle}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1b1f24] text-white/80 transition-colors duration-200 hover:bg-[#22272e] hover:text-white"
        aria-label="Agregar a favoritos"
      >
        <Star
          size={18}
          fill={active ? "currentColor" : "none"}
          className={active ? "text-white" : "text-white/80"}
        />
      </button>

      <div className="pr-12">
        <h3 className="text-[28px] font-semibold leading-none tracking-tight text-white">
          {launch.name}
        </h3>

        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-3 text-sm text-white/72">
            <div className="mt-0.5 text-white/55">
              <Calendar size={16} />
            </div>
            <span>{new Date(launch.date_utc).toLocaleDateString("es-ES")}</span>
          </div>

          <div className="flex items-start gap-3 text-sm text-white/72">
            <div className="mt-0.5 text-white/55">
              <Rocket size={16} />
            </div>
            <span>{launch.rocketName}</span>
          </div>

          <div className="flex items-start gap-3 text-sm leading-6 text-white/72">
            <div className="mt-0.5 text-white/55">
              <MapPin size={16} />
            </div>
            <span>
              {launch.launchpadName} ({launch.latitude.toFixed(2)},{" "}
              {launch.longitude.toFixed(2)})
            </span>
          </div>
        </div>

        <div className="mt-6">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              launch.success
                ? "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300"
                : "border border-red-500/20 bg-red-500/15 text-red-300"
            }`}
          >
            {launch.success ? "Éxito" : "Fracaso"}
          </span>
        </div>
      </div>
    </article>
  );
}

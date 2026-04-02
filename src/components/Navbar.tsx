import { useRouter, usePathname } from "next/navigation";
import { Rocket, Star, Home, MapPin } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isMapa = pathname === "/mapa";
  const isFavoritos = pathname === "/favoritos";

  const iconButtonClass =
    "flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300";
  const iconButtonInactive =
    "border-white/10 bg-[#181b1f] text-white/75 hover:bg-[#1d2126] hover:text-white hover:border-white/15";
  const iconButtonActive =
    "border-white/20 bg-[#20242a] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#101214]/90 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-3 text-left">
          <button
            onClick={() => router.push("/")}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
              isHome
                ? "bg-[#20242a] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                : "bg-[#1b1f24] text-white hover:bg-[#22272e]"
            }`}
            aria-label="Ir al inicio"
            title="Inicio"
          >
            <Rocket
              size={22}
              className="transition-transform duration-300 hover:-rotate-6 hover:scale-105"
            />
          </button>

          <button
            onClick={() => router.push("/")}
            className="hidden leading-tight text-left sm:block"
            aria-label="Ir al inicio"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
              Mission Control
            </p>
            <p className="text-2xl font-semibold text-white">SpaceX Launches</p>
          </button>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => router.push("/mapa")}
            title="Mapa"
            aria-label="Ir a mapa"
            className={`${iconButtonClass} ${
              isMapa ? iconButtonActive : iconButtonInactive
            }`}
          >
            <MapPin size={18} />
          </button>

          <button
            onClick={() => router.push("/favoritos")}
            title="Favoritos"
            aria-label="Ir a favoritos"
            className={`${iconButtonClass} ${
              isFavoritos ? iconButtonActive : iconButtonInactive
            }`}
          >
            <Star size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

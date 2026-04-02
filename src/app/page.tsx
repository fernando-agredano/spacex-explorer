"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LaunchCard from "@/components/LaunchCard";
import LaunchSkeleton from "@/components/LaunchSkeleton";
import useLaunches from "@/hooks/useLaunches";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

export default function Home() {
  const { launches, loading, error } = useLaunches();

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");
  const [rocket, setRocket] = useState("");

  // Memorizar el filtrado para evitar recalcular en cada renderizado no relacionado
  const filtered = useMemo(() => {
    return launches.filter((launch) => {
      const matchName = launch.name.toLowerCase().includes(search.toLowerCase());

      const launchYear = new Date(launch.date_utc).getFullYear().toString();
      const matchYear = year ? launchYear === year : true;

      const matchResult = result
        ? result === "success"
          ? launch.success
          : !launch.success
        : true;

      const matchRocket = rocket ? launch.rocketName === rocket : true;

      return matchName && matchYear && matchResult && matchRocket;
    });
  }, [launches, search, year, result, rocket]);

  return (
    <div className="h-screen overflow-hidden bg-[#111315] text-white">
      <Navbar />

      <main className="h-[calc(100vh-88px)] overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar desktop fijo */}
          <aside className="hidden lg:block">
            <div className="fixed top-[110px] w-[280px]">
              <Sidebar
                year={year}
                result={result}
                rocket={rocket}
                setYear={setYear}
                setResult={setResult}
                setRocket={setRocket}
              />
            </div>
          </aside>

          {/* Sidebar mobile/tablet */}
          <aside className="lg:hidden">
            <Sidebar
              year={year}
              result={result}
              rocket={rocket}
              setYear={setYear}
              setResult={setResult}
              setRocket={setRocket}
            />
          </aside>

          {/* Contenido principal */}
          <section className="min-w-0 overflow-hidden">
            <div className="flex h-full flex-col">
              {/* Header fijo */}
              <div className="shrink-0 space-y-5 pb-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-white/35">
                      Mission Archive
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Lanzamientos
                    </h1>
                  </div>

                  <div className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-[#181b1f] px-4 py-2 text-sm text-white/70">
                    {loading
                      ? "Cargando..."
                      : `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`}
                  </div>
                </div>

                {/* Buscador fijo */}
                <div className="max-w-xl">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="Buscar misión..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-[#181b1f] pl-12 pr-4 text-base text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-white/20 focus:bg-[#1d2126]"
                    />
                  </div>
                </div>
              </div>

              {/* Solo esta parte scrollea */}
              <div className="min-h-0 flex-1 overflow-y-auto pr-1 pb-6">
                {loading && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <LaunchSkeleton key={i} />
                    ))}
                  </div>
                )}

                {error && (
                  <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">
                    Error: {error}
                  </div>
                )}

                {!loading && !error && filtered.length === 0 && (
                  <div className="rounded-3xl border border-white/10 bg-[#14171a] p-8 text-center text-white/60">
                    No se encontraron resultados con los filtros actuales.
                  </div>
                )}

                {!loading && !error && filtered.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((launch) => (
                      <LaunchCard key={launch.id} launch={launch} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

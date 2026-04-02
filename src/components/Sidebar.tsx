"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Rocket, ChevronDown } from "lucide-react";
import api from "@/lib/axios";

interface SidebarProps {
  year: string;
  result: string;
  rocket: string;
  setYear: (v: string) => void;
  setResult: (v: string) => void;
  setRocket: (v: string) => void;
}

function SelectField({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-[#1a1d21] px-4 pr-12 text-sm text-white outline-none transition-all duration-300 hover:bg-[#20242a] focus:border-white/20 focus:bg-[#20242a]"
      >
        {children}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
      />
    </div>
  );
}

export default function Sidebar({
  year,
  result,
  rocket,
  setYear,
  setResult,
  setRocket,
}: SidebarProps) {
  const [rockets, setRockets] = useState<string[]>([]);
  const [loadingRockets, setLoadingRockets] = useState(false);

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        setLoadingRockets(true);
        const { data } = await api.get("/rockets");
        setRockets(data.map((r: any) => r.name));
      } catch (error) {
        console.error("Error cargando cohetes:", error);
      } finally {
        setLoadingRockets(false);
      }
    };

    fetchRockets();
  }, []);

  const years = Array.from({ length: 2025 - 2006 + 1 }, (_, i) =>
    (2006 + i).toString(),
  );

  const clearFilters = () => {
    setYear("");
    setResult("");
    setRocket("");
  };

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-medium text-white/70";

  return (
    <aside className="w-full rounded-[28px] border border-white/10 bg-[#14171a] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.22)]">
      <div className="mb-6 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl font-semibold text-white">Filtros</h2>
          <p className="mt-2 max-w-[220px] text-sm leading-6 text-white/50">
            Refina las misiones por año, resultado y cohete.
          </p>
        </div>

        <button
          onClick={clearFilters}
          className="mt-4 h-11 w-full rounded-2xl border border-white/10 bg-[#1a1d21] text-sm font-medium text-white/85 transition-all duration-300 hover:bg-[#20242a]"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>
            <CalendarDays size={16} className="text-white/50" />
            Año
          </label>
          <SelectField value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Todos</option>
            {years.map((y) => (
              <option key={y} value={y} className="bg-[#14171a] text-white">
                {y}
              </option>
            ))}
          </SelectField>
        </div>

        <div>
          <label className={labelClass}>
            <CheckCircle2 size={16} className="text-white/50" />
            Resultado
          </label>
          <SelectField
            value={result}
            onChange={(e) => setResult(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="success" className="bg-[#14171a] text-white">
              Éxito
            </option>
            <option value="failure" className="bg-[#14171a] text-white">
              Fracaso
            </option>
          </SelectField>
        </div>

        <div>
          <label className={labelClass}>
            <Rocket size={16} className="text-white/50" />
            Cohete
          </label>
          <SelectField
            value={rocket}
            onChange={(e) => setRocket(e.target.value)}
          >
            <option value="">
              {loadingRockets ? "Cargando cohetes..." : "Todos"}
            </option>
            {rockets.map((r) => (
              <option key={r} value={r} className="bg-[#14171a] text-white">
                {r}
              </option>
            ))}
          </SelectField>
        </div>
      </div>
    </aside>
  );
}

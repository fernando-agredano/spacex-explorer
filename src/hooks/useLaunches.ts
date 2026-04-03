import { useEffect, useState } from "react";
import { EnrichedLaunch } from "@/types/launch";
import api from "@/lib/axios";

export default function useLaunches() {
  // Estado que almacena la lista de lanzamientos complementarios
  const [launches, setLaunches] = useState<EnrichedLaunch[]>([]);
  // Estado que indica si los datos aún se están cargando
  const [loading, setLoading] = useState(true);
  // Estado que guarda un mensaje de error en caso de un fallo
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        // Petición única usando el endpoint /query con populate para obtener cohetes y plataformas
        const { data } = await api.post("/launches/query", {
          query: {},
          options: {
            pagination: false,
            populate: [
              {
                path: "rocket",
                select: { name: 1 },
              },
              {
                path: "launchpad",
                select: { name: 1, latitude: 1, longitude: 1 },
              },
            ],
          },
        });

        const enriched: EnrichedLaunch[] = data.docs.map(
          (launch: {
            id: string;
            name: string;
            date_utc: string;
            success: boolean;
            rocket?: { name: string };
            launchpad?: { name: string; latitude: number; longitude: number };
          }) => ({
            id: launch.id,
            name: launch.name,
            date_utc: launch.date_utc,
            success: launch.success,
            rocketName: launch.rocket?.name || "Desconocido",
            launchpadName: launch.launchpad?.name || "Desconocido",
            latitude: launch.launchpad?.latitude || 0,
            longitude: launch.launchpad?.longitude || 0,
          }),
        );

        setLaunches(enriched);
      } catch (err) {
        console.error("Error al obtener lanzamientos:", err);
        setError("Error al cargar los lanzamientos");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  return { launches, loading, error };
}

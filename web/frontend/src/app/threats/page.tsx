"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ShieldAlert, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThreatsPage() {
  const [foreignPercentage, setForeignPercentage] = useState(75);
  const [domain, setDomain] = useState("banxico.org.mx (Demo)");

  useEffect(() => {
    fetch("http://localhost:8000/api/osint/latest")
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          setForeignPercentage(d.data.foreign_dependency_percentage);
          setDomain(d.data.domain);
        }
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
          <Network className="w-8 h-8 text-indigo-500 mr-3" />
          Modelado de Amenazas
        </h1>
        <p className="text-slate-400">Análisis de puntos únicos de fallo y vulnerabilidades sistémicas para {domain}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              Riesgo Geopolítico (Bloqueos)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 mb-4">
              Dependencia del {foreignPercentage.toFixed(1)}% en proveedores ubicados bajo jurisdicción extranjera.
              Posibles escenarios de riesgo: Sanciones internacionales, embargo tecnológico o suspensión de servicio.
            </p>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${foreignPercentage}%` }}></div>
            </div>
            <span className="text-xs text-amber-500 mt-2 block font-medium">
              {foreignPercentage > 50 ? 'Alta Exposición' : 'Exposición Controlada'}
            </span>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldAlert className="w-5 h-5 text-rose-500 mr-2" />
              Puntos Únicos de Fallo (SPOF)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex justify-between items-center p-2 rounded bg-slate-800/50">
                <span>Concentración en proveedor predominante</span>
                <span className={foreignPercentage > 50 ? "text-rose-400 font-bold" : "text-amber-400 font-bold"}>
                  {foreignPercentage > 50 ? "Crítico" : "Alto"}
                </span>
              </li>
              <li className="flex justify-between items-center p-2 rounded bg-slate-800/50">
                <span>DNS Resolution y mitigación DDoS</span>
                <span className="text-amber-400 font-bold">Alto</span>
              </li>
              <li className="flex justify-between items-center p-2 rounded bg-slate-800/50">
                <span>Latencia de routing internacional</span>
                <span className="text-indigo-400 font-bold">Medio</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

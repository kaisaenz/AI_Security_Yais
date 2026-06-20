"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, BookOpen, AlertCircle, CheckCircle2, Gavel, Scale, Lock, Search, RefreshCw, GitCommit, ExternalLink, MapPin, Radio } from "lucide-react";
import { useState } from "react";

// Expanded Simulated LatAm AI Policy Data
const policyData = [
  {
    id: "BR",
    country: "Brasil",
    status: "Avanzado",
    framework: "Proyecto de Ley 2338/2023",
    lastUpdated: "12 May 2024",
    coords: { top: "50%", left: "65%" }, // Aprox map position
    dimensions: {
      privacy: { status: "Fuerte", desc: "Regulaciones estrictas sobre biometría y consentimiento explícito." },
      transparency: { status: "Moderada", desc: "Obligación de explicar decisiones automatizadas de alto riesgo." },
      liability: { status: "Alta", desc: "Responsabilidad civil objetiva y solidaria de los proveedores." },
      generative: { status: "Básica", desc: "Requisitos de marcado de agua para deepfakes y contenidos sintéticos." },
      body: { status: "Propuesto", desc: "Autoridad Nacional de Protección de Datos (ANPD) asume roles." }
    },
    changelog: [
      { date: "2024-05-12", event: "NOTICIA: Senado aprueba enmienda sobre derechos de autor en IA Generativa." },
      { date: "2023-11-04", event: "Comisión temporal presenta el reporte final del proyecto." }
    ]
  },
  {
    id: "CL",
    country: "Chile",
    status: "Avanzado",
    framework: "Política Nacional de IA & Boletín 16584-19",
    lastUpdated: "03 Abr 2024",
    coords: { top: "80%", left: "28%" },
    dimensions: {
      privacy: { status: "Fuerte", desc: "Ley de Protección de Datos Personales protege datos de entrenamiento." },
      transparency: { status: "Alta", desc: "Derecho ciudadano a exigir intervención humana en decisiones algorítmicas." },
      liability: { status: "Moderada", desc: "Responsabilidad basada en niveles de riesgo de los sistemas." },
      generative: { status: "Nula", desc: "Sin legislación específica aprobada actualmente sobre contenido sintético." },
      body: { status: "Establecido", desc: "Comisión Interministerial para Políticas de IA." }
    },
    changelog: [
      { date: "2024-04-03", event: "NOTICIA: Ingresa el Boletín 16584-19 al Congreso para regular sistemas de IA." },
      { date: "2023-10-15", event: "Actualización oficial de la Política Nacional de Inteligencia Artificial." }
    ]
  },
  {
    id: "PE",
    country: "Perú",
    status: "Intermedio",
    framework: "Ley Nº 31814 (Promoción de IA)",
    lastUpdated: "05 Jul 2023",
    coords: { top: "45%", left: "23%" },
    dimensions: {
      privacy: { status: "Moderada", desc: "Se apoya en la Ley de Protección de Datos Personales existente." },
      transparency: { status: "Básica", desc: "Principios generales de transparencia pero sin mecanismos sancionadores." },
      liability: { status: "Básica", desc: "Aún no se define un marco de responsabilidad civil por daños de IA." },
      generative: { status: "Nula", desc: "No hay provisiones específicas para IA Generativa." },
      body: { status: "Establecido", desc: "Secretaría de Gobierno y Transformación Digital (PCM)." }
    },
    changelog: [
      { date: "2023-07-05", event: "NOTICIA: El Ejecutivo promulga la Ley Nº 31814 (Ley que promueve el uso de IA)." },
      { date: "2023-05-15", event: "El Congreso aprueba el dictamen de la ley de IA." }
    ]
  },
  {
    id: "MX",
    country: "México",
    status: "Inicial",
    framework: "Iniciativas fragmentadas en Senado",
    lastUpdated: "20 Mar 2024",
    coords: { top: "20%", left: "15%" },
    dimensions: {
      privacy: { status: "Moderada", desc: "INAI lidera recomendaciones, pero sin ley IA específica." },
      transparency: { status: "Nula", desc: "Sin obligación legal de auditorías o explicabilidad algorítmica." },
      liability: { status: "Nula", desc: "Vacío legal sobre la responsabilidad en automatización." },
      generative: { status: "Propuesto", desc: "Iniciativas propuestas sobre deepfakes electorales." },
      body: { status: "Inexistente", desc: "No hay un ente regulador centralizado para Inteligencia Artificial." }
    },
    changelog: [
      { date: "2024-03-20", event: "NOTICIA: Presentan iniciativa en el Senado para criminalizar deepfakes políticos." },
      { date: "2023-09-12", event: "El INAI publica recomendaciones para desarrolladores de sistemas de IA." }
    ]
  }
];

export default function AuditsPage() {

  const getStatusColor = (status: string) => {
    if (["Fuerte", "Alta", "Establecido", "Avanzado"].includes(status)) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (["Moderada", "Intermedio", "Propuesto", "Básica"].includes(status)) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    return "text-rose-400 bg-rose-500/10 border-rose-500/30";
  };

  const getStatusGlow = (status: string) => {
    if (status === "Avanzado") return "shadow-[0_0_15px_rgba(16,185,129,0.5)] bg-emerald-500";
    if (status === "Intermedio") return "shadow-[0_0_15px_rgba(245,158,11,0.5)] bg-amber-500";
    return "shadow-[0_0_15px_rgba(244,63,94,0.5)] bg-rose-500";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header Serio */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center text-slate-100">
            <Radio className="w-6 h-6 mr-3 text-indigo-500 animate-pulse" />
            Radar de Gobernanza Geopolítica (IA)
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm font-mono uppercase tracking-wider">
            Sistema de Monitoreo de Leyes y Auditoría Normativa - Región LATAM
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-indigo-500/50 text-indigo-400 bg-indigo-500/10 font-mono">
            <RefreshCw className="w-3 h-3 mr-2 animate-spin-slow" /> SAT-LINK ACTIVE
          </Badge>
        </div>
      </div>

      {/* Mapa Interactivo */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        
        {/* Fondo Abstracto de Mapa (Grid + Líneas Tácticas) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* SVG Silueta de LatAm Simplificada para contexto */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <path d="M 150 100 L 250 120 L 300 200 L 350 220 L 400 300 L 450 350 L 550 400 L 650 300 L 700 200 L 600 150 L 500 120 L 450 180 Z" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 300 200 L 280 250 L 300 350 L 320 450 L 280 480" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Coordenadas HUD */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-500 pointer-events-none">
          <div>SYS.MAP.LATAM.01</div>
          <div>COORD: 19.4326° N, 99.1332° W</div>
        </div>

        {/* Puntos de Información (Nodos) */}
        {policyData.map((country) => (
          <Dialog key={country.id}>
            <DialogTrigger asChild>
              <button 
                className="absolute flex flex-col items-center justify-center group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{ top: country.coords.top, left: country.coords.left }}
              >
                {/* Ping Animation */}
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${getStatusGlow(country.status)}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${getStatusGlow(country.status)}`}></span>
                </span>
                
                {/* Etiqueta del País en el Mapa */}
                <div className="mt-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700 px-2 py-1 rounded text-[10px] font-mono text-slate-300 opacity-80 group-hover:opacity-100 group-hover:border-indigo-500 transition-all">
                  [{country.id}] {country.country}
                </div>
              </button>
            </DialogTrigger>

            {/* Ventana de Noticias e Información (Modal Serio) */}
            <DialogContent className="bg-slate-950 border-slate-800 text-slate-200 max-w-3xl font-sans">
              <DialogHeader className="border-b border-slate-800 pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl font-bold flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                      Expediente: {country.country}
                    </DialogTitle>
                    <p className="text-slate-400 font-mono text-xs mt-2">Marco Legal: {country.framework}</p>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(country.status)} px-3 py-1 font-mono uppercase tracking-widest`}>
                    Estado: {country.status}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Columna Izquierda: Últimas Noticias / Changelog */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center">
                    <Radio className="w-4 h-4 mr-2" /> Feed de Noticias Oficiales
                  </h3>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-4 h-[250px] overflow-y-auto">
                    {country.changelog.map((log, i) => (
                      <div key={i} className="relative pl-4 border-l-2 border-indigo-500/30">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.8)]"></div>
                        <span className="text-[10px] font-mono text-indigo-400 block mb-1">{log.date}</span>
                        <p className={`text-sm ${log.event.includes('NOTICIA:') ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
                          {log.event.replace('NOTICIA:', '')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Columna Derecha: Auditoría de Dimensiones */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center">
                    <Scale className="w-4 h-4 mr-2" /> Auditoría de Dimensiones
                  </h3>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                    
                    {Object.entries(country.dimensions).map(([key, dim]: [string, any]) => {
                      const titles: any = { privacy: "Privacidad", transparency: "Transparencia", liability: "Responsabilidad", generative: "IA Generativa", body: "Regulador" };
                      return (
                        <div key={key} className="bg-slate-900/50 border border-slate-800 rounded p-2 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-slate-300">{titles[key]}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded border ${getStatusColor(dim.status)}`}>
                              {dim.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{dim.desc}</p>
                        </div>
                      );
                    })}

                  </div>
                </div>

              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                <span className="text-[10px] text-slate-600 font-mono">FIN DEL REPORTE // CENTINELA OSINT</span>
              </div>
            </DialogContent>
          </Dialog>
        ))}

      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 border-t border-slate-800 pt-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span className="text-xs text-slate-400 font-mono uppercase">Marco Avanzado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
          <span className="text-xs text-slate-400 font-mono uppercase">Marco Intermedio</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
          <span className="text-xs text-slate-400 font-mono uppercase">Vacío Legal (Riesgo)</span>
        </div>
      </div>

    </div>
  );
}

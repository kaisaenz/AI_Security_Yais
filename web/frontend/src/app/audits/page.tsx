"use client";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, BookOpen, AlertCircle, CheckCircle2, Gavel, Scale, Lock, Search, RefreshCw, GitCommit, MapPin, Radio, Cpu, Network, TrendingUp, Newspaper } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the map to avoid SSR 'window is not defined' error
const GeopoliticsMap = dynamic(() => import("../../components/map/GeopoliticsMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-950 text-indigo-500 font-mono text-sm animate-pulse">Iniciando Cartografía Satelital...</div>
});

// Expanded Simulated LatAm AI Policy & Market Data
const policyData = [
  {
    id: "BR",
    country: "Brasil",
    status: "Avanzado",
    framework: "Proyecto de Ley 2338/2023",
    lastUpdated: "12 May 2024",
    lat: -14.235, lng: -51.925,
    aiOverview: "Brasil es el mercado de IA más grande de América Latina, concentrando más del 40% de las startups de IA en la región. El gobierno está impulsando una estrategia nacional enfocada en la IA para la agricultura y el sector público.",
    marketData: { adoption: "Alta (65% empresas grandes)", investment: "$850M USD (2023)", institutions: ["C4AI (Centro de IA)", "Universidad de São Paulo", "Serpro"] },
    dimensions: {
      privacy: { status: "Fuerte", desc: "Regulaciones estrictas sobre biometría y consentimiento explícito." },
      transparency: { status: "Moderada", desc: "Obligación de explicar decisiones automatizadas de alto riesgo." },
      liability: { status: "Alta", desc: "Responsabilidad civil objetiva y solidaria de los proveedores." },
      generative: { status: "Básica", desc: "Requisitos de marcado de agua para deepfakes y contenidos sintéticos." },
      body: { status: "Propuesto", desc: "Autoridad Nacional de Protección de Datos (ANPD) asume roles." }
    },
    changelog: [
      { date: "2024-05-12", event: "Senado aprueba enmienda sobre derechos de autor en IA Generativa." },
      { date: "2024-02-18", event: "Lanzamiento de modelo fundacional portugués 'Sabiá' por investigadores brasileños." },
      { date: "2023-11-04", event: "Comisión temporal presenta el reporte final del proyecto regulatorio." }
    ]
  },
  {
    id: "CL",
    country: "Chile",
    status: "Avanzado",
    framework: "Política Nacional de IA & Boletín 16584-19",
    lastUpdated: "03 Abr 2024",
    lat: -35.675, lng: -71.543,
    aiOverview: "Pionero en infraestructura digital y 5G. Chile destaca por su 'Política Nacional de IA' actualizada en 2023, con fuerte enfoque en ética, impacto en el empleo y uso de IA en la minería (cobre y litio).",
    marketData: { adoption: "Media-Alta (45%)", investment: "$210M USD (2023)", institutions: ["Cenia", "Ministerio de Ciencia", "Universidad de Chile"] },
    dimensions: {
      privacy: { status: "Fuerte", desc: "Ley de Protección de Datos Personales protege datos de entrenamiento." },
      transparency: { status: "Alta", desc: "Derecho ciudadano a exigir intervención humana en decisiones algorítmicas." },
      liability: { status: "Moderada", desc: "Responsabilidad basada en niveles de riesgo de los sistemas." },
      generative: { status: "Nula", desc: "Sin legislación específica aprobada actualmente sobre contenido sintético." },
      body: { status: "Establecido", desc: "Comisión Interministerial para Políticas de IA." }
    },
    changelog: [
      { date: "2024-04-03", event: "Ingresa el Boletín 16584-19 al Congreso para regular sistemas de IA." },
      { date: "2023-10-15", event: "Actualización oficial de la Política Nacional de Inteligencia Artificial." },
      { date: "2023-08-02", event: "Cenia publica el primer Índice Latinoamericano de Inteligencia Artificial (ILIA)." }
    ]
  },
  {
    id: "AR",
    country: "Argentina",
    status: "Intermedio",
    framework: "Recomendaciones Éticas & Proyectos Múltiples",
    lastUpdated: "10 Feb 2024",
    lat: -38.416, lng: -63.616,
    aiOverview: "Argentina posee un ecosistema de talento técnico excepcional y varios unicornios tecnológicos. Su enfoque regulatorio ha sido reactivo, centrándose más en la ética que en leyes punitivas. Gran hub de desarrollo de software.",
    marketData: { adoption: "Media (38%)", investment: "$180M USD (2023)", institutions: ["Ministerio de Innovación", "Fundación Sadosky", "CONICET"] },
    dimensions: {
      privacy: { status: "Fuerte", desc: "Ley 25.326 de Protección de Datos en proceso de modernización." },
      transparency: { status: "Básica", desc: "Guías éticas publicadas, sin peso de ley firme." },
      liability: { status: "Nula", desc: "Sin marco para IA, se recurre al derecho civil tradicional." },
      generative: { status: "Básica", desc: "Proyectos de ley sobre deepfakes en discusión tras elecciones." },
      body: { status: "Inexistente", desc: "Diferentes agencias compiten por la jurisdicción." }
    },
    changelog: [
      { date: "2024-02-10", event: "Debates en el congreso sobre el uso de deepfakes en campañas políticas." },
      { date: "2023-06-02", event: "Publicación de manuales de ética algorítmica por la Subsecretaría de TI." }
    ]
  },
  {
    id: "CO",
    country: "Colombia",
    status: "Intermedio",
    framework: "Marco Ético para la Inteligencia Artificial",
    lastUpdated: "25 Ene 2024",
    lat: 4.570, lng: -74.297,
    aiOverview: "El gobierno de Colombia fue uno de los primeros en emitir un Marco Ético. Medellín se posiciona fuertemente como un hub de Cuarta Revolución Industrial impulsado por el Foro Económico Mundial.",
    marketData: { adoption: "Media (42%)", investment: "$150M USD (2023)", institutions: ["Centro para la Cuarta Revolución", "MinTIC"] },
    dimensions: {
      privacy: { status: "Moderada", desc: "Ley 1581 se aplica, pero sin mención específica a scraping de IA." },
      transparency: { status: "Moderada", desc: "El sector público tiene directrices de transparencia algorítmica obligatorias." },
      liability: { status: "Nula", desc: "Vacío legal sobre daños por sistemas autónomos." },
      generative: { status: "Nula", desc: "No hay iniciativas serias en el parlamento aún." },
      body: { status: "Establecido", desc: "Comités interinstitucionales bajo el MinTIC." }
    },
    changelog: [
      { date: "2024-01-25", event: "El gobierno lanza la 'Hoja de Ruta' actualizada para la adopción de IA en el Estado." },
      { date: "2023-09-10", event: "Apertura de nuevos laboratorios de computación en la Universidad Nacional." }
    ]
  },
  {
    id: "PE",
    country: "Perú",
    status: "Intermedio",
    framework: "Ley Nº 31814 (Promoción de IA)",
    lastUpdated: "05 Jul 2023",
    lat: -9.19, lng: -75.015,
    aiOverview: "Perú dio la sorpresa en 2023 al aprobar rápidamente una 'Ley de Promoción de IA'. El ecosistema es emergente, enfocado en fintech, agricultura y minería automatizada.",
    marketData: { adoption: "Baja (22%)", investment: "$45M USD (2023)", institutions: ["Secretaría de Gobierno Digital (PCM)"] },
    dimensions: {
      privacy: { status: "Moderada", desc: "Se apoya en la Ley de Protección de Datos Personales existente." },
      transparency: { status: "Básica", desc: "Principios generales de transparencia pero sin mecanismos sancionadores." },
      liability: { status: "Básica", desc: "Aún no se define un marco de responsabilidad civil." },
      generative: { status: "Nula", desc: "No hay provisiones específicas para IA Generativa." },
      body: { status: "Establecido", desc: "PCM es la autoridad técnica central." }
    },
    changelog: [
      { date: "2023-07-05", event: "El Ejecutivo promulga la Ley Nº 31814 que promueve el uso y desarrollo de IA." },
      { date: "2023-05-15", event: "El Congreso aprueba el dictamen de la ley de IA por abrumadora mayoría." }
    ]
  },
  {
    id: "MX",
    country: "México",
    status: "Inicial",
    framework: "Iniciativas fragmentadas en Senado",
    lastUpdated: "20 Mar 2024",
    lat: 23.634, lng: -102.552,
    aiOverview: "A pesar de tener el segundo mercado de TI más grande y gran cercanía con EE.UU., México carece de una estrategia nacional centralizada. El sector privado (Fintech y E-commerce) lidera la adopción de IA de manera autónoma.",
    marketData: { adoption: "Media (40%)", investment: "$320M USD (2023)", institutions: ["IA2030Mx", "INAI"] },
    dimensions: {
      privacy: { status: "Moderada", desc: "INAI lidera recomendaciones, pero sin ley IA específica." },
      transparency: { status: "Nula", desc: "Sin obligación legal de auditorías o explicabilidad algorítmica." },
      liability: { status: "Nula", desc: "Vacío legal sobre la responsabilidad en automatización." },
      generative: { status: "Propuesto", desc: "Iniciativas propuestas sobre deepfakes electorales." },
      body: { status: "Inexistente", desc: "No hay un ente regulador centralizado para Inteligencia Artificial." }
    },
    changelog: [
      { date: "2024-03-20", event: "Presentan iniciativa en el Senado para criminalizar deepfakes políticos tras polémicas." },
      { date: "2023-09-12", event: "El INAI publica recomendaciones de privacidad para desarrolladores de IA." },
      { date: "2023-04-10", event: "Coaliciones privadas lanzan el manifiesto IA2030Mx pidiendo regulación estatal." }
    ]
  },
  {
    id: "UY",
    country: "Uruguay",
    status: "Avanzado",
    framework: "Estrategia de IA para el Gobierno Digital",
    lastUpdated: "18 Ago 2023",
    lat: -32.522, lng: -55.765,
    aiOverview: "Uruguay es pionero en gobierno digital (AGESIC) y ha implementado IA en la administración pública con un enfoque fuerte en datos abiertos y ética desde el diseño.",
    marketData: { adoption: "Media-Alta (50%)", investment: "$90M USD (2023)", institutions: ["AGESIC", "UdelaR"] },
    dimensions: {
      privacy: { status: "Fuerte", desc: "Ley de Protección de Datos moderna, alineada con estándares europeos." },
      transparency: { status: "Alta", desc: "El Estado publica auditorías algorítmicas de sus propios sistemas." },
      liability: { status: "Moderada", desc: "Enfoque precautorio para sistemas del estado." },
      generative: { status: "Básica", desc: "Guías de uso de IA generativa para funcionarios públicos." },
      body: { status: "Establecido", desc: "AGESIC coordina y supervisa el despliegue." }
    },
    changelog: [
      { date: "2023-08-18", event: "Publicación de guía sobre el uso de IA Generativa en el Estado." },
      { date: "2022-10-05", event: "Aprobación de la Estrategia de IA para el Gobierno." }
    ]
  },
  {
    id: "CR",
    country: "Costa Rica",
    status: "Intermedio",
    framework: "Estrategia Nacional de Inteligencia Artificial (Propuesta)",
    lastUpdated: "12 Dic 2023",
    lat: 9.748, lng: -83.753,
    aiOverview: "Costa Rica lidera en Centroamérica con un fuerte enfoque en sostenibilidad e innovación tecnológica, apoyado por su ecosistema de zonas francas tecnológicas.",
    marketData: { adoption: "Media (35%)", investment: "$65M USD (2023)", institutions: ["MICITT", "CENAT"] },
    dimensions: {
      privacy: { status: "Fuerte", desc: "Ley de Protección de la Persona frente al Tratamiento de sus Datos." },
      transparency: { status: "Moderada", desc: "Principios de gobernanza digital aplicables a la IA." },
      liability: { status: "Básica", desc: "Marco civil aplicable por defecto." },
      generative: { status: "Nula", desc: "No regulada explícitamente." },
      body: { status: "Propuesto", desc: "MICITT lidera los esfuerzos interinstitucionales." }
    },
    changelog: [
      { date: "2023-12-12", event: "Borrador de la Estrategia Nacional sometido a consulta pública." },
      { date: "2023-05-20", event: "Apertura del hub de innovación tecnológica con enfoque en IA verde." }
    ]
  },
  {
    id: "EC",
    country: "Ecuador",
    status: "Inicial",
    framework: "Ley Orgánica de Protección de Datos Personales (Aplicable a IA)",
    lastUpdated: "10 Ene 2024",
    lat: -1.831, lng: -78.183,
    aiOverview: "Ecuador recién está dando los primeros pasos institucionales hacia la regulación de IA, apalancándose en su reciente y moderna ley de protección de datos.",
    marketData: { adoption: "Baja (18%)", investment: "$25M USD (2023)", institutions: ["MINTEL"] },
    dimensions: {
      privacy: { status: "Fuerte", desc: "Nueva ley exige consentimiento explícito y regula toma de decisiones automatizada." },
      transparency: { status: "Moderada", desc: "Derecho del ciudadano a no ser sujeto a decisiones basadas única y exclusivamente en automatización." },
      liability: { status: "Nula", desc: "Falta de claridad normativa." },
      generative: { status: "Nula", desc: "No hay iniciativas." },
      body: { status: "Inexistente", desc: "Se propone a la Superintendencia de Protección de Datos como ente veedor." }
    },
    changelog: [
      { date: "2024-01-10", event: "Expertos solicitan ante asamblea un observatorio de impacto de IA." },
      { date: "2023-05-26", event: "Entrada en vigor total del régimen sancionatorio de la Ley de Datos Personales." }
    ]
  }
];

// Fake global news feed
const regionalNews = [
  { id: "n1", source: "Cenia (Centro Nacional de IA)", title: "Lanzamiento del Índice Latinoamericano de IA (ILIA)", tag: "Reporte Regional", lat: -33.448, lng: -70.669 },
  { id: "n2", source: "Senado Federal Brasil", title: "Acuerdo bilateral Brasil-UE para alineamiento con el AI Act Europeo", tag: "Geopolítica", lat: -15.826, lng: -47.921 },
  { id: "n3", source: "Foro Económico Mundial", title: "Colombia lidera foro de ética de IA", tag: "Ética", lat: 4.609, lng: -74.081 },
  { id: "n4", source: "Startups LatAm", title: "Inversión semilla en startups de IA generativa se cuadriplica", tag: "Mercado", lat: -34.603, lng: -58.381 },
  { id: "n5", source: "Tecnológico de Monterrey", title: "Apertura del nuevo hub de IA para manufactura avanzada", tag: "Innovación", lat: 25.651, lng: -100.289 },
  { id: "n6", source: "Agencia EFE", title: "Cumbre de Inteligencia Artificial para monitoreo de la Amazonía", tag: "Medio Ambiente", lat: -3.743, lng: -73.251 }
];

export default function AuditsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

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

  const selectedCountry = policyData.find(c => c.id === selectedCountryId);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header Serio */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center mb-2">
            <Radio className="w-6 h-6 mr-3 text-indigo-500 animate-pulse" />
            AI Governance Observatory
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm font-mono tracking-wider">
            Consolidated monitor of innovation, regulatory frameworks, and geopolitical events regarding Artificial Intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10 font-mono">
            <Network className="w-3 h-3 mr-2" /> ENLACE SEGURO
          </Badge>
        </div>
      </div>

      {/* Mapa Interactivo Leaflet Real */}
      <div className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl z-0">
        <GeopoliticsMap 
          policyData={policyData} 
          newsData={regionalNews}
          onMarkerClick={(id) => {
            setSelectedCountryId(id);
            setActiveTab("overview");
          }} 
        />
        
        {/* Coordenadas HUD Overlay */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-500 pointer-events-none z-[1000] bg-slate-950/80 px-2 py-1 rounded border border-slate-800 backdrop-blur-sm">
          <div>SYS.MAP.OBSERVATORY.01 // {policyData.length} NODOS ACTIVOS</div>
        </div>
      </div>

      {/* Dialog renderizado condicionalmente cuando se selecciona un país en el mapa */}
      <Dialog open={!!selectedCountryId} onOpenChange={(open) => !open && setSelectedCountryId(null)}>
        {selectedCountry && (
            <DialogContent className="bg-slate-950 border-slate-800 text-slate-200 w-[95vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] font-sans p-0 overflow-hidden shadow-2xl">
              <DialogHeader className="bg-slate-900 border-b border-slate-800 p-6 pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center text-slate-100">
                      <MapPin className="w-6 h-6 mr-2 text-indigo-500" />
                      Expediente IA: {selectedCountry.country}
                    </DialogTitle>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(selectedCountry.status)} px-4 py-1.5 font-mono uppercase tracking-widest shadow-sm w-fit`}>
                    Marco: {selectedCountry.status}
                  </Badge>
                </div>
                
                {/* Tabs de Navegación Interna */}
                <div className="flex gap-6 mt-6 overflow-x-auto scrollbar-hide">
                  <button onClick={() => setActiveTab("overview")} className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>Panorama General</button>
                  <button onClick={() => setActiveTab("legal")} className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'legal' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>Auditoría Legal</button>
                  <button onClick={() => setActiveTab("news")} className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'news' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>Línea de Tiempo</button>
                </div>
              </DialogHeader>

              <div className="p-6 bg-slate-950 min-h-[350px] max-h-[70vh] overflow-y-auto">
                
                {/* TAB: PANORAMA GENERAL */}
                {activeTab === "overview" && (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-300 flex items-center mb-3"><BookOpen className="w-5 h-5 mr-2 text-indigo-400" /> Resumen del Ecosistema</h3>
                      <p className="text-sm md:text-base text-slate-400 leading-relaxed bg-slate-900/40 p-5 rounded-lg border border-slate-800 shadow-inner">{selectedCountry.aiOverview}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-lg flex flex-col justify-center shadow-sm">
                        <div className="flex items-center text-indigo-400 mb-2 text-sm font-medium"><TrendingUp className="w-4 h-4 mr-2"/> Tasa de Adopción</div>
                        <span className="text-lg md:text-xl font-bold text-slate-200 leading-tight">{selectedCountry.marketData.adoption}</span>
                      </div>
                      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-lg flex flex-col justify-center shadow-sm">
                        <div className="flex items-center text-indigo-400 mb-2 text-sm font-medium"><Network className="w-4 h-4 mr-2"/> Inversión Reportada</div>
                        <span className="text-lg md:text-xl font-bold text-slate-200 leading-tight">{selectedCountry.marketData.investment}</span>
                      </div>
                      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-lg flex flex-col justify-center shadow-sm">
                        <div className="flex items-center text-indigo-400 mb-3 text-sm font-medium"><Cpu className="w-4 h-4 mr-2"/> Instituciones Clave</div>
                        <ul className="text-sm text-slate-300 space-y-1.5">
                          {selectedCountry.marketData.institutions.map((inst, i) => <li key={i} className="truncate" title={inst}>• {inst}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: AUDITORIA LEGAL */}
                {activeTab === "legal" && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="bg-indigo-950/20 border border-indigo-900/50 p-4 rounded-lg text-sm text-indigo-200 flex items-center shadow-sm">
                      <Gavel className="w-5 h-5 mr-3" /> 
                      <span className="font-semibold mr-2">Ley Principal:</span> {selectedCountry.framework}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedCountry.dimensions).map(([key, dim]: [string, any]) => {
                        const titles: any = { privacy: "Privacidad de Datos", transparency: "Transparencia Algorítmica", liability: "Resp. Civil y Daños", generative: "IA Generativa", body: "Ente Regulador" };
                        return (
                          <div key={key} className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 shadow-sm hover:border-slate-700 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                              <span className="text-sm font-semibold text-slate-200">{titles[key]}</span>
                              <span className={`text-[10px] px-2.5 py-1 rounded-md border font-medium tracking-wide w-fit ${getStatusColor(dim.status)}`}>{dim.status}</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">{dim.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB: NEWS / CHANGELOG */}
                {activeTab === "news" && (
                  <div className="space-y-6 animate-in fade-in">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center">
                      <Radio className="w-4 h-4 mr-2" /> Historial Registrado
                    </h3>
                    <div className="relative pl-6 border-l-2 border-indigo-500/30 space-y-8 ml-2">
                      {selectedCountry.changelog.map((log, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                          <span className="text-xs font-mono text-indigo-400 block mb-2">{log.date}</span>
                          <p className="text-sm md:text-base text-slate-300 bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-sm">
                            {log.event}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </DialogContent>
        )}
      </Dialog>

      {/* Feed de Noticias Regionales */}
      <div className="grid grid-cols-1 border border-slate-800 rounded-xl overflow-hidden shadow-lg mt-8">
        <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center">
          <Newspaper className="w-5 h-5 mr-2 text-indigo-400" />
          <h2 className="text-lg font-semibold text-slate-200 tracking-wide">AI Regulatory & Innovation News Terminal</h2>
        </div>
        <div className="bg-slate-950 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalNews.map((news, i) => (
              <div key={i} className="flex flex-col space-y-2 p-3 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 rounded-lg cursor-pointer transition-colors group">
                <Badge variant="outline" className="w-fit text-[10px] border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
                  {news.tag}
                </Badge>
                <p className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">{news.title}</p>
                <span className="text-xs text-slate-500 mt-auto pt-2">{news.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

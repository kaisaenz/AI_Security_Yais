"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, BookOpen, AlertCircle, CheckCircle2, Gavel, Scale, Lock, Search, RefreshCw, GitCommit, ExternalLink, Columns, Map } from "lucide-react";
import { useState } from "react";

// Expanded Simulated LatAm AI Policy Data
const policyData = [
  {
    country: "Brasil",
    status: "Avanzado",
    framework: "Proyecto de Ley 2338/2023",
    lastUpdated: "12 May 2024",
    dimensions: {
      privacy: { status: "Fuerte", desc: "Regulaciones estrictas sobre biometría y consentimiento explícito.", plain: "Tus datos biométricos no pueden usarse para entrenar IA sin tu permiso directo.", citation: "Art. 12, PL 2338/2023", link: "#" },
      transparency: { status: "Moderada", desc: "Obligación de explicar decisiones automatizadas de alto riesgo.", plain: "Si un banco usa IA para negarte un crédito, tienen que explicarte por qué.", citation: "Art. 17, PL 2338/2023", link: "#" },
      liability: { status: "Alta", desc: "Responsabilidad civil objetiva y solidaria de los proveedores.", plain: "Si una IA te causa daño, el creador debe pagar, sin importar si fue 'sin querer'.", citation: "Art. 27, PL 2338/2023", link: "#" },
      generative: { status: "Básica", desc: "Requisitos de marcado de agua para deepfakes y contenidos sintéticos.", plain: "Toda imagen generada por IA debe tener una marca de agua visible.", citation: "Enmienda 4, PL 2338/2023", link: "#" },
      body: { status: "Propuesto", desc: "Autoridad Nacional de Protección de Datos (ANPD) asume roles.", plain: "La misma agencia que protege tus datos vigilará la IA.", citation: "Capítulo IV, PL 2338/2023", link: "#" }
    },
    changelog: [
      { date: "2024-05-12", event: "Senado aprueba enmienda sobre derechos de autor en IA Generativa." },
      { date: "2023-11-04", event: "Comisión temporal presenta el reporte final del proyecto." },
      { date: "2023-05-03", event: "El Proyecto de Ley 2338 es introducido formalmente en el Senado." }
    ]
  },
  {
    country: "Chile",
    status: "Avanzado",
    framework: "Política Nacional de IA & Boletín 16584-19",
    lastUpdated: "03 Abr 2024",
    dimensions: {
      privacy: { status: "Fuerte", desc: "Ley de Protección de Datos Personales protege datos de entrenamiento.", plain: "Las empresas chilenas deben anonimizar los datos antes de entrenar modelos.", citation: "Ley 19.628 (Modificada)", link: "#" },
      transparency: { status: "Alta", desc: "Derecho ciudadano a exigir intervención humana en decisiones algorítmicas.", plain: "Puedes exigir que un humano revise cualquier decisión tomada por una IA sobre ti.", citation: "Boletín 16584-19, Art 8", link: "#" },
      liability: { status: "Moderada", desc: "Responsabilidad basada en niveles de riesgo de los sistemas.", plain: "Solo las IAs consideradas 'de alto riesgo' enfrentan multas severas por errores.", citation: "Política Nacional de IA (Eje 3)", link: "#" },
      generative: { status: "Nula", desc: "Sin legislación específica aprobada actualmente sobre contenido sintético.", plain: "No hay leyes claras aún sobre deepfakes políticos o pornografía generada por IA.", citation: "N/A", link: "#" },
      body: { status: "Establecido", desc: "Comisión Interministerial para Políticas de IA.", plain: "Varios ministerios trabajan juntos para regular la tecnología.", citation: "Decreto Supremo 2023", link: "#" }
    },
    changelog: [
      { date: "2024-04-03", event: "Ingresa el Boletín 16584-19 al Congreso para regular sistemas de IA." },
      { date: "2023-10-15", event: "Actualización oficial de la Política Nacional de Inteligencia Artificial." }
    ]
  },
  {
    country: "Perú",
    status: "Intermedio",
    framework: "Ley Nº 31814 (Promoción de IA)",
    lastUpdated: "05 Jul 2023",
    dimensions: {
      privacy: { status: "Moderada", desc: "Se apoya en la Ley de Protección de Datos Personales existente.", plain: "Las leyes antiguas de privacidad se aplican a la IA, pero sin reglas nuevas específicas.", citation: "Ley 29733", link: "#" },
      transparency: { status: "Básica", desc: "Principios generales de transparencia pero sin mecanismos sancionadores.", plain: "Se pide que la IA sea transparente, pero no hay multas si no lo es.", citation: "Art. 4, Ley 31814", link: "#" },
      liability: { status: "Básica", desc: "Aún no se define un marco de responsabilidad civil por daños de IA.", plain: "Es un área gris sobre quién tiene la culpa si una IA peruana falla.", citation: "Reglamentación pendiente", link: "#" },
      generative: { status: "Nula", desc: "No hay provisiones específicas para IA Generativa.", plain: "Uso de ChatGPT y creadores de imágenes no tiene regulación especial.", citation: "N/A", link: "#" },
      body: { status: "Establecido", desc: "Secretaría de Gobierno y Transformación Digital (PCM).", plain: "La presidencia maneja directamente la estrategia de IA.", citation: "Ley 31814, Art. 6", link: "#" }
    },
    changelog: [
      { date: "2023-07-05", event: "El Ejecutivo promulga la Ley Nº 31814 (Ley que promueve el uso de IA)." },
      { date: "2023-05-15", event: "El Congreso aprueba el dictamen de la ley de IA." }
    ]
  },
  {
    country: "México",
    status: "Inicial",
    framework: "Iniciativas fragmentadas en Senado",
    lastUpdated: "20 Mar 2024",
    dimensions: {
      privacy: { status: "Moderada", desc: "INAI lidera recomendaciones, pero sin ley IA específica.", plain: "El INAI da consejos sobre IA, pero no hay leyes nuevas que te protejan específicamente.", citation: "Recomendaciones INAI 2023", link: "#" },
      transparency: { status: "Nula", desc: "Sin obligación legal de auditorías o explicabilidad algorítmica.", plain: "Las empresas no tienen que explicar cómo funcionan sus algoritmos.", citation: "N/A", link: "#" },
      liability: { status: "Nula", desc: "Vacío legal sobre la responsabilidad en automatización.", plain: "No hay leyes que definan quién paga los platos rotos si una IA se equivoca.", citation: "N/A", link: "#" },
      generative: { status: "Propuesto", desc: "Iniciativas propuestas sobre deepfakes electorales.", plain: "Se propuso castigar los audios falsos en elecciones, pero aún no es ley.", citation: "Iniciativa Senado (Marzo 2024)", link: "#" },
      body: { status: "Inexistente", desc: "No hay un ente regulador centralizado para Inteligencia Artificial.", plain: "Nadie en el gobierno está encargado exclusivamente de vigilar la IA.", citation: "N/A", link: "#" }
    },
    changelog: [
      { date: "2024-03-20", event: "Presentan iniciativa en el Senado para criminalizar deepfakes políticos." },
      { date: "2023-09-12", event: "El INAI publica recomendaciones para desarrolladores de sistemas de IA." }
    ]
  }
];

export default function AuditsPage() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);

  const toggleCountry = (country: string) => {
    if (compareMode) {
      if (selectedCountries.includes(country)) {
        setSelectedCountries(selectedCountries.filter(c => c !== country));
      } else {
        if (selectedCountries.length < 2) setSelectedCountries([...selectedCountries, country]);
      }
    } else {
      setSelectedCountries([country]);
    }
  };

  const getStatusColor = (status: string) => {
    if (["Fuerte", "Alta", "Establecido", "Avanzado"].includes(status)) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (["Moderada", "Intermedio", "Propuesto", "Básica"].includes(status)) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-rose-500/10 text-rose-400 border-rose-500/20";
  };

  const getStatusIcon = (status: string) => {
    if (["Fuerte", "Alta", "Establecido", "Avanzado"].includes(status)) return <CheckCircle2 className="w-3 h-3 mr-1" />;
    if (["Moderada", "Intermedio", "Propuesto", "Básica"].includes(status)) return <AlertCircle className="w-3 h-3 mr-1" />;
    return <AlertCircle className="w-3 h-3 mr-1" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Observatorio de Gobernanza IA</h1>
          <p className="text-slate-400 max-w-2xl">Seguimiento en tiempo real de legislación, regulación y políticas de IA en América Latina. Audite la madurez normativa, brechas de privacidad y marcos de responsabilidad.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/5">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin-slow" /> Data en vivo
          </Badge>
          <button 
            onClick={() => { setCompareMode(!compareMode); setSelectedCountries([]); }}
            className={`flex items-center text-xs px-3 py-1.5 rounded-md border transition-colors ${compareMode ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
          >
            <Columns className="w-3 h-3 mr-2" />
            {compareMode ? 'Desactivar Comparación' : 'Modo Comparación (2 Países)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar de Países (Interactive Map Proxy) */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="flex items-center"><Map className="w-4 h-4 mr-2 text-indigo-400" /> Jurisdicciones</span>
                {compareMode && <Badge className="text-[10px] bg-indigo-600">{selectedCountries.length}/2</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {policyData.map((country) => {
                  const isSelected = selectedCountries.includes(country.country);
                  return (
                    <button
                      key={country.country}
                      onClick={() => toggleCountry(country.country)}
                      className={`text-left px-4 py-4 flex flex-col border-b border-slate-800/50 transition-colors hover:bg-slate-800/80 ${isSelected ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500' : ''}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="font-semibold text-slate-200">{country.country}</span>
                        <Badge variant="outline" className={`text-[10px] ${getStatusColor(country.status)}`}>
                          {country.status}
                        </Badge>
                      </div>
                      <span className="text-[11px] text-slate-500 truncate">{country.framework}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de Detalles / Comparación */}
        <div className={`lg:col-span-3 ${compareMode && selectedCountries.length === 2 ? 'grid grid-cols-2 gap-4' : ''}`}>
          {selectedCountries.length === 0 ? (
            <Card className="bg-slate-900/30 border-slate-800 h-full flex flex-col items-center justify-center p-12 text-center text-slate-500 border-dashed">
              <Scale className="w-12 h-12 mb-4 text-slate-700" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">Selecciona un jurisdicción</h3>
              <p className="max-w-md mx-auto text-sm">Explora el perfil de gobernanza de un país o activa el modo comparación para evaluar brechas regulatorias frente a frente.</p>
            </Card>
          ) : (
            selectedCountries.map(countryName => {
              const country = policyData.find(c => c.country === countryName)!;
              return (
                <div key={country.country} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  
                  {/* Encabezado del País */}
                  <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 relative overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl font-bold mb-1">{country.country}</CardTitle>
                          <CardDescription className="text-slate-400 flex flex-col mt-2 gap-1 text-sm">
                            <span className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-indigo-400" /> {country.framework}</span>
                            <span className="flex items-center text-xs text-slate-500"><RefreshCw className="w-3 h-3 mr-2" /> Actualizado: {country.lastUpdated}</span>
                          </CardDescription>
                        </div>
                        <Badge className={`px-3 py-1 ${getStatusColor(country.status)}`}>
                          Madurez: {country.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Dimensiones */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-800 pb-2">Dimensiones de Regulación</h3>
                    
                    {Object.entries(country.dimensions).map(([key, dim]: [string, any]) => {
                      const icons: any = { privacy: Lock, transparency: Search, liability: Scale, generative: Shield, body: Gavel };
                      const titles: any = { privacy: "Privacidad & Datos Biom.", transparency: "Transparencia Algorítmica", liability: "Resp. Civil y Daños", generative: "IA Generativa y Deepfakes", body: "Ente Regulador Central" };
                      const Icon = icons[key];

                      return (
                        <Card key={key} className="bg-slate-900/50 border-slate-800">
                          <CardHeader className="py-3 px-4 border-b border-slate-800/50 bg-slate-950/30">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-sm font-medium flex items-center text-slate-300">
                                <Icon className="w-4 h-4 mr-2 text-indigo-400" /> {titles[key]}
                              </CardTitle>
                              <Badge variant="outline" className={`text-[10px] flex items-center ${getStatusColor(dim.status)}`}>
                                {getStatusIcon(dim.status)} {dim.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 space-y-3">
                            <p className="text-sm text-slate-300 font-medium">{dim.desc}</p>
                            <div className="bg-slate-950 p-3 rounded border border-slate-800">
                              <p className="text-xs text-slate-400 italic">" {dim.plain} "</p>
                            </div>
                            <div className="flex justify-end">
                              <a href={dim.link} className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center transition-colors">
                                <ExternalLink className="w-3 h-3 mr-1" /> Cita Oficial: {dim.citation}
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Changelog */}
                  {!compareMode && (
                    <div className="space-y-4 mt-8">
                      <h3 className="text-lg font-semibold border-b border-slate-800 pb-2">Historial Legislativo (Changelog)</h3>
                      <div className="relative pl-4 border-l border-slate-800 space-y-6">
                        {country.changelog.map((log, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[21px] top-1 bg-slate-950 border border-slate-700 rounded-full p-0.5">
                              <GitCommit className="w-3 h-3 text-slate-500" />
                            </div>
                            <div className="pl-2">
                              <span className="text-[10px] font-mono text-indigo-400 block mb-1">{log.date}</span>
                              <p className="text-sm text-slate-300">{log.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

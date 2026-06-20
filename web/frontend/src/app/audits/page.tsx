"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, BookOpen, AlertCircle, CheckCircle2, Gavel, Scale, Lock, Search, RefreshCw } from "lucide-react";
import { useState } from "react";

// Simulated LatAm AI Policy Data
const policyData = [
  {
    country: "Brasil",
    status: "Avanzado",
    framework: "Proyecto de Ley 2338/2023",
    dimensions: {
      privacy: { status: "Fuerte", desc: "Regulaciones estrictas sobre biometría y consentimiento explícito." },
      transparency: { status: "Moderada", desc: "Obligación de explicar decisiones automatizadas de alto riesgo." },
      liability: { status: "Alta", desc: "Responsabilidad civil objetiva y solidaria de los proveedores." },
      generative: { status: "Básica", desc: "Requisitos de marcado de agua para deepfakes y contenidos sintéticos." },
      body: { status: "Propuesto", desc: "Autoridad Nacional de Protección de Datos asume roles." }
    }
  },
  {
    country: "Chile",
    status: "Avanzado",
    framework: "Política Nacional de IA & Boletín 16584-19",
    dimensions: {
      privacy: { status: "Fuerte", desc: "Ley de Protección de Datos Personales (reformada) protege datos de entrenamiento." },
      transparency: { status: "Alta", desc: "Derecho ciudadano a exigir intervención humana en decisiones algorítmicas." },
      liability: { status: "Moderada", desc: "Responsabilidad basada en niveles de riesgo de los sistemas." },
      generative: { status: "Nula", desc: "Sin legislación específica aprobada actualmente sobre contenido sintético." },
      body: { status: "Establecido", desc: "Comisión Interministerial para Políticas de IA." }
    }
  },
  {
    country: "Perú",
    status: "Intermedio",
    framework: "Ley Nº 31814 (Ley que promueve el uso de IA)",
    dimensions: {
      privacy: { status: "Moderada", desc: "Se apoya en la Ley de Protección de Datos Personales existente." },
      transparency: { status: "Básica", desc: "Principios generales de transparencia pero sin mecanismos sancionadores." },
      liability: { status: "Básica", desc: "Aún no se define un marco de responsabilidad civil por daños de IA." },
      generative: { status: "Nula", desc: "No hay provisiones específicas para IA Generativa." },
      body: { status: "Establecido", desc: "Secretaría de Gobierno y Transformación Digital (PCM)." }
    }
  },
  {
    country: "México",
    status: "Inicial",
    framework: "Diversas iniciativas fragmentadas en el Senado",
    dimensions: {
      privacy: { status: "Moderada", desc: "INAI lidera recomendaciones, pero sin ley IA específica." },
      transparency: { status: "Nula", desc: "Sin obligación legal de auditorías o explicabilidad algorítmica." },
      liability: { status: "Nula", desc: "Vacío legal sobre la responsabilidad en automatización." },
      generative: { status: "Nula", desc: "Iniciativas propuestas sobre deepfakes en periodo electoral, sin aprobar." },
      body: { status: "Inexistente", desc: "No hay un ente regulador centralizado para Inteligencia Artificial." }
    }
  }
];

export default function AuditsPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Observatorio de Gobernanza IA</h1>
          <p className="text-slate-400">Auditoría regulatoria de Inteligencia Artificial en América Latina.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">
            <RefreshCw className="w-3 h-3 mr-1" /> Actualizado hoy
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar de Países */}
        <div className="md:col-span-1 space-y-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-sm font-medium flex items-center">
                <Search className="w-4 h-4 mr-2 text-indigo-400" /> Explorar Países
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {policyData.map((country) => (
                  <button
                    key={country.country}
                    onClick={() => setSelectedCountry(country.country)}
                    className={`text-left px-4 py-3 flex items-center justify-between border-b border-slate-800/50 transition-colors hover:bg-slate-800/50 ${selectedCountry === country.country ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500' : ''}`}
                  >
                    <span className="font-medium text-slate-200">{country.country}</span>
                    <Badge variant="outline" className={`text-[10px] ${getStatusColor(country.status)}`}>
                      {country.status}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-400">
            <p>Selecciona un país para auditar el estado de sus normativas, leyes de protección de datos y marcos de responsabilidad frente al despliegue de Inteligencia Artificial.</p>
          </div>
        </div>

        {/* Panel de Detalles */}
        <div className="md:col-span-3">
          {!selectedCountry ? (
            <Card className="bg-slate-900/30 border-slate-800 h-full flex flex-col items-center justify-center p-12 text-center text-slate-500 border-dashed">
              <Scale className="w-12 h-12 mb-4 text-slate-700" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">Selecciona un país</h3>
              <p className="max-w-md mx-auto">Comienza tu auditoría seleccionando una jurisdicción en el panel lateral para evaluar sus dimensiones de gobernanza de IA.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {policyData.filter(c => c.country === selectedCountry).map(country => (
                <div key={country.country} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  
                  {/* Encabezado del País */}
                  <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Gavel className="w-48 h-48" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl font-bold mb-1">{country.country}</CardTitle>
                          <CardDescription className="text-slate-400 flex items-center mt-2">
                            <BookOpen className="w-4 h-4 mr-2" /> Marco Principal: {country.framework}
                          </CardDescription>
                        </div>
                        <Badge className={`px-3 py-1 ${getStatusColor(country.status)}`}>
                          Estado General: {country.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Dimensiones de Auditoría */}
                  <h3 className="text-lg font-semibold border-b border-slate-800 pb-2">Dimensiones de Auditoría (Taxonomía LATAM)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Privacidad de Datos */}
                    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex justify-between items-center text-slate-300">
                          <span className="flex items-center"><Lock className="w-4 h-4 mr-2 text-indigo-400" /> Privacidad & Datos</span>
                          <Badge variant="outline" className={`text-[10px] flex items-center ${getStatusColor(country.dimensions.privacy.status)}`}>
                            {getStatusIcon(country.dimensions.privacy.status)} {country.dimensions.privacy.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400 leading-relaxed">{country.dimensions.privacy.desc}</p>
                      </CardContent>
                    </Card>

                    {/* Transparencia */}
                    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex justify-between items-center text-slate-300">
                          <span className="flex items-center"><Search className="w-4 h-4 mr-2 text-indigo-400" /> Transparencia Algorítmica</span>
                          <Badge variant="outline" className={`text-[10px] flex items-center ${getStatusColor(country.dimensions.transparency.status)}`}>
                            {getStatusIcon(country.dimensions.transparency.status)} {country.dimensions.transparency.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400 leading-relaxed">{country.dimensions.transparency.desc}</p>
                      </CardContent>
                    </Card>

                    {/* Responsabilidad */}
                    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex justify-between items-center text-slate-300">
                          <span className="flex items-center"><Scale className="w-4 h-4 mr-2 text-indigo-400" /> Marcos de Responsabilidad</span>
                          <Badge variant="outline" className={`text-[10px] flex items-center ${getStatusColor(country.dimensions.liability.status)}`}>
                            {getStatusIcon(country.dimensions.liability.status)} {country.dimensions.liability.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400 leading-relaxed">{country.dimensions.liability.desc}</p>
                      </CardContent>
                    </Card>

                    {/* IA Generativa */}
                    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex justify-between items-center text-slate-300">
                          <span className="flex items-center"><Shield className="w-4 h-4 mr-2 text-indigo-400" /> IA Generativa & Deepfakes</span>
                          <Badge variant="outline" className={`text-[10px] flex items-center ${getStatusColor(country.dimensions.generative.status)}`}>
                            {getStatusIcon(country.dimensions.generative.status)} {country.dimensions.generative.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400 leading-relaxed">{country.dimensions.generative.desc}</p>
                      </CardContent>
                    </Card>

                    {/* Ente Regulador */}
                    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex justify-between items-center text-slate-300">
                          <span className="flex items-center"><Gavel className="w-4 h-4 mr-2 text-indigo-400" /> Ente Regulador Oficial</span>
                          <Badge variant="outline" className={`text-[10px] flex items-center ${getStatusColor(country.dimensions.body.status)}`}>
                            {getStatusIcon(country.dimensions.body.status)} {country.dimensions.body.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400 leading-relaxed">{country.dimensions.body.desc}</p>
                      </CardContent>
                    </Card>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle2 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
            <FileText className="w-8 h-8 text-emerald-500 mr-3" />
            Propuesta de Resiliencia
          </h1>
          <p className="text-slate-400">Recomendaciones estratégicas y arquitectura híbrida objetivo.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF Ejecutivo
        </Button>
      </div>

      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Arquitectura Híbrida Propuesta (Tier 1-3)</CardTitle>
          <CardDescription>Estrategia de mitigación para reducir la dependencia sin perder innovación.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-lg">
              <h3 className="text-emerald-400 font-bold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Tier 1: Soberanía Estricta (On-Premise / Nube Nacional)
              </h3>
              <p className="text-sm text-slate-400">
                Sistemas Core (SPEI, Datos Fiscales, Expediente Clínico). Los datos críticos nunca abandonan la jurisdicción nacional. RPO = 0.
              </p>
            </div>

            <div className="p-4 border border-indigo-500/30 bg-indigo-500/5 rounded-lg">
              <h3 className="text-indigo-400 font-bold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Tier 2: Nube Híbrida (Failover & Backup)
              </h3>
              <p className="text-sm text-slate-400">
                Replicación cifrada en tránsito y en reposo hacia nubes extranjeras únicamente como sitio de recuperación ante desastres (DR) cifrado con llaves manejadas localmente (BYOK).
              </p>
            </div>

            <div className="p-4 border border-slate-500/30 bg-slate-500/5 rounded-lg">
              <h3 className="text-slate-300 font-bold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Tier 3: Nube Pública Extranjera
              </h3>
              <p className="text-sm text-slate-400">
                Uso elástico para cargas no críticas: CDN de activos estáticos, entrenamiento de modelos ML con datos anonimizados, procesamiento en batch escalable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

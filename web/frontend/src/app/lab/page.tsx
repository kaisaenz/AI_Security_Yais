"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Zap, Play, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function LabPage() {
  const [foreignStatus, setForeignStatus] = useState<"online" | "offline">("online");
  const [speiStatus, setSpeiStatus] = useState<"online" | "degraded" | "offline">("online");
  const [latency, setLatency] = useState(12);
  const [loading, setLoading] = useState(false);

  // Poll status from backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:8000/lab/status");
        const data = await res.json();
        setForeignStatus(data.foreign_status);
        setSpeiStatus(data.spei_status);
        setLatency(data.latency);
      } catch (e) {
        console.error(e);
      }
    };
    const interval = setInterval(fetchStatus, 2000);
    fetchStatus();
    return () => clearInterval(interval);
  }, []);

  const simulateAction = async (action: string) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:8000/lab/chaos/${action}`, { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
          <Zap className="w-8 h-8 text-amber-500 mr-3" />
          Laboratorio Chaos (Simulación)
        </h1>
        <p className="text-slate-400">Panel de control para inyectar fallos de red y evaluar la resiliencia.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controles */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Controles de Inyección</CardTitle>
              <CardDescription>Escenarios de fallo sistémico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white flex justify-between"
                onClick={() => simulateAction("block_foreign_cloud")}
                disabled={foreignStatus === 'offline' || loading}
              >
                <span>Cortar Nube Extranjera</span>
                <AlertTriangle className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="w-full border-slate-700 hover:bg-slate-800 flex justify-between"
                onClick={() => simulateAction("add_latency")}
                disabled={latency > 100 || loading}
              >
                <span>Añadir Latencia (5000ms)</span>
                <Activity className="w-4 h-4 ml-2" />
              </Button>
              <div className="h-px bg-slate-800 my-4" />
              <Button 
                variant="secondary"
                className="w-full bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 flex justify-between"
                onClick={() => simulateAction("restore_all")}
                disabled={(foreignStatus === 'online' && latency === 12) || loading}
              >
                <span>Restaurar Servicios</span>
                <RotateCcw className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Topología y Estado */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Topología en Vivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8 text-center">
                {/* Nube Soberana / Local */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">DMZ Nacional</h3>
                  
                  <div className={`p-4 rounded-xl border ${speiStatus === 'online' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-amber-500/50 bg-amber-500/10'} transition-colors duration-500`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">SPEI Mock API</span>
                      {speiStatus === 'online' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <div className="text-xs text-left text-slate-400">
                      Latencia: {speiStatus === 'online' ? '12ms' : '> 5000ms'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-500/50 bg-emerald-500/10">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Base de Datos (Local)</span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Nube Extranjera */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Proveedor Extranjero</h3>
                  
                  <div className={`p-4 rounded-xl border ${foreignStatus === 'online' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-rose-500/50 bg-rose-500/10'} transition-colors duration-500`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">Motor Analytics / Anti-Fraude</span>
                      {foreignStatus === 'online' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Activity className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                    <div className="text-xs text-left text-slate-400">
                      Estado: {foreignStatus === 'online' ? 'Conectado (AWS us-east-1)' : 'Connection Timeout'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

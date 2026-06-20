"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Globe, Database, Building2, Search, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [targetDomain, setTargetDomain] = useState("banxico.org.mx");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch(`http://localhost:8000/api/osint/scan?target=${targetDomain}`, { method: "POST" });
      const data = await res.json();
      
      if (data.scan_id) {
        const resResult = await fetch(`http://localhost:8000/api/osint/results/${data.scan_id}`);
        const resultData = await resResult.json();
        setScanResult(resultData.data);
      }
    } catch (e) {
      console.error(e);
    }
    setIsScanning(false);
  };

  const hasData = scanResult !== null;
  const foreignPercentage = hasData ? scanResult.foreign_dependency_percentage.toFixed(0) : "0";
  const numIps = hasData ? scanResult.infrastructure.length : 0;
  const riskScore = hasData ? scanResult.risk_score : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Reconocimiento OSINT</h1>
          <p className="text-slate-400">Escaneo pasivo de dependencias de infraestructura gubernamental.</p>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={targetDomain}
            onChange={(e) => setTargetDomain(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-sm focus:outline-none focus:border-indigo-500"
            placeholder="Dominio a analizar..."
          />
          <Button onClick={handleScan} disabled={isScanning} className="bg-indigo-600 hover:bg-indigo-700">
            {isScanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            Escanear
          </Button>
        </div>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Nodos Descubiertos (IPs)</CardTitle>
            <Globe className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hasData ? numIps : "-"}</div>
            <p className="text-xs text-slate-500 mt-1">{hasData ? `Asociados a ${scanResult.domain}` : "Esperando escaneo..."}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Nube Extranjera (Dependencia)</CardTitle>
            <Server className="w-4 h-4 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-400">{hasData ? `${foreignPercentage}%` : "-"}</div>
            <p className="text-xs text-slate-500 mt-1">Nodos alojados fuera del país</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Score de Riesgo</CardTitle>
            <Building2 className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hasData ? `${riskScore}/100` : "-"}</div>
            <p className="text-xs text-slate-500 mt-1">Basado en alojamiento externo</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Riesgo Normativo</CardTitle>
            <Database className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${hasData && Number(foreignPercentage) > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {hasData ? (Number(foreignPercentage) > 50 ? 'Alto' : 'Bajo') : "-"}
            </div>
            <p className="text-xs text-slate-500 mt-1">Posible transferencia transfronteriza</p>
          </CardContent>
        </Card>
      </div>

      {/* Detalles del Escaneo */}
      {hasData && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Detalle de Nodos (Infraestructura Detectada)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scanResult.infrastructure.map((node: any, idx: number) => (
              <Card key={idx} className="bg-slate-900/30 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-lg">
                    <span>{node.ip}</span>
                    <Badge variant={node.is_foreign ? 'destructive' : 'default'} className={node.is_foreign ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}>
                      {node.is_foreign ? 'Extranjero' : 'Nacional/Local'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Proveedor (ISP):</span>
                    <span className="text-slate-200">{node.isp}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">País:</span>
                    <span className="text-slate-200">{node.country}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">ASN:</span>
                    <span className="text-slate-200">{node.asn}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

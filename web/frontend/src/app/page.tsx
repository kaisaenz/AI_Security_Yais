"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Globe, Database, Building2, Search, Loader2, TerminalSquare } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [targetDomain, setTargetDomain] = useState("banxico.org.mx");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    setLogs([]);
    addLog(`Iniciando motor OSINT para objetivo: ${targetDomain}...`);
    addLog(`Resolviendo registros DNS base (A, MX)...`);
    
    try {
      const res = await fetch(`http://localhost:8000/api/osint/scan?target=${targetDomain}`, { method: "POST" });
      const data = await res.json();
      
      if (data.scan_id) {
        addLog(`Ejecutando fuerza bruta de subdominios comunes...`);
        // Simulate delay for realism
        await new Promise(r => setTimeout(r, 1500));
        addLog(`Consultando bases de datos BGP y ASN (ip-api)...`);
        await new Promise(r => setTimeout(r, 1000));
        addLog(`Simulando escaneo de puertos sobre infraestructura descubierta...`);
        await new Promise(r => setTimeout(r, 1000));

        const resResult = await fetch(`http://localhost:8000/api/osint/results/${data.scan_id}`);
        const resultData = await resResult.json();
        
        addLog(`Escaneo completado. Encontrados ${resultData.data.infrastructure.length} nodos activos.`);
        setScanResult(resultData.data);
      }
    } catch (e) {
      console.error(e);
      addLog(`ERROR: No se pudo conectar con el motor OSINT.`);
    }
    setIsScanning(false);
  };

  const hasData = scanResult !== null;
  const foreignPercentage = hasData ? scanResult.foreign_dependency_percentage.toFixed(0) : "0";
  const numIps = hasData ? scanResult.infrastructure.length : 0;
  const riskScore = hasData ? scanResult.risk_score : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Reconocimiento OSINT</h1>
          <p className="text-slate-400">Escaneo pasivo de dependencias de infraestructura y vectores de ataque.</p>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={targetDomain}
            onChange={(e) => setTargetDomain(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-sm focus:outline-none focus:border-indigo-500 w-64"
            placeholder="Dominio a analizar..."
          />
          <Button onClick={handleScan} disabled={isScanning} className="bg-indigo-600 hover:bg-indigo-700 w-32">
            {isScanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            Escanear
          </Button>
        </div>
      </div>

      {/* Terminal Log */}
      {(isScanning || logs.length > 0) && (
        <Card className="bg-black border-slate-800 font-mono text-xs text-green-400">
          <CardHeader className="py-2 px-4 border-b border-slate-800 flex flex-row items-center bg-slate-950/50">
            <TerminalSquare className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-slate-500 font-sans font-medium text-xs">centinela-core-engine</span>
          </CardHeader>
          <CardContent className="p-4 space-y-1 h-32 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
            {isScanning && <div className="animate-pulse">_</div>}
          </CardContent>
        </Card>
      )}

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Nodos (IPs/Hosts)</CardTitle>
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
            <p className="text-xs text-slate-500 mt-1">Hospedaje fuera de jurisdicción local</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Score de Riesgo</CardTitle>
            <Building2 className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${hasData && riskScore > 50 ? 'text-amber-400' : 'text-slate-200'}`}>
              {hasData ? `${riskScore}/100` : "-"}
            </div>
            <p className="text-xs text-slate-500 mt-1">Basado en superficie de ataque y hosting</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Riesgo Normativo (Soberanía)</CardTitle>
            <Database className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${hasData && Number(foreignPercentage) > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {hasData ? (Number(foreignPercentage) > 50 ? 'Alto' : 'Bajo') : "-"}
            </div>
            <p className="text-xs text-slate-500 mt-1">Posible fuga transfronteriza de datos</p>
          </CardContent>
        </Card>
      </div>

      {/* Detalles del Escaneo */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          
          {/* Columna Izquierda: DNS Records */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold mb-4">Registros DNS</h2>
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Registros A (Main IPs)</h3>
                  <div className="flex flex-wrap gap-2">
                    {scanResult.dns_records.A.map((ip: string) => (
                      <Badge key={ip} variant="secondary" className="bg-slate-800 font-mono">{ip}</Badge>
                    ))}
                    {scanResult.dns_records.A.length === 0 && <span className="text-xs text-slate-600">No encontrados</span>}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Registros MX (Correos)</h3>
                  <div className="flex flex-col gap-1">
                    {scanResult.dns_records.MX.map((mx: string) => (
                      <span key={mx} className="text-xs text-slate-300 font-mono bg-slate-800/50 px-2 py-1 rounded">{mx}</span>
                    ))}
                    {scanResult.dns_records.MX.length === 0 && <span className="text-xs text-slate-600">No encontrados</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha: Nodos de Infraestructura */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
              Topología de Nodos
              <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">Total: {scanResult.infrastructure.length}</Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scanResult.infrastructure.map((node: any, idx: number) => (
                <Card key={idx} className="bg-slate-900/30 border-slate-800 hover:border-slate-600 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-start text-base">
                      <div className="flex flex-col">
                        <span className="font-mono text-indigo-400">{node.ip}</span>
                        {node.host && (
                          <span className="text-xs text-slate-400 font-normal mt-1">{node.host}</span>
                        )}
                      </div>
                      <Badge variant={node.is_foreign ? 'destructive' : 'default'} className={node.is_foreign ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}>
                        {node.is_foreign ? 'Extranjero' : 'Soberano'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Proveedor:</span>
                      <span className="text-slate-200 font-medium truncate max-w-[120px]" title={node.isp}>{node.isp}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">País:</span>
                      <span className="text-slate-200 flex items-center">
                        {node.country}
                        {node.country === 'United States' && <span className="ml-1 text-sm" title="EE.UU.">🇺🇸</span>}
                        {node.country === 'Mexico' && <span className="ml-1 text-sm" title="México">🇲🇽</span>}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">ASN:</span>
                      <span className="text-slate-200">{node.asn}</span>
                    </div>
                    {node.open_ports && node.open_ports.length > 0 && (
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-800/50 mt-2">
                        <span className="text-slate-500">Puertos:</span>
                        <div className="flex gap-1 flex-wrap justify-end max-w-[120px]">
                          {node.open_ports.map((port: number) => (
                            <span key={port} className="text-[10px] bg-slate-950 border border-slate-700 px-1 rounded text-slate-300">
                              {port}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Globe, Database, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reconocimiento OSINT</h1>
        <p className="text-slate-400">Escaneo pasivo de dependencias de infraestructura gubernamental.</p>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Total Dominios Analizados</CardTitle>
            <Globe className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-slate-500 mt-1">SPEI, SAT, IMSS</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Nube Extranjera (Dependencia)</CardTitle>
            <Server className="w-4 h-4 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-400">68%</div>
            <p className="text-xs text-slate-500 mt-1">Nodos alojados fuera del país</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Proveedores Detectados</CardTitle>
            <Building2 className="w-4 h-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-slate-500 mt-1">AWS, Azure, GCP, Kio...</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">Riesgo Normativo</CardTitle>
            <Database className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400">Alto</div>
            <p className="text-xs text-slate-500 mt-1">Posible fuga de datos sensibles</p>
          </CardContent>
        </Card>
      </div>

      {/* Detalles por Entidad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {[
          { name: "SPEI (Banxico)", status: "Crítico", foreign: "75%", providers: ["AWS", "Akamai"] },
          { name: "SAT", status: "Moderado", foreign: "45%", providers: ["Azure", "Kio Networks"] },
          { name: "IMSS", status: "Alto", foreign: "60%", providers: ["AWS", "GCP", "Telmex"] }
        ].map((entity) => (
          <Card key={entity.name} className="bg-slate-900/30 border-slate-800 hover:bg-slate-900/50 transition-colors cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{entity.name}</span>
                <Badge variant={entity.status === 'Crítico' ? 'destructive' : entity.status === 'Alto' ? 'default' : 'secondary'} className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20">
                  {entity.status}
                </Badge>
              </CardTitle>
              <CardDescription>Resumen de infraestructura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 text-slate-400">
                  <span>Dependencia Extranjera</span>
                  <span className="font-medium text-slate-200">{entity.foreign}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: entity.foreign }}></div>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-slate-500 block mb-1">Proveedores principales:</span>
                <div className="flex flex-wrap gap-2">
                  {entity.providers.map(p => (
                    <span key={p} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

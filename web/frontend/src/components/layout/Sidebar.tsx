"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ShieldAlert, Network, FileText, Settings, LayoutDashboard, SlidersHorizontal, Database } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "OSINT Pasivo", path: "/", icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { name: "Amenazas", path: "/threats", icon: <Network className="w-5 h-5 mr-3" /> },
    { name: "Laboratorio Chaos", path: "/lab", icon: <Activity className="w-5 h-5 mr-3" /> },
    { name: "Resiliencia", path: "/reports", icon: <FileText className="w-5 h-5 mr-3" /> },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl hidden md:flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <ShieldAlert className="w-6 h-6 text-indigo-500 mr-2" />
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          ResilienceGov
        </span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path}
              href={item.path} 
              className={`flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center text-slate-400 hover:text-slate-200 w-full px-3 py-2 transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              Configuración
            </button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-slate-200">
            <DialogHeader>
              <DialogTitle>Configuración del Sistema</DialogTitle>
              <DialogDescription className="text-slate-400">Ajusta los parámetros del motor OSINT y del laboratorio.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center"><SlidersHorizontal className="w-4 h-4 mr-2" /> Timeout de Escaneo (OSINT)</label>
                <input type="number" defaultValue={30} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center"><Database className="w-4 h-4 mr-2" /> API Key (ip-api PRO)</label>
                <input type="password" placeholder="Opcional (usando capa gratuita)" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md" />
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium mt-4 transition-colors">Guardar Cambios</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  );
}

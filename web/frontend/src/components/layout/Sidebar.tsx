import Link from "next/link";
import { Activity, ShieldAlert, Network, FileText, Settings, LayoutDashboard } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl hidden md:flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <ShieldAlert className="w-6 h-6 text-indigo-500 mr-2" />
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          ResilienceGov
        </span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
        <Link href="/" className="flex items-center px-3 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium transition-colors">
          <LayoutDashboard className="w-5 h-5 mr-3" />
          OSINT Pasivo
        </Link>
        <Link href="/threats" className="flex items-center px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors font-medium">
          <Network className="w-5 h-5 mr-3" />
          Amenazas
        </Link>
        <Link href="/lab" className="flex items-center px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors font-medium">
          <Activity className="w-5 h-5 mr-3" />
          Laboratorio Chaos
        </Link>
        <Link href="/reports" className="flex items-center px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors font-medium">
          <FileText className="w-5 h-5 mr-3" />
          Resiliencia
        </Link>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center text-slate-400 hover:text-slate-200 w-full px-3 py-2 transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          Configuración
        </button>
      </div>
    </aside>
  );
}

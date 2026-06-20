export function Topbar() {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-slate-300">Análisis de Infraestructura Crítica</h2>
        <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">
          Entorno Demo - No Atacar
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          Docker Lab Online
        </div>
        <div className="w-px h-4 bg-slate-800"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          Backend Online
        </div>
      </div>
    </header>
  );
}

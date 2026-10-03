import Icon from "./Icon";

const links = [
  ["Registration", "#register"],
  ["Donor directory", "#directory"],
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-0 lg:px-10">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="VitalPulse home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-700 text-white"><Icon name="drop" className="h-6 w-6" /></span>
          <span><span className="block text-lg font-bold leading-tight tracking-tight text-rose-800">VitalPulse</span><span className="block text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Blood registry</span></span>
        </a>
        <nav aria-label="Main navigation" className="order-3 -mx-4 flex basis-[calc(100%+2rem)] gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 sm:order-none sm:mx-0 sm:basis-auto sm:p-0">
          {links.map(([label, href]) => <a key={href} href={href} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-800 sm:text-sm">{label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800 sm:inline">Alappuzha</span>
        </div>
      </div>
    </header>
  );
}

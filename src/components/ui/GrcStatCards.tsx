import type { LucideIcon } from "lucide-react";

export interface GrcStatCardItem {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  badge?: string;
}

interface GrcStatCardsProps {
  stats: GrcStatCardItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export const GrcStatCards = ({ stats, className = "", columns = 4 }: GrcStatCardsProps) => {
  const getColClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
      default:
        return "grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <section className={`py-10 relative overflow-hidden bg-slate-50/70 border-y border-slate-200/80 ${className}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`grid ${getColClass()} gap-4 sm:gap-6`}>
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative z-10 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-105 transition-all duration-300">
                      <StatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    {stat.badge && (
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        {stat.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-baseline gap-0.5 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-none">
                      {stat.prefix && <span className="text-lg sm:text-xl text-blue-600 mr-0.5">{stat.prefix}</span>}
                      {stat.value}
                      {stat.suffix && <span className="text-base sm:text-lg text-blue-600 font-bold ml-1">{stat.suffix}</span>}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-extrabold uppercase tracking-wider mt-2 line-clamp-1">
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p className="text-[11px] text-slate-400 font-medium mt-1 line-clamp-2 leading-relaxed">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default GrcStatCards;

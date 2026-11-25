import { Clock, Calendar, CheckCircle2, Stethoscope, RefreshCw } from "lucide-react";

export default function StatsCards({ stats, loading, onRefresh }) {
  const cards = [
    {
      title: "Pending Requests",
      count: stats?.pending ?? 0,
      sublabel: "Needs vet confirmation",
      icon: Clock,
      color: "bg-amber-500",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50/70 border-amber-200",
    },
    {
      title: "Today's Consults",
      count: stats?.today ?? 0,
      sublabel: "Scheduled for today",
      icon: Calendar,
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50/70 border-emerald-200",
    },
    {
      title: "Completed",
      count: stats?.completed ?? 0,
      sublabel: "Successfully conducted",
      icon: CheckCircle2,
      color: "bg-[#5C2A73]",
      textColor: "text-[#5C2A73]",
      bgColor: "bg-purple-50/70 border-purple-200",
    },
    {
      title: "Total Practice Consults",
      count: stats?.total ?? 0,
      sublabel: "All lifetime bookings",
      icon: Stethoscope,
      color: "bg-[#E86A33]",
      textColor: "text-[#E86A33]",
      bgColor: "bg-orange-50/70 border-orange-200",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Real-Time Consultation Metrics
        </h3>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E86A33] transition"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${card.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">{card.title}</span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-white ${card.color} shadow-sm`}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div className="mt-3">
                <span className={`text-2xl font-black ${card.textColor}`}>
                  {loading ? "--" : card.count}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">{card.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

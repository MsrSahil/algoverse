import { CheckCircle2, CircleDashed, ChartNoAxesColumn, Star } from 'lucide-react'

const iconMap = {
  check: CheckCircle2,
  progress: CircleDashed,
  chart: ChartNoAxesColumn,
  star: Star
}

const LearningOverview = ({ items = [] }) => {
  return (
    <section aria-labelledby="learning-overview-title" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 id="learning-overview-title" className="text-xl font-bold text-white sm:text-2xl">
          Learning Overview
        </h2>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Snapshot</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || ChartNoAxesColumn
          return (
            <article
              key={item.id}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">{item.title}</p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-white">{item.value}</p>
                  <p className="mt-2 text-xs text-slate-400">{item.subtitle}</p>
                </div>
                <span className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300 transition duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default LearningOverview

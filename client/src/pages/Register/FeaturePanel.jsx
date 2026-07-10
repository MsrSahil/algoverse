import { Zap, TrendingUp, Target } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Interactive Visualizations',
    description: 'Watch algorithms come alive with dynamic step-by-step animations.'
  },
  {
    icon: TrendingUp,
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with detailed progress analytics.'
  },
  {
    icon: Target,
    title: 'Placement Ready Learning',
    description: 'Master interview patterns with curated practice problems.'
  }
]

const FeaturePanel = () => {
  return (
    <div className="relative hidden flex-col justify-between lg:flex">
      <div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-linear-to-br from-cyan-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-linear-to-tr from-emerald-500/10 to-cyan-500/10 blur-3xl" />

        <div className="relative">
          <p className="mb-3 inline-block rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Welcome to DSA Visualizer
          </p>
          <h1 className="mt-6 text-5xl font-black leading-tight text-white">
            Start Your DSA Learning{' '}
            <span className="bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-400">
            Master data structures and algorithms through interactive visualizations, step-by-step explanations, and placement-ready practice problems.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <div
              key={idx}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10"
            >
              <div className="mb-3 inline-flex rounded-xl bg-cyan-400/10 p-2 text-cyan-300 transition group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FeaturePanel

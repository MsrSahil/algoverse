import { CheckCircle2, Brain, BookMarked, Zap, BarChart3, Users } from 'lucide-react'

const benefits = [
  {
    icon: Brain,
    title: 'Interactive Learning',
    description: 'Engage with algorithms through step-by-step visualizations instead of static diagrams.'
  },
  {
    icon: BookMarked,
    title: 'Better Interview Prep',
    description: 'Master coding interview patterns with curated practice problems and explanations.'
  },
  {
    icon: Zap,
    title: 'Understand, Not Memorize',
    description: 'Focus on comprehension. Visual learning makes concepts stick in your long-term memory.'
  },
  {
    icon: BarChart3,
    title: 'Visual Memory Retention',
    description: 'Leverage visual learning to retain complex concepts faster and longer.'
  },
  {
    icon: CheckCircle2,
    title: 'Clean Explanations',
    description: 'Every algorithm explained clearly with time and space complexity analysis.'
  },
  {
    icon: Users,
    title: 'Community-Driven',
    description: 'Learn from a community of developers and contribute your own insights.'
  }
]

const WhyChooseUsSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-purple-500/10 to-emerald-500/20 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-3 w-3 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 flex-shrink-0 mt-1" />
                    <div className="h-3 flex-1 rounded bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Premium Features
            </p>
            <h2 className="mb-8 text-4xl font-black text-white sm:text-5xl">
              Why Choose DSA Visualizer?
            </h2>

            <div className="space-y-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{benefit.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection

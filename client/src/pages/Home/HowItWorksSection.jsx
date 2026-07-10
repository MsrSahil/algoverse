import { Search, Play, Lightbulb, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Choose Algorithm',
    description: 'Browse our comprehensive library of algorithms organized by category and difficulty.'
  },
  {
    icon: Play,
    title: 'Watch Visualization',
    description: 'See the algorithm in action with step-by-step animations and real-time updates.'
  },
  {
    icon: Lightbulb,
    title: 'Understand Concepts',
    description: 'Dive deep into the explanation with complexity analysis and code implementations.'
  },
  {
    icon: CheckCircle,
    title: 'Practice Problems',
    description: 'Test your knowledge with curated practice problems and interview-style questions.'
  }
]

const HowItWorksSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            The Journey
          </p>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="flex flex-col">
                <div className="relative mb-6">
                  <div className="flex items-center justify-center">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan-400/50 bg-cyan-400/10">
                      <Icon className="h-8 w-8 text-cyan-300" />
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="absolute left-full top-1/2 h-0.5 w-12 -translate-y-1/2 bg-linear-to-r from-cyan-400/50 to-transparent md:hidden lg:block" />
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 rounded-full bg-cyan-400/20 px-2 py-1 text-xs font-bold text-cyan-300">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-slate-400">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

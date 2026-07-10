import { Zap, BookOpen, Code2, Target } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Interactive Visualizations',
    description: 'Watch algorithms execute step-by-step with dynamic, color-coded visualizations that make complex operations easy to understand.'
  },
  {
    icon: BookOpen,
    title: 'Step-by-Step Explanation',
    description: 'Every algorithm is broken down into clear, digestible steps with detailed explanations of what happens at each stage.'
  },
  {
    icon: Code2,
    title: 'Multiple Languages',
    description: 'View implementations in Python, JavaScript, C++, and Java. Learn the syntax differences and write code with confidence.'
  },
  {
    icon: Target,
    title: 'Interview Ready Practice',
    description: 'Master placement-focused problems with real interview questions, optimal solutions, and complexity analysis.'
  }
]

const FeaturesSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Why Choose Us
          </p>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Everything You Need to Master DSA
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10"
              >
                <div className="mb-4 inline-flex rounded-xl bg-cyan-400/10 p-3 text-cyan-300 transition group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

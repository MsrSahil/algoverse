import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const CTASection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Ready to Master DSA?
        </p>
        <h2 className="text-5xl font-black text-white sm:text-6xl">
          Start Your DSA Journey{' '}
          <span className="bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Today
          </span>
        </h2>
        <p className="mt-6 text-lg text-slate-300">
          Join thousands of developers mastering data structures and algorithms through interactive visualizations.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/register" className="group flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 px-8 py-4 text-base font-semibold text-slate-950 transition duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/40">
            Start Free Learning
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/algorithms" className="flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10">
            Explore Algorithms
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection

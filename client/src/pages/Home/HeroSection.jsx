import { ArrowRight, Play } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              🎓 Interactive Learning
            </p>
            <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Master DSA Through{' '}
              <span className="bg-linear-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Interactive Visualization
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Watch algorithms come to life. Step through each operation. Understand the complexity. Ace your interviews with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 px-8 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/40">
                Start Learning
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10">
                <Play className="h-5 w-5" />
                Explore Algorithms
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-32 flex-1 rounded-lg bg-linear-to-t from-cyan-500/50 to-cyan-500/80 shadow-lg shadow-cyan-500/20"
                      style={{
                        animation: `bounce ${0.8 + i * 0.1}s infinite`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Sorting Visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection

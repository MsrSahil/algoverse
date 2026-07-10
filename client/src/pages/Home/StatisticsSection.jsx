import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: '50+', label: 'Algorithms' },
  { number: '500+', label: 'Visual Steps' },
  { number: '10+', label: 'Categories' },
  { number: '100%', label: 'Free Learning' }
]

const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let current = 0
          const increment = target / (duration / 16)
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 16)
          observer.unobserve(ref.current)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [target, duration])

  return (
    <div ref={ref} className="text-5xl font-black text-cyan-300 sm:text-6xl">
      {count}
      {suffix}
    </div>
  )
}

const StatisticsSection = () => {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-emerald-500/5" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            By The Numbers
          </p>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Trusted by Thousands
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, idx) => {
            const numberParts = stat.number.split(/(\+|%)/)
            const baseNumber = parseInt(numberParts[0])
            const suffix = numberParts.slice(1).join('')

            return (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
                <AnimatedCounter
                  target={baseNumber}
                  suffix={suffix}
                />
                <p className="mt-3 text-sm font-semibold text-slate-300">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection

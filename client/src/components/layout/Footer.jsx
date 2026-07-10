import { NavLink } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Algorithms', to: '/algorithms' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Profile', to: '/profile' }
]

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            DSA Visualizer
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Interactive learning for data structures and algorithms with a clean MVP shell.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {footerLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-white"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
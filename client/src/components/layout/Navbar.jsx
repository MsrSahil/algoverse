import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Algorithms', to: '/algorithms' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Profile', to: '/profile' }
]

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition duration-200',
    isActive
      ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
      : 'text-slate-300 hover:bg-white/5 hover:text-white'
  ].join(' ')

const actionLinkClassName = ({ isActive }) =>
  [
    'rounded-full border px-4 py-2 text-sm font-semibold transition duration-200',
    isActive
      ? 'border-cyan-400 bg-cyan-400 text-slate-950'
      : 'border-white/10 bg-white/5 text-white hover:border-cyan-400/60 hover:bg-cyan-400/10'
  ].join(' ')

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-emerald-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20">
            DSA
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Visualizer
            </span>
            <span className="text-xs text-slate-400">Learn by watching</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {navigationItems.map((item) => (
            <NavLink key={item.label} to={item.to} end={item.to === '/'} className={navLinkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/login" className={actionLinkClassName}>
            Login
          </NavLink>
          <NavLink to="/register" className={actionLinkClassName}>
            Register
          </NavLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <NavLink to="/login" className={actionLinkClassName}>
            Login
          </NavLink>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 pb-4 md:hidden sm:px-6 lg:px-8">
        {navigationItems.map((item) => (
          <NavLink key={item.label} to={item.to} end={item.to === '/'} className={navLinkClassName}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
import { NavLink, Route, Routes } from 'react-router-dom'

const navClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-white text-slate-900 shadow-lg shadow-slate-900/20'
      : 'text-slate-200 hover:bg-white/15'
  ].join(' ')

const HomePage = () => (
  <section className="grid gap-8 md:grid-cols-2 md:items-center">
    <div>
      <p className="mb-3 inline-flex rounded-full bg-emerald-300/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
        Demo Home
      </p>
      <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
        React Router + Tailwind starter page
      </h1>
      <p className="mt-4 text-base text-slate-200 sm:text-lg">
        This demo shows route navigation, reusable UI blocks, and a responsive
        layout built with Tailwind CSS.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <NavLink
          to="/about"
          className="rounded-xl bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:translate-y-[-1px]"
        >
          Explore About
        </NavLink>
        <NavLink
          to="/dashboard"
          className="rounded-xl border border-white/30 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
        >
          Open Dashboard
        </NavLink>
      </div>
    </div>
    <div className="grid gap-4">
      {[
        { label: 'Routing', value: '3 pages' },
        { label: 'Styling', value: 'Tailwind CSS' },
        { label: 'Build tool', value: 'Vite + React' }
      ].map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
        </article>
      ))}
    </div>
  </section>
)

const AboutPage = () => (
  <section className="space-y-5">
    <h2 className="text-3xl font-black text-white">About This Demo</h2>
    <p className="max-w-3xl text-slate-200">
      The app uses React Router for page-level navigation without full reloads
      and Tailwind utility classes for rapid, consistent styling.
    </p>
    <div className="grid gap-4 sm:grid-cols-3">
      {['Fast setup', 'Responsive layout', 'Reusable components'].map((text) => (
        <div
          key={text}
          className="rounded-xl border border-cyan-200/40 bg-cyan-300/20 p-4 text-cyan-50"
        >
          {text}
        </div>
      ))}
    </div>
  </section>
)

const DashboardPage = () => (
  <section>
    <h2 className="text-3xl font-black text-white">Dashboard</h2>
    <p className="mt-2 text-slate-200">A sample area with quick stats.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { title: 'Users', value: '1,245' },
        { title: 'Active', value: '312' },
        { title: 'Sales', value: '$7,940' },
        { title: 'Growth', value: '+18%' }
      ].map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-white/20 bg-slate-900/40 p-4"
        >
          <p className="text-sm text-slate-300">{card.title}</p>
          <p className="mt-2 text-2xl font-extrabold text-white">{card.value}</p>
        </article>
      ))}
    </div>
  </section>
)

const NotFoundPage = () => (
  <section className="text-center">
    <h2 className="text-3xl font-black text-white">404</h2>
    <p className="mt-2 text-slate-200">The page you requested was not found.</p>
    <NavLink
      to="/"
      className="mt-5 inline-flex rounded-xl bg-white px-4 py-2 font-semibold text-slate-900"
    >
      Go Home
    </NavLink>
  </section>
)

const App = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#1e293b,_#020617_60%)] px-4 py-10 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-slate-950/30 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur-xl sm:p-10">
        <header className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Algovita Demo
            </p>
            <p className="text-2xl font-extrabold text-white">Frontend Playground</p>
          </div>
          <nav className="flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
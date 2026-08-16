import { Link } from 'react-router-dom'

const getInitials = (fullName, username, email) => {
  const nameSource = fullName || username || email || 'Learner'
  const words = nameSource.trim().split(/\s+/).filter(Boolean)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0] || ''}${words[1][0] || ''}`.toUpperCase()
}

const DashboardHeader = ({ user }) => {
  const displayName = user?.fullName?.trim() || user?.username || 'Learner'
  const initials = getInitials(user?.fullName, user?.username, user?.email)

  return (
    <header className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Dashboard</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Welcome back, {displayName} <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Continue your journey and master Data Structures and Algorithms.
          </p>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={`${displayName} profile avatar`}
              className="h-12 w-12 rounded-2xl border border-white/15 object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-sm font-bold text-cyan-200">
              {initials}
            </div>
          )}

          <Link
            to="/profile"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader

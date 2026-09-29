import { useEffect, useState } from 'react'
import { AtSign, BarChart3, Bookmark, CheckCircle2, LogOut, Mail, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { favoriteService } from '../../services/favoriteService'
import { progressService } from '../../services/progressService'
import { buildDashboardProgressView } from '../../utils/dashboardProgress'

const getInitials = (fullName, username, email) => {
  const nameSource = fullName?.trim() || username?.trim() || email?.trim() || 'Learner'
  const words = nameSource.split(/\s+/).filter(Boolean)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase()
}

const StatCard = ({ icon: Icon, label, value, detail }) => {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-black text-white">{value}</p>
          <p className="mt-2 text-xs text-slate-400">{detail}</p>
        </div>
        <span className="rounded-xl bg-cyan-400/10 p-2.5 text-cyan-300">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  )
}

const Profile = () => {
  const navigate = useNavigate()
  const { user, authLoading, isAuthenticated, logout, loading: logoutLoading } = useAuth()
  const [progress, setProgress] = useState([])
  const [favoriteSlugs, setFavoriteSlugs] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [dataError, setDataError] = useState(null)

  useEffect(() => {
    let isActive = true

    if (authLoading || !isAuthenticated) {
      setDataLoading(false)
      return () => {
        isActive = false
      }
    }

    setDataLoading(true)
    setDataError(null)

    Promise.all([progressService.getAll(), favoriteService.getAll()])
      .then(([progressResponse, favoriteResponse]) => {
        if (!isActive) return

        setProgress(progressResponse.data?.progress || [])
        setFavoriteSlugs(favoriteResponse.data?.favorites || [])
      })
      .catch(() => {
        if (isActive) {
          setDataError('Unable to load profile statistics. Please try again.')
        }
      })
      .finally(() => {
        if (isActive) {
          setDataLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [authLoading, isAuthenticated])

  if (authLoading) {
    return (
      <section className="flex min-h-128 items-center justify-center px-4 py-12" aria-label="Loading profile">
        <p className="text-sm text-slate-300" role="status" aria-live="polite">Loading profile...</p>
      </section>
    )
  }

  const progressView = buildDashboardProgressView(progress, favoriteSlugs)
  const displayName = user?.fullName?.trim() || user?.username || 'Learner'
  const initials = getInitials(user?.fullName, user?.username, user?.email)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-5">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${displayName} profile avatar`}
                  className="h-20 w-20 rounded-3xl border border-white/15 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10 text-xl font-black text-cyan-200">
                  {initials}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Account</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{displayName}</h1>
                <p className="mt-2 text-sm text-slate-400">Your learning profile and progress snapshot</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutLoading}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {logoutLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 lg:col-span-2" aria-labelledby="account-details-title">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300"><UserRound className="h-5 w-5" /></span>
              <h2 id="account-details-title" className="text-xl font-bold text-white">Account Details</h2>
            </div>

            <dl className="mt-6 space-y-5">
              <div className="flex gap-3">
                <AtSign className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Username</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-100">{user?.username || 'Not available'}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</dt>
                  <dd className="mt-1 break-all text-sm font-semibold text-slate-100">{user?.email || 'Not available'}</dd>
                </div>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 lg:col-span-3" aria-labelledby="learning-statistics-title">
            <div className="flex items-center justify-between gap-4">
              <h2 id="learning-statistics-title" className="text-xl font-bold text-white">Learning Statistics</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Live data</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard
                icon={CheckCircle2}
                label="Completed"
                value={dataLoading ? '...' : progressView.progress.completedAlgorithms}
                detail={dataLoading ? 'Loading progress' : 'Algorithms completed'}
              />
              <StatCard
                icon={BarChart3}
                label="Overall Progress"
                value={dataLoading ? '...' : `${progressView.progress.percentage}%`}
                detail={dataLoading ? 'Loading progress' : `Of ${progressView.progress.totalAlgorithms} algorithms`}
              />
              <StatCard
                icon={Bookmark}
                label="Favorites"
                value={dataLoading ? '...' : favoriteSlugs.length}
                detail={dataLoading ? 'Loading favorites' : favoriteSlugs.length === 0 ? 'No favorites yet' : 'Saved algorithms'}
              />
            </div>

            <div className="mt-5 min-h-5 text-sm" role="status" aria-live="polite">
              {dataLoading ? <span className="text-slate-400">Loading profile statistics...</span> : null}
              {dataError ? <span className="text-rose-300">{dataError}</span> : null}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Profile

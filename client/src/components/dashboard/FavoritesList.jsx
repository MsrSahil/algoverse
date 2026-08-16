import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getDifficultyStyles } from './difficultyStyles'

const FavoritesList = ({ favorites = [] }) => {
  return (
    <section aria-labelledby="favorites-title" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <h2 id="favorites-title" className="text-xl font-bold text-white sm:text-2xl">
        Your Favorites
      </h2>

      {favorites.length === 0 ? (
        <div className="mt-5">
          <p className="text-sm text-slate-300">You haven't saved any algorithms yet.</p>
          <Link
            to="/algorithms"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
          >
            Explore Algorithms
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {favorites.map((item) => (
            <li key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <Star className="h-4 w-4 text-yellow-300" />
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{item.category}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyStyles(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                  <Link
                    to={`/algorithm/${item.slug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default FavoritesList

import { useSearchParams } from 'react-router-dom'
import {
  ALGORITHM_LIBRARY_CATEGORIES,
  ALGORITHM_SORT_OPTIONS,
  algorithms
} from '../../data/algorithms'
import { useAlgorithmFilters } from '../../hooks/useAlgorithmFilters'
import AlgorithmSearch from '../../components/algorithms/AlgorithmSearch'
import CategoryFilter from '../../components/algorithms/CategoryFilter'
import AlgorithmFilters from '../../components/algorithms/AlgorithmFilters'
import AlgorithmGrid from '../../components/algorithms/AlgorithmGrid'
import AlgorithmEmptyState from '../../components/algorithms/AlgorithmEmptyState'

const DEFAULTS = {
  category: 'all',
  difficulty: 'all',
  status: 'all',
  search: '',
  sort: ALGORITHM_SORT_OPTIONS.RECOMMENDED
}

const getParam = (searchParams, key, fallback) => {
  const value = searchParams.get(key)
  return value && value.trim() ? value : fallback
}

const AlgorithmsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedCategory = getParam(searchParams, 'category', DEFAULTS.category)
  const selectedDifficulty = getParam(searchParams, 'difficulty', DEFAULTS.difficulty)
  const selectedStatus = getParam(searchParams, 'status', DEFAULTS.status)
  const selectedSort = getParam(searchParams, 'sort', DEFAULTS.sort)
  const searchQuery = getParam(searchParams, 'search', DEFAULTS.search)

  const filteredAlgorithms = useAlgorithmFilters({
    algorithms,
    search: searchQuery,
    category: selectedCategory,
    difficulty: selectedDifficulty,
    status: selectedStatus,
    sort: selectedSort
  })

  const updateQueryParams = (updates) => {
    const next = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      const normalized = typeof value === 'string' ? value.trim() : value

      if (!normalized || normalized === DEFAULTS[key]) {
        next.delete(key)
      } else {
        next.set(key, normalized)
      }
    })

    setSearchParams(next)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">DSA Learning Library</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Explore Algorithms</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Learn Data Structures and Algorithms through interactive visualizations, clear explanations, and hands-on practice.
          </p>
        </header>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
          <div className="space-y-5">
            <AlgorithmSearch value={searchQuery} onChange={(value) => updateQueryParams({ search: value })} />

            <CategoryFilter
              categories={ALGORITHM_LIBRARY_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={(value) => updateQueryParams({ category: value })}
            />

            <AlgorithmFilters
              selectedDifficulty={selectedDifficulty}
              selectedStatus={selectedStatus}
              selectedSort={selectedSort}
              onDifficultyChange={(value) => updateQueryParams({ difficulty: value })}
              onStatusChange={(value) => updateQueryParams({ status: value })}
              onSortChange={(value) => updateQueryParams({ sort: value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-300">
            Showing <span className="font-semibold text-white">{filteredAlgorithms.length}</span> of {algorithms.length} algorithms
          </p>
        </div>

        {filteredAlgorithms.length === 0 ? (
          <AlgorithmEmptyState onClearFilters={clearFilters} />
        ) : (
          <AlgorithmGrid algorithms={filteredAlgorithms} />
        )}
      </div>
    </section>
  )
}

export default AlgorithmsPage

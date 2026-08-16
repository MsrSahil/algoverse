import { ALGORITHM_SORT_OPTIONS } from '../../data/algorithms'

const difficultyOptions = [
  { value: 'all', label: 'All Difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'coming-soon', label: 'Coming Soon' }
]

const sortOptions = [
  { value: ALGORITHM_SORT_OPTIONS.RECOMMENDED, label: 'Recommended' },
  { value: ALGORITHM_SORT_OPTIONS.ALPHABETICAL, label: 'Alphabetical' },
  { value: ALGORITHM_SORT_OPTIONS.DIFFICULTY, label: 'Difficulty' },
  { value: ALGORITHM_SORT_OPTIONS.LEARNING_TIME, label: 'Learning Time' }
]

const selectClasses =
  'w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none transition duration-200 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30'

const AlgorithmFilters = ({
  selectedDifficulty,
  selectedStatus,
  selectedSort,
  onDifficultyChange,
  onStatusChange,
  onSortChange
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <label className="text-sm font-semibold text-slate-200">
        Difficulty
        <select className={`${selectClasses} mt-1`} value={selectedDifficulty} onChange={(event) => onDifficultyChange(event.target.value)}>
          {difficultyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-semibold text-slate-200">
        Status
        <select className={`${selectClasses} mt-1`} value={selectedStatus} onChange={(event) => onStatusChange(event.target.value)}>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-semibold text-slate-200">
        Sort By
        <select className={`${selectClasses} mt-1`} value={selectedSort} onChange={(event) => onSortChange(event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default AlgorithmFilters

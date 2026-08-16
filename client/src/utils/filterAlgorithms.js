import {
  ALGORITHM_DIFFICULTY,
  ALGORITHM_SORT_OPTIONS,
  ALGORITHM_STATUS
} from '../data/algorithms'

const difficultyOrder = {
  [ALGORITHM_DIFFICULTY.EASY]: 1,
  [ALGORITHM_DIFFICULTY.MEDIUM]: 2,
  [ALGORITHM_DIFFICULTY.HARD]: 3
}

const statusOrder = {
  [ALGORITHM_STATUS.AVAILABLE]: 1,
  [ALGORITHM_STATUS.COMING_SOON]: 2
}

const normalize = (value) => (value || '').toString().trim().toLowerCase()

export const filterAndSortAlgorithms = ({
  algorithms,
  search,
  category,
  difficulty,
  status,
  sort
}) => {
  const normalizedSearch = normalize(search)
  const normalizedCategory = normalize(category)
  const normalizedDifficulty = normalize(difficulty)
  const normalizedStatus = normalize(status)

  const filtered = algorithms.filter((algorithm) => {
    if (normalizedCategory && normalizedCategory !== 'all') {
      const matchesCategory =
        normalize(algorithm.category) === normalizedCategory ||
        normalize(algorithm.categoryGroup) === normalizedCategory

      if (!matchesCategory) {
        return false
      }
    }

    if (normalizedDifficulty && normalizedDifficulty !== 'all') {
      if (normalize(algorithm.difficulty) !== normalizedDifficulty) {
        return false
      }
    }

    if (normalizedStatus && normalizedStatus !== 'all') {
      if (normalize(algorithm.status) !== normalizedStatus) {
        return false
      }
    }

    if (!normalizedSearch) {
      return true
    }

    const searchCorpus = [
      algorithm.title,
      algorithm.description,
      algorithm.category,
      algorithm.categoryLabel,
      ...(algorithm.tags || [])
    ]
      .join(' ')
      .toLowerCase()

    return searchCorpus.includes(normalizedSearch)
  })

  const sorted = [...filtered]

  switch (sort) {
    case ALGORITHM_SORT_OPTIONS.ALPHABETICAL:
      sorted.sort((first, second) => first.title.localeCompare(second.title))
      break

    case ALGORITHM_SORT_OPTIONS.DIFFICULTY:
      sorted.sort((first, second) => {
        const byDifficulty =
          (difficultyOrder[first.difficulty] || Number.MAX_SAFE_INTEGER) -
          (difficultyOrder[second.difficulty] || Number.MAX_SAFE_INTEGER)

        if (byDifficulty !== 0) {
          return byDifficulty
        }

        return first.title.localeCompare(second.title)
      })
      break

    case ALGORITHM_SORT_OPTIONS.LEARNING_TIME:
      sorted.sort((first, second) => {
        const byTime = (first.estimatedMinutes || 0) - (second.estimatedMinutes || 0)
        if (byTime !== 0) {
          return byTime
        }

        return first.title.localeCompare(second.title)
      })
      break

    case ALGORITHM_SORT_OPTIONS.RECOMMENDED:
    default:
      sorted.sort((first, second) => {
        const byStatus =
          (statusOrder[first.status] || Number.MAX_SAFE_INTEGER) -
          (statusOrder[second.status] || Number.MAX_SAFE_INTEGER)

        if (byStatus !== 0) {
          return byStatus
        }

        const byDifficulty =
          (difficultyOrder[first.difficulty] || Number.MAX_SAFE_INTEGER) -
          (difficultyOrder[second.difficulty] || Number.MAX_SAFE_INTEGER)

        if (byDifficulty !== 0) {
          return byDifficulty
        }

        return first.title.localeCompare(second.title)
      })
      break
  }

  return sorted
}

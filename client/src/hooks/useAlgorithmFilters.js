import { useMemo } from 'react'
import { filterAndSortAlgorithms } from '../utils/filterAlgorithms'

export const useAlgorithmFilters = ({ algorithms, search, category, difficulty, status, sort }) => {
  return useMemo(() => {
    return filterAndSortAlgorithms({ algorithms, search, category, difficulty, status, sort })
  }, [algorithms, search, category, difficulty, status, sort])
}

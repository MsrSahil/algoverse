import { dashboardData } from '../constants/dashboardData'
import { algorithms } from '../data/algorithms'

export const buildDashboardProgressView = (progress = []) => {
  const progressBySlug = new Map(progress.map((item) => [item.algorithmSlug, item]))
  const completedAlgorithms = algorithms.filter((algorithm) => progressBySlug.get(algorithm.slug)?.completed)
  const inProgressAlgorithms = algorithms.filter((algorithm) => {
    const item = progressBySlug.get(algorithm.slug)
    return item?.viewed && !item.completed
  })
  const totalAlgorithms = algorithms.length
  const completedCount = completedAlgorithms.length
  const percentage = totalAlgorithms > 0 ? Math.round((completedCount / totalAlgorithms) * 100) : 0
  const recentActivity = completedAlgorithms
    .map((algorithm) => ({
      id: `activity-${algorithm.slug}`,
      periodLabel: 'Completed',
      action: `Completed ${algorithm.title}`,
      slug: algorithm.slug,
      completedAt: progressBySlug.get(algorithm.slug)?.completedAt
    }))
    .sort((left, right) => new Date(right.completedAt || 0) - new Date(left.completedAt || 0))
    .slice(0, 3)

  const bubbleSort = dashboardData.continueLearning
  const bubbleProgress = progressBySlug.get('bubble-sort')

  return {
    overview: dashboardData.overview.map((item) => {
      if (item.id === 'completed') {
        return { ...item, value: `${completedCount} / ${totalAlgorithms}` }
      }
      if (item.id === 'inProgress') {
        return { ...item, value: inProgressAlgorithms.length }
      }
      if (item.id === 'overallProgress') {
        return { ...item, value: `${percentage}%` }
      }
      return item
    }),
    progress: {
      percentage,
      completedAlgorithms: completedCount,
      totalAlgorithms,
      message: completedCount === 0
        ? 'No algorithms completed yet.'
        : "You're building momentum. Keep going!"
    },
    continueLearning: bubbleSort
      ? {
          ...bubbleSort,
          progress: bubbleProgress?.completed ? 100 : bubbleProgress?.viewed ? 50 : 0
        }
      : null,
    recentActivity
  }
}

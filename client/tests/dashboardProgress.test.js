import { describe, expect, it } from 'vitest'
import { algorithms } from '../src/data/algorithms.js'
import { buildDashboardProgressView } from '../src/utils/dashboardProgress.js'

const getOverviewValue = (view, id) => view.overview.find((item) => item.id === id).value

describe('dashboard progress calculations', () => {
  it('reports zero progress without mock completion values', () => {
    const view = buildDashboardProgressView([])

    expect(getOverviewValue(view, 'completed')).toBe(`0 / ${algorithms.length}`)
    expect(getOverviewValue(view, 'inProgress')).toBe(0)
    expect(getOverviewValue(view, 'overallProgress')).toBe('0%')
    expect(getOverviewValue(view, 'favorites')).toBe(0)
    expect(view.overview.find((item) => item.id === 'inProgress').subtitle).toBe('No algorithms in progress')
    expect(view.progress).toMatchObject({
      percentage: 0,
      completedAlgorithms: 0,
      totalAlgorithms: algorithms.length,
      message: 'No algorithms completed yet.'
    })
    expect(view.recentActivity).toEqual([])
  })

  it('counts completed and in-progress algorithms and builds recent activity', () => {
    const view = buildDashboardProgressView([
      {
        algorithmSlug: 'bubble-sort',
        viewed: true,
        completed: true,
        timeSpent: 60,
        completedAt: '2026-09-30T12:00:00.000Z'
      },
      {
        algorithmSlug: 'selection-sort',
        viewed: true,
        completed: false,
        timeSpent: 20,
        completedAt: null
      }
    ])

    const expectedPercentage = Math.round((1 / algorithms.length) * 100)
    expect(getOverviewValue(view, 'completed')).toBe(`1 / ${algorithms.length}`)
    expect(getOverviewValue(view, 'inProgress')).toBe(1)
    expect(getOverviewValue(view, 'overallProgress')).toBe(`${expectedPercentage}%`)
    expect(getOverviewValue(view, 'favorites')).toBe(0)
    expect(view.progress.completedAlgorithms).toBe(1)
    expect(view.progress.percentage).toBe(expectedPercentage)
    expect(view.continueLearning.progress).toBe(100)
    expect(view.recentActivity).toEqual([
      expect.objectContaining({
        action: 'Completed Bubble Sort',
        slug: 'bubble-sort'
      })
    ])
  })
})

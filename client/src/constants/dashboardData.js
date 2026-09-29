import { algorithmLookupBySlug } from '../data/algorithms'

const toDashboardAlgorithm = (slug) => {
  const algorithm = algorithmLookupBySlug[slug]

  if (!algorithm) {
    return null
  }

  return {
    id: algorithm.id,
    title: algorithm.title,
    slug: algorithm.slug,
    category: algorithm.categoryLabel,
    difficulty: algorithm.difficulty,
    estimatedTime: algorithm.estimatedTime,
    description: algorithm.description,
    status: algorithm.status
  }
}

const continueLearningAlgorithm = toDashboardAlgorithm('bubble-sort')
const recommendedAlgorithms = [
  toDashboardAlgorithm('bubble-sort'),
  toDashboardAlgorithm('binary-search'),
  toDashboardAlgorithm('selection-sort'),
  toDashboardAlgorithm('merge-sort')
].filter(Boolean)

export const dashboardData = {
  overview: [
    {
      id: 'completed',
      title: 'Algorithms Completed',
      subtitle: 'Concepts you have fully learned',
      icon: 'check'
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      subtitle: 'Algorithms currently active',
      icon: 'progress'
    },
    {
      id: 'overallProgress',
      title: 'Learning Progress',
      subtitle: 'Coverage across core roadmap',
      icon: 'chart'
    },
    {
      id: 'favorites',
      title: 'Favorites',
      subtitle: 'Saved topics to revisit later',
      icon: 'star'
    }
  ],
  continueLearning: continueLearningAlgorithm,
  categories: [
    {
      id: 'sorting',
      name: 'Sorting',
      description: 'Learn how algorithms organize data efficiently.',
      totalAlgorithms: 12,
      icon: 'sorting'
    },
    {
      id: 'searching',
      name: 'Searching',
      description: 'Find target values with fast lookup strategies.',
      totalAlgorithms: 8,
      icon: 'searching'
    },
    {
      id: 'arrays',
      name: 'Arrays',
      description: 'Master traversal, updates, and pattern recognition.',
      totalAlgorithms: 14,
      icon: 'arrays'
    },
    {
      id: 'strings',
      name: 'Strings',
      description: 'Build confidence with text processing techniques.',
      totalAlgorithms: 11,
      icon: 'strings'
    },
    {
      id: 'stack',
      name: 'Stack',
      description: 'Understand LIFO operations and expression handling.',
      totalAlgorithms: 7,
      icon: 'stack'
    },
    {
      id: 'queue',
      name: 'Queue',
      description: 'Explore FIFO workflows and scheduling problems.',
      totalAlgorithms: 6,
      icon: 'queue'
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      description: 'Practice node-level manipulations and traversal.',
      totalAlgorithms: 10,
      icon: 'linkedList'
    },
    {
      id: 'trees',
      name: 'Trees',
      description: 'Learn hierarchical structures and traversal orders.',
      totalAlgorithms: 20,
      icon: 'trees'
    },
    {
      id: 'graphs',
      name: 'Graphs',
      description: 'Work with connections, paths, and traversals.',
      totalAlgorithms: 18,
      icon: 'graphs'
    },
    {
      id: 'dynamic-programming',
      name: 'Dynamic Programming',
      description: 'Solve optimization problems with smart reuse.',
      totalAlgorithms: 25,
      icon: 'dp'
    }
  ],
  recommendedAlgorithms,
  learningJourney: {
    currentTopic: 'Sorting',
    steps: ['Arrays', 'Searching', 'Sorting', 'Stack', 'Queue', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming']
  }
}

export const dashboardApiEndpoints = {
  progress: '/api/progress',
  favorites: '/api/favorites'
}

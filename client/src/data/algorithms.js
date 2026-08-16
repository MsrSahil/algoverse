export const ALGORITHM_STATUS = {
  AVAILABLE: 'available',
  COMING_SOON: 'coming-soon'
}

export const ALGORITHM_DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
}

export const ALGORITHM_SORT_OPTIONS = {
  RECOMMENDED: 'recommended',
  ALPHABETICAL: 'alphabetical',
  DIFFICULTY: 'difficulty',
  LEARNING_TIME: 'learning-time'
}

export const ALGORITHM_LIBRARY_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'searching', label: 'Searching' },
  { id: 'data-structures', label: 'Data Structures' },
  { id: 'trees', label: 'Trees' },
  { id: 'graphs', label: 'Graphs' }
]

export const algorithms = [
  {
    id: 'bubble-sort',
    slug: 'bubble-sort',
    title: 'Bubble Sort',
    category: 'sorting',
    categoryLabel: 'Sorting',
    categoryGroup: 'sorting',
    difficulty: ALGORITHM_DIFFICULTY.EASY,
    description:
      'A simple comparison-based sorting algorithm that repeatedly swaps adjacent elements when they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n^2)',
      worst: 'O(n^2)'
    },
    spaceComplexity: 'O(1)',
    estimatedTime: '10 min',
    estimatedMinutes: 10,
    status: ALGORITHM_STATUS.AVAILABLE,
    tags: ['sorting', 'comparison', 'beginner']
  },
  {
    id: 'selection-sort',
    slug: 'selection-sort',
    title: 'Selection Sort',
    category: 'sorting',
    categoryLabel: 'Sorting',
    categoryGroup: 'sorting',
    difficulty: ALGORITHM_DIFFICULTY.EASY,
    description:
      'Repeatedly selects the smallest element from the unsorted portion and places it in the correct position.',
    timeComplexity: {
      best: 'O(n^2)',
      average: 'O(n^2)',
      worst: 'O(n^2)'
    },
    spaceComplexity: 'O(1)',
    estimatedTime: '12 min',
    estimatedMinutes: 12,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['sorting', 'in-place', 'beginner']
  },
  {
    id: 'insertion-sort',
    slug: 'insertion-sort',
    title: 'Insertion Sort',
    category: 'sorting',
    categoryLabel: 'Sorting',
    categoryGroup: 'sorting',
    difficulty: ALGORITHM_DIFFICULTY.EASY,
    description:
      'Builds the final sorted array one element at a time by inserting elements into their correct position.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n^2)',
      worst: 'O(n^2)'
    },
    spaceComplexity: 'O(1)',
    estimatedTime: '12 min',
    estimatedMinutes: 12,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['sorting', 'incremental', 'beginner']
  },
  {
    id: 'merge-sort',
    slug: 'merge-sort',
    title: 'Merge Sort',
    category: 'sorting',
    categoryLabel: 'Sorting',
    categoryGroup: 'sorting',
    difficulty: ALGORITHM_DIFFICULTY.MEDIUM,
    description:
      'A divide-and-conquer algorithm that splits arrays into halves, sorts them, and merges them efficiently.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    estimatedTime: '15 min',
    estimatedMinutes: 15,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['sorting', 'divide-and-conquer', 'stable']
  },
  {
    id: 'quick-sort',
    slug: 'quick-sort',
    title: 'Quick Sort',
    category: 'sorting',
    categoryLabel: 'Sorting',
    categoryGroup: 'sorting',
    difficulty: ALGORITHM_DIFFICULTY.MEDIUM,
    description:
      'Uses partitioning around a pivot to recursively sort sub-arrays with strong average performance.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n^2)'
    },
    spaceComplexity: 'O(log n)',
    estimatedTime: '18 min',
    estimatedMinutes: 18,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['sorting', 'pivot', 'divide-and-conquer']
  },
  {
    id: 'linear-search',
    slug: 'linear-search',
    title: 'Linear Search',
    category: 'searching',
    categoryLabel: 'Searching',
    categoryGroup: 'searching',
    difficulty: ALGORITHM_DIFFICULTY.EASY,
    description:
      'Scans elements one by one until the target is found or all items have been checked.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    estimatedTime: '8 min',
    estimatedMinutes: 8,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['searching', 'sequential', 'beginner']
  },
  {
    id: 'binary-search',
    slug: 'binary-search',
    title: 'Binary Search',
    category: 'searching',
    categoryLabel: 'Searching',
    categoryGroup: 'searching',
    difficulty: ALGORITHM_DIFFICULTY.EASY,
    description:
      'Finds a target in a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    estimatedTime: '10 min',
    estimatedMinutes: 10,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['searching', 'sorted-array', 'divide-and-conquer']
  },
  {
    id: 'stack',
    slug: 'stack',
    title: 'Stack',
    category: 'stack',
    categoryLabel: 'Stack',
    categoryGroup: 'data-structures',
    difficulty: ALGORITHM_DIFFICULTY.EASY,
    description:
      'A LIFO data structure useful for backtracking, parsing, and expression evaluation.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)'
    },
    spaceComplexity: 'O(n)',
    estimatedTime: '10 min',
    estimatedMinutes: 10,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['data-structure', 'lifo', 'operations']
  },
  {
    id: 'queue',
    slug: 'queue',
    title: 'Queue',
    category: 'queue',
    categoryLabel: 'Queue',
    categoryGroup: 'data-structures',
    difficulty: ALGORITHM_DIFFICULTY.EASY,
    description:
      'A FIFO data structure used in scheduling, buffering, and breadth-first processes.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)'
    },
    spaceComplexity: 'O(n)',
    estimatedTime: '10 min',
    estimatedMinutes: 10,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['data-structure', 'fifo', 'operations']
  },
  {
    id: 'linked-list',
    slug: 'linked-list',
    title: 'Linked List',
    category: 'linked-list',
    categoryLabel: 'Linked List',
    categoryGroup: 'data-structures',
    difficulty: ALGORITHM_DIFFICULTY.MEDIUM,
    description:
      'A node-based linear structure where each element points to the next node.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    estimatedTime: '14 min',
    estimatedMinutes: 14,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['data-structure', 'nodes', 'pointer']
  },
  {
    id: 'binary-search-tree',
    slug: 'binary-search-tree',
    title: 'Binary Search Tree',
    category: 'trees',
    categoryLabel: 'Trees',
    categoryGroup: 'trees',
    difficulty: ALGORITHM_DIFFICULTY.MEDIUM,
    description:
      'A hierarchical structure that keeps smaller values on the left and larger values on the right.',
    timeComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    estimatedTime: '16 min',
    estimatedMinutes: 16,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['trees', 'search', 'ordered']
  },
  {
    id: 'tree-traversal',
    slug: 'tree-traversal',
    title: 'Tree Traversal',
    category: 'trees',
    categoryLabel: 'Trees',
    categoryGroup: 'trees',
    difficulty: ALGORITHM_DIFFICULTY.MEDIUM,
    description:
      'Covers preorder, inorder, postorder, and level-order techniques to visit tree nodes.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(h)',
    estimatedTime: '14 min',
    estimatedMinutes: 14,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['trees', 'dfs', 'bfs']
  },
  {
    id: 'breadth-first-search',
    slug: 'breadth-first-search',
    title: 'Breadth-First Search',
    category: 'graphs',
    categoryLabel: 'Graphs',
    categoryGroup: 'graphs',
    difficulty: ALGORITHM_DIFFICULTY.MEDIUM,
    description:
      'Traverses graph levels layer by layer using a queue for shortest unweighted paths.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    estimatedTime: '15 min',
    estimatedMinutes: 15,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['graphs', 'traversal', 'queue']
  },
  {
    id: 'depth-first-search',
    slug: 'depth-first-search',
    title: 'Depth-First Search',
    category: 'graphs',
    categoryLabel: 'Graphs',
    categoryGroup: 'graphs',
    difficulty: ALGORITHM_DIFFICULTY.MEDIUM,
    description:
      'Explores graph paths deeply before backtracking, using recursion or an explicit stack.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    estimatedTime: '15 min',
    estimatedMinutes: 15,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['graphs', 'traversal', 'stack']
  },
  {
    id: 'dijkstras-algorithm',
    slug: 'dijkstras-algorithm',
    title: "Dijkstra's Algorithm",
    category: 'graphs',
    categoryLabel: 'Graphs',
    categoryGroup: 'graphs',
    difficulty: ALGORITHM_DIFFICULTY.HARD,
    description:
      'Computes shortest paths from a source node to all other nodes in weighted graphs with non-negative weights.',
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)'
    },
    spaceComplexity: 'O(V)',
    estimatedTime: '20 min',
    estimatedMinutes: 20,
    status: ALGORITHM_STATUS.COMING_SOON,
    tags: ['graphs', 'shortest-path', 'priority-queue']
  }
]

export const algorithmLookupBySlug = algorithms.reduce((accumulator, algorithm) => {
  accumulator[algorithm.slug] = algorithm
  return accumulator
}, {})

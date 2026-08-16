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
    tags: ['sorting', 'comparison', 'beginner'],
    keyIdea:
      'Repeatedly compare adjacent elements and move the largest unsorted element toward the end of the array.',
    overview: {
      whatIsIt:
        'Bubble Sort is a beginner-friendly sorting technique that repeatedly checks adjacent values and swaps them if they are in the wrong order.',
      whenToUse:
        'Use it for learning sorting basics, understanding swaps, and for very small datasets where implementation simplicity matters.',
      keyIdea:
        'Each pass bubbles the largest remaining element to the right until the list becomes sorted.'
    },
    explanation: {
      howItWorks: [
        'Start from the first element and compare each adjacent pair.',
        'Swap values when the left value is greater than the right value.',
        'Continue until the end of the unsorted portion.',
        'Repeat passes until a full pass makes no swaps.'
      ],
      stepByStep: [
        'Start from the first element.',
        'Compare adjacent elements.',
        'Swap them if they are in the wrong order.',
        'Continue through the array.',
        'Repeat until the array is sorted.'
      ],
      whenToUse: [
        'When teaching or learning sorting fundamentals.',
        'When data is nearly sorted and the list size is small.',
        'When implementation clarity is more important than speed.'
      ],
      advantages: [
        'Very easy to understand and implement.',
        'In-place sorting with O(1) extra space.',
        'Can detect already sorted arrays with an optimization flag.'
      ],
      disadvantages: [
        'Inefficient for medium and large datasets.',
        'High average and worst-case time complexity O(n^2).',
        'Performs many swaps compared to more advanced sorts.'
      ]
    },
    codeImplementations: {
      javascript: `function bubbleSort(arr) {
  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i += 1) {
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j += 1) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }

  return result;
}`,
      python: `def bubble_sort(arr):
    result = arr[:]
    n = len(result)

    for i in range(n - 1):
        swapped = False
        for j in range(0, n - 1 - i):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True

        if not swapped:
            break

    return result`,
      java: `public static int[] bubbleSort(int[] arr) {
    int[] result = arr.clone();
    int n = result.length;

    for (int i = 0; i < n - 1; i++) {
      boolean swapped = false;

      for (int j = 0; j < n - 1 - i; j++) {
        if (result[j] > result[j + 1]) {
          int temp = result[j];
          result[j] = result[j + 1];
          result[j + 1] = temp;
          swapped = true;
        }
      }

      if (!swapped) {
        break;
      }
    }

    return result;
}`,
      cpp: `void bubbleSort(std::vector<int>& arr) {
  int n = static_cast<int>(arr.size());

  for (int i = 0; i < n - 1; ++i) {
    bool swapped = false;

    for (int j = 0; j < n - 1 - i; ++j) {
      if (arr[j] > arr[j + 1]) {
        std::swap(arr[j], arr[j + 1]);
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }
}`
    },
    dryRun: [
      {
        step: 'Step 0',
        title: 'Initial array',
        detail: '[50, 30, 80, 10]'
      },
      {
        step: 'Step 1',
        title: 'Compare 50 and 30',
        detail: '50 > 30, swap needed.'
      },
      {
        step: 'Step 2',
        title: 'Swap 50 and 30',
        detail: 'Array becomes [30, 50, 80, 10].'
      },
      {
        step: 'Step 3',
        title: 'Continue pass',
        detail: 'Compare 50 and 80, no swap. Compare 80 and 10, then swap.'
      },
      {
        step: 'Step 4',
        title: 'Repeat passes',
        detail: 'Continue until no swaps happen in a complete pass.'
      }
    ],
    practiceProblems: [
      {
        title: 'Sort an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        description: 'Implement sorting for an integer array using efficient methods.',
        url: 'https://leetcode.com/problems/sort-an-array/'
      },
      {
        title: 'Bubble Sort Fundamentals',
        difficulty: 'Easy',
        platform: 'Practice Set',
        description: 'Practice adjacent comparisons, swaps, and pass-by-pass optimization.',
        url: null
      }
    ],
    relatedAlgorithms: ['selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'],
    visualizationPreview: [50, 30, 80, 10, 60]
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

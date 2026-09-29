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
      'Repeatedly selects the smallest element from the unsorted portion and places it at the front of the sorted region.',
    timeComplexity: {
      best: 'O(n^2)',
      average: 'O(n^2)',
      worst: 'O(n^2)'
    },
    spaceComplexity: 'O(1)',
    estimatedTime: '12 min',
    estimatedMinutes: 12,
    status: ALGORITHM_STATUS.AVAILABLE,
    tags: ['sorting', 'in-place', 'comparison', 'beginner'],
    keyIdea:
      'Divide the array into sorted and unsorted regions. Find the minimum element in the unsorted region and swap it to the left boundary.',
    overview: {
      whatIsIt:
        'Selection Sort is an intuitive comparison-based sorting algorithm that works by selecting the smallest element from the unsorted part of the array and swapping it into the next position of the sorted prefix.',
      whenToUse:
        'Use it for learning algorithm mechanics, understanding the trade-off between comparisons and swaps, and when write operations (swaps) are extremely costly compared to reads.',
      keyIdea:
        'Scans the unsorted region to find the true minimum, then performs at most one swap per pass to lock that element into place.'
    },
    explanation: {
      howItWorks: [
        'Set the first unsorted index as the target slot.',
        'Assume the target slot holds the initial candidate minimum.',
        'Scan the rest of the unsorted region to find the true minimum element.',
        'Swap the minimum element into the target slot.',
        'Advance the sorted boundary to the right and repeat until all elements are sorted.'
      ],
      stepByStep: [
        'Initialize the sorted prefix boundary at index 0.',
        'Find the smallest value among the unsorted elements.',
        'Swap the smallest value with the first unsorted position.',
        'Expand the sorted prefix by one element.',
        'Repeat for all remaining positions.'
      ],
      whenToUse: [
        'When write operations to memory or storage are significantly more expensive than reads.',
        'When teaching or learning selection vs bubbling metaphors.',
        'When working with small arrays where implementation simplicity is desired.'
      ],
      advantages: [
        'Performs at most O(n) swaps across the entire sort (minimizes memory writes).',
        'In-place sorting with O(1) auxiliary memory.',
        'Predictable, consistent step-by-step execution.'
      ],
      disadvantages: [
        'Always takes O(n^2) comparisons even if the input is already sorted.',
        'Not a stable sort in its standard implementation.',
        'Inefficient on large datasets compared to O(n log n) algorithms.'
      ]
    },
    codeImplementations: {
      javascript: `function selectionSort(arr) {
  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < n; j += 1) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const temp = result[i];
      result[i] = result[minIndex];
      result[minIndex] = temp;
    }
  }

  return result;
}`,
      python: `def selection_sort(arr):
    result = arr[:]
    n = len(result)

    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if result[j] < result[min_index]:
                min_index = j

        if min_index != i:
            result[i], result[min_index] = result[min_index], result[i]

    return result`,
      java: `public static int[] selectionSort(int[] arr) {
    int[] result = arr.clone();
    int n = result.length;

    for (int i = 0; i < n - 1; i++) {
      int minIndex = i;

      for (int j = i + 1; j < n; j++) {
        if (result[j] < result[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        int temp = result[i];
        result[i] = result[minIndex];
        result[minIndex] = temp;
      }
    }

    return result;
}`,
      cpp: `void selectionSort(std::vector<int>& arr) {
  int n = static_cast<int>(arr.size());

  for (int i = 0; i < n - 1; ++i) {
    int minIndex = i;

    for (int j = i + 1; j < n; ++j) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex != i) {
      std::swap(arr[i], arr[minIndex]);
    }
  }
}`
    },
    dryRun: [
      {
        step: 'Step 0',
        title: 'Initial array',
        detail: '[40, 20, 60, 10, 30]'
      },
      {
        step: 'Pass 1',
        title: 'Find min in [40, 20, 60, 10, 30]',
        detail: 'Minimum is 10 at index 3. Swap with index 0. Array becomes [10 | 20, 60, 40, 30].'
      },
      {
        step: 'Pass 2',
        title: 'Find min in [20, 60, 40, 30]',
        detail: 'Minimum is 20 at index 1 (already in place). Array becomes [10, 20 | 60, 40, 30].'
      },
      {
        step: 'Pass 3',
        title: 'Find min in [60, 40, 30]',
        detail: 'Minimum is 30 at index 4. Swap with index 2. Array becomes [10, 20, 30 | 40, 60].'
      },
      {
        step: 'Pass 4',
        title: 'Final element in place',
        detail: 'Array is fully sorted: [10, 20, 30, 40, 60].'
      }
    ],
    practiceProblems: [
      {
        title: 'Sort an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        description: 'Sort an array of integers using comparison-based techniques.'
      },
      {
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        description: 'Find the kth largest element in an unsorted array.'
      }
    ],
    relatedAlgorithms: ['bubble-sort', 'insertion-sort', 'quick-sort', 'merge-sort'],
    visualizationPreview: [40, 20, 60, 10, 30]
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
      'Builds the sorted array one element at a time by picking unsorted keys, shifting larger sorted elements right, and inserting the key into the created gap.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n^2)',
      worst: 'O(n^2)'
    },
    spaceComplexity: 'O(1)',
    estimatedTime: '12 min',
    estimatedMinutes: 12,
    status: ALGORITHM_STATUS.AVAILABLE,
    tags: ['sorting', 'incremental', 'in-place', 'stable', 'beginner'],
    keyIdea:
      'Take unsorted elements one by one, shift larger elements in the sorted region right to create a gap, and insert the key into its correct position.',
    overview: {
      whatIsIt:
        'Insertion Sort is an intuitive, card-sorting style algorithm. It divides the array into a sorted prefix and unsorted suffix, picking keys one by one and inserting each into its proper sorted location by shifting larger elements right.',
      whenToUse:
        'Use it for small arrays, nearly-sorted datasets (runs in O(n) linear time), online streams where new items arrive continuously, and as the base-case sorter in hybrid algorithms like Timsort.',
      keyIdea:
        'Pick up a key, shift all larger sorted elements to the right to open a gap, and drop the key into that gap.'
    },
    explanation: {
      howItWorks: [
        'Consider the first element (index 0) as an initial sorted region of length 1.',
        'Pick the next unsorted element as the key.',
        'Compare the key with elements in the sorted region from right to left.',
        'Shift each element that is greater than the key one position to the right.',
        'Insert the key into the resulting gap and expand the sorted boundary.'
      ],
      stepByStep: [
        'Start at index 1 with the first unsorted key.',
        'Compare the key with the element to its left.',
        'If the sorted element is larger, shift it one position right.',
        'Repeat shifting until a smaller/equal element is found or index 0 is passed.',
        'Insert the key into the open gap.',
        'Repeat for all remaining keys until the array is fully sorted.'
      ],
      whenToUse: [
        'When dealing with nearly sorted or small datasets (n < 50).',
        'When a stable, in-place sorting algorithm with minimal overhead is needed.',
        'When data is arriving online in a continuous stream.'
      ],
      advantages: [
        'Very fast for small or nearly sorted arrays (O(n) best-case).',
        'Stable sorting: preserves original relative order of equal elements.',
        'In-place: requires only O(1) auxiliary memory.',
        'Adaptive: efficiency increases the more pre-sorted the data is.'
      ],
      disadvantages: [
        'Quadratic time complexity O(n^2) for average and worst cases.',
        'Inefficient for large arrays compared to O(n log n) divide-and-conquer algorithms.'
      ]
    },
    codeImplementations: {
      javascript: `function insertionSort(arr) {
  const result = [...arr];
  const n = result.length;

  for (let i = 1; i < n; i += 1) {
    const key = result[i];
    let j = i - 1;

    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j -= 1;
    }

    result[j + 1] = key;
  }

  return result;
}`,
      python: `def insertion_sort(arr):
    result = arr[:]
    n = len(result)

    for i in range(1, n):
        key = result[i]
        j = i - 1

        while j >= 0 and result[j] > key:
            result[j + 1] = result[j]
            j -= 1

        result[j + 1] = key

    return result`,
      java: `public static int[] insertionSort(int[] arr) {
    int[] result = arr.clone();
    int n = result.length;

    for (int i = 1; i < n; i++) {
      int key = result[i];
      int j = i - 1;

      while (j >= 0 && result[j] > key) {
        result[j + 1] = result[j];
        j--;
      }

      result[j + 1] = key;
    }

    return result;
}`,
      cpp: `void insertionSort(std::vector<int>& arr) {
  int n = static_cast<int>(arr.size());

  for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j -= 1;
    }

    arr[j + 1] = key;
  }
}`
    },
    dryRun: [
      {
        step: 'Step 0',
        title: 'Initial array',
        detail: '[10, 30, 50, 20, 40] — [10] is sorted prefix.'
      },
      {
        step: 'Pass 1',
        title: 'Key = 30',
        detail: '30 >= 10, no shift needed. Insert 30 at index 1 ➔ [10, 30 | 50, 20, 40].'
      },
      {
        step: 'Pass 2',
        title: 'Key = 50',
        detail: '50 >= 30, no shift needed. Insert 50 at index 2 ➔ [10, 30, 50 | 20, 40].'
      },
      {
        step: 'Pass 3',
        title: 'Key = 20',
        detail: '50 > 20 (shift 50), 30 > 20 (shift 30), 10 < 20 (gap at 1). Insert 20 ➔ [10, 20, 30, 50 | 40].'
      },
      {
        step: 'Pass 4',
        title: 'Key = 40',
        detail: '50 > 40 (shift 50), 30 < 40 (gap at 3). Insert 40 ➔ [10, 20, 30, 40, 50].'
      }
    ],
    practiceProblems: [
      {
        title: 'Insertion Sort List',
        difficulty: 'Medium',
        platform: 'LeetCode',
        description: 'Sort a linked list using insertion sort.'
      },
      {
        title: 'Sort an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        description: 'Implement sorting algorithms for array datasets.'
      }
    ],
    relatedAlgorithms: ['bubble-sort', 'selection-sort', 'merge-sort', 'quick-sort'],
    visualizationPreview: [10, 30, 50, 20, 40]
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
      'A classic divide-and-conquer algorithm that recursively splits arrays into halves down to single elements, then merges sorted pairs back together.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    estimatedTime: '15 min',
    estimatedMinutes: 15,
    status: ALGORITHM_STATUS.AVAILABLE,
    tags: ['sorting', 'divide-and-conquer', 'stable', 'recursive'],
    keyIdea:
      'Divide the unsorted array into n single-element sub-arrays, then repeatedly merge sub-arrays to produce new sorted sub-arrays until only one remains.',
    overview: {
      whatIsIt:
        'Merge Sort is an optimal comparison-based sorting algorithm built on the divide-and-conquer paradigm. It breaks problems down into smaller sub-problems of the same type, solves them independently, and combines their solutions.',
      whenToUse:
        'Use when guaranteed O(n log n) worst-case time complexity is required, when sorting linked lists, or when stable sorting of complex objects is required.',
      keyIdea:
        'Split array recursively until base cases (single elements) are reached, then merge adjacent sorted groups by repeatedly taking the smaller front element into an output array.'
    },
    explanation: {
      howItWorks: [
        'Divide the unsorted array into two halves at the midpoint.',
        'Recursively sort the left half.',
        'Recursively sort the right half.',
        'Merge the two sorted halves by comparing front elements and placing the smaller one into the output.',
        'Continue until all sub-arrays are merged back into a single sorted array.'
      ],
      stepByStep: [
        'Calculate midpoint: mid = floor((start + end) / 2).',
        'Divide array into left [start...mid] and right [mid+1...end] subarrays.',
        'Base case: if subarray has 1 element, it is already sorted.',
        'Merge: maintain pointers at the start of both sorted subarrays.',
        'Compare front elements: take the smaller element and append to merged output.',
        'Copy any remaining elements when one subarray is exhausted.',
        'Write merged result back into the target array range.'
      ],
      whenToUse: [
        'When guaranteed O(n log n) runtime is mandatory regardless of input distribution.',
        'When sorting linked lists (Merge Sort requires O(1) extra space for linked lists).',
        'When stability is required (equal elements preserve original order).'
      ],
      advantages: [
        'Guaranteed O(n log n) time complexity across all cases (best, average, worst).',
        'Stable sorting: preserves original relative order of duplicate values.',
        'Predictable, deterministic performance unaffected by adversarial inputs.',
        'Well-suited for external sorting of large datasets that exceed RAM.'
      ],
      disadvantages: [
        'Requires O(n) auxiliary memory space for temporary merge buffers.',
        'Slower than Quick Sort or Insertion Sort on small datasets due to recursive overhead.'
      ]
    },
    codeImplementations: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(right[j]);
      j += 1;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;

    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp[k++] = arr[i++];
      } else {
        temp[k++] = arr[j++];
      }
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    System.arraycopy(temp, 0, arr, left, temp.length);
}`,
      cpp: `void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> temp;
    int i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
        }
    }

    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);

    for (int k = 0; k < temp.size(); ++k) {
        arr[left + k] = temp[k];
    }
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`
    },
    dryRun: [
      {
        step: 'Step 1: Divide',
        title: 'Recursive Split',
        detail: '[38, 27, 43, 10, 55, 19, 6, 82] ➔ [38, 27, 43, 10] & [55, 19, 6, 82]'
      },
      {
        step: 'Step 2: Base Cases',
        title: 'Single Elements',
        detail: 'Divided down to [38], [27], [43], [10], [55], [19], [6], [82]'
      },
      {
        step: 'Step 3: Merge Pairs',
        title: 'Bottom-up Merge',
        detail: '[38]+[27] ➔ [27, 38], [43]+[10] ➔ [10, 43], [55]+[19] ➔ [19, 55], [6]+[82] ➔ [6, 82]'
      },
      {
        step: 'Step 4: Merge 4s',
        title: 'Combine Subarrays',
        detail: '[27, 38]+[10, 43] ➔ [10, 27, 38, 43] and [19, 55]+[6, 82] ➔ [6, 19, 55, 82]'
      },
      {
        step: 'Step 5: Final Merge',
        title: 'Reconstruct Array',
        detail: '[10, 27, 38, 43] + [6, 19, 55, 82] ➔ [6, 10, 19, 27, 38, 43, 55, 82]'
      }
    ],
    practiceProblems: [
      {
        title: 'Sort an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        description: 'Sort an array of integers in O(n log n) time complexity.'
      },
      {
        title: 'Merge Sorted Array',
        difficulty: 'Easy',
        platform: 'LeetCode',
        description: 'Merge two sorted integer arrays into one sorted array.'
      },
      {
        title: 'Sort List',
        difficulty: 'Medium',
        platform: 'LeetCode',
        description: 'Sort a linked list in O(n log n) time using constant space complexity.'
      }
    ],
    relatedAlgorithms: ['bubble-sort', 'selection-sort', 'insertion-sort', 'quick-sort'],
    visualizationPreview: [38, 27, 43, 10, 55, 19, 6, 82]
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

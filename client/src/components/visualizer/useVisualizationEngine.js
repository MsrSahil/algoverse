import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { SPEED_CONFIG, DEFAULT_SPEED } from './visualizationTypes.js'

/**
 * Generic Reusable Visualization Engine Hook
 *
 * Manages step traversal, playback controls, animation delays, and edge cases
 * completely decoupled from algorithm logic and rendering implementations.
 *
 * @param {Object} options
 * @param {Array} options.steps - Array of visualization step objects
 * @param {number} [options.initialStep=0] - Starting step index
 * @param {string} [options.defaultSpeed='1x'] - Initial speed multiplier
 */
export const useVisualizationEngine = ({
  steps = [],
  initialStep = 0,
  defaultSpeed = DEFAULT_SPEED
} = {}) => {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeedState] = useState(defaultSpeed)

  const timerRef = useRef(null)
  const totalSteps = steps.length

  // Synchronize/reset state safely when the step collection changes (e.g., custom input submitted)
  useEffect(() => {
    setIsPlaying(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setCurrentStep((prevStep) => {
      if (totalSteps === 0) return 0
      if (prevStep >= totalSteps) return 0
      return Math.min(Math.max(0, initialStep), totalSteps - 1)
    })
  }, [steps, totalSteps, initialStep])

  // Derive current step state and edge-case flags
  const isFirstStep = currentStep === 0
  const isLastStep = totalSteps === 0 || currentStep >= totalSteps - 1
  const isCompleted = totalSteps > 0 && currentStep === totalSteps - 1

  const currentStepData = useMemo(() => {
    if (totalSteps === 0 || currentStep < 0 || currentStep >= totalSteps) {
      return null
    }
    return steps[currentStep] || null
  }, [steps, currentStep, totalSteps])

  const progressPercentage = useMemo(() => {
    if (totalSteps <= 1) return totalSteps === 1 ? 100 : 0
    return Math.round((currentStep / (totalSteps - 1)) * 100)
  }, [currentStep, totalSteps])

  // Action: Stop playback
  const pause = useCallback(() => {
    setIsPlaying(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Action: Start or resume playback
  const play = useCallback(() => {
    if (totalSteps <= 1) return

    // If starting play while at completion, restart from step 0
    if (currentStep >= totalSteps - 1) {
      setCurrentStep(0)
    }

    setIsPlaying(true)
  }, [totalSteps, currentStep])

  // Action: Move one step forward
  const next = useCallback(() => {
    pause()
    setCurrentStep((prev) => {
      if (prev < totalSteps - 1) {
        return prev + 1
      }
      return prev
    })
  }, [pause, totalSteps])

  // Action: Move one step backward
  const previous = useCallback(() => {
    pause()
    setCurrentStep((prev) => {
      if (prev > 0) {
        return prev - 1
      }
      return 0
    })
  }, [pause])

  // Action: Restart to step 0
  const restart = useCallback(() => {
    pause()
    setCurrentStep(0)
  }, [pause])

  // Action: Jump directly to a step index
  const goToStep = useCallback(
    (targetIndex) => {
      pause()
      if (typeof targetIndex !== 'number' || Number.isNaN(targetIndex)) return

      const clampedIndex = Math.max(0, Math.min(Math.floor(targetIndex), totalSteps - 1))
      setCurrentStep(clampedIndex)
    },
    [pause, totalSteps]
  )

  // Action: Change playback speed (takes effect on subsequent tick)
  const setSpeed = useCallback((newSpeed) => {
    if (SPEED_CONFIG[newSpeed]) {
      setSpeedState(newSpeed)
    }
  }, [])

  // Action: Reset engine state
  const reset = useCallback(() => {
    pause()
    setCurrentStep(0)
  }, [pause])

  // Playback timer execution
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      return
    }

    // Stop if reached the last step
    if (currentStep >= totalSteps - 1) {
      setIsPlaying(false)
      return
    }

    const delay = SPEED_CONFIG[speed] || SPEED_CONFIG[DEFAULT_SPEED]

    timerRef.current = setTimeout(() => {
      setCurrentStep((prev) => {
        const nextStep = prev + 1
        if (nextStep >= totalSteps - 1) {
          setIsPlaying(false)
        }
        return nextStep
      })
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, currentStep, totalSteps, speed])

  // Unmount cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  return {
    // Current state
    currentStep,
    currentStepData,
    totalSteps,
    isPlaying,
    isCompleted,
    isFirstStep,
    isLastStep,
    speed,
    progressPercentage,

    // Control availability flags
    canPlay: totalSteps > 1 && (!isPlaying || isCompleted),
    canPause: isPlaying,
    canPrevious: !isPlaying && currentStep > 0,
    canNext: !isPlaying && currentStep < totalSteps - 1,
    canRestart: totalSteps > 0 && (currentStep > 0 || isPlaying || isCompleted),

    // Control actions
    play,
    pause,
    next,
    previous,
    restart,
    goToStep,
    setSpeed,
    reset
  }
}

export default useVisualizationEngine

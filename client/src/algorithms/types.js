/**
 * @file Algorithm Step Generator Type Definitions and Contract
 *
 * Algorithm Step Generators must adhere to the following contract:
 *
 * 1. PURE & DETERMINISTIC: Given the same input, always return the identical sequence of steps.
 * 2. SIDE-EFFECT FREE: No network calls, DOM manipulation, or global state mutations.
 * 3. FRAMEWORK AGNOSTIC: Independent of React hooks, timers (setTimeout/setInterval), and browser APIs.
 * 4. SERIALIZABLE: All step objects must contain plain serializable JavaScript data (arrays, numbers, strings, objects).
 *
 * Signature:
 * `generateSteps(input: number[] | any, options?: Record<string, any>): VisualizationStep[]`
 */

export const GENERATOR_STATUS = {
  REGISTERED: 'registered',
  UNREGISTERED: 'unregistered'
}

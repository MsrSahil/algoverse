const DIFFICULTY_STYLES = {
  Easy: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  Medium: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-300',
  Hard: 'border-red-400/30 bg-red-400/10 text-red-300'
}

export const getDifficultyStyles = (difficulty) => {
  return DIFFICULTY_STYLES[difficulty] || 'border-slate-400/30 bg-slate-400/10 text-slate-300'
}

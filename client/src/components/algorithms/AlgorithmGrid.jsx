import AlgorithmCard from './AlgorithmCard'

const AlgorithmGrid = ({ algorithms = [] }) => {
  return (
    <section aria-label="Algorithm results" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {algorithms.map((algorithm) => (
        <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
      ))}
    </section>
  )
}

export default AlgorithmGrid

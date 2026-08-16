import CategoryCard from './CategoryCard'

const CategoryGrid = ({ categories = [] }) => {
  return (
    <section aria-labelledby="learning-categories-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Explore</p>
          <h2 id="learning-categories-title" className="mt-2 text-2xl font-bold text-white">
            Learning Categories
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default CategoryGrid

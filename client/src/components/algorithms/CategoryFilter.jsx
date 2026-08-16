const getCategoryClasses = (isActive) => {
  if (isActive) {
    return 'border-cyan-400 bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
  }

  return 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-white'
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-200">Categories</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${getCategoryClasses(isActive)}`}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter

const SectionList = ({ title, items }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div>
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <ol className="mt-2 space-y-2 text-sm text-slate-300">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="leading-6">
            {index + 1}. {item}
          </li>
        ))}
      </ol>
    </div>
  )
}

const BulletList = ({ title, items }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div>
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <ul className="mt-2 space-y-2 text-sm text-slate-300">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="leading-6">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const AlgorithmExplanation = ({ algorithm }) => {
  const explanation = algorithm.explanation || {}

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6" aria-labelledby="algorithm-explanation-title">
      <h3 id="algorithm-explanation-title" className="text-2xl font-bold text-white">
        Algorithm Explanation
      </h3>

      <div className="mt-5 space-y-5">
        <div>
          <h4 className="text-base font-semibold text-white">What is {algorithm.title}?</h4>
          <p className="mt-2 text-sm leading-7 text-slate-300">{algorithm.overview?.whatIsIt || algorithm.description}</p>
        </div>

        <SectionList title="How does it work?" items={explanation.howItWorks} />
        <SectionList title="Step-by-step explanation" items={explanation.stepByStep} />
        <BulletList title="When to use it" items={explanation.whenToUse} />
        <BulletList title="Advantages" items={explanation.advantages} />
        <BulletList title="Disadvantages" items={explanation.disadvantages} />
      </div>
    </section>
  )
}

export default AlgorithmExplanation

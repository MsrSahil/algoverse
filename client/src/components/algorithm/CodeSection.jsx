import { useEffect, useMemo, useState } from 'react'

const languageTabs = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' }
]

const tabClassName = (isActive) =>
  [
    'rounded-full border px-3 py-1.5 text-sm font-semibold transition duration-200',
    isActive
      ? 'border-cyan-400 bg-cyan-400 text-slate-950'
      : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/60 hover:bg-cyan-400/10'
  ].join(' ')

const CodeSection = ({ codeImplementations = {} }) => {
  const availableTabs = useMemo(
    () => languageTabs.filter((tab) => Boolean(codeImplementations[tab.id])),
    [codeImplementations]
  )

  const [activeLanguage, setActiveLanguage] = useState(availableTabs[0]?.id || 'javascript')
  const [copyStatus, setCopyStatus] = useState('idle')

  useEffect(() => {
    if (!availableTabs.find((tab) => tab.id === activeLanguage)) {
      setActiveLanguage(availableTabs[0]?.id || 'javascript')
    }
  }, [availableTabs, activeLanguage])

  useEffect(() => {
    if (copyStatus !== 'success' && copyStatus !== 'error') {
      return undefined
    }

    const timeoutId = setTimeout(() => {
      setCopyStatus('idle')
    }, 1800)

    return () => clearTimeout(timeoutId)
  }, [copyStatus])

  const activeCode = codeImplementations[activeLanguage]

  const handleCopy = async () => {
    if (!activeCode) {
      return
    }

    try {
      await navigator.clipboard.writeText(activeCode)
      setCopyStatus('success')
    } catch {
      setCopyStatus('error')
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6" aria-labelledby="code-section-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="code-section-title" className="text-2xl font-bold text-white">
          Code Implementation
        </h3>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!activeCode}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Copy selected code"
        >
          {copyStatus === 'success' ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      {copyStatus === 'error' && (
        <p className="mt-3 text-sm text-amber-300">Unable to copy right now. Please copy manually.</p>
      )}

      {availableTabs.length === 0 ? (
        <p className="mt-4 text-sm text-slate-300">Code implementations for this algorithm will be added soon.</p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Code languages">
            {availableTabs.map((tab) => {
              const isActive = activeLanguage === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={tabClassName(isActive)}
                  onClick={() => setActiveLanguage(tab.id)}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80">
            <pre className="p-4 text-xs leading-6 text-slate-200 sm:text-sm">
              <code>{activeCode}</code>
            </pre>
          </div>
        </>
      )}
    </section>
  )
}

export default CodeSection

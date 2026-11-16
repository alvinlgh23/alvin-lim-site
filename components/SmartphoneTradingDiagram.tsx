export function SmartphoneTradingDiagram() {
  return (
    <figure className="m-0 border-y border-ink py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
        <div>
          <p className="archival-mono text-[11px] text-muted">
            FIG. 04.1 — SECOND-HAND EXCHANGE SEQUENCE & FRICTION TRACE
          </p>
          <p className="mt-1 text-xs text-graphite">
            Retrospective reconstruction of a two-step upward trade hypothesis in secondary smartphone markets.
          </p>
        </div>
        <span className="archival-mono border border-rule bg-ivory px-2.5 py-1 text-[10px] text-charcoal">
          OUTCOME: STEP 01 COMPLETED · STEP 02 HALTED
        </span>
      </div>

      {/* Desktop horizontal sequence / Mobile vertical sequence */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr_1fr_0.95fr_1fr] lg:items-center">
        {/* Node 1: iPhone 5 */}
        <div className="border border-ink/20 bg-ivory p-5">
          <div className="flex items-center justify-between">
            <span className="archival-mono text-[10px] text-muted">ASSET 01 / STARTING DEVICE</span>
            <span className="archival-mono border border-rule px-1.5 py-0.5 text-[10px] text-charcoal">
              iOS · 16GB
            </span>
          </div>

          <div className="my-5 flex items-center gap-4">
            {/* Neutral device illustration */}
            <svg
              viewBox="0 0 48 88"
              className="h-16 w-9 shrink-0 text-ink"
              fill="none"
              aria-hidden="true"
            >
              <rect x="4" y="2" width="40" height="84" rx="6" stroke="currentColor" strokeWidth="1.5" />
              <line x1="18" y1="8" x2="30" y2="8" stroke="currentColor" strokeWidth="1.2" />
              <rect x="8" y="14" width="32" height="56" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="24" cy="78" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <div>
              <h4 className="editorial-serif text-xl font-medium text-ink">iPhone 5 · 16GB</h4>
              <p className="mt-1 text-xs leading-relaxed text-graphite">
                Higher brand value retention in the local second-hand market despite older release generation.
              </p>
            </div>
          </div>

          <div className="border-t border-rule pt-3">
            <p className="archival-mono text-[10px] text-muted">OBSERVED CHARACTERISTIC</p>
            <p className="mt-1 text-xs text-charcoal">Strong liquidity & familiar resale floor</p>
          </div>
        </div>

        {/* Connector 1: Solid line for successful trade */}
        <div className="flex flex-col items-center justify-center py-2 lg:py-0">
          <span className="archival-mono mb-2 inline-flex items-center gap-1.5 bg-ink px-2.5 py-1 text-[10px] text-ivory">
            <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
            SUCCESSFUL EXCHANGE
          </span>
          {/* Desktop solid horizontal arrow */}
          <div className="hidden w-full items-center lg:flex" aria-hidden="true">
            <div className="h-[2px] w-full bg-ink" />
            <svg viewBox="0 0 12 12" className="-ml-1 h-3.5 w-3.5 shrink-0 text-ink" fill="currentColor">
              <path d="M2 1L10 6L2 11V1Z" />
            </svg>
          </div>
          {/* Mobile solid vertical arrow */}
          <div className="flex flex-col items-center lg:hidden" aria-hidden="true">
            <div className="h-8 w-[2px] bg-ink" />
            <svg viewBox="0 0 12 12" className="-mt-1 h-3.5 w-3.5 text-ink" fill="currentColor">
              <path d="M1 2L6 10L11 2H1Z" />
            </svg>
          </div>
          <p className="mt-2 text-center text-[11px] text-graphite">
            Cross-brand depreciation gap captured in 1-to-1 swap
          </p>
        </div>

        {/* Node 2: Samsung Galaxy Note 3 */}
        <div className="border border-ink/25 bg-ivory p-5">
          <div className="flex items-center justify-between">
            <span className="archival-mono text-[10px] text-muted">ASSET 02 / INTERMEDIATE DEVICE</span>
            <span className="archival-mono border border-ember/40 bg-ember/10 px-1.5 py-0.5 text-[10px] text-ember">
              CONDITION CONSTRAINT
            </span>
          </div>

          <div className="my-5 flex items-center gap-4">
            {/* Neutral phablet illustration */}
            <svg
              viewBox="0 0 54 92"
              className="h-16 w-10 shrink-0 text-ink"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3" y="2" width="48" height="88" rx="4" stroke="currentColor" strokeWidth="1.5" />
              <line x1="19" y1="7" x2="35" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <rect x="7" y="12" width="40" height="66" stroke="currentColor" strokeWidth="1.2" />
              <rect x="20" y="81" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
              {/* Subtle wear notation lines */}
              <line x1="12" y1="22" x2="20" y2="30" stroke="#E63600" strokeWidth="1.2" />
              <line x1="36" y1="58" x2="43" y2="65" stroke="#E63600" strokeWidth="1.2" />
            </svg>
            <div>
              <h4 className="editorial-serif text-xl font-medium text-ink">Samsung Galaxy Note 3</h4>
              <p className="mt-1 text-xs leading-relaxed text-graphite">
                Newer flagship specification tier, but physical condition was not particularly good.
              </p>
            </div>
          </div>

          <div className="border-t border-rule pt-3">
            <p className="archival-mono text-[10px] text-ember">UNACCOUNTED VARIABLE</p>
            <p className="mt-1 text-xs text-charcoal">
              Unit-specific wear discounted its practical exchange value
            </p>
          </div>
        </div>

        {/* Connector 2: Dashed line for unsuccessful trade attempt */}
        <div className="flex flex-col items-center justify-center py-2 lg:py-0">
          <span className="archival-mono mb-2 inline-flex items-center gap-1.5 border border-ember/50 bg-ember/10 px-2.5 py-1 text-[10px] text-ember">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            UNSUCCESSFUL EXCHANGE ATTEMPT
          </span>
          {/* Desktop dashed horizontal line with barrier */}
          <div className="hidden w-full items-center lg:flex" aria-hidden="true">
            <div className="h-0 w-full border-t-2 border-dashed border-ember" />
            <span className="mx-1 font-mono text-xs font-bold text-ember">×</span>
            <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 shrink-0 text-ember/70" fill="none">
              <path d="M2 1L10 6L2 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          {/* Mobile dashed vertical line */}
          <div className="flex flex-col items-center lg:hidden" aria-hidden="true">
            <div className="h-8 w-0 border-l-2 border-dashed border-ember" />
            <span className=" font-mono text-xs font-bold text-ember">×</span>
          </div>
          <p className="mt-2 text-center text-[11px] text-graphite">
            No counterparty willing to clear the swap given unit condition
          </p>
        </div>

        {/* Node 3: iPhone 6 */}
        <div className="border border-dashed border-ink/30 bg-ivory/50 p-5 opacity-85">
          <div className="flex items-center justify-between">
            <span className="archival-mono text-[10px] text-muted">ASSET 03 / TARGET DEVICE</span>
            <span className="archival-mono border border-rule px-1.5 py-0.5 text-[10px] text-muted">
              UNREACHED
            </span>
          </div>

          <div className="my-5 flex items-center gap-4">
            {/* Neutral target iPhone 6 illustration */}
            <svg
              viewBox="0 0 50 90"
              className="h-16 w-9 shrink-0 text-muted"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="2"
                width="42"
                height="86"
                rx="8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <line x1="19" y1="8" x2="31" y2="8" stroke="currentColor" strokeWidth="1.2" />
              <rect
                x="8"
                y="14"
                width="34"
                height="58"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <circle cx="25" cy="80" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <div>
              <h4 className="editorial-serif text-xl font-medium text-charcoal">iPhone 6 · 16GB</h4>
              <p className="mt-1 text-xs leading-relaxed text-graphite">
                Intended second-step upgrade target. The theoretical brand spread could not overcome device-specific friction.
              </p>
            </div>
          </div>

          <div className="border-t border-rule pt-3">
            <p className="archival-mono text-[10px] text-muted">RETROSPECTIVE LESSON</p>
            <p className="mt-1 text-xs text-charcoal">
              Apparent price differences ≠ executable opportunity
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4 text-xs text-muted">
        <div className="flex flex-wrap items-center gap-6">
          <span className="inline-flex items-center gap-2">
            <span className=" inline-block h-[2px] w-6 bg-ink" />
            <span className="archival-mono text-[10px]">→ SOLID LINE: COMPLETED EXCHANGE</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-0 w-6 border-t-2 border-dashed border-ember" />
            <span className="archival-mono text-[10px] text-ember">
              ⇢ DASHED LINE: UNSUCCESSFUL EXCHANGE ATTEMPT
            </span>
          </span>
        </div>
        <span className="archival-mono text-[10px]">
          CAROUSELL SECONDARY MARKET · RETROSPECTIVE DIAGRAM
        </span>
      </figcaption>
    </figure>
  );
}

export function StatusPill({ source, error }) {
  return (
    <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${source === 'api' ? 'border-[#feb80e] bg-[#feb80e]/15 text-black' : 'border-[#e0e0e0] bg-[#f4f4f4] text-zinc-700'}`}>
      {source === 'api' ? 'API connected' : error ? 'Using fallback data' : 'Loading API'}
    </span>
  )
}


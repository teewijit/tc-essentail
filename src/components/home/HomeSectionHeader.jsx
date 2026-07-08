export function HomeSectionHeader({ title, action = 'View all →' }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-2xl font-extrabold text-black">{title}</h2>
      <button type="button" className="text-xs font-extrabold text-[#061b3a]">{action}</button>
    </div>
  )
}


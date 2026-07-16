export function HomeSectionHeader({ title, action = 'View all ->' }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="text-2xl font-extrabold text-black">{title}</h2>
      <button type="button" className="text-sm font-bold text-[#061b3a] transition hover:text-primary">
        {action}
      </button>
    </div>
  )
}

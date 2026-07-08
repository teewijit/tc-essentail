export function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="block border-b border-[#e0e0e0] pb-5 text-xs font-bold uppercase text-black last:border-b-0">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-12 w-full rounded-md border border-[#e0e0e0] bg-white px-3 text-sm font-medium normal-case text-zinc-700 outline-none focus:border-black"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}


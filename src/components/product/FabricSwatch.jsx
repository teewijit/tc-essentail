export function FabricSwatch({ fabric, className = '' }) {
  const label = fabric.name_en || fabric.name || fabric.code

  return (
    <div
      className={`fabric-swatch ${className}`}
      style={{
        '--swatch': fabric.colorValue,
        '--swatch-soft': `${fabric.colorValue}33`,
      }}
      aria-label={`${label} ${fabric.color}`}
    />
  )
}

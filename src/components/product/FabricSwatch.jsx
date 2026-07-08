export function FabricSwatch({ fabric, className = '' }) {
  return (
    <div
      className={`fabric-swatch ${className}`}
      style={{
        '--swatch': fabric.colorValue,
        '--swatch-soft': `${fabric.colorValue}33`,
      }}
      aria-label={`${fabric.name} ${fabric.color}`}
    />
  )
}


type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps {
  size?: SpinnerSize
  className?: string
}

const sizeMap: Record<SpinnerSize, { dim: number; stroke: number }> = {
  sm: { dim: 16, stroke: 2 },
  md: { dim: 24, stroke: 2.5 },
  lg: { dim: 40, stroke: 3 },
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const { dim, stroke } = sizeMap[size]
  const r = (dim - stroke * 2) / 2
  const circ = 2 * Math.PI * r

  return (
    <svg
      width={dim}
      height={dim}
      viewBox={`0 0 ${dim} ${dim}`}
      fill="none"
      className={['animate-spin', className].join(' ')}
      aria-label="Loading"
      role="status"
    >
      {/* Track */}
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={r}
        stroke="#3A3A3A"
        strokeWidth={stroke}
      />
      {/* Arc */}
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={r}
        stroke="#FF5722"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * 0.75}
        transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
      />
    </svg>
  )
}

export function SquarePlusIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none"
      className={className}
    >
      {/* Square outline in blue with transparent background */}
      <rect 
        width="18" 
        height="18" 
        x="3" 
        y="3" 
        rx="2"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#2563eb"
      />
      {/* Plus symbol inheriting background color */}
      <path 
        d="M8 12h8" 
        stroke="hsl(var(--sidebar-background))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M12 8v8"
        stroke="hsl(var(--sidebar-background))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
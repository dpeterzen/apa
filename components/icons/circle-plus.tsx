export function CirclePlusIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none"
      className={className}
    >
      {/* Circle outline in blue with fill */}
      <circle 
        cx="12" 
        cy="12" 
        r="9"
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
  );
}
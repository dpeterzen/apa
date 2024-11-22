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
    {/* Square with plus symbol */}
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke="#2563eb"
      strokeWidth="2"
      fill="#2563eb"
    />
    {/* Horizontal line of plus */}
    <line
      x1="7"
      y1="12"
      x2="17"
      y2="12"
      stroke="hsl(var(--sidebar-background))"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Vertical line of plus */}
    <line
      x1="12"
      y1="7"
      x2="12"
      y2="17"
      stroke="hsl(var(--sidebar-background))"
      strokeWidth="2"
      strokeLinecap="round"
    />
    </svg>
  );
}
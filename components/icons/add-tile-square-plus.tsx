export function AddTileSquarePlus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 23 23"
      fill="none"
      stroke="rgb(29 78 216)" 
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      ry="3"
      stroke="#2563eb"
      strokeWidth="2"
      fill="#2563eb"
    />
      <path d="M5 12h14" stroke="white" />
      <path d="M12 5v14" stroke="white" />
    </svg>

  );
}

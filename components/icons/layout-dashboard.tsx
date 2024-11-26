export function LayoutDashboardIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="7" height="9" rx="2" ry="2"></rect>
      <rect x="14" y="3" width="7" height="5" rx="2" ry="2"></rect>
      <rect x="14" y="12" width="7" height="9" rx="2" ry="2"></rect>
      <rect x="3" y="16" width="7" height="5" rx="2" ry="2"></rect>
    </svg>
  );
}

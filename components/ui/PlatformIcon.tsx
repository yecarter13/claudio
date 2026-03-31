export function PlatformIcon({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) {
  if (platform === "tiktok")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M14.5 2.25v2.92a5.33 5.33 0 0 0 4.08 1.9v2.95a8.22 8.22 0 0 1-4.08-1.12v6.46a5.77 5.77 0 1 1-5.77-5.77c.4 0 .79.04 1.16.12v2.98a2.87 2.87 0 1 0 1.71 2.67V2.25h2.9Z" />
      </svg>
    );
  if (platform === "snapchat")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M12 2.4c3.26 0 5.9 2.54 5.9 5.68v2.1c0 .53.27 1.03.73 1.32.53.34 1.1.58 1.7.71.23.05.39.26.37.5-.02.23-.2.43-.43.46-.7.1-1.35.36-1.88.76-.47.36-.6.99-.3 1.5.12.2.26.4.42.58.13.14.15.35.06.52a.53.53 0 0 1-.45.28c-.54.03-1.06.18-1.52.45-.63.37-1.42.38-2.06.04a2.88 2.88 0 0 0-2.74 0 2.2 2.2 0 0 1-2.06-.04 3.1 3.1 0 0 0-1.53-.45.53.53 0 0 1-.44-.28.52.52 0 0 1 .06-.52c.16-.18.3-.38.42-.58.3-.51.16-1.14-.31-1.5a4.03 4.03 0 0 0-1.87-.76.51.51 0 0 1-.43-.46.5.5 0 0 1 .37-.5c.6-.13 1.16-.37 1.69-.7.46-.3.74-.8.74-1.33V8.08c0-3.14 2.64-5.68 5.9-5.68Z" />
      </svg>
    );
  if (platform === "youtube")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M21.57 7.2a2.9 2.9 0 0 0-2.05-2.05C17.86 4.7 12 4.7 12 4.7s-5.86 0-7.52.45A2.9 2.9 0 0 0 2.43 7.2 30.8 30.8 0 0 0 2 12a30.8 30.8 0 0 0 .43 4.8 2.9 2.9 0 0 0 2.05 2.05c1.66.45 7.52.45 7.52.45s5.86 0 7.52-.45a2.9 2.9 0 0 0 2.05-2.05A30.8 30.8 0 0 0 22 12a30.8 30.8 0 0 0-.43-4.8ZM10 15.34V8.66L15.77 12 10 15.34Z" />
      </svg>
    );
  if (platform === "facebook")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.5-1.46h1.6V5.06A21.35 21.35 0 0 0 14.27 5c-2.56 0-4.32 1.56-4.32 4.43V11H7v3h2.95v8h3.55Z" />
      </svg>
    );
  // Instagram
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <defs>
        <linearGradient id="igG" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="6" stroke="url(#igG)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="url(#igG)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igG)" />
    </svg>
  );
}

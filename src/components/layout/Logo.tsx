import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="group">
      <div className="relative inline-block">
        <svg width="150" height="40" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 -mt-2">
          <circle cx="11.2" cy="20" r="9" fill="hsl(var(--primary))" />
          <circle cx="33" cy="20" r="9" fill="hsl(var(--grey))" />
          <circle cx="55" cy="20" r="9" fill="hsl(var(--accent))" />
        </svg>
        <div className="flex items-baseline pt-1">
            <span className="text-[2.7rem] font-medium font-headline text-foreground">veas</span>
            <span className="text-3xl font-light font-logo text-foreground ml-2">ACOUSTICS</span>
        </div>
      </div>
    </Link>
  );
}

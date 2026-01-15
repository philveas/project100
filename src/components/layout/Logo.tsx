import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group">
      <div className="relative inline-block">

        {/* CIRCLES */}
        <svg
          viewBox="0 0 150 40"
          xmlns="http://www.w3.org/2000/svg"
          className="
            absolute top-0 left-0
            -mt-1 md:-mt-2
            w-20 md:w-[150px]
            h-auto
          "
        >
          {/* mobile */}
          <circle
            cx="16"
            cy="20"
            r="14"
            fill="hsl(var(--primary))"
            className="md:hidden"
          />
          <circle
            cx="50"
            cy="20"
            r="14"
            fill="hsl(var(--secondary))"
            className="md:hidden"
          />
          <circle
            cx="82"
            cy="20"
            r="14"
            fill="hsl(var(--accent-logo))"
            className="md:hidden"
          />

          {/* desktop */}
          <circle
            cx="11.2"
            cy="20"
            r="9"
            fill="hsl(var(--primary))"
            className="hidden md:block"
          />
          <circle
            cx="33"
            cy="20"
            r="9"
            fill="hsl(var(--secondary))"
            className="hidden md:block"
          />
          <circle
            cx="55"
            cy="20"
            r="9"
            fill="hsl(var(--accent-logo))"
            className="hidden md:block"
          />
        </svg>

        {/* TEXT */}
        <div className="flex items-baseline pt-0.5 md:pt-1">
          <span
            className="
              text-[2.1rem]
              md:text-[2.7rem]
              font-medium font-heading text-foreground
            "
          >
            veas
          </span>

          <span
            className="
              text-[1.5rem]
              md:text-3xl
              font-light font-logo text-foreground ml-1.5 md:ml-2
            "
          >
            ACOUSTICS
          </span>
        </div>
      </div>
    </Link>
  );
}

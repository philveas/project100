// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    // Consistent left/right alignment for all sections using `.container`
    container: {
  	center: true,
 	 padding: {
   	 DEFAULT: "2rem",
   	 sm: "2rem",
  	  md: "2.5rem",
 	   lg: "3rem",
 	   xl: "4rem",
	    "2xl": "6rem",
 	 },
	  screens: {
	    sm: "640px",
	    md: "768px",
	    lg: "1024px",
	    xl: "1280px",
 	   "2xl": "1440px",
	  },
	},


    extend: {
      // Bridge Tailwind color utilities to your CSS variables (defined in globals.css)
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
	imageover: "hsl(var(--imageover))",
	
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "primary-dark": "hsl(var(--primary-dark))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        "secondary-dark": "hsl(var(--secondary-dark))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        "accent-dark": "hsl(var(--accent-dark))",
        "accent-logo": "hsl(var(--accent-logo))",


        border: "hsl(var(--border))",
      },

      // Fonts (Nunito for body, Roboto for headings)
      fontFamily: {
        sans: ["Nunito", "Roboto", "ui-sans-serif", "system-ui"],
        headline: ["Roboto", "Nunito", "ui-sans-serif", "system-ui"],
      },

      // Helpful visual utilities you used earlier
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.08)",
        subtle: "inset 0 1px 3px rgba(0,0,0,0.04)",
      },
      backgroundImage: {
        "image-shade":
          "linear-gradient(to bottom, rgba(0,0,0,0.30), rgba(0,0,0,0.50))",
      },
    },
  },

  // Keep typography but avoid it stomping on section body text when you use `not-prose`
  plugins: [
    typography,
    animate,
  ],
};

export default config;

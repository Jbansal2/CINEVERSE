// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                muted: "hsl(var(--muted))",
                accent: "hsl(var(--accent))",
                destructive: "hsl(var(--destructive))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                card: "hsl(var(--card))",
                popover: "hsl(var(--popover))",
                sidebar: {
                    background: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    accent: "hsl(var(--sidebar-accent))",
                    // ❌ border removed
                },
            },
            borderRadius: {
                lg: "var(--radius)",
            },
        },
    },
    plugins: [],
};

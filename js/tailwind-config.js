tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#6B8E23",
                "primary-light": "#93d411",
                "background-light": "#f8f6f6",
                "background-dark": "#221610",
            },
            fontFamily: {
                "sans": ["Inter", "sans-serif"],
                "serif": ["Cormorant Garamond", "serif"],
                "display": ["Cormorant Garamond", "serif"]
            },
            borderRadius: {"DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px"},
        },
    },
}
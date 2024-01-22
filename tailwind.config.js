/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		// "./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		// "./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				orbitron: ["var(--font-orbitron)", "sans-serif"],
				sans: ["var(--font-exo2)", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};

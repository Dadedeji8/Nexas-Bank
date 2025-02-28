/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans your components
    ],
    theme: {
        extend: {},
    },
    corePlugins: {
        preflight: false, // Disables Tailwind’s global styles that may conflict with MUI
    },
    plugins: [],
};

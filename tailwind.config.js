/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: ['class'],

    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],

    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },

        extend: {
            colors: {
                'my-yellow': '#DFFFFD',
                'my-blue': '#1982C4',
                'my-blue-h': '#1976af',
            },

            width: {
                '420': '420px',
                '465': '465px',
            },

            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            display: ['Omnes', 'sans-serif'],
        },
        colors: {
            'neutral-light': {
                100: 'rgba(32, 33, 37, 0.12)',
                200: 'rgba(32, 33, 37, 0.40)',
                300: 'rgba(32, 33, 37, 0.64)',
            },
            'neutral-dark': {
                100: 'rgba(255, 255, 255, 0.12)',
                200: 'rgba(255, 255, 255, 0.40)',
                300: 'rgba(255, 255, 255, 0.64)',
            },
            'primary': {
                100: 'rgba(0, 157, 224, 0.10)',
                300: '#009DE0',
            },
            'black': '#202125',
            'white': '#FFFFFF',
            'error': '#F93A24',
            'focus': '0F2594',
        },
        extend: {},
    },
    plugins: [],
};

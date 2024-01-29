import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
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
                'focus': '#0F2594',
            },
            typography: {
                b1: 'text-xl',
                b2: 'text-lg',
                b3: 'text-base',
                b4: 'text-sm',
                h1: 'text-5xl',
            },
            fontSize: {
                '2xl': '1.75rem',
            },
        },
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            const names = ['typography'];
            names.map((name) => {
                if (name == '' || name == undefined) return;
                const styles = theme(name);
                const components = Object.entries(styles).map(
                    ([key, value]) => {
                        const className = '.' + name + '-' + key;
                        const applyClasses = '@apply ' + value;
                        return {
                            [className]: {
                                [applyClasses]: {},
                            },
                        };
                    }
                );
                addComponents(components);
            });
        }),
    ],
};

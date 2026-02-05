/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.ts",
        "./resources/**/*.tsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                'primary-red': '#E3000F',
                'primary-black': '#000000',
                'primary-white': '#FFFFFF',
                'off-white': '#F8F8F8',
                'light-gray': '#E5E5E5',
                'medium-gray': '#848484',
                'dark-gray': '#575656',
                        darkbluegray: '#323751',
                        darkbluegraylight: '#323751c2',
                        coral: '#e76b53',
            },
            fontFamily: {
                // 'inter': ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
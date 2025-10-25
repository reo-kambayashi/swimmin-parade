/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#F7FAFF',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
        },
        accent: '#38BDF8',
        text: '#0F172A',
        border: '#E5E7EB',
        brand: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
          sky: '#38BDF8',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        pop: '0 10px 20px rgba(37, 99, 235, 0.15)',
      },
      fontFamily: {
        heading: ['Poppins', 'Outfit', 'system-ui', 'Helvetica', 'sans-serif'],
        body: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

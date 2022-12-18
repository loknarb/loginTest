module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,ts,tsx}',
    './components/**/*.{html,ts,tsx}',
    './app/**/*.{html,ts,tsx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#99CED3',
          secondary: '#5F6366',
          accent: '#EDB5BF',
          neutral: '#BBD0FF',
          'base-100': '#FFFFFF',
          'base-200': '#1c1d1f',
          'base-content': '#e5e1fc',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  theme: {
    screens: {
      phone: '480px',
      tablet: '768px',
      desktop: '1280px',
      breakDesktopXS: '1148px',
      breakDesktopXXS: '992px',
    },
    letterSpacing: {
      tight: '-.015em',
      wide: '0.025em',
      wider: '0.07em',
    },

    extend: {
      height: {
        'half-screen': '50vh',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
};

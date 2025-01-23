// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'mobile': '375px',
      'mobile-l': '425px',
      'tablet': '768px',
      'desktop': '1024px',
      'desktop-l': '1440px',
    },
    extend: {
      width: {
        'mobile': '375px',
      },
      height: {
        'mobile': '812px',
        'card': '140px',
      },
      borderRadius: {
        'card': '15px',
        'layout': '20px',
      },
      boxShadow: {
        'card': '0px 4px 10px 0px rgba(0,0,0,0.25)',
      },
      fontSize: {
        body: ['16px', { fontWeight: '400', lineHeight: '24px' }],
        'body-bold': ['16px', { fontWeight: '500', lineHeight: '20px' }],
        caption1: ['14px', { fontWeight: '400', lineHeight: '20px' }],
        'caption1-bold': ['14px', { fontWeight: '500', lineHeight: '20px' }],
        caption2: ['12px', { fontWeight: '400', lineHeight: '18px' }],
        'caption2-bold': ['12px', { fontWeight: '600', lineHeight: '18px' }],
        caption3: ['11px', { fontWeight: '400', lineHeight: '14px' }],
        head: ['24px', { fontWeight: '500', lineHeight: '33px' }],
        'head-bold': ['24px', { fontWeight: '700', lineHeight: '33px' }],
        number: ['18px', { fontWeight: '400', lineHeight: '20px' }],
        'number-bold': ['18px', { fontWeight: '500', lineHeight: '20px' }],
        'number-extra-bold': ['18px', { fontWeight: '600', lineHeight: '20px' }],
        subTitle: ['18px', { fontWeight: '500', lineHeight: '26px' }],
        'subTitle-bold': ['18px', { fontWeight: '600', lineHeight: '26px' }],
        title: ['21px', { fontWeight: '500', lineHeight: '30px' }],
        'title-bold': ['21px', { fontWeight: '600', lineHeight: '30px' }],
        'title-extra-bold': ['21px', { fontWeight: '700', lineHeight: '30px' }],
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
      },
      zIndex: {
        'header': '100',
        'modal': '200',
        'overlay': '150',
        'dropdown': '50',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        'normal': '200ms',
        'slow': '300ms',
        'slower': '500ms',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        // Primary Colors
        primary: {
          900: '#070A17',
          800: '#141A3E',
          700: '#202A64',
          sub2: '#2C3A8B',
          500: '#394BB2',
          main: '#5667C9',
          300: '#7C89D5',
          sub1: '#A2ACE1',
          100: '#C9CEEE',
          50: '#F0F1FA',
        },
        // Secondary Colors
        secondary: {
          400: '#99D7FF',
          300: '#D0EEF9',
        },
        // Background Color
        background: {
          default: '#FCFCFC',
          alt: '#F7F7F8',
        },
        // Status Colors
        status: {
          info: '#4C8AF7',
          success: '#6AD08D',
          caution: '#F7C859',
          warning: '#EB674C',
        },
        // Gray Scale
        gray: {
          900: '#101014',
          800: '#272830',
          700: '#3E3F4C',
          600: '#555768',
          500: '#6C6E84',
          400: '#86889C',
          300: '#A2A4B3',
          200: '#BFC0CB',
          100: '#DBDBE1',
          50: '#F7F7F8',
        },
      },
    },
  },
  plugins: [],
}
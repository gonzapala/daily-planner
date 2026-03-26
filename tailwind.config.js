/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        bg:      '#0c0c0e',
        s1:      '#131316',
        s2:      '#1a1a1f',
        s3:      '#222228',
        border:  '#2c2c36',
        bord2:   '#3a3a48',
        lime:    '#7a9e50',
        avocado: '#7a9e50',
        teal:    '#4cf0b8',
        rose:    '#f25c7a',
        amber:   '#f0b840',
        blue:    '#60b0f8',
        ink:     '#e2e2ea',
        muted:   '#72728a',
        muted2:  '#50505f',
      },
    },
  },
  plugins: [],
};

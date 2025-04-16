module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        textStroke: {
          'black': '1px black',
          'white': '2px white',
        },
      },
    },
    plugins: [
      function({ addUtilities, theme }) {
        const newUtilities = {
          '.text-stroke': {
            '-webkit-text-stroke': '1px black',
            'text-stroke': '1px black',
          },
          '.text-stroke-2': {
            '-webkit-text-stroke': '2px black',
            'text-stroke': '2px black',
          },
          // Color variations
          '.text-stroke-white': {
            '-webkit-text-stroke': '1px white',
            'text-stroke': '1px white',
          },
        }
        addUtilities(newUtilities)
      }
    ],
  }

  /*
'royal-blue': '#002366',
          'gold': '#FFD700',
          'platinum-1': '#E0E0E0',
  */
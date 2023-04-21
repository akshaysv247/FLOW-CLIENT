/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "URL('./src/Assets/backgrounds/signops.jpg')",
        hero1: "URL('./src/Assets/backgrounds/mainBg.jpg')",
        hero2: "URL('./src/Assets/backgrounds/guitar4.jpg')",
        hero3: "URL('./src/Assets/backgrounds/option cover.jpg')",
        hero4: "URL('./src/Assets/backgrounds/artistsignup.jpg')",
      },
      width: {
        150: '150px',
        190: '190px',
        225: '225px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
        375: '375px',
        460: '460px',
        656: '656px',
        880: '880px',
        508: '508px',
      },
      height: {
        80: '80px',
        150: '150px',
        225: '225px',
        300: '300px',
        340: '340px',
        370: '370px',
        420: '420px',
        510: '510px',
        550: '550px',
        600: '600px',
        650: '650px',
        685: '685px',
        720: '720px',
        800: '800px',
        '90vh': '90vh',
      },
      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    // require('tailwind-scrollbar-plugin')
  ],
};

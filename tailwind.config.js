/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      fontFamily : {
        plywrite: ["Playwrite GB S", 'serif'],
        bebas : ["Bebas Neue", 'sans-serif']
      },
      screens: {
        's' : '400px'
      }
    } 
    },
  

  plugins: [],
}


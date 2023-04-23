module.exports = {
  important:true,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //For Custom css structure
        primary: "#0c4a6e",
        secondary: "#134e4a",
        idealColor:'#4d2786',
        success:"#28a745",
      },
      fontFamily: {
      'poppin': ['Poppins', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      'work-sans': ['Work Sans', 'sans-serif']
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out  ',
        fadeInDown:'fadeInDown 0.6s ease-in-out',
        dropdown:'dropdown 0.8s ease-in-out',
        slow:'slow 1s ease-in-out',
        sidebarDraw:'sidebarDraw 0.8s ease-in-out',
        modal:'modal 0.6s ease',
        pulse2: 'pulsing 1.5s infinite linear',
        spin: 'spin 3s infinite linear',
        fade:'fade 1s ease'
      },
      keyframes: {
        fade:{
          '0%':{
            opacity: '0',
             '-webkit-transform': 'scale(0.5)',
             transform: 'scale(0.5)'
        },
        '100%': {
          opacity: '1',
          '-webkit-transform': 'scale(1)',
           transform:' scale(1)'
      }
        },
      
     
        wiggle: {
          '0%': { width:'0rem' },
          '10%': { width:'0.3rem' },
          '20%': { width:'0.6rem' },
          '30%': { width:'0.9rem' },
          '40%': { width: '1.2rem' },
          '50%': { width: '1.5rem' },
          '60%': { width: '1.8rem' },
          '70%': { width: '2.1rem' },
          '80%': { width: '2.4rem' },
          '90%': { width: '2.7rem' },
          '100%':{width:'3rem'}
        },
        fadeInDown :{
          'from':{
            opacity: '0',
             '-webkit-transform': 'translate3d(0, -100%, 0)',
             transform: 'translate3d(0, -100%, 0)'
          },
         'to': {
              opacity: '1',
              '-webkit-transform': 'none',
              transform: 'none'
            }
        },
        
        dropdown :{
          'from':{
            opacity: '0',
             '-webkit-transform': 'translate3d(0, -5%, 0)',
             transform: 'translate3d(0, -5%, 0)'
          },
         'to': {
              opacity: '1',
              '-webkit-transform': 'none',
              transform: 'none'
            }
        },
        slow :{
          'from':{
            opacity: '0',
          },
         'to': {
              opacity: '1',
            }
        },
        sidebarDraw :{
          'from':{
            opacity: '0',
            transform:'translate3d(-180px)'
          },
         'to': {
              opacity: '1',
            }
        },
        modal :{
          'from':{
            opacity: '0',
             '-webkit-transform': 'translate3d(-100, -100%, -100%)',
             transform: 'translate3d(-100%, -100%, -100%)'
          },
         'to': {
              opacity: '1',
              '-webkit-transform': 'none',
              transform: 'none'
            }
        },
        pulsing :{
          '0%':{
                '-webkit-transform':'scale(1)',
              '-moz-transform':'scale(1)',
              '-ms-transform':'scale(1)',
              '-o-transform':'scale(1)',
              transform:'scale(1)',
          },
          '100%':{
              "-webkit-transform":"scale(1.1)",
              "-moz-transform":"scale(1.1)",
              "-ms-transform":"scale(1.1)",
              "-o-transform":"scale(1.1)",
              transform:'scale(1.1)',
              opacity:"0"
          }
      }
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.28) 0px 1px 4px',
        'custom-t': 'rgba(0, 0, 0, 0.28) 0 -5px 5px -5px',
        'custom-b': 'rgba(0, 0, 0, 0.28) 0 5px 5px -5px',
        'custom-l': 'rgba(0, 0, 0, 0.28) -5px 0 5px -5px',
        'custom-r': 'rgba(0, 0, 0, 0.28) 5px 0 5px -5px',
      },
    
  },
  plugins: [],
}
}

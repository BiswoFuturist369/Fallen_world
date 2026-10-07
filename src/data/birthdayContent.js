/**
 * CENTRAL CONFIGURATION FOR THE BIRTHDAY EXPERIENCE
 * 
 * Edit this file to customize:
 * - Title of the experience/book
 * - Intro animation words (left, right, bottom)
 * - Audio file path
 * - Spreads (Media pages on Left, Poetry pages on Right)
 * - Extra celestial planets in space
 */

export const birthdayContent = {
  // Main title displayed on book cover and main header
  title: "my eyes met heaven and soul met goddess...",

  // Animated intro text sequence
  intro: {
    left: "Happy",
    right: "Birthday",
    bottom: "Oh Darling Divine"
  },

  // Audio track (default in public/assets/music.mp3)
  music: "/assets/music.mp3",

  // Celestial objects scattered across the 3D space universe
  celestialBodies: [
    {
      id: "portal",
      name: "Gateway of Goddess",
      subtitle: "The Gateway to Her Book",
      color: "#a855f7",
      position: [0, 0, 0],
      radius: 2.2,
      quote: "Touch to open the magical book written for her.",
      isGateway: true
    },
    {
      id: "soleil",
      name: "Soleil Divine",
      subtitle: "Golden Celestial Star",
      color: "#fbbf24",
      position: [16, 9, -12],
      radius: 1.8,
      quote: "A sun created to match the radiance of your smile.",
      isGateway: false
    },
    {
      id: "saturnia",
      name: "Saturnia Violet",
      subtitle: "Ringed Queen of Cosmos",
      color: "#818cf8",
      position: [-16, 7, -10],
      radius: 2.0,
      hasRing: true,
      ringColor: "#c084fc",
      quote: "Rings of starlight encircling your gentle heart.",
      isGateway: false
    },
    {
      id: "selene",
      name: "Moon Selene",
      subtitle: "Crystal Ice Moon",
      color: "#38bdf8",
      position: [-14, -8, -6],
      radius: 1.5,
      quote: "Soft moonlight illuminating your every pathway.",
      isGateway: false
    },
    {
      id: "rosalia",
      name: "Rosalia Nebula",
      subtitle: "Rose Quartz Orb",
      color: "#f472b6",
      position: [14, -9, -10],
      radius: 1.7,
      hasRing: true,
      ringColor: "#f472b6",
      quote: "Cosmic roses blooming endlessly in deep space.",
      isGateway: false
    }
  ],

  // 5 Spreads (10 Pages Total)
  spreads: [
    {
      left: {
        page: 1,
        type: "image",
        src: "/assets/page1.jpg",
        caption: "A universe created just for you"
      },
      right: {
        page: 2,
        title: "I. The Genesis of Wonder",
        content: `I have seen stars, Moons , planets , Galaxies, 

      but I've never seen anything as beautiful as you, 
      You have made me fallen for you like the moon falls for the earth.`
      }
    },

    {
      left: {
        page: 3,
        type: "image",
        src: "/assets/page3.jpg",
        caption: "Grace written in the starlight"
      },
      right: {
        page: 4,
        title: "II. The Symphony of Her Presence",
        content: `Where do i start when i open my heart, 
        My every beating breath is calling your name,
        My everything starts and ends with you,
        I'm happy to be yours for life.`
      }
    },

    {
      left: {
        page: 5,
        type: "image",
        src: "/assets/page5.jpg",
        caption: "Celestial roses blooming in space"
      },
      right: {
        page: 6,
        title: "III. Constellations of Love",
        content: `If I could gather every glowing star in the night sky,
it would still fall short of the beauty you bring to my life.

You are my anchor in an infinite cosmos,
my peaceful sanctuary when the winds grow cold,
my sweetest dream forever made real.`
      }
    },

    {
      left: {
        page: 7,
        type: "image",
        src: "/assets/page7.jpg",
        caption: "Boundless journey through eternity"
      },
      right: {
        page: 8,
        title: "IV. Boundless Horizon",
        content: `Time may shift and galaxies may slowly fade,
yet my devotion to you remains undimmed and eternal.

Through every sunrise and every silent night,
my heart belongs to your soul's gentle rhythm.

Together, we are infinite.`
      }
    },

    {
      left: {
        page: 9,
        type: "image",
        src: "/assets/page9.jpg",
        caption: "The heavenly heart of the cosmos"
      },
      right: {
        page: 10,
        title: "V. My Goddess Divine",
        content: `My eyes met heaven, and soul met goddess.

Out of an infinite universe spanning billions of light-years,
my heart was destined to find yours.

Happy Birthday, my darling divine.
May your journey be forever blessed with love and wonder.`,
        footer: "And somehow, in this enormous universe, my eyes still found you."
      }
    }
  ]
};

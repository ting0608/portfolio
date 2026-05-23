import img2wderu from '../assets/images/2wderu.jpg'
import img3e5sun from '../assets/images/3e5sun.jpg'
import img3u04h5 from '../assets/images/3u04h5.jpg'
import imgAlfxrc from '../assets/images/alfxrc.jpg'
import imgAtevl from '../assets/images/atevl.jpg'
import imgCoolCatStroll from '../assets/images/Cool-Cat-Stroll.jpg'
import imgCuteCat from '../assets/images/Cute-Cat.jpg'
import imgP0a19 from '../assets/images/p0a19.jpg'
import imgScaredCat from '../assets/images/Scared-Cat.jpg'

export type CarouselSlide = {
  layout: string
  images: { src: string; alt: string }[]
}

export const carouselSlides: CarouselSlide[] = [
  {
    layout: 'left-anchor',
    images: [
      { src: imgCuteCat, alt: 'Cute cat' },
      { src: imgCoolCatStroll, alt: 'Cool cat stroll' },
      { src: imgScaredCat, alt: 'Scared cat' },
    ],
  },
  {
    layout: 'center-focus',
    images: [
      { src: img3e5sun, alt: 'Portfolio photo' },
      { src: imgAlfxrc, alt: 'Portfolio photo' },
      { src: img2wderu, alt: 'Portfolio photo' },
    ],
  },
  {
    layout: 'bottom-row',
    images: [
      { src: imgP0a19, alt: 'Portfolio photo' },
      { src: img3u04h5, alt: 'Portfolio photo' },
      { src: imgAtevl, alt: 'Portfolio photo' },
    ],
  },
]

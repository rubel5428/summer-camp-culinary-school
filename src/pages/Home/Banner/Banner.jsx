import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import slide1 from '../../../assets/banner/banner1.jpg'
import slide2 from '../../../assets/banner/banner2.jpg'
import slide3 from '../../../assets/banner/banner3.jpg'
import slide4 from '../../../assets/banner/banner4.jpg'
import slide5 from '../../../assets/banner/banner5.jpg'

const Banner = () => {
   const [sliderRef] = useKeenSlider(
      {
         loop: true,
      },
      [
         (slider) => {
            let timeout
            let mouseOver = false
           
            function nextTimeout() {
               clearTimeout(timeout)
               if (mouseOver) return
               timeout = setTimeout(() => {
                  slider.next()
               }, 3000)
            }
        
               
               nextTimeout()
           

            slider.on('animationEnded', nextTimeout)
            slider.on('updated', nextTimeout)
         },
      ]
   )
   return (
      <>
         <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide number-slide1">
               <img src={slide1} alt="" />
            </div>
            <div className="keen-slider__slide number-slide2">
               <img src={slide2} alt="" />
            </div>
            <div className="keen-slider__slide number-slide3">
               <img src={slide3} alt="" />
            </div>
            <div className="keen-slider__slide number-slide4">
               <img src={slide4} alt="" />
            </div>
            <div className="keen-slider__slide number-slide5">
               <img src={slide5} alt="" />
            </div>
            <div className="keen-slider__slide number-slide6">
               <img src={slide3} alt="" />
            </div>
         </div>
      </>
   )
}

export default Banner

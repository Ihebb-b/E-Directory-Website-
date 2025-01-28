import React, { useEffect, useState } from 'react'
import './Slider.css'

function Slider() {

  const [showFirstText, setShowFirstText] = useState(false);

  const backgroundImage = "url('homepages/restaurant/images/main-2.jpg')"; // Ensure correct path to the image


  useEffect(() => {
    const firstTextTimer = setTimeout(() => {
      setShowFirstText(true);
    }, 500); // Delay for the first text

    // Initialize animation manually when the component is mounted
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
      const animationIn = slide.getAttribute('data-animate-in');
      if (animationIn) {
        slide.classList.add('animate__animated', `animate__${animationIn}`);
      }
    });


    return () => {
      clearTimeout(firstTextTimer);

    };
  }, [])

  //data-height-xs="360" data-autoplay="2600" data-animate-in="fadeIn" data-animate-out="fadeOut" data-items="1" data-loop="true"

  return (
    <div id="slider" className="inspiro-slider"  >

      <div className="slide"style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-overlay"></div>
        <div className="container">
          {showFirstText && (
            <h2 className="hero-text animate__animated animate__fadeInUp">
              Mediterranian restaurants<br />
              Where tastiness meets health
            </h2>
          )}

        </div>
      </div>

      {/* <div
        className="slide"
        data-bg-image="homepages/restaurant/images/main-1.jpg"
        data-animate-in="fadeIn"
      >
        <div className="bg-overlay"></div>
        <div className="container">
          <div className="slide-captions">
            <h2 className="text-medium no-margin text-colored animate__animated animate__fadeIn">
              Enjoy
            </h2>
            <h2 className="text-lg no-margin animate__animated animate__fadeIn">
              Wonderful Feelings
            </h2>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Slider
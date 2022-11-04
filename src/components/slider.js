import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../styles/slider.css"

export default function CarouselSlider({ carouselOptions, children }) {

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  }

  const options = {...settings, ...carouselOptions}

  return (
    <div>
      <Slider {...options}>
        { children }
      </Slider>

    </div>
  )
}

import React from "react"
import { useState } from "react"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"

const HeroSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const settings = {
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    beforeChange: (current, next) => {
      setImageIndex(next)
    },
  }

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div className="hero-slide-container">
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={image.description}
            className="hero-slider-image"
          ></GatsbyImage>
          {index === imageIndex ? (
            <div className="hero-slide-overlay highlight"></div>
          ) : (
            <div className="hero-slide-overlay darken"></div>
          )}
        </div>
      ))}
    </Slider>
  )
}

export default HeroSlider

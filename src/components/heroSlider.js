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
    useTransform: false,
    centerPadding: '0px',
  }

  return (
    <Slider {...settings}>
      {images.map((image, index) => {
        const imgWidth =
          (image.gatsbyImageData.width * 90) / image.gatsbyImageData.height
        return (
          <div className="hero-slide-container">
            <div className="slide-flex-container">
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.description}
                style={{ width: `${imgWidth}vh` }}
                className="hero-slide-image"
              ></GatsbyImage>
              {index === imageIndex ? (
                <div className="hero-slide-overlay highlight"></div>
              ) : (
                <div className="hero-slide-overlay darken"></div>
              )}
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default HeroSlider

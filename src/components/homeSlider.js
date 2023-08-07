import React from "react"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const HomeSlider = ({ images }) => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
  }

  return (
    <div className="home-slider-container">
      <Slider className="home-slider" {...settings}>
        {images.map(image => (
          <div className="home-slide-container">
            <GatsbyImage
              image={image.tileImage.gatsbyImageData}
              alt={image.tileImage.description}
              className="home-slide-image"
            ></GatsbyImage>
            <div className="home-slider-text">
              <Link to={`/projects/${image.slug}`}>
                <p>{image.projectName}</p>
                <p>{image.shortExcerpt}</p>
              </Link>
              <div>
                <Link>{image.type}</Link>
                <Link>{image.cityCountry}</Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeSlider

import React from "react"
import { graphql, Link } from "gatsby"
import { marked } from "marked"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"

const About = ({ data }) => {
  const {
    designApproach,
    featuredProjects,
    headline,
    whoWeAre,
    whoWeAreImage,
    philosophy,
  } = data.contentfulAboutLObservatoire

  const firstHighlights = featuredProjects.slice(0, 3)
  const secondHighlights = featuredProjects.slice(3)

  return (
    <Layout>
      <div className="page-header">
        <Link to="/about/#top">About</Link> |{" "}
        <Link to="/about/#who">Who we are</Link> |{" "}
        <Link to="/about/#philosophy">Our philosophy</Link> |{" "}
        <Link to="/about/#approach">Design approach</Link> |{" "}
        <Link to="/about/#awards">Awards</Link> |{" "}
        <Link to="/about/#books">Books</Link>
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="about-page">
        <div
          dangerouslySetInnerHTML={{ __html: marked.parse(headline.headline) }}
          id="top"
          className="about-page-headline"
        ></div>
        <div className="about-featured">
          {firstHighlights.map((item, index) => (
            <Link to={item.slug} className="about-featured-link" key={index}>
              <GatsbyImage
                image={item.heroImage.gatsbyImageData}
                alt={item.heroImage.description}
                className="about-featured-image"
              ></GatsbyImage>
              <p>{item.projectName}</p>
            </Link>
          ))}
        </div>
        <div className="home-container about-section">
          <p className="home-preface-link">Who We Are</p>
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(whoWeAre.whoWeAre),
            }}
            id="who"
            className="home-right about-text"
          ></div>
        </div>
        <div className="about-featured-link sierras">
          <GatsbyImage
            image={whoWeAreImage.image.gatsbyImageData}
            alt={whoWeAreImage.image.description}
            className="about-featured-image"
          ></GatsbyImage>
          <p>{whoWeAreImage.caption}</p>
        </div>

        <div className="home-container about-section">
          <p className="home-preface-link">Our Philosophy</p>
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(philosophy.philosophy),
            }}
            id="philosophy"
            className="home-right about-text"
          ></div>
        </div>
        <div className="about-featured">
          {secondHighlights.map((item, index) => (
            <Link to={item.slug} className="about-featured-link" key={index}>
              <GatsbyImage
                image={item.heroImage.gatsbyImageData}
                alt={item.heroImage.description}
                className="about-featured-image"
              ></GatsbyImage>
              <p>{item.projectName}</p>
            </Link>
          ))}
        </div>
        <div className="home-container about-section">
          <p className="home-preface-link">Our Design Approach</p>
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(designApproach.designApproach),
            }}
            id="approach"
            className="home-right about-text"
          ></div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAboutLObservatoire {
      designApproach {
        designApproach
      }
      featuredProjects {
        heroImage {
          description
          gatsbyImageData
        }
        id
        projectName
        slug
      }
      headline {
        headline
      }
      whoWeAre {
        whoWeAre
      }
      whoWeAreImage {
        image {
          description
          gatsbyImageData
        }
        caption
      }
      philosophy {
        philosophy
      }
    }
    allContentfulAward(limit: 4, sort: { year: DESC }) {
      nodes {
        awardName
        year
        id
        project {
          projectName
        }
      }
    }
    allContentfulBook {
      nodes {
        id
        description {
          description
        }
        publicationYear
        publisher
        purchaseLink
        bookImage {
          id
          gatsbyImageData
          description
        }
      }
    }
  }
`

export default About

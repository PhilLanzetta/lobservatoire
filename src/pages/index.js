import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import HomeSlider from "../components/homeSlider"
import { marked } from "marked"
import { BsArrowRight } from "react-icons/bs"

const IndexPage = ({ location, data }) => {
  const homeImages = data.allContentfulProject.nodes
  const aboutHeadline =
    data.contentfulAboutLObservatoireHeadlineTextNode.headline

  const philosophy =
    data.contentfulAboutLObservatoirePhilosophyTextNode.philosophy
      .split("\n\n")[1]
      .slice(0, 298)

  const teamHeadline = data.contentfulTeamPageTeamHeadlineTextNode.teamHeadline

  const careers = data.allContentfulCareerPosting.nodes

  return (
    <Layout location={location}>
      <HomeSlider images={homeImages}></HomeSlider>
      <div className="home-container">
        <Link to="/about" className="home-preface-link">
          About
        </Link>
        <div className="home-right">
          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(aboutHeadline) }}
            className="home-headline"
          ></div>
          <Link to="/about" className="home-link">
            <BsArrowRight></BsArrowRight> Learn More
          </Link>
        </div>
      </div>
      <div className="home-container">
        <Link to="/about/#philosophy" className="home-preface-link">
          Philosophy
        </Link>
        <div className="home-right">
          <div className="home-headline">
            <p>{philosophy}</p>
          </div>
          <Link to="/about/#philosophy" className="home-link">
            <BsArrowRight></BsArrowRight> Read More
          </Link>
        </div>
      </div>
      <div className="home-container">
        <Link to="/team" className="home-preface-link">
          Team
        </Link>
        <div className="home-right">
          <div className="home-headline">
            <p>{teamHeadline}</p>
          </div>
          <Link to="/team" className="home-link">
            <BsArrowRight></BsArrowRight> Learn More
          </Link>
        </div>
      </div>
      <div className="home-container" id="careers">
        <p className="home-preface-link">Careers</p>
        <div className="team-right">
          <div className="careers-container">
            {careers.map(career => (
              <div key={career.id}>
                <hr className="faded"></hr>
                <div className="career-posting">
                  <p>{career.jobTitle}</p>
                  <Link
                    to={`/careers/${career.slug}`}
                    className="home-link career-apply"
                  >
                    <BsArrowRight></BsArrowRight> Apply Here
                  </Link>
                </div>
              </div>
            ))}
            <hr className="faded"></hr>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProject(filter: { featured: { eq: true } }) {
      nodes {
        geographicRegion
        id
        projectName
        slug
        heroImage {
          gatsbyImageData
          description
        }
        typology
        shortExcerpt
        city
        country
      }
    }
    contentfulAboutLObservatoireHeadlineTextNode {
      headline
    }
    contentfulAboutLObservatoirePhilosophyTextNode {
      philosophy
    }
    contentfulTeamPageTeamHeadlineTextNode {
      teamHeadline
    }
    allContentfulCareerPosting(sort: { postingDate: DESC }) {
      nodes {
        id
        jobTitle
        slug
      }
    }
  }
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

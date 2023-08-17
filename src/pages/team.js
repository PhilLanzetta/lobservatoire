import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { marked } from "marked"
import { Link } from "gatsby"
import { BsArrowRight } from "react-icons/bs"

const Team = ({ data }) => {
  const teamInfo = data.contentfulTeamPage
  const herve = data.herve
  const bioAbbridged = herve.biography.biography.split("BIBLIOGRAPHY")[0]
  console.log(bioAbbridged)
  return (
    <Layout>
      <GatsbyImage
        image={teamInfo.teamPhoto.gatsbyImageData}
        alt={teamInfo.teamPhoto.description}
      ></GatsbyImage>
      <div className="home-container">
        <Link to="/team/herve-descottes" className="home-preface-link">
          Hervé Descottes
        </Link>
        <div className="team-right">
          <Link to={herve.slug}>
            <GatsbyImage
              image={teamInfo.hervePhoto.gatsbyImageData}
              alt={teamInfo.hervePhoto.description}
            ></GatsbyImage>
          </Link>
          <div className="herve-abbridged">
            <div
              dangerouslySetInnerHTML={{ __html: marked.parse(bioAbbridged) }}
            ></div>
            <Link to={herve.slug} className="home-link">
              <BsArrowRight></BsArrowRight> Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="team-members-container">
        <p className="home-preface-link">Team Members</p>
        <div>
          <p className="home-preface-link">New York</p>
        </div>
        <div>
          <p className="home-preface-link">Paris</p>
        </div>
        <div>
          <p className="home-preface-link">Seoul</p>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulTeamPage {
      careerPreface {
        careerPreface
      }
      hervePhoto {
        gatsbyImageData
        description
      }
      teamPhoto {
        gatsbyImageData
        description
      }
    }
    herve: contentfulTeamMember(slug: { eq: "herve-descottes" }) {
      slug
      biography {
        biography
      }
    }
  }
`

export default Team

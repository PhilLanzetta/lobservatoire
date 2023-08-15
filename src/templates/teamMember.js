import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"

const TeamMember = ({ data }) => {
  const { name, title, headShot, project, biography } =
    data.contentfulTeamMember
  return (
    <Layout>
      <div className="page-header">
        <Link to="/team">Team</Link> |{" "}
        <Link to="/team#teamMembers">Team Members</Link> | {name}
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="team-member-container">
        <div>
          {headShot && (
            <GatsbyImage
              image={headShot.gatsbyImageData}
              alt={headShot.description}
            ></GatsbyImage>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleTeamMember($slug: String) {
    contentfulTeamMember(slug: { eq: $slug }) {
      headShot {
        gatsbyImageData
        description
      }
      project {
        projectName
        tileImage {
          gatsbyImageData(width: 300)
          description
        }
        typology
        cityCountry
      }
      biography {
        biography
      }
      title
      name
    }
  }
`

export default TeamMember

import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"

const Projects = ({ data }) => {
  const allProjects = data.allContentfulProjectPage.nodes
  const [projects, setProjects] = useState(allProjects)
  return (
    <Layout>
      <div className="project-header">
        <Link to="/projects">Projects</Link>
      </div>
      <div className="projects-grid-container">
        {projects.map(project => (
          <div key={project.id} className="project-tile">
            <Link to={`/projects/${project.slug}`}>
              <GatsbyImage
                image={project.tileImage.gatsbyImageData}
                alt={project.tileImage.description}
              ></GatsbyImage>
              <p className="tile-title">{project.projectName}</p>
            </Link>
            <div className="tile-tag-container">
              <button className="tile-tag-btn">{project.architect}</button>
              <button className="tile-tag-btn">{project.type}</button>
              <button className="tile-tag-btn">
                {project.geographicRegion}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProjectPage {
      nodes {
        architect
        client
        furtherNetworkLinks
        geographicRegion
        id
        projectName
        slug
        type
        year
        featured
        status
        tileImage {
          description
          gatsbyImageData
        }
      }
    }
  }
`

export default Projects

import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"

const Projects = ({ data }) => {
  const allProjects = data.allContentfulProject.nodes
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
                className="project-tile-image"
              ></GatsbyImage>
              <p className="tile-title">{project.projectName}</p>
            </Link>
            <div className="tile-tag-container">
              {project.typology?.map((type, index) => (
                <button className="tile-tag-btn" key={index}>
                  {type}
                </button>
              ))}
              <button className="tile-tag-btn">
                {project.cityCountry.toLowerCase()}
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
    allContentfulProject {
      nodes {
        architect
        client
        furtherNetworkLinks
        geographicRegion
        cityCountry
        id
        projectName
        slug
        typology
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

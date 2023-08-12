import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiLayoutGridFill } from "react-icons/ri"
import { PiListBold } from "react-icons/pi"
import { BsCircleFill, BsFilterLeft } from "react-icons/bs"

const Projects = ({ data }) => {
  const allProjects = data.allContentfulProject.nodes
  const [projects, setProjects] = useState(allProjects)
  const [view, setView] = useState("grid")
  return (
    <Layout>
      <div className="project-header">
        <Link to="/projects">Projects</Link>
      </div>
      <hr className="faded-line project-options-top"></hr>
      <div className="project-options-bar">
        <button>
          <BsFilterLeft className="filter-icon"></BsFilterLeft>
          <span>Filter</span>
        </button>{" "}
        <div>
          <button>
            <RiLayoutGridFill></RiLayoutGridFill>
            <span>Grid</span>
          </button>
          <button>
            <PiListBold></PiListBold>
            <span>List</span>
          </button>
          <button>
            <BsCircleFill></BsCircleFill>
            <span>Map</span>
          </button>
        </div>
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
                {project.cityCountry?.toLowerCase()}
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
        exactLocation {
          lat
          lon
        }
      }
    }
  }
`

export default Projects

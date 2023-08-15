import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const ProjectGrid = ({ projects, team }) => {
  return (
    <div
      className={`projects-grid-container ${
        team ? "" : "projects-page-padding"
      }`}
    >
      {projects ? (
        projects.map(project => (
          <div key={project.id} className="project-tile">
            <Link to={`/projects/${project.slug}`}>
              <GatsbyImage
                image={project.tileImage?.gatsbyImageData}
                alt={project.tileImage?.description}
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
                {project.city}, {project.country}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Sorry, no projects match</p>
        </div>
      )}
    </div>
  )
}

export default ProjectGrid

import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ProjectTile = ({ project, setCity, handleTypeFilter }) => {
  return (
    <div key={project.id} className="project-tile">
      <Link to={`/projects/${project.slug}`}>
        <GatsbyImage
          image={project.heroImages[0]?.gatsbyImageData}
          alt={project.heroImages[0]?.description}
          className="project-tile-image"
        ></GatsbyImage>
        <p className="tile-title">{project.projectName}</p>
      </Link>
      <div className="tile-tag-container">
        {project.typology?.map((type, index) => (
          <button
            className="tile-tag-btn"
            key={index}
            onClick={() => handleTypeFilter(type)}
          >
            {type}
          </button>
        ))}
        <button
          className="tile-tag-btn"
          onClick={() => {
            setCity(project.city)
          }}
        >
          {project.city}, {project.country}
        </button>
      </div>
    </div>
  )
}

export default ProjectTile

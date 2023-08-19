import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ProjectTile = ({
  project,
  setCity,
  handleTypeFilter,
  setCountry,
  setRegion,
}) => {
  const hasLocation = project.city || project.country
  return (
    <div key={project.id} className="project-tile">
      <Link to={`/projects/${project.slug}`}>
        <GatsbyImage
          image={project.heroImage?.gatsbyImageData}
          alt={project.heroImage?.description}
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
        {hasLocation ? (
          <button
            className="tile-tag-btn"
            onClick={() => {
              setCity(project.city)
              setCountry(project.country)
            }}
          >
            {project.city}, {project.country}
          </button>
        ) : (
          <button
            className="tile-tag-btn"
            onClick={() => setRegion(project.geographicRegion)}
          >
            {project.geographicRegion}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectTile

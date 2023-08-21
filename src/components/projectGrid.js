import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import ProjectTile from "./projectTile"

const ProjectGrid = ({
  projects,
  team,
  setCity,
  setCountry,
  handleTypeFilter,
  setRegion,
}) => {
  return (
    <div
      className={`projects-grid-container ${
        team ? "" : "projects-page-padding"
      }`}
    >
      {projects ? (
        projects.map(project => (
          <ProjectTile
            key={project.id}
            project={project}
            setCity={setCity}
            setCountry={setCountry}
            handleTypeFilter={handleTypeFilter}
            setRegion={setRegion}
          ></ProjectTile>
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

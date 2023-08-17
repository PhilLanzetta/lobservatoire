import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import ProjectTile from "./projectTile"

const ProjectGrid = ({ projects, team, setCity, handleTypeFilter }) => {
  return (
    <div
      className={`projects-grid-container ${
        team ? "" : "projects-page-padding"
      }`}
    >
      {projects ? (
        projects.map(project => (
          <ProjectTile
            project={project}
            setCity={setCity}
            handleTypeFilter={handleTypeFilter}
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

import { Link } from "gatsby"
import React from "react"

const ProjectList = ({
  projects,
  team,
  handleTypeFilter,
  setRegion,
  setYear,
  setProjects,
}) => {
  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <p className="list-button">Project</p>
        <p className="list-button">Typology</p>
        <p className="list-button">Location</p>
        <p className="list-button">Year</p>
      </div>
      {projects.map(project => (
        <div key={project.id} className="project-list-row">
          <Link to={`projects/${project.slug}`} className="list-button">
            {project.projectName}
          </Link>
          <div className="list-typology">
            {project.typology.map((type, index) => (
              <button
                onClick={() => handleTypeFilter(type)}
                key={index}
                className="list-button"
              >
                {type}
              </button>
            ))}
          </div>
          <button
            className="list-button"
            onClick={() => setRegion(project.geographicRegion)}
          >
            {project.geographicRegion}
          </button>
          <button className="list-button" onClick={() => setYear(project.year)}>
            {project.year}
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProjectList

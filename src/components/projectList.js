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
  const orderByName = () => {
    const reOrdered = projects.sort((a, b) =>
      a.projectName > b.projectName ? 1 : -1
    )
    setProjects(reOrdered)
  }
  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <button className="list-button" onClick={() => orderByName()}>
          Project
        </button>
        <button className="list-button">Typology</button>
        <button className="list-button">Location</button>
        <button className="list-button">Year</button>
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

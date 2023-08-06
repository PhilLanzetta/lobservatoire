import { Link } from "gatsby"
import React from "react"
import { Fade } from "react-awesome-reveal"

const ProjectTable = ({
  architect,
  size,
  status,
  dateCompleted,
  awards,
  team,
  client,
}) => {
  return (
    <div className="project-table-container">
      <div className="project-table-max-width">
        <Fade triggerOnce={true}>
          {architect && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Architect</p>
                <Link to="/projects" className="project-table-button">
                  {architect}
                </Link>
              </div>
            </div>
          )}
          {size && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Size</p>
                <p>
                  {size.toLocaleString()} ft<sup>2</sup> /{" "}
                  {Math.round(size * 0.0929).toLocaleString()} m<sup>2</sup>
                </p>
              </div>
            </div>
          )}
          {status && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Status</p>
                <p>{status}</p>
              </div>
            </div>
          )}
          {dateCompleted && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Date Completed</p>
                <p>{new Date(dateCompleted).getFullYear()}</p>
              </div>
            </div>
          )}
          {awards && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Awards</p>
                <div className="project-table-awards">
                  {awards.map(award =>
                    award.url ? (
                      <a
                        key={award.id}
                        href={award.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {award.linkText}
                      </a>
                    ) : (
                      <Link key={award.id} to={award.slug}>
                        {award.linkText}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
          {client && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Client</p>
                <Link to="/projects" className="project-table-button">
                  {client}
                </Link>
              </div>
            </div>
          )}
          {team && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Team</p>
                <div className="project-table-team">
                  {team.map(member => (
                    <Link
                      key={member.id}
                      to={`/team/${member.slug}`}
                      className="project-table-button"
                    >
                      {member.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          <hr className="faded-line"></hr>
        </Fade>
      </div>
    </div>
  )
}

export default ProjectTable

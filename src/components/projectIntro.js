import React from "react"
import { marked } from "marked"

const ProjectIntro = ({ headline, title, body, city, year }) => {
  return (
    <section className="project-intro-container">
      <div className="project-intro-max-width">
        <article className="project-intro-top">
          <div className="title-city">
            <h1>{title}</h1>
            <p>{city}</p>
          </div>
          <p>{year}</p>
        </article>
        <article>
          {headline && (
            <article
              dangerouslySetInnerHTML={{ __html: marked.parse(headline) }}
              className="project-intro-headline"
            ></article>
          )}
          {body && (
            <article
              dangerouslySetInnerHTML={{ __html: marked.parse(body) }}
            ></article>
          )}
        </article>
      </div>
    </section>
  )
}

export default ProjectIntro

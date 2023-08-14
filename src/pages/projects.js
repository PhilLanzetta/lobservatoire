import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiLayoutGridFill } from "react-icons/ri"
import { PiListBold } from "react-icons/pi"
import { BsCircleFill, BsFilterLeft, BsArrowRight } from "react-icons/bs"
import { GrFormClose } from "react-icons/gr"
import { AiOutlineLine } from "react-icons/ai"

const Projects = ({ data }) => {
  const allProjects = data.allContentfulProject.nodes
  const thisYear = new Date().getFullYear()
  const [filterOpen, setFilterOpen] = useState(false)
  const [projects, setProjects] = useState(allProjects)
  const [view, setView] = useState("grid")
  const [recent, setRecent] = useState(false)
  const [featuredFilter, setFeaturedFilter] = useState(false)
  const [progressFilter, setProgressFilter] = useState(false)
  const [typologyFilter, setTypologyFilter] = useState([])
  const [regionFilter, setRegionFilter] = useState([])

  const isDisabled =
    !recent &&
    !featuredFilter &&
    !progressFilter &&
    !typologyFilter.length &&
    !regionFilter.length

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const filterSelectedStatus = array => {
    if (progressFilter) {
      return [
        ...array,
        allProjects.filter(item => item.status.includes("In Progress")),
      ]
    } else return array
  }

  const filterRecentlyCompleted = array => {
    if (recent) {
      return [
        ...array,
        allProjects.filter(
          item => item.status.includes("Completed") && thisYear - item.year <= 2
        ),
      ]
    } else return array
  }

  const filterByFeatured = array => {
    if (featuredFilter) {
      return [...array, array.filter(item => item.featured)]
    } else return array
  }

  const filterByType = array => {
    return [
      ...array,
      typologyFilter
        .map(term => array.filter(item => item.typology.includes(term)))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const filterByRegion = array => {
    return [
      ...array,
      regionFilter
        .map(term => array.filter(item => item.geographicRegion === term))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const handleTypeFilter = type => {
    if (typologyFilter.includes(type)) {
      setTypologyFilter(typologyFilter.filter(item => item !== type))
    } else {
      setTypologyFilter([...typologyFilter, type])
    }
  }

  const handleLocaleFilter = locale => {
    if (regionFilter.includes(locale)) {
      setRegionFilter(regionFilter.filter(item => item !== locale))
    } else {
      setRegionFilter([...regionFilter, locale])
    }
  }

  const handleFilter = () => {
    let result = allProjects
    if (featuredFilter || recent || progressFilter) {
      result = filterSelectedStatus(result)
      result = filterRecentlyCompleted(result)
      result = filterByFeatured(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (typologyFilter.length) {
      result = filterByType(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (regionFilter.length) {
      result = filterByRegion(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    setProjects(result)
    setFilterOpen(false)
  }

  const handleClearAll = () => {
    setFeaturedFilter(false)
    setProgressFilter(false)
    setRecent(false)
    setTypologyFilter([])
    setRegionFilter([])
    setProjects(allProjects)
  }

  const typologies = allProjects
    .map(project => project.typology)
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique)
    .sort()

  const locations = allProjects
    .map(project => project.geographicRegion)
    .filter(onlyUnique)
    .sort()

  useEffect(() => {
    if (
      !recent &&
      !featuredFilter &&
      !progressFilter &&
      !typologyFilter.length &&
      !regionFilter.length
    ) {
      setProjects(allProjects)
    } else return
  }, [recent, featuredFilter, typologyFilter, regionFilter, progressFilter])

  return (
    <Layout>
      <div className="project-header">
        <Link to="/projects">Projects</Link>
      </div>
      <hr className="faded-line project-options-top"></hr>
      <div className="project-options-bar">
        {filterOpen ? (
          <button
            className="project-options-button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <GrFormClose className="filter-icon"></GrFormClose>
            Filter
          </button>
        ) : (
          <button
            className="project-options-button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <BsFilterLeft className="filter-icon"></BsFilterLeft>
            Filter
          </button>
        )}
        <div className={`filter-menu ${filterOpen ? "" : "hide-filter"}`}>
          <div className="filter-column">
            <button
              className="project-options-button"
              onClick={() => setFeaturedFilter(!featuredFilter)}
            >
              <div
                className={`check-box ${featuredFilter ? "checked" : ""}`}
              ></div>{" "}
              Featured Projects
            </button>
            <button
              className="project-options-button"
              onClick={() => setRecent(!recent)}
            >
              <div className={`check-box ${recent ? "checked" : ""}`}></div>{" "}
              Recently Completed
            </button>
            <button
              className="project-options-button"
              onClick={() => setProgressFilter(!progressFilter)}
            >
              <div
                className={`check-box ${progressFilter ? "checked" : ""}`}
              ></div>{" "}
              In Progress
            </button>
          </div>
          <div className="filter-column">
            <p className="upper">Typology</p>
            {typologies.map((type, index) => (
              <button
                key={index}
                className="project-options-button"
                onClick={() => handleTypeFilter(type)}
              >
                <div
                  className={`check-box ${
                    typologyFilter.includes(type) ? "checked" : ""
                  }`}
                ></div>{" "}
                {type}
              </button>
            ))}
          </div>
          <div className="filter-column">
            <p className="upper">Location</p>
            {locations.map((locale, index) => (
              <button
                key={index}
                className="project-options-button"
                onClick={() => handleLocaleFilter(locale)}
              >
                <div
                  className={`check-box ${
                    regionFilter.includes(locale) ? "checked" : ""
                  }`}
                ></div>{" "}
                {locale}
              </button>
            ))}
          </div>
          <div className="filter-column network-filter-column">
            <div>
              <p className="upper">Network</p>
              <Link to="#" className="network-see-all">
                See All <BsArrowRight></BsArrowRight>
              </Link>
            </div>
            <div className="filter-actions-container">
              <button
                disabled={isDisabled}
                className="filter-apply"
                onClick={() => handleFilter()}
              >
                Apply
              </button>
              <button
                className="clear-all-button"
                onClick={() => handleClearAll()}
                disabled={isDisabled}
              >
                <AiOutlineLine></AiOutlineLine> Clear all
              </button>
            </div>
          </div>
        </div>
        <div className="project-view-options">
          <button
            className={`project-options-button ${
              view === "grid" ? "" : "faded"
            }`}
            onClick={() => setView("grid")}
          >
            <RiLayoutGridFill></RiLayoutGridFill>
            Grid
          </button>
          <button
            className={`project-options-button ${
              view === "list" ? "" : "faded"
            }`}
            onClick={() => setView("list")}
          >
            <PiListBold></PiListBold>
            List
          </button>
          <button
            className={`project-options-button ${
              view === "map" ? "" : "faded"
            }`}
            onClick={() => setView("map")}
          >
            <BsCircleFill></BsCircleFill>
            Map
          </button>
        </div>
      </div>
      {!isDisabled && (
        <div className="current-filter-container">
          {featuredFilter && (
            <button
              className="current-filter-button"
              onClick={() => setFilterOpen(true)}
            >
              <GrFormClose></GrFormClose>Featured Projects
            </button>
          )}
          {recent && (
            <button
              className="current-filter-button"
              onClick={() => setFilterOpen(true)}
            >
              <GrFormClose></GrFormClose>Recently Completed
            </button>
          )}
          {progressFilter && (
            <button
              className="current-filter-button"
              onClick={() => setFilterOpen(true)}
            >
              <GrFormClose></GrFormClose>In Progress
            </button>
          )}
          {typologyFilter.length &&
            typologyFilter.map((item, index) => (
              <button
                key={index}
                className="current-filter-button"
                onClick={() => setFilterOpen(true)}
              >
                <GrFormClose></GrFormClose>
                {item}
              </button>
            ))}
          {regionFilter.length &&
            regionFilter.map((item, index) => (
              <button
                key={index}
                className="current-filter-button"
                onClick={() => setFilterOpen(true)}
              >
                <GrFormClose></GrFormClose>
                {item}
              </button>
            ))}
          <button
            className="current-filter-button"
            onClick={() => handleClearAll()}
          >
            <AiOutlineLine></AiOutlineLine>Clear all
          </button>
        </div>
      )}
      <div className="projects-grid-container">
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
                  {project.cityCountry?.toLowerCase()}
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

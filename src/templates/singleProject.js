import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HeroSlider from "../components/heroSlider"
import ProjectIntro from "../components/projectIntro"
import ProjectTable from "../components/projectTable"
import ModuleContent from "../components/moduleContent"
import Related from "../components/related"

const SingleProject = ({ data }) => {
  const {
    projectName,
    architect,
    awards,
    year,
    typology,
    status,
    size,
    moduleContent,
    heroImages,
    headlineText,
    geographicRegion,
    dateCompleted,
    city,
    country,
    bodyText,
    team,
    client,
    furtherNetworkLinks,
    photoCredit,
    press,
    nonLinkedInfo,
    principal,
    projectLeader,
  } = data.contentfulProject
  return (
    <Layout>
      <div className="page-header">
        <Link to="/projects">Projects</Link> |{" "}
        <div className="project-header-type">
          {typology?.map((type, index) => (
            <Link to="/projects" key={index} state={{ typologyFilter: [type] }}>
              {type}
            </Link>
          ))}
        </div>{" "}
        | <Link to="/projects" state={{regionFilter: [geographicRegion]}}>{geographicRegion}</Link>
      </div>
      <HeroSlider images={heroImages}></HeroSlider>
      <ProjectIntro
        headline={headlineText?.headlineText}
        title={projectName}
        body={bodyText?.bodyText}
        city={city?.toLowerCase()}
        country={country}
        year={year}
      ></ProjectIntro>
      <ProjectTable
        architect={architect}
        awards={awards}
        status={status}
        size={size}
        dateCompleted={dateCompleted}
        team={team}
        principal={principal}
        projectLeader={projectLeader}
        client={client}
        network={furtherNetworkLinks}
        photoCredit={photoCredit}
        press={press}
        nonLinked={nonLinkedInfo}
      ></ProjectTable>
      {moduleContent && (
        <ModuleContent moduleContent={moduleContent}></ModuleContent>
      )}
      <Related></Related>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    contentfulProject(slug: { eq: $slug }) {
      architect
      year
      typology
      status
      size
      projectName
      awards {
        id
        awardName
        year
        link
      }
      moduleContent {
        ... on ContentfulSingleColumnImage {
          singleId: id
          image {
            caption
            image {
              description
              gatsbyImageData
            }
          }
        }
        ... on ContentfulTwoColumnImage {
          twoColId: id
          images {
            caption
            image {
              description
              gatsbyImageData
            }
          }
        }
        ... on ContentfulVideoModule {
          videoId: id
          caption
          vimeoLink
          coverImage {
            description
            gatsbyImageData
          }
        }
      }
      heroImages {
        description
        gatsbyImageData
      }
      headlineText {
        headlineText
      }
      geographicRegion
      dateCompleted
      client
      city
      country
      bodyText {
        bodyText
      }
      team {
        name
        slug
        id
      }
      furtherNetworkLinks
      press {
        linkText
        id
        url
      }
      photoCredit
      nonLinkedInfo
      principal {
        name
        slug
        id
      }
      projectLeader {
        name
        slug
        id
      }
    }
  }
`

export default SingleProject

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
    type,
    status,
    size,
    moduleContent,
    heroImages,
    headlineText,
    geographicRegion,
    dateCompleted,
    cityCountry,
    bodyText,
    team,
    client,
    furtherNetworkLinks,
    photoCredit,
    press,
    nonLinkedInfo,
  } = data.contentfulProjectPage
  return (
    <Layout>
      <div className="project-header">
        <Link to="/projects">Projects</Link> |{" "}
        <Link to="/projects">{type}</Link> |{" "}
        <Link to="/projects">{geographicRegion}</Link>
      </div>
      <HeroSlider images={heroImages}></HeroSlider>
      <ProjectIntro
        headline={headlineText?.headlineText}
        title={projectName}
        body={bodyText?.bodyText}
        city={cityCountry}
        year={year}
      ></ProjectIntro>
      <ProjectTable
        architect={architect}
        awards={awards}
        status={status}
        size={size}
        dateCompleted={dateCompleted}
        team={team}
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
    contentfulProjectPage(slug: { eq: $slug }) {
      architect
      awards {
        ... on ContentfulExternalLink {
          id
          linkText
          url
        }
        ... on ContentfulInternalLink {
          id
          linkText
          slug
        }
      }
      year
      type
      status
      size
      projectName
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
      cityCountry
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
    }
  }
`

export default SingleProject

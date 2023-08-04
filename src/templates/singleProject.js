import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import HeroSlider from "../components/heroSlider"
import ProjectIntro from "../components/projectIntro"

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
  } = data.contentfulProjectPage
  return (
    <Layout>
      <HeroSlider images={heroImages}></HeroSlider>
      <ProjectIntro
        headline={headlineText?.headlineText}
        title={projectName}
        body={bodyText?.bodyText}
        city={cityCountry}
        year={year}
      ></ProjectIntro>
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
          id
          image {
            caption
            image {
              description
              gatsbyImageData
            }
          }
        }
        ... on ContentfulTwoColumnImage {
          id
          images {
            caption
            image {
              description
              gatsbyImageData
            }
          }
        }
        ... on ContentfulVideoModule {
          id
          caption
          vimeoLink
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
      cityCountry
      bodyText {
        bodyText
      }
    }
  }
`

export default SingleProject

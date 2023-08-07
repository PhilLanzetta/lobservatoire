import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import HomeSlider from "../components/homeSlider"

const IndexPage = ({ location, data }) => {
  const homeImages = data.allContentfulProjectPage.nodes
  return (
  <Layout location={location}>
    <HomeSlider images={homeImages}></HomeSlider>
  </Layout>
)}


export const query = graphql`
  query {
    allContentfulProjectPage(filter: { featured: { eq: true } }) {
      nodes {
        geographicRegion
        id
        projectName
        slug
        tileImage {
          gatsbyImageData
          description
        }
        type
        shortExcerpt
        cityCountry
      }
    }
  }
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const SingleProject = ({ data }) => {
  const project = data.contentfulProjectPage
  return (
    <Layout>
      <div>{project.projectName}</div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    contentfulProjectPage(slug: { eq: $slug }) {
      projectName
    }
  }
`

export default SingleProject

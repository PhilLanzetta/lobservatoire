import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Network = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }
  const architects = data.allContentfulProject.nodes
    .map(item => item.architect)
    .filter(item => item !== null)
    .filter(onlyUnique)
    .map(item => ({ type: "architect", name: item }))

  const networkNames = data.allContentfulProject.nodes
    .map(item => item.furtherNetworkLinks)
    .filter(item => item !== null)
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique)
    .map(item => ({ type: item.split(": ")[0], name: item.split(": ")[1] }))

  console.log(networkNames)
  console.log(architects)

  return <Layout>Network</Layout>
}

export const query = graphql`
  query {
    allContentfulProject {
      nodes {
        architect
        furtherNetworkLinks
      }
    }
  }
`

export default Network

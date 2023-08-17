import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/layout"

const Clients = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const sortedClients = data.allContentfulProject.nodes
    .map(client => client.client)
    .filter(item => item !== null)
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique)
    .sort()

  const alphabetHeaders = sortedClients
    .map(client => client.charAt(0))
    .filter(onlyUnique)

  console.log(alphabetHeaders)

  return (
    <Layout>
      {alphabetHeaders.map((letter, index) => (
        <div key={index}>
          <p>{letter}</p>
          <ul>
            {sortedClients.map(client => {
              if (client.charAt(0) === letter) {
                return (
                  <li>
                    <Link to="/projects" state={{ client: client }}>
                      {client}
                    </Link>
                  </li>
                )
              } else {
                return null
              }
            })}
          </ul>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProject {
      nodes {
        client
      }
    }
  }
`

export default Clients

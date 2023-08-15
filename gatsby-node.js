/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
const path = require("path")
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      query GetData {
        allContentfulProject {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulTeamMember {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )

  const projects = result.data.allContentfulProject.edges
  const teamMembers = result.data.allContentfulTeamMember.edges

  projects.forEach(({ node }, index) => {
    const projectSlug = node.slug
    createPage({
      path: `/projects/${projectSlug}`,
      component: path.resolve(`./src/templates/singleProject.js`),
      context: {
        slug: projectSlug,
      },
    })
  })

  teamMembers.forEach(({ node }, index) => {
    const teamMemberSlug = node.slug
    createPage({
      path: `/team/${teamMemberSlug}`,
      component: path.resolve(`./src/templates/teamMember.js`),
      context: {
        slug: teamMemberSlug,
      },
    })
  })

}

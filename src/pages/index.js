import React from "react"
import { graphql, Link } from "gatsby"

import Header from "../components/Header"

export default ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <Header />
      {edges.map(edge => {
        const { frontmatter } = edge.node

        return (
          <div key={frontmatter.path}>
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
          </div>
        )
      })}
      <div>
        <Link to="/tags">Browse by Tags</Link>
      </div>
    </div>
  )
}

export const query = graphql`
  query mk {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
          }
        }
      }
    }
  }
`

import React from "react"
import { graphql, Link } from "gatsby"

const Template = ({ data, pageContext }) => {
  const { prev, next } = pageContext
  const { markdownRemark } = data
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {prev && <Link to={prev.frontmatter.path}>Prev</Link>}
      {next && <Link to={next.frontmatter.path}>Next</Link>}
    </div>
  )
}

export const query = graphql`
  query($pathSlug: String) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template

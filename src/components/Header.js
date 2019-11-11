import React from "react"
import { StaticQuery, graphql } from "gatsby"
import TitleAndDescription from "./TitleAndDescription"

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query site {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <TitleAndDescription data={data} />}
    />
  )
}

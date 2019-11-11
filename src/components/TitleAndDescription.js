import React from "react"

export default ({ data }) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

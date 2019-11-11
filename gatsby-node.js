const path = require(`path`)

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve(`src/templates/allTagsIndex.js`)
  const singleTagIndexTemplate = path.resolve(`src/templates/singleTagIndex.js`)

  const postsByTags = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = []
        }

        postsByTags[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTags)

  createPage({
    path: "/tags",
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
    },
  })

  tags.forEach(tagName => {
    const posts = postsByTags[tagName]

    createPage({
      path: `/tags/${tagName}`,
      component: singleTagIndexTemplate,
      context: {
        posts,
        tagName,
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blogPost.js`)
  return graphql(`
    query mk {
      allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              path
              title
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges

    createTagPages(createPage, posts)

    posts.forEach(({ node }, index) => {
      const { path } = node.frontmatter
      createPage({
        path,
        component: blogPostTemplate,
        context: {
          pathSlug: path,
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === posts.length - 1 ? null : posts[index + 1].node,
        },
      })
    })
  })
}

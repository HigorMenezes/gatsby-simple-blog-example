module.exports = {
  siteMetadata: {
    title: "Higor Menezes Blog",
    description: "Blog to talk about programming",
  },
  plugins: [
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
  ],
}

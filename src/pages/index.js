import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"
import { id } from "postcss-selector-parser"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home Page</h1>
    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const {
                id,
                frontmatter: { title, date, author, path },
                excerpt,
              } = node

              return (
                <Post
                  key={id}
                  title={title}
                  date={date}
                  author={author}
                  path={path}
                  body={excerpt}
                  path={path}
                />
              )
            })}
          </div>
        )
      }}
    />
  </Layout>
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "Do MMM YYYY")
            author
            path
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage

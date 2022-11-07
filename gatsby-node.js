const path = require('path')

exports.createPages =  async ({ graphql, actions }) => {

  const { data } = await graphql(`
  query ImgQuery {
    allFile {
      nodes {
        childImageSharp {
          fluid {
            originalName
            srcSet
            src
          }
        }
      }
    }
  }
  `)

  data.allFile.nodes.forEach( node => {
    
    const genreSlug = node.childImageSharp.fluid.originalName.slice(0, -4)

    actions.createPage({
      path: '/genre/'+ genreSlug,
      component: path.resolve('./src/templates/GenreDetails.js'),
      context: {slug: genreSlug}
    })
  })
}
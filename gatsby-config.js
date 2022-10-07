module.exports = {
  siteMetadata: {
    title: `More Of The Same`,
    description: `Select a song. Play songs that sound just like it.`,
    siteUrl: `https://moreofthesame.gatsbyjs.io`,
  },
  plugins: ['gatsby-plugin-sass', 'gatsby-plugin-transition-link', {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'https://www.example.com',
      sitemap: 'https://www.example.com/sitemap.xml',
      policy: [{userAgent: '*', allow: '/'}]
    }
  }],
}

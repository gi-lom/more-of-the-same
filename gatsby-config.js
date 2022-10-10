module.exports = {
  siteMetadata: {
    title: `More Of The Same`,
    description: `Select a song. Play songs that sound just like it.`,
    siteUrl: `https://moreofthesame.gatsbyjs.io`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-transition-link",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-preload-fonts",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://moreofthesame.gatsbyjs.io",
        sitemap: "https://moreofthesame.gatsbyjs.io/sitemap.xml",
        resolveEnv: () => process.env.GATSBY_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/search", "/config", "/result"],
      },
    },
  ],
};

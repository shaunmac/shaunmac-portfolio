// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "shaunmac",
      // URL to the GraphQL API
      url: "http://shaunmac.local/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};

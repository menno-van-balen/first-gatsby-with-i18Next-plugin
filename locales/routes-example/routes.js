// This is  an example what the routes.json translation files should look like.
// This file doesn't have to be translated!

// For basic routes only non default languages needs a translation from default
// For blogposts every language needs the route translations from the other languages
// ~ Uncomment the debug console.log in getLocalizedRoute to find missing routes ~

const routes = {
  en: {
    // (Default language)
    // --- nl to en
    // Blogposts
    "/blog/mijn-eerste-post": "/blog/my-first-post",
    "/blog/tweede-post": "/blog/second-post",
    "/blog/derde-post": "/blog/third-post",
    // --- de to en
    // --- pt to en
  },
  nl: {
    // --- en to nl
    // Basic routes
    "/": "/",
    "/about": "/over",
    "/blog": "/blog",
    // Blogposts
    "/blog/my-first-post": "/blog/mijn-eerste-post",
    "/blog/second-post": "/blog/tweede-post",
    "/blog/third-post": "/blog/derde-post",
    // --- de to nl
    // --- pt to nl
  },
  de: {
    // --- en to de
    // Basic routes
    // Blogposts
    // --- nl to de
    // --- pt to de
  },
  pt: {
    // --- en to pt
    // Basic routes
    // Blogposts
    // --- nl to pt
    // --- de to pt
  },
};

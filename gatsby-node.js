// const path = require("path");

// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions;
//   const blogPostTemplate = path.resolve("src/blog/blog-post.js");
//   const { data } = await graphql(`
//     query {
//       allMdx {
//         nodes {
//           frontmatter {
//             date
//             lang
//             path
//           }
//         }
//       }
//     }
//   `);

//   if (query.errors) {
//     reporter.panicOnBuild("Error while running GraphQL query.");
//   }

//   // Post template pages and context
//   data.allMdx.nodes.forEach(({ node }) => {
//     createPage({
//       path: `/blog/${node.frontmatter.path}`,
//       component: blogPostTemplate,
//       context: {
//         slug: node.frontmatter.path,
//       },
//     });
//   });

//   // Articles template pages and context
//   // const posts = query.data.allMarkdownRemark.edges;
//   // const postsPerPage = 20;
//   // const numPages = Math.ceil(posts.length / postsPerPage);

//   // Array.from({ length: numPages }).forEach((_, i) => {
//   //   createPage({
//   //     path: i === 0 ? "/articles" : `/articles/${i + 1}`,
//   //     component: path.resolve("src/templates/articles.js"),
//   //     context: {
//   //       limit: postsPerPage,
//   //       skip: i * postsPerPage,
//   //       numPages,
//   //       currentPage: i + 1,
//   //     },
//   //   });
//   // });
// };

const path = require("path");
const getLocalizedRoute = require("./src/i18n/getLocalizedRoute");
const removeEndSlash = (path) =>
  path === `/` ? path : path.replace(/\/$/, ``);

// exports.createPages = async ({ page, actions, graphql, reporter }) => {
//   const { createPage, deletePage } = actions;

//   const result = await graphql(`
//       defaultLanguage: locale {
//         language
//       }
//       allLocale {
//         edges {
//           node {
//             language
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) {
//     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query_1');
//   }

//   // First recreate pages then create blog pages
//   const languages = result.data.allLocale.edges;

//   console.log("!");

//   if (page.internalComponentName === "ComponentDev404Page") {
//     return;
//   }

//   return new Promise((resolve) => {
//     console.log("!!!");
//     deletePage(page);

//     languages.forEach((lang) => {
//       console.log(page.path);
//       const language = lang.node.language;
//       const localizedPath = getLocalizedPath(page.path, language);
//       const localePage = {
//         ...page,
//         path: localizedPath,
//         context: {
//           locale: language,
//           originalPath: page.path,
//         },
//       };
//       createPage(localePage);
//     });

//     resolve();
//   });
// };

// Create blogpost pages with localized routes
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              date
              lang
              path
            }
            id
          }
        }
      }
      defaultLanguage: locale {
        language
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const defaultLanguage = result.data.defaultLanguage.language;
  const posts = result.data.allMdx.edges;

  posts.forEach((post) => {
    const language = post.node.frontmatter.lang;
    const lang = language !== defaultLanguage ? "/" + language : "";
    const originalRoute = `/blog/${post.node.frontmatter.path}`;
    const localizedRoute = getLocalizedRoute(originalRoute, language);
    createPage({
      path: `${lang}${localizedRoute}`,
      component: path.resolve(`./src/components/post.js`),
      context: {
        language: language,
        id: post.node.id,
      },
    });
  });
};

// Recreate all pages with translated routes
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  const language = page.context.i18n.language;
  const defaultLanguage = page.context.i18n.defaultLanguage;
  const lang = language !== defaultLanguage ? "/" + language : "";
  const originalPath = removeEndSlash(page.context.i18n.originalPath);

  if (page.internalComponentName === `Component/${lang}dev-404-page/`) {
    return;
  }

  const localizedPath = getLocalizedRoute(originalPath, language);
  deletePage(page);

  createPage({
    ...page,
    path: `${lang}${localizedPath}`,
    context: {
      ...page.context,
      i18n: {
        ...page.context.i18n,
        path: `${lang}${localizedPath}`,
        originalPath: originalPath,
      },
    },
  });
};

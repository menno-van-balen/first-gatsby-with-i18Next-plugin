// Idea for pagenation inside createPages
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

const path = require("path");
const getLocalizedRoute = require("./src/i18n/getLocalizedRoute");
const removeEndSlash = (path) =>
  path === `/` ? path : path.replace(/\/$/, ``);

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
  const posts = result.data.allMdx.edges;
  const defaultLanguage = result.data.defaultLanguage.language;

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

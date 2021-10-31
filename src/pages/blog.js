import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { useTranslation, Link, Trans } from "gatsby-plugin-react-i18next";
const getLocalizedRoute = require("../i18n/getLocalizedRoute");

const BlogPage = ({ data }) => {
  const language = data.locales.edges[0].node.language;
  const { t } = useTranslation();
  return (
    <Layout pageTitle={t("My Blog Posts")}>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link
              to={getLocalizedRoute("/blog/" + node.frontmatter.path, language)}
            >
              {node.frontmatter.title}
            </Link>
          </h2>
          <p>
            <Trans>Posted</Trans>: {node.frontmatter.date}
          </p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query ($language: String) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allMdx(
      filter: { frontmatter: { lang: { eq: $language } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          lang
          path
          title
        }
        id
      }
    }
  }
`;

export default BlogPage;

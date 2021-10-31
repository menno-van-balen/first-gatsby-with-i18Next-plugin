import * as React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/layout";

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <Layout pageTitle={t("Home Page")}>
      <p>
        <Trans>indexpage-text</Trans>
      </p>

      <StaticImage
        alt={t("There we go at the end of the world")}
        src="../images/_DSF3978.jpg"
      />
    </Layout>
  );
};

export default IndexPage;

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
  }
`;

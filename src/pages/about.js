import * as React from "react";
import { graphql } from "gatsby";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/layout";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <Layout pageTitle={t("About Me")}>
      <p>
        <Trans>
          Hi there! I'm the proud creator of this site, which I built with
          Gatsby.
        </Trans>
      </p>
    </Layout>
  );
};

export default AboutPage;

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

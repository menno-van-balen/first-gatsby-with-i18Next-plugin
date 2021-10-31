import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import {
  Link,
  Trans,
  useI18next,
  useTranslation,
} from "gatsby-plugin-react-i18next";
import { container } from "./layout.module.css";

const getLocalizedRoute = require("../i18n/getLocalizedRoute");

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
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
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { t } = useTranslation();
  const { languages, originalPath, language } = useI18next();
  const lng = language;
  return (
    <div className={container}>
      <title>
        {t(pageTitle)} | {t(data.site.siteMetadata.title)}
      </title>
      <header>{t(data.site.siteMetadata.title)}</header>
      <nav>
        <ul>
          <li>
            <Link to={getLocalizedRoute("/", lng)}>
              <Trans>Home</Trans>
            </Link>
          </li>
          <li>
            <Link to={getLocalizedRoute("/about", lng)}>
              <Trans>About</Trans>
            </Link>
          </li>
          <li>
            <Link to={getLocalizedRoute("/blog", lng)}>
              <Trans>Blog</Trans>
            </Link>
          </li>
        </ul>
        <ul className="languages">
          {languages.map((lng) => (
            <li key={lng}>
              {/* <Link to={originalPath} language={lng}> */}
              <Link to={getLocalizedRoute(originalPath, lng)} language={lng}>
                {lng}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <h1>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;

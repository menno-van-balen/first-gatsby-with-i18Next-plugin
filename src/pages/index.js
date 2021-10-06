import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="There we go at the end of the world"
        src="../images/_DSF3978.jpg"
      />
    </Layout>
  )
}

export default IndexPage
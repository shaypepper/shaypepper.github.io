import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Howdy</h1>
    <Link to="/happy/dog">Go to Blog 2</Link>
  </Layout>
)

export default IndexPage

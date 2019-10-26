import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import HappiestPlaylist from "../components/happiestPlaylist"
import HappiestDog from "../components/happiestDog"
import HappiestShoes from "../components/happiestShoes"

const SecondPage = () => (
  <Layout>
    <SEO title="Happy Things" />
    <HappiestDog />
    <HappiestShoes />
    <HappiestPlaylist />

    <Link to="/blog2#viz1572122314586">Happiest Dog</Link>
    <Link to="/blog2#viz1572123754567">Happiest Shoes</Link>
    <Link to="/blog2#viz1572121772029">Happiest Playlist</Link>
  </Layout>
)

export default SecondPage

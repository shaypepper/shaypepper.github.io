/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./happy.css"
import Layout from "../../components/layout"

const QuantifiedSelfLayout = ({ children }) => {
  return (
    <Layout>
      <div id="quantified-self-layout">
        <h1>Quanitified self: Joy</h1>
        <p>
          When I began working on this project, I had some fear that I wouldn't
          like what I saw in my data, whichever data I chose. Unlike my peers, I
          had no interest in self-accountability. So I began with a topic: Joy.
          What are the things that make me happy in everyday life? The things
          that make an eh day not so eh? Where do I look to keep my spirits
          buoyed? It didn't take long to figure it out. During my workday, it's
          my happy playlist (creatively titled The Happiest Playlist). It starts
          with Barbra Streisand and doesn't lose steam after that. I also have a
          particularly wonderful shoe collection, so I always have the option to
          just look down if I want to smile. At the end of my day I come home to
          my very pretty dog, Mousse. She is hilarious and sweet and a delight
          to come home to. She usually greets me with a wagging tail that moves
          her whole body and a toy as a gift.
        </p>
        <p>
          I was smiling the entire time I was putting these together. I hope the
          visualizations can bring you a little bit of joy too.
        </p>
        <div id="happy-list">
          <Link to="/happy/dog">The Happiest Dog Photos</Link>
          <Link to="/happy/shoes">The Happiest Shoe Collection</Link>
          <Link to="/happy/playlist">The Happiest Playlist</Link>
        </div>
        <hr />
        {children}
      </div>
    </Layout>
  )
}

QuantifiedSelfLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default QuantifiedSelfLayout

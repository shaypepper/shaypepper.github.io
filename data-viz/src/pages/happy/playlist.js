/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import QuantifiedSelfLayout from "./quanitifedSelfLayout"
import HappiestPlaylist from "../../components/happiestPlaylist"

const Playlist = ({ children }) => {
  return (
    <QuantifiedSelfLayout>
      {" "}
      <HappiestPlaylist />
    </QuantifiedSelfLayout>
  )
}

Playlist.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Playlist

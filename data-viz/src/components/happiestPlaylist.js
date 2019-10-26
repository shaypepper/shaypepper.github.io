import React from "react"

class HappiestPlaylist extends React.Component {
  componentDidMount() {
    var divElement = document.getElementById("viz1572121772029")
    var vizElement = divElement.getElementsByTagName("object")[0]
    vizElement.style.width = "800px"
    vizElement.style.height = "852px"
    var scriptElement = document.createElement("script")
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js"
    vizElement.parentNode.insertBefore(scriptElement, vizElement)
  }

  render() {
    return (
      <div
        class="tableauPlaceholder"
        id="viz1572121772029"
        style={{ position: "relative", margin: "auto" }}
      >
        <noscript>
          <a href="#">
            <img
              alt=" "
              src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pl&#47;Playlist_15718830465650&#47;Story&#47;1_rss.png"
              style={{ border: "none" }}
            />
          </a>
        </noscript>
        <object class="tableauViz" style={{ display: "none" }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />{" "}
          <param name="embed_code_version" value="3" />{" "}
          <param name="site_root" value="" />
          <param name="name" value="Playlist_15718830465650&#47;Story" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pl&#47;Playlist_15718830465650&#47;Story&#47;1.png"
          />{" "}
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="filter" value="publish=yes" />
        </object>
      </div>
    )
  }
}

export default HappiestPlaylist

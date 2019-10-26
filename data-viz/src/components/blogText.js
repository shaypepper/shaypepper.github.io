import React from "react"

const BlogPost = ({ children }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Notes on process</h2>
      {children}
    </div>
  )
}

export default BlogPost

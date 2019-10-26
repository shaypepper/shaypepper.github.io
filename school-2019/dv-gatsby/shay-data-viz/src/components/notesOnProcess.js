import React from "react"

const NotesOnProcess = ({ summary, children }) => {
  return (
    <details>
      <summary>{summary || "Notes on Process"}</summary>
      {children}
    </details>
  )
}

export default NotesOnProcess

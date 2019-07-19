import React from "react"

const Swatch = ({children, color}) => (
  <div style={{
    content: '',
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: color,
    display: 'inline-block',
    marginRight: '10px'
  }}>
  </div>
)

export default Swatch

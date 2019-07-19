import React from "react"

const Badge = ({children, type, tooltip }) => (
  <div style={{
    borderRadius: "5px",
    background: 'var(--purple-500)',
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.7rem',
    display: 'inline-block',
    marginRight: '10px',
    padding: '12px',
    fontFamily: 'var(--font-header)'
  }}>
  {type}
  </div>
)

export default Badge

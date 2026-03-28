import React from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader-ring" />
      <TypeAnimation
        sequence={['Initializing...', 600, 'Loading Portfolio...', 600, 'Almost there...', 400]}
        speed={50}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: 'var(--text2)',
          letterSpacing: '0.1em',
        }}
      />
    </div>
  )
}

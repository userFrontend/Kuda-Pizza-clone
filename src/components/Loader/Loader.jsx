import React from 'react'
import './Loader.scss'

const Loader = () => {
  return (
    <div className="cards">
      <div className="skeleton-card">
        <div className="skeleton-line img"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-line img"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-line img"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-line img"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  )
}

export default Loader
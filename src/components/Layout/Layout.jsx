import React from 'react'
import './Layout.scss'

const Layout = ({children, title, toggle}) => {
  return (
    <div className='layout'>
        <div className="layout-content">
            <div className="layout-top">
                <h3>{title}</h3>
                <button onClick={toggle}>X</button>
            </div>
            <div className="layout-body">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout
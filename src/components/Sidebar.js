import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { SidebarData } from './SidebarData'
import Nav from 'react-bootstrap/Nav'

import './Sidebar.css'

export default function Sidebar() {
  const [ sidebar, setSidebar ] = useState(true)

  const showSidebar = () => setSidebar( !sidebar )

  return (
    <>
      {/* <div className="sidebar">
        <Link to='#' className='menu-bars'>
          <FaBars onClick={ showSidebar }/>
        </Link>
      </div> */}
      <Nav className={ sidebar ? 'sidebar active' : 'sidebar' }>
        <ul className='sidebar-nav'>
          {SidebarData.map( (data, index) => {
            return (
              <li key={index} className={data.className}>
                <Link className="sidebar-nav-link" to={data.path}>
                  {data.icon}
                  <span className='sidebar-text'>{data.title}</span>
                </Link>
              </li>
            );
          } )}
        </ul>
      </Nav>
    </>
  )
}

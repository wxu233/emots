import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { SidebarData } from './SidebarData'
import Nav from 'react-bootstrap/Nav'
import { useTheme } from '../context/ThemeContext'
import './Sidebar.css'

export default function Sidebar() {
  const [ sidebar, setSidebar ] = useState(false)
  const [ mobile, setMobile ] = useState(false)
  const { currentTheme } = useTheme()
  
  const showSidebar = () => setSidebar( !sidebar )

  useEffect( () => {
      if( window.innerWidth < 1065 ){
          setMobile( true )
      }
  }, [])

  useEffect( () => {
      const handleResize = () => {
          if( window.innerWidth < 1065 ){
              setMobile( true )
          }
          else {
              setMobile( false )
          }
      }

      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <nav className="sidebar" 
           style={{ backgroundColor: currentTheme.colors.menuBackground}}
      >
        <div className="brand" style={{ color: currentTheme.colors.foreground }}>Brand</div>
        <button 
          className="sidebar-toggle"
          onClick={ showSidebar }
        >
          <FaBars />
        </button>

        {!mobile && 
          <div className="sidebar-links">
            <ul>
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
          </div>
        }



        { sidebar && 
          <div className="sidebar-links">
            <ul>
              {SidebarData.map( (data, index) => {
                return (
                  <li key={index} className={data.className}>
                    {/* <a> */}
                    <Link className="sidebar-nav-link" to={data.path}>
                      {data.icon}
                      <span className='sidebar-text'>{data.title}</span>
                    </Link>
                  </li>
                );
              } )}
            </ul>
          </div>  
        }
      </nav>
    </>
  )
}

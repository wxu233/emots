import React from 'react'
import './Sidebar.css'

export default function Bars(props) {
  return (
    <a href="#" className="sidebar-toggle" onClick={props.onClick}>
        <span className="bar" style={{backgroundColor: "white"}}/>
        <span className="bar" style={{backgroundColor: "white"}}/>
        <span className="bar" style={{backgroundColor: "white"}}/>
    </a>
  )
}

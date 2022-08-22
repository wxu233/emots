import React from 'react'
import { HiStar, HiHome } from 'react-icons/hi'
import { MdCategory } from 'react-icons/md'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HiHome />,
        className: "sidebar-link"
    },
    {
        title: 'Categories',
        path: '/categories',
        icon: <MdCategory />,
        className: "sidebar-link"
    },
    {
        title: 'Favorites',
        path: '/favorites',
        icon: <HiStar />,
        className: "sidebar-link"
    }
]

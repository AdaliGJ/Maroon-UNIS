import React from 'react';
import "./navbar.css";
import * as AiIcons from 'react-icons/ai';
import * as CgIcons from 'react-icons/cg';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';

export const Menu=[
    {
        title: 'Inicio',
        path: '/home',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Perfil',
        path: '/perfil',
        icon: <CgIcons.CgProfile/>,
        cName: 'nav-text'
    },
    {
        title: 'Mi muro',
        path: '/mi-muro',
        icon: <GiIcons.GiBrickWall/>,
        cName: 'nav-text'
    },
    {
        title: 'Mensajes',
        path: '/mensajes',
        icon: <AiIcons.AiOutlineMessage/>,
        cName: 'nav-text'
    },
    {
        title: 'Buscar',
        path: '/buscar',
        icon: <IoIcons.IoMdSearch/>,
        cName: 'nav-text'
    }
]
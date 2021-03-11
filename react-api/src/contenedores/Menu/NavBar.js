import React, {useState} from 'react';
import "./navbar.css";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import data from "./../../data.js";
import {Menu} from './Menu.js';
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";

function Navbar(){
    const [sidebar,setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const history = useHistory();
    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
    };


    return (
        <section className="sidemenu">
        <div className="navbar">
            <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
        </div>
        <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
            <ul className ='nav-menu-items'>
                <li><h1>Menú</h1></li>
                {Menu.map((item, index)=>{
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    );
                })}
                <li className="logout" onClick={handleLogout}>
                    <Link><AiIcons.AiOutlineLogout/><span>Cerrar Sesión</span></Link>
                </li> 
            </ul>
        </nav>
        </section>
    );
}

export default Navbar;
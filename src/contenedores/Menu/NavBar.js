import React, {useState, useEffect} from 'react';
import "./navbar.css";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as CgIcons from 'react-icons/cg';
import * as RiIcons from 'react-icons/ri';
import data, {database} from "./../../data.js";
import {Menu} from './Menu.js';
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";

function Navbar(){

    const[foto, setFoto]=useState('');
    
    const [sidebar,setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [nombre, setNombre] = useState('');


    const history = useHistory();
    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
    };
    const perfil = () =>{
        history.push('/perfil');
    }
    const message = () =>{
        history.push('/mensajes');
    }
    const home = () =>{
        history.push('/home');
    }

    useEffect(() => {
		var fotoRef = database.ref('/foto_perfil/' + data.currentUser.uid);
		fotoRef.once('value').then((snapshot)=>{
		setFoto(snapshot.val().Foto);
	});
        var userRef = database.ref('/usuarios/' + data.currentUser.uid);
        userRef.once('value').then((snapshot)=>{
        setNombre(snapshot.val().Nombre);
    });
	}, [])


    return (
        <section className="sidemenu">
        <div className="navbar">
            <div className='navbar__left'>
                <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                <div className='navbar__input'>
                    <FaIcons.FaSearch style={{fill: 'black'}}/>
                    <input placeholder='  Buscar...' type='text'/>
                </div>
            </div>
            <div className='navbar__right'>
                <div className='navbar__info'>
                    <div className='navbar__name' onClick={perfil}>
                        <img src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} className='foto_perfil'/>
                        <h4>{nombre}</h4>
                    </div>
                    <div className='icons'>
                        <div className='icon'><h4><RiIcons.RiMessage2Fill onClick={message}/></h4></div>
                        <div className='icon'><h4><FaIcons.FaHome onClick={home}/></h4></div>
                    </div>
                </div>
            </div>
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
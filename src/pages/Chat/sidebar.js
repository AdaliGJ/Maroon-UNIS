import React, {useEffect, useState} from 'react';
import "./sidebar.css";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import * as CgIcons from 'react-icons/cg';
import data, {database, db} from './../../data.js';
import Sidebarchat from './sidebarchat.js'

const Sidebar = () => {

    const [chats1, setChats2] = useState([]);
    const [chats2, setChats1] = useState([]);

    const [fotoPerfil, setFotoperfil]=useState('');
    const [misChats, setMisChats] = useState([]);

    const[yo, setYo]=useState('');
    const[correo, setCorreo]=useState('');
    
    useEffect(() => {
        db.collection('chats').where("m2",'==', data.currentUser.uid).onSnapshot(snapshot => {
            setChats1(snapshot.docs.map(doc => ({ id: doc.id, datos: doc.data()})))
        })
        db.collection('chats').where("m1",'==', data.currentUser.uid).onSnapshot(snapshot => {
            setChats2(snapshot.docs.map(doc => ({ id: doc.id, datos: doc.data()})))
        })

        var fotoRef = database.ref('/foto_perfil/' + data.currentUser.uid);
          fotoRef.once('value').then((snapshot)=>{
          setFotoperfil(snapshot.val().Foto);
        })

        var userRef = database.ref('/usuarios/' + data.currentUser.uid);
          userRef.once('value').then((snapshot)=>{
          setYo(snapshot.val().Nombre);
          setCorreo(snapshot.val().Correo);
        })

    }, [])

    return(
    <section className="sidebar">
        <div className="sidebar__header">
        <img src={fotoPerfil || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} height='60px' width='60px'/>
            <div><h3>{yo}</h3>
            <p>{correo}</p></div>
        </div>

        <div className="sidebar__chats">
            {chats1.map(chat =>(
               <Sidebarchat key={chat.id} id={chat.id} name={chat.datos.nombre} m1={chat.datos.m1} m2={chat.datos.m2}/>
            ))}
            {chats2.map(chat =>(
               <Sidebarchat key={chat.id} id={chat.id} name={chat.datos.nombre} m1={chat.datos.m1} m2={chat.datos.m2}/>
            ))}
        </div>

    </section>
    );
}

export default Sidebar;
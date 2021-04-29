import React, {useEffect, useState} from 'react';
import "./sidebar.css";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import * as CgIcons from 'react-icons/cg';
import data, {database, db} from './../../data.js';
import Sidebarchat from './sidebarchat.js'

const Sidebar = () => {

    const [chats, setChats] = useState([]);

    const [fotoPerfil, setFotoperfil]=useState('');

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({ id: doc.id, datos: doc.data()})))
          })

        var fotoRef = database.ref('/foto_perfil/' + data.currentUser.uid);
          fotoRef.once('value').then((snapshot)=>{
          setFotoperfil(snapshot.val().Foto);
      });
    }, [])

    return(
    <section className="sidebar">
        <div className="sidebar__header">
        <img src={fotoPerfil || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} width='60px'/>
        </div>

        <div className="sidebar__search">
            
         
        </div>

        <div className="sidebar__chats">
            {chats.map(room =>(
               <Sidebarchat key={chats.id} id={chats.id} name={room.datos.nombre}/>
            ))}
        </div>

    </section>
    );
}

export default Sidebar;
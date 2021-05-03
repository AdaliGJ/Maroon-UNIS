import React, {useEffect, useState} from 'react'
import './sidebarchat.css';
import * as CgIcons from 'react-icons/cg';
import data, {database, db} from './../../data.js';
import {Link} from "react-router-dom";

function Sidebarchat({name, id, key, m1, m2}) {

    const [mensajes, setMensajes]=useState([]);

    const[foto, setFoto]=useState('');

    useEffect(() => {   

        if(data.currentUser.uid!=m1){
            var fotoRef = database.ref('/foto_perfil/' + m1);
		    fotoRef.once('value').then((snapshot)=>{
                if(snapshot!=null){
                    setFoto(snapshot.val().Foto)
                }
	        });
        }else if (data.currentUser.uid!=m2){
            var fotoRef = database.ref('/foto_perfil/' + m2);
		    fotoRef.once('value').then((snapshot)=>{
                if(snapshot!=null){
                    setFoto(snapshot.val().Foto)
                }
	        });
        }else{
            setFoto('');
        }
    }, [])


    useEffect(() => {
        if(id){
            db.collection('chats').doc(id).collection('mensajes').orderBy('timestamp','desc').onSnapshot(snapshot=>{
                setMensajes(snapshot.docs.map((doc)=>
                doc.data()))
            })
        }
    }, [id])

    return (
    <Link to={`/mensajes/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <section className="sidebarchat">
            <img src={foto|| 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'}/>
            <div className='sidebarchat__info'>
                <h2>{name}</h2>
                <p>{mensajes[0]?.mensaje}</p>
            </div>
        </section>
    </Link> 
    )
}

export default Sidebarchat

import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import Posting from './../Posting/posting.js';
import { hydrate } from 'react-dom';

const Wall = () => {

    var [posts, setPosts] = useState([]);
    const [postimg, setPostimg]=useState('');
    var [className, setClassName] = useState('');

    var vf = () =>{
        if(postimg==''){
            setClassName('nopostimg');
        }
        else{
            setClassName('postimg');
        }
    }
    
    useEffect(() => {
        database.ref('posts/' + data.currentUser.uid).orderByChild('Fecha_publicacion');
        database.ref(`posts/${data.currentUser.uid}`).on('value', snapshot =>{
            if(snapshot.val()!=null)
            setPosts({
                ...snapshot.val()
            })
        });
    }, [])

    return(
    <section className="wall">
        <header>
            <Navbar/>
        </header>
        <h3>Mi Muro</h3>
        <div>
            {
                Object.keys(posts).map(id =>{
                    return <div className='publicaciones'>
                        <img className='foto' src={posts[id].Foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                        <h7 className='nombre'><Link to ='/perfil'>{posts[id].Nombre}</Link>, {posts[id].Carrera}</h7>
                        <p className='fecha'>Publicado: {posts[id].Fecha_publicación}, {posts[id].Hora}</p>
                        <h9 className='correo'>{posts[id].Correo}</h9><br/>
                        <textarea className='cuerpo' readOnly value={posts[id].Cuerpo}></textarea><br/>
                        <img className='postimg' src={posts[id].Imagen_Post} alt="Foto de post"/><br/>
                    </div> 
                    
                })
            }
        </div>
    </section>
    );
}

export default Wall;
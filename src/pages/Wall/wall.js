import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database, db} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import Posting from './../Posting/posting.js';
import * as AiIcons from 'react-icons/ai';
import Likes from './../../contenedores/Likes/likes.js';
import Comments from './../../contenedores/Comments/comments';
import Post from './../../contenedores/Post/post.js';

const Wall = () => {

    const [posts, setPosts] = useState([]);
    const [fechaString, setFechaString]=useState('');
    const [seguidores, setSeguidores]=useState();

  
    useEffect(() => {
        db.collection('posts').orderBy('fecha_publicación', 'desc').where('UID', '==', data.currentUser.uid).onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, datos: doc.data()})))
          });
    }, [])

    return(
    <section className="wall">
        <header>
            <Navbar/>
        </header>
        <h3>Mi Muro</h3>
        <div>
        {posts.map(post => (
            <Post
                id={post.id}
                key={post.id}
                nombre={post.datos.nombre}
                foto={post.datos.foto}
                correo={post.datos.correo}
                texto={post.datos.cuerpo}
                fecha={post.datos.fecha_string}
                postingImage={post.datos.imagen_Post}
                carrera={post.datos.carrera}
                hora={post.datos.hora}
                comentarios={post.datos.comentarios}
      />
      ))}
        </div>
    </section>
    );
}

export default Wall;
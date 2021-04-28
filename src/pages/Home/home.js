import React, { useEffect, useState } from 'react';
import "./style.css";
import data, {db, database} from "./../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import Posting from './../Posting/posting.js';
import Post from './../../contenedores/Post/post.js';


const Home = () => {
    const history = useHistory();

    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
    };


    const [posts, setPosts] = useState([]);
    const [fechaString, setFechaString]=useState('');
    const [seguidores, setSeguidores]=useState();

    useEffect(() => {
        db.collection('posts').orderBy('fecha_publicación', 'desc').onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({ id: doc.id, datos: doc.data()})))
        })

        
      }, [])



    return(
    <section className="home">
        <Navbar/>
        <Posting/>

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
        <Post
            id="2"
            nombre='Adalí Garrán'
            fecha='fecha'
            correo='adaligaji@hotmail.com'
            texto='Hola'
            foto='https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png'
            postingImage='https://www.luisan.net/blog/wp-content/uploads/2014/09/color_small_mk-e1549454603143.png'
        />  
        <Post
            id="2"
            nombre='Adalí Garrán'
            fecha='fecha'
            correo='adaligaji@hotmail.com'
            texto='Hola'
            foto='https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png'
            postingImage=''
        />   
    </section>
    );
}

export default Home;
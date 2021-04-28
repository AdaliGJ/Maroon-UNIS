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

    var [posts, setPosts] = useState([]);

    var [like, setLike]=useState(false);
    var [comment, setComment]=useState(false);

    const likePost = () => setLike(!like);

    const commentPost =()=>setComment(!comment);

    const borrar = () =>{
        setTexto('');
        showEscribir();
    }

    const publicacion = () =>{
        pushObj();
        setTexto('');
        showEscribir();
    }

    const [name,setName] = useState('');
	const [fecha,setFecha] = useState('');
    const [hora, setHora]= useState('');


	const [foto, setFoto]=useState('');
    const [escribir,setEscribir] = useState(false);

    const showEscribir = () => setEscribir(!escribir);

	const userId = data.currentUser.uid;

    const [texto,setTexto] = useState('');


    const pushObj = () =>{
		var usersRef = database.ref(`comentarios/${data.currentUser.uid}`);
		usersRef.push({
			Nombre: name,
			Fecha_publicación: fecha,
            Cuerpo: texto,
			Foto: foto,
            Hora: hora
		},
		err =>{
			if(err)
				console.log(err)
		});
	}

    const tiempo = new Date();
    const time = tiempo.getHours().toString() + ':' + tiempo.getMinutes().toString() + ':' + tiempo.getSeconds().toString();

    
    useEffect(() => {
        db.collection('posts').orderBy('fecha_publicación', 'desc').where('UID', '==', data.currentUser.uid).onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, datos: doc.data()})))
          });
        var recentPostsRef = database.ref('/usuarios/'+ userId);
    	recentPostsRef.once('value').then((snapshot) => {
      	console.log(snapshot.val());
		setName(snapshot.val().Nombre);
        setFecha(new Date().toDateString());
        setHora(time);
        });

		var fotoRef = database.ref('/foto_perfil/' + userId);
		fotoRef.once('value').then((snapshot)=>{
		console.log(snapshot.val());
		setFoto(snapshot.val().Foto);
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
                key={post.datos.id}
                nombre={post.datos.nombre}
                foto={post.datos.foto}
                correo={post.datos.correo}
                texto={post.datos.cuerpo}
                fecha={post.datos.fecha_string}
                postingImage={post.datos.imagen_Post}
                carrera={post.datos.carrera}
                hora={post.datos.hora}
      />
      ))}
        </div>
    </section>
    );
}

export default Wall;
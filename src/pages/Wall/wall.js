import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import Posting from './../Posting/posting.js';
import * as AiIcons from 'react-icons/ai';
import Likes from './../../contenedores/Likes/likes.js';
import Comments from './../../contenedores/Comments/comments';

const Wall = () => {

    var [posts, setPosts] = useState([]);

    const [like, setLike]=useState(false);
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
        database.ref('posts/' + data.currentUser.uid).orderByChild('Orden_Fecha');
        database.ref(`posts/${data.currentUser.uid}`).on('value', snapshot =>{
            if(snapshot.val()!=null)
            setPosts({
                ...snapshot.val()
            })
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
            {
                Object.keys(posts).map(id =>{
                    return <div className='publicaciones'>
                        <img className='foto' src={posts[id].Foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                        <h7 className='nombre'><Link to ='/perfil'>{posts[id].Nombre}</Link>, {posts[id].Carrera}</h7>
                        <p className='fecha'>Publicado: {posts[id].Fecha_publicación}, {posts[id].Hora}</p>
                        <h9 className='correo'>{posts[id].Correo}</h9><br/>
                        <textarea className='cuerpo' readOnly value={posts[id].Cuerpo}></textarea><br/>
                        <img className='postimg' src={posts[id].Imagen_Post} alt="Foto de post"/><br/>
                        <label for='like'><h2><AiIcons.AiFillHeart style={like ? {fill:'#F44336'} : {fill: 'rgb(50, 50, 50)'}}/></h2></label>
                        <input id='like' onClick={likePost}/>
                        <label for='comment'><h2><AiIcons.AiOutlineComment style={{fill: 'black'}}/></h2></label>
                        <input id='comment' onClick={commentPost}/>
                        <div className={escribir ? 'escribir' :  'publicar'}>
                            <img src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                            <button className='pensamiento' onClick={showEscribir}>¡Haz un Comentario!</button>
                            <textarea className='cuerpo' value={texto} placeholder='Escribe algo...' onChange={(e)=>setTexto(e.target.value)}></textarea><br/>
                            <div className='extras'>
                                <button className='cancelar' onClick={borrar}>Cancelar</button> 
                                <button className='postear' onClick={publicacion}>Publicar</button>
                            </div>
                        </div>
                    </div> 
                })
            }
        </div>
    </section>
    );
}

export default Wall;
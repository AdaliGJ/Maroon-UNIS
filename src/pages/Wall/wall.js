import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import Posting from './../Posting/posting.js';
import * as AiIcons from 'react-icons/ai';

const Wall = () => {

    var [posts, setPosts] = useState([]);

    const [like, setLike]=useState(false);
    const [likeColor, setLikeColor]=useState('#FFFFFF');

    const likePost = () => setLike(!like);
    const colorLike = () =>{
        if(like){
            return '#800000';
        }
        else{
            return '#FFFFFF';
        }
    }


    
    useEffect(() => {
        database.ref('posts/' + data.currentUser.uid).orderByChild('Orden_Fecha');
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
                        <label for='like'><h2><AiIcons.AiFillHeart color={like ? '#F44336' : 'rgb(50, 50, 50)'}/></h2></label>
                        <input id='like' onClick={likePost}/>
                    </div> 
                    
                })
            }
        </div>
    </section>
    );
}

export default Wall;
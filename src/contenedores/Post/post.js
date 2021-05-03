import React, {useState, useEffect, Component} from 'react';
import "./style.css";
import * as AiIcons from 'react-icons/ai';
import data, {database, db} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Like from './../Likes/likes.js';
import Comments from './../Comments/comments.js';
import CommentInput from "./../Comment-Input/comment-input.js"

function Post ({nombre, fecha, carrera, correo, texto, foto, hora, postingImage, comentarios, id}) {
    var [comment, setComment]=useState(false);

    var [comentario, setComentario]=useState('');


    const commentPost =()=>setComment(!comment);    

    const [escribir,setEscribir] = useState(false);

    const showEscribir = () => setEscribir(!escribir);

    const [fotoActual, setFotoActual] = useState('');
    const [usuario, setUsuario] = useState('')

    const borrar = () =>{
        setComentario('');
        showEscribir();
    }

    const [commentArray, setCommentArray] = useState(comentarios ? comentarios : []);

    const addComment =()=>{
        if(comentario!=""){
        commentArray.push({
            comentario: comentario,
            username: nombre
        });

        db.collection('posts').doc(id).update({
            comentarios: commentArray
        }).then(function(){
            setComentario("");
            console.log("comment added");
        });

        }
    }

    useEffect(() => {
        database.ref('foto_perfil').child(data.currentUser.uid).on('value', snapshot =>{
            if(snapshot.val()!=null){
                setFotoActual(snapshot.val().Foto)
            }
        });
        database.ref('usuarios').child(data.currentUser.uid).on('value', snapshot =>{
            if(snapshot.val()!=null){
                setUsuario(snapshot.val().Nombre)
            }
        })

    }, [])

    return(
        <Router>
            <div className='publicaciones'>
                        <img className='foto' data-testid='foto' src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                        <h7 className='nombre' data-testid='nombre'><Link to ='#'>{nombre}</Link>, {carrera}</h7>
                        <p className='fecha' data-testid='fecha'>Publicado: {fecha}, {hora}</p>
                        <h9 className='correo' data-testid='correo'>{correo}</h9><br/>
                        <textarea className='cuerpo' data-testid='cuerpo' readOnly value={texto}></textarea><br/>
                        <img className='postimg' data-testid='postimg' src={postingImage} alt="Foto de post"/><br/>
                        <div className="likecomment" data-testid="likecomment">
                            <Like postkey={id}/>
                            
                        </div>
                        <div className="comentarios" data-testid='comentario'>
                        <CommentInput id={id} comentarios={comentarios} nombre={usuario}/>
                        <h5>Comentarios</h5>
                        <div className='scroll'>
                        {comentarios ? comentarios.map((comentario)=>
                            <Comments username={comentario.username} caption={comentario.comentario} foto={comentario.foto}/>
                        ): <></>}
                        </div>
                        </div>
                    </div> 
        </Router>
    );
 
}

export default Post;
import React, {useState, useEffect, Component} from 'react';
import "./style.css";
import * as AiIcons from 'react-icons/ai';
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";

function Post ({nombre, fecha, carrera, correo, texto, foto, hora, postingImage}) {
    var [like, setLike]=useState(false);
    var [comment, setComment]=useState(false);

    var [comentario, setComentario]=useState('');

    const likePost = () => setLike(!like);

    const commentPost =()=>setComment(!comment);    

    const [escribir,setEscribir] = useState(false);

    const showEscribir = () => setEscribir(!escribir);

    const borrar = () =>{
        setComentario('');
        showEscribir();
    }

    return(
            <div className='publicaciones'>
                        <img className='foto' data-testid='foto' src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                        <h7 className='nombre' data-testid='nombre'><Link to ='/perfil'>{nombre}</Link>, {carrera}</h7>
                        <p className='fecha' data-testid='fecha'>Publicado: {fecha}, {hora}</p>
                        <h9 className='correo' data-testid='correo'>{correo}</h9><br/>
                        <textarea className='cuerpo' data-testid='cuerpo' readOnly value={texto}></textarea><br/>
                        <img className='postimg' data-testid='postimg' src={postingImage} alt="Foto de post"/><br/>
                        <div className='likecomment' data-testid='likecomment'>
                            <div className='icons' data-testid='icons1'>
                                <label for='like' className='icon' data-testid='icon1'><p><AiIcons.AiFillHeart size='32px' style={like ? {fill:'#F44336'} : {fill: 'rgb(50, 50, 50)'}}/> Me gusta</p></label>
                                <input id='like' onClick={likePost} data-testid='like'/>
                            </div>
                            <div className='icons' data-testid='icons2'>
                                <label for='comment'><p className='icon' data-testid='icon2'><AiIcons.AiOutlineComment size='32px' style={{fill: 'black'}}/> Comentarios</p></label>
                                <input id='comment'  data-testid='comment' onClick={commentPost}/>
                            </div>
                        </div> 
                        <div className={comment ? 'sicomentarios': 'nocomentarios'} data-testid='haycomentarios'>
                        <div className={escribir ? 'escribir' :  'publicar'} data-testid='escribircomentarios'>
                            <img data-testid='perfil' src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                            <button className='pensamiento' data-testid='pensamiento' onClick={showEscribir}>¡Haz un Comentario!</button>
                            <textarea className='cuerpo' data-testid='comentar' value={comentario} placeholder='Escribe algo...' onChange={(e)=>setComentario(e.target.value)}></textarea><br/>
                            <div className='extras' data-testid='extras'>
                                <button className='cancelar' data-testid='cancelar' onClick={borrar}>Cancelar</button> 
                                <button className='postear' data-testid='postear'>Publicar</button>
                            </div>
                        </div>
                        </div>
                    </div> 

    );
 
}

export default Post;
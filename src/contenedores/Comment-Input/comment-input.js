import React, {useState, useEffect} from "react";
import "./style.css";
import data, {db, database} from './../../data.js'

function CommentInput({id, nombre, comentarios}){

    var [comment, setComment]=useState(false);

    var [comentario, setComentario]=useState('');


    const commentPost =()=>setComment(!comment);    

    const [escribir,setEscribir] = useState(false);

    const showEscribir = () => setEscribir(!escribir);

    const [fotoActual, setFotoActual] = useState('');

    const [commentArray, setCommentArray] = useState(comentarios ? comentarios : []);

    const borrar = () =>{
        setComentario('');
        showEscribir();
    }

    const addComment =()=>{
        if(comentario!=""){
        commentArray.push({
            comentario: comentario,
            username: nombre
        })
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
        })


    }, [])

    return(
        <section className="comment-input">
            <div className={escribir ? 'escribir' :  'publicar'} data-testid='escribircomentarios'>
                <img data-testid='perfil' src={fotoActual || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                <button className='pensamiento' data-testid='pensamiento' onClick={showEscribir}>¡Haz un Comentario!</button>
                <textarea className='cuerpo' data-testid='comentar' value={comentario} placeholder='Escribe algo...' onChange={(e)=>setComentario(e.target.value)}></textarea><br/>
                <div className='extras' data-testid='extras'>
                    <button className='cancelar' data-testid='cancelar' onClick={borrar}>Cancelar</button> 
                    <button className='postear' data-testid='postear' onClick={addComment}>Publicar</button>
                </div>
            </div>
        </section>

    )

}

export default CommentInput;
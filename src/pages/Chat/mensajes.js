import React, {useEffect, useState} from 'react';
import './mensajes.css';
import * as GrIcons from 'react-icons/gr';
import {useParams} from "react-router-dom";
import data,  { db, database } from '../../data';
import firebase from 'firebase';
import EmojiPicker from 'emoji-picker-react';


function Mensajes() {


const [input, setInput]=useState('');
const {chatId} = useParams();
const [chatName, setChatName]=useState('');
const [mensajes, setMensajes]=useState([]);
const [yo, setYo] = useState('');

const sendMessage=(e)=>{
    e.preventDefault();
    console.log('mensaje', input);

    db.collection('chats').doc(chatId).collection('mensajes').add({
        mensaje: input,
        nombre: yo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: data.currentUser.uid
    });

    setInput('');
}


useEffect(()=>{
    if(chatId){
        db.collection('chats').doc(chatId).onSnapshot(snapshot=>{
            setChatName(snapshot.data().nombre)
        });

        db.collection('chats').doc(chatId).collection('mensajes').orderBy('timestamp', 'asc').onSnapshot(snapshot=>{
            setMensajes(snapshot.docs.map(doc=>doc.data()))
        });
    }
}, [chatId])

useEffect(()=>{
    database.ref('usuarios').child(data.currentUser.uid).on('value', snaphot=>{
        if(snaphot.val()!=null){
            setYo(snaphot.val().Nombre);
        }
    });
}, [])


    return (
        <div className='mensajes'>
            <div className='mensajes__header'>
                <div className='mensajes__headerInfo'>
                    <h3>{chatName}</h3>
                    <p>{'Última Actividad: '+ new Date(
                        mensajes[mensajes.length-1]?.timestamp?.toDate()).toUTCString() || 'Sin fecha'
                    }</p>
                </div>
            </div>

            <div className='mensajes__body'>
                {mensajes.map(mensaje=>(
                    <p className={`mensajes__message ${mensaje.uid===data.currentUser.uid && 
                    'mensajes__receiver'}`}>
                    <span className='mensajes__name'>{mensaje.nombre}</span>
                    {mensaje.mensaje}<span className='mensajes__timestamp'>
                    {new Date(mensaje.timestamp?.toDate()).toUTCString()}
                    </span></p>
                ))}
            </div>

            <div className='mensajes__footer'>
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type='text' placeholder='Escribe algo...'/>
                    <button type='submit' onClick={sendMessage}>Enviar Mensaje</button>
                </form>
            </div>
        </div>
    )
}

export default Mensajes

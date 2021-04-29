import React, {useState} from 'react'
import './mensajes.css'
import * as GrIcons from 'react-icons/gr';
import {useParams} from "react-router-dom";

function Mensajes() {

const [input, setInput]=useState('');
const {chatId} = useParams();

const sendMessage=(e)=>{
    e.preventDefault();
    console.log('mensaje', input);
    setInput('');
}


    return (
        <div className='mensajes'>
            <div className='mensajes__header'>
                <img src='https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d' width='40px' height='40px'/>
                <div className='mensajes__headerInfo'>
                    <h3>Room name</h3>
                    <p>Last Seen at...</p>
                </div>
            </div>

            <div className='mensajes__body'>
                <p className={`mensajes__message ${true && 'mensajes__receiver'}`}><span className='mensajes__name'>Ken Pérez</span> Hola<span className='mensajes__timestamp'>3:50</span></p>
            </div>

            <div className='mensajes__footer'>
                <p color='black'><GrIcons.GrEmoji size='24px' style={{fill: 'gray'}}/></p>
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type='text' placeholder='Escribe algo...'/>
                    <button type='submit' onClick={sendMessage}>Enviar Mensaje</button>
                </form>
            </div>
        </div>
    )
}

export default Mensajes

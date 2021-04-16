import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as FaIcons from 'react-icons/fa';

const Buscar = () => {

    const [searchTerm, setSearchTerm]=useState('');
    const [usuarios, setUsuarios]=useState([]);

    useEffect(() => {
        database.ref('usuarios/').on('value', snapshot =>{
            if(snapshot.val()!=null)
            setUsuarios({
                ...snapshot.val()
            })
        })
    }, [])

    return(
    <section className="search">
            <Navbar/>
            <h3>Buscar</h3>
            <div className='buscador'>
                <FaIcons.FaSearch style={{fill: 'black'}}/>
                <input className='buscador_input' placeholder='Buscar...' value={searchTerm} type='text' onChange={(e)=>{setSearchTerm(e.target.value)}}/>
            </div>

            {
                Object.keys(usuarios).filter((val)=>{
                    if(searchTerm == ''){
                        return val;
                    } else if(usuarios[val].Nombre.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                    }
                }).map(id => {
                    const foto = database.ref('foto_perfil'+ usuarios[id].UID);

                return <div className='resultados'>
                    <img className='perfil' onError='ths.src = https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d' src={foto}></img>
                    <h5>{usuarios[id].Nombre}</h5>
                    <h7>Correo: {usuarios[id].Correo}</h7><br/>
                    <h7>Carrera: {usuarios[id].Carrera}</h7><br/>
                    <h7>Carnet #{usuarios[id].Carnet}</h7>
                </div>
                })
            }
    </section>
    );
}

export default Buscar;
import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import Follow from '../Follow/follow.js';

const Buscar = () => {

    const [searchTerm, setSearchTerm]=useState('');
    const [usuarios, setUsuarios]=useState([]);
    var [foto, setFoto] = useState('');
    const [fotosPerfil, setFotosPerfil]=useState([]);

    const [seguir, setSeguir] = useState(false);

    const follow = ()=> setSeguir(!seguir);

    useEffect(() => {
        database.ref('usuarios/').on('value', snapshot =>{
            if(snapshot.val()!=null)
            setUsuarios({
                ...snapshot.val()
            })
        })

        database.ref('foto_perfil/').on('value', snapshot =>{
            if(snapshot.val()!=null)
            setFotosPerfil({
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
                 return <div className='resultados'>
                    <img className='perfil' src ={ 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d' }></img>
                    <div className="resultados__left">
                        <h5>{usuarios[id].Nombre}</h5>
                        <h7>Correo: {usuarios[id].Correo}</h7><br/>
                        <h7>Carrera: {usuarios[id].Carrera}</h7><br/>
                        <h7>Carnet #{usuarios[id].Carnet}</h7>
                    </div>
                        <Follow useruid={usuarios[id].UID}/>
                    </div> 
                })
            }
    </section>
    );
}

export default Buscar;
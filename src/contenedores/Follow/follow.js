import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database, db} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';

function Follow ({useruid}){

    const [fotosPerfil, setFotosPerfil]=useState([]);

    const [seguir, setSeguir] = useState(false);

    const [seguidores, setSeguidores]=useState([]);


    const follow = ()=> {
        
        setSeguir(!seguir);


        database.ref('seguidores').child(data.currentUser.uid).child(useruid).set({
            Estado: seguir.toString()
        })

        
    }
    useEffect(() => {
        database.ref('seguidores/').child(data.currentUser.uid).child(useruid).on('value', snapshot =>{
            if(snapshot.val()!=null){
                if(snapshot.val().Estado == 'true'){
                    setSeguir(false)
                }
                else{
                    setSeguir(true)
                } 
            }
            else{
                setSeguir(true);
            }   
        })


    }, [])

    return(
        <section className="follow">
            <div onClick={follow} className={seguir? 'nosiguiendo' : 'siguiendo'}>
                <h5 className='no'><RiIcons.RiUserFollowFill style={{fill: 'black'}}/></h5>
                <p className = 'no'>Seguir</p>
                <h5 className='si'><RiIcons.RiUserUnfollowFill style={{fill: 'black'}}/></h5>
                <p className = 'si'>Dejar de Seguir</p>
            </div> 
        </section>
    );
}

export default Follow;
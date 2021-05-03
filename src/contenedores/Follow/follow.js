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

    const [yo, setYo] = useState('');
    const [el, setEl] = useState('');


    const follow = ()=> {
        
        setSeguir(!seguir);


        database.ref('seguidores').child(data.currentUser.uid).child(useruid).set({
            Estado: seguir.toString()
        }).then(function(){
            if(seguir==true){
                db.collection('chats').where("m1"||"m2",'==', useruid).get().then(docSnaphot=>{
                    if(docSnaphot.empty){
                        db.collection('chats').add({
                            nombre: el + ' y ' + yo,
                            m1: useruid,
                            m2: data.currentUser.uid
                        })
                    }
                    else{
                    }
                })
            }
        })
    }

    const seguirP =()=>{
        follow();
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

        database.ref('usuarios').child(data.currentUser.uid).on('value', snaphot=>{
            if(snaphot.val()!=null){
                setYo(snaphot.val().Nombre);
            }
        });

        database.ref('usuarios').child(useruid).on('value', snaphot=>{
            if(snaphot.val()!=null){
                setEl(snaphot.val().Nombre);
            }
        });


    }, [])

    return(
        <section className="follow">
            <div onClick={seguirP} className={seguir? 'nosiguiendo' : 'siguiendo'}>
                <h5 className='no'><RiIcons.RiUserFollowFill style={{fill: 'black'}}/></h5>
                <p className = 'no'>Seguir</p>
                <h5 className='si'><RiIcons.RiUserUnfollowFill style={{fill: 'black'}}/></h5>
                <p className = 'si'>Dejar de Seguir</p>
            </div> 
        </section>
    );
}

export default Follow;
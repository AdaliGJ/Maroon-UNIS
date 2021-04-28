import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database, db} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';

function Like ({postkey}){


    const [seguir, setSeguir] = useState(false);


    var [like, setLike]=useState(false);



    const likePost = ()=> {
        
        setLike(!like);


        database.ref('likes').child(data.currentUser.uid).child(postkey).set({
            Estado: like.toString(),
        })
        
    }
    useEffect(() => {
        database.ref('likes').child(data.currentUser.uid).child(postkey).on('value', snapshot =>{
            if(snapshot.val()!=null){
                if(snapshot.val().Estado == 'true'){
                    setLike(true)
                }
                else{
                    setLike(false)
                } 
            }
            else{
                setLike(false);
            }   
        })


    }, [])

    return(
        <section className="like">
             <div onClick={likePost} className={like? 'nolike' : 'silike'}>
                <h5 className='no'><AiIcons.AiFillHeart size='32px' style={{fill:'#F44336'}}/>Me Gusta</h5>
                <label for='no'></label>
                <h5 className='si'><AiIcons.AiFillHeart size='32px' style={{fill: "rgb(50, 50, 50)"}}/>Me Gusta</h5>
                <label for='si'></label>
            </div> 
        </section>
    );
}

export default Like;
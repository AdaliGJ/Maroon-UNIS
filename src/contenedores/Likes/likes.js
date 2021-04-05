import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as AiIcons from 'react-icons/ai';

const Likes = () => {

    var [posts, setPosts] = useState([]);

    const [like, setLike]=useState(false);
    var [likeColor, setLikeColor]=useState('#FFFFFF');

    const likePost = () => setLike(!like);
    const colorLike = () =>{
        if(like){
            return '#800000';
        }
        else{
            return '#FFFFFF';
        }
    }


    
    useEffect(() => {
        database.ref('posts/' + data.currentUser.uid).orderByChild('Orden_Fecha');
        database.ref(`posts/${data.currentUser.uid}`).on('value', snapshot =>{
            if(snapshot.val()!=null)
            setPosts({
                ...snapshot.val()
            })
        });
    }, [])

    return(
    <section className="meGusta">
         <div className='likesTotal'>
            <label className='heart' for='like'><h2><AiIcons.AiFillHeart style={{fill: {colorLike}}} /></h2></label>
            <input id='like' onClick={likePost}/>
        </div> 
    </section>
    );
}

export default Likes;
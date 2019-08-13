import React, { useEffect, useState } from 'react';

import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import logo from '../assets/logo.svg';
import './Main.css';
import api from '../services/api';

export default function Main({ match }){
    const [users, setUsers] = useState([]);
    
    useEffect(function(){   
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: { 
                    user: match.params.id,
                 }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    return (
        <div className="main-container">
            <img src={logo} alt="Tidev" />
            <ul>
                {users.map(function(user){
                    return(
                    <li key={user._id}>
                        <img src={user.avatar} alt="" />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button className="button">
                                <img src={dislike}  alt="Dislike" />
                            </button>
                            <button className="button">
                                <img src={like} alt="Like" />
                            </button>

                        </div>
                </li>
             )})}
            </ul>
        </div>


    )
}
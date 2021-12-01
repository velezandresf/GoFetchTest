import { Button } from '@mui/material';
import React from 'react';
import { useUserContext } from '../../context/userContext';

import './dashboard.css';

export const Dashboard = () => {
    const { user, logoutUser } = useUserContext();
    return (
         <div className='wraper'>
            <div className='userInformation'>
                {user.photoURL && 
                    <img src={user.photoURL} alt='githubphoto' width='50px'/>
                }
                <p>Name : {user.displayName}</p>
                <p>Email : {user.email}</p>
            </div>
            <div className='logoutButton'>
                <Button variant='contained' onClick={logoutUser}>Log Out</Button>
            </div>
    </div>
    
    )
}

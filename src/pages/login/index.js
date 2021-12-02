import React from 'react'
import { Button } from '@mui/material'
import { useUserContext } from '../../context/userContext';

export const Login = () => {

    const { signInWithGithub } = useUserContext();

    return (
        <Button variant="contained" onClick={signInWithGithub}>Login with GitHub</Button>
    )
}

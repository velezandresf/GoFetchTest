import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import './dashboard.css';
import DataTable from '../../components/datatable';
import { useGetRepositories } from '../../hooks/useGetRepositories';
import columns from '../../constants/repositoryColumns';

export const Dashboard = () => {

    const { user, logoutUser } = useUserContext();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(undefined);
  
    const { dataRepositories, loadingRepositories, errorRepositories } = useGetRepositories();

    useEffect(() => {
        (loadingRepositories) 
        ? setLoading(true) 
        : setLoading(false);
    }, [loadingRepositories]);

    useEffect(() => {
        (errorRepositories) 
        ? setError(errorRepositories)
        : setError(undefined);
    }, [errorRepositories]);

    if (loading) {
        return <div>
            loading
        </div>
    }

    if (error) {
        return <div>
            {error}
        </div>
    }

    return (
         <div className='wraper'>
            <div className='userInformation'>
                {user.photoURL && 
                    <img src={user.photoURL} alt='githubphoto' width='50px'/>
                }
                <p>Name : {user.displayName}</p>
                <p>Email : {user.email}</p>
            </div>

            <DataTable columns={columns} rows={dataRepositories}/>

            <div className='logoutButton'>
                <Button variant='contained' onClick={logoutUser}>Log Out</Button>
            </div>
    </div>
    
    )
};
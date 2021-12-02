import { useEffect, useState } from 'react'
import {GET_REPOSITORIES} from '../graphql/queries/repositories';
import {useQuery} from '@apollo/client';

export const useGetRepositories = () => {
    const [loadingRepositories, setLoadingRepositories] = useState(false);
    const [dataRepositories, setDataRepositories] = useState([]);
    const [errorRepositories, setErrorRepositories] = useState('');
    
    const { data, loading, error } = useQuery(GET_REPOSITORIES,  {
        variables: {first: 100},
      });

    useEffect(() => {
        setLoadingRepositories(loading);
    }, [loading])

    useEffect(() => {
        if (data) {
            const temp = []
            // eslint-disable-next-line array-callback-return
            data.viewer.repositories.nodes.map((item) => {
                const description = item.description;
                const name = item.name;
                const owner = item.owner.login;
                const languages = item.languages.nodes.map((elem) => (elem.name)).join(",");
                const licence = item.licenceInfo ? item.licenceInfo : '';
                const link = `https://github.com/${owner}/${name}`;
                temp.push({description, name, owner, languages, licence, link})
            })
            setDataRepositories(temp);
        }
    }, [data])

    useEffect(() => {
        error && 
       setErrorRepositories(error.message);
    }, [error])

    return {
        dataRepositories,
        loadingRepositories,
        errorRepositories,
    };
};

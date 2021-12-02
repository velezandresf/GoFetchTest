import { 
  ApolloClient, 
  createHttpLink, 
  InMemoryCache 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GITHUB_GRAPHQL_URL,
});


const authLink = setContext(async (_, { headers }) => {
  const token = await localStorage.getItem('token');
  console.log('token en configuracion',token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
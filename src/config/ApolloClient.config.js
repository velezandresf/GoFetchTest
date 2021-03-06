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
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getAllPosts: {
          merge: true,
          }
      },
    },
  },
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  defaultOptions: defaultOptions,
});
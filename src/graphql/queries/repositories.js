import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
query ($first: Int!) { 
    viewer {
        id
        repositories(first: $first) {
            totalCount
            nodes {
                id
              name
              description
              languages (first: 10) {
                nodes {
                  id
                  name
                  color
                }
              }
              licenseInfo {
                id
                name
              }
              owner {
                id
                login
              }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
}  
`;

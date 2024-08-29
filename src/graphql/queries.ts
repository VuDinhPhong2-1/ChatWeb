import { gql } from "@apollo/client";

export const VALIDATE_ACCESS_TOKEN_QUERY = gql`
  query ValidateAccessToken($access_token: String!) {
    validateAccessToken(access_token: $access_token) {
      id
      name
      email
      role
    }
  }
`;

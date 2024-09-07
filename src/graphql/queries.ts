import { gql } from "@apollo/client";

export const VALIDATE_ACCESS_TOKEN = gql`
  query ValidateAccessToken($access_token: String!) {
    validateAccessToken(access_token: $access_token)
  }
`;

export const VALIDATE_REFRESH_TOKEN = gql`
  query ValidateRefreshToken {
    validateRefreshToken
  }
`;

export const FIND_ONE_BY_EMAIL = gql`
  query FindOneByEmail($email: String!) {
    findOneByEmail(email: $email) {
      id
      name
      age
      email
      role
      avatar_url
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      name
      age
      email
      avatar_url
    }
  }
`;

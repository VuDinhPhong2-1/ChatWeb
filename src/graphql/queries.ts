import { gql } from "@apollo/client";

export const VALIDATE_ACCESS_TOKEN = gql`
  query ValidateAccessToken($access_token: String!) {
    validateAccessToken(access_token: $access_token)
  }
`;

export const VALIDATE_REFRESH_TOKEN = gql`
  query ValidateRefreshToken($refresh_token: String!) {
    validateRefreshToken(refresh_token: $refresh_token)
  }
`;

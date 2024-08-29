import { gql } from "@apollo/client";

// Mutation để login
export const LOGIN_MUTATION = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      refresh_token
    }
  }
`;

// Mutation để làm mới token
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefresherToken($refresh_token: String!) {
    refresherToken(refresh_token: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;

// Mutation để logout
export const LOGOUT_MUTATION = gql`
  mutation Logout($userId: String!) {
    logout(userId: $userId)
  }
`;

// Query để lấy thông tin người dùng từ token
export const GET_USER_FROM_TOKEN_QUERY = gql`
  query GetUserFromToken($access_token: String!) {
    getUserFromToken(access_token: $access_token) {
      id
      name
      email
      avatar_url
      role
    }
  }
`;

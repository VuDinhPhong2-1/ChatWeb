import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Tạo HttpLink để kết nối với GraphQL API
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_REACT_APP_GRAPHQL_URI,
  credentials: "include", // URL của GraphQL API
});

// Sử dụng setContext để thêm Authorization header vào mỗi request
const authLink = setContext((_, { headers }) => {
  // Lấy token từ sessionStorage hoặc localStorage (tùy vào nơi bạn lưu trữ token)
  const token = sessionStorage.getItem("access_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined, // Thêm token vào Authorization header
    },
  };
});

// Tạo Apollo Client instance
const client = new ApolloClient({
  link: from([authLink, httpLink]), // Kết hợp authLink và httpLink
  cache: new InMemoryCache(), // Sử dụng InMemoryCache để lưu trữ cache
});

export default client;

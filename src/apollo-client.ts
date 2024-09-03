import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// Tạo các link HTTP riêng biệt cho từng URI
const link1 = new HttpLink({
  uri: import.meta.env.VITE_REACT_APP_GRAPHQL_URI2,
});
const link2 = new HttpLink({
  uri: import.meta.env.VITE_REACT_APP_GRAPHQL_URI3,
});

// Tạo một ApolloLink để thử kết nối đến link1 trước, nếu thất bại thì chuyển sang link2
const fallbackLink = ApolloLink.from([
  new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      if (!response.errors) {
        // Nếu không có lỗi thì trả về response từ URI đầu tiên (link1)
        return response;
      }
      throw new Error("Primary backend failed");
    })
  ).concat(link1),
  link2,
]);

const client = new ApolloClient({
  link: fallbackLink,
  cache: new InMemoryCache(),
});

export default client;

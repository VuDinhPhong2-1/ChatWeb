import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { VALIDATE_ACCESS_TOKEN_QUERY } from "../graphql/queries";
import { REFRESH_TOKEN_MUTATION } from "../graphql/mutations";

export const useAuth = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = sessionStorage.getItem("access_token");
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (accessToken) {
        try {
          await client.query({
            query: VALIDATE_ACCESS_TOKEN_QUERY,
            variables: { access_token: accessToken },
            fetchPolicy: "no-cache",
          });
          setIsAuthenticated(true);
          return;
        } catch (error) {
          console.error("Access token is invalid or expired:", error);
        }
      }

      if (refreshToken) {
        try {
          console.log("Attempting to refresh token with:", refreshToken);

          const { data } = await client.mutate({
            mutation: REFRESH_TOKEN_MUTATION,
            variables: { refresh_token: refreshToken },
            fetchPolicy: "no-cache",
          });

          if (data && data.refresherToken) {
            sessionStorage.setItem(
              "access_token",
              data.refresherToken.access_token
            );
            sessionStorage.setItem(
              "refresh_token",
              data.refresherToken.refresh_token
            );

            console.log("Tokens refreshed and saved successfully");
            setIsAuthenticated(true);
            return;
          } else {
            console.error(
              "Token refresh failed, no refresherToken in response"
            );
            navigate("/signin");
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
          navigate("/signin");
        }
      } else {
        console.log("No valid tokens, redirecting to signin");
        navigate("/signin");
      }
    };

    checkAuth();
  }, [client, navigate]);

  return { isAuthenticated };
};

import { useMutation, useQuery } from "@apollo/client";
import {
  VALIDATE_ACCESS_TOKEN,
  VALIDATE_REFRESH_TOKEN,
} from "../graphql/queries";
import { REFRESH_TOKEN_MUTATION } from "../graphql/mutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = (route: string) => {
  const accessToken = sessionStorage.getItem("access_token");
  const refreshToken = sessionStorage.getItem("refresh_token");
  const navigate = useNavigate();

  const { data: accessData, error: accessError } = useQuery(
    VALIDATE_ACCESS_TOKEN,
    {
      variables: { access_token: accessToken },
      skip: !accessToken,
    }
  );

  const { data: refreshData, error: refreshError } = useQuery(
    VALIDATE_REFRESH_TOKEN,
    {
      variables: { refresh_token: refreshToken },
      skip: !refreshToken,
    }
  );

  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

  useEffect(() => {
    if (accessToken && accessData && !accessError) {
      navigate(`/${route}`);
    } else if (refreshToken && refreshData && !refreshError) {
      refreshTokenMutation({
        variables: { refresh_token: refreshToken },
        onCompleted: (data) => {
          sessionStorage.setItem(
            "access_token",
            data.refresherToken.access_token
          );
          sessionStorage.setItem(
            "refresh_token",
            data.refresherToken.refresh_token
          );

          navigate(`/${route}`);
        },
        onError: () => {
          navigate("/signin");
        },
      });
    } else if (!accessToken && !refreshToken) {
      navigate("/signin");
    }
  }, [
    accessData,
    refreshData,
    accessError,
    refreshError,
    navigate,
    accessToken,
    refreshToken,
    refreshTokenMutation,
    route,
  ]);
};

export default useAuth;

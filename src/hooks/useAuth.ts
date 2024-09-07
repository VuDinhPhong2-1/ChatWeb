import { useMutation, useQuery } from "@apollo/client";
import {
  VALIDATE_ACCESS_TOKEN,
  VALIDATE_REFRESH_TOKEN,
} from "../graphql/queries";
import { PROCESS_NEW_TOKEN_MUTATION } from "../graphql/mutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = (routeFrom: string, routeTo: string) => {
  const accessToken = sessionStorage.getItem("access_token");
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
    {}
  );

  const [processNewTokenMutation] = useMutation(PROCESS_NEW_TOKEN_MUTATION);

  useEffect(() => {
    if (accessToken && accessData && !accessError) {
      navigate(`/${routeFrom}`);
    } else if (refreshData && !refreshError) {
      processNewTokenMutation({
        onCompleted: (data) => {
          sessionStorage.setItem(
            "access_token",
            data.processNewToken.access_token
          );
          navigate(`/${routeFrom}`);
        },
        onError: () => {
          navigate(`/${routeTo}`);
        },
      });
    } else if (!accessToken) {
      navigate(`/${routeTo}`);
    }
  }, [
    accessData,
    refreshData,
    accessError,
    refreshError,
    navigate,
    accessToken,
    processNewTokenMutation,
    routeFrom,
    routeTo,
  ]);
};

export default useAuth;

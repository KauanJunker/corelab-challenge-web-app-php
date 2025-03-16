import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../utils/api";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

interface SignUpInterface {
  email: string;
  name: string;
  password: string;
  c_password: string;
}

interface SignInInterface {
  email: string;
  password: string;
}

interface SignInResponse {
  message: string;
  access_token: string;
  username: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SignInResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated, setUserName } = useAuthContext();
  const navigate = useNavigate(); // Criando o navegador

  const signUp = async (user: SignUpInterface) => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<SignInResponse> = await apiClient.post(
        "/v1/user/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
          c_password: user.c_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setData(response.data);
      navigate("/login");
    } catch {
      setError("Não foi possível conectar a API!");
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const signIn = async (user: SignInInterface) => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<SignInResponse> = await apiClient.post(
        "/v1/user/login",
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setData(response.data);
      toast.success(response.data.message);
    } catch {
      toast.error("E-mail ou senha incorretos");
      setError("Não foi possível conectar a API!");
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);
      setUserName(data.username);
      setIsAuthenticated(true);
    }
  }, [data, setIsAuthenticated, setUserName]);
  return { signUp, signIn, isLoading, error, data };
};

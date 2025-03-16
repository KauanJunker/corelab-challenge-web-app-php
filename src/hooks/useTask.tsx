import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../utils/api";

interface TaskData {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
  color: string;
}

export const useTask = () => {
  const [data, setData] = useState<TaskData[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<TaskData[]> = await apiClient("/v1/task");
      setData(response.data);
    } catch {
      setError("Não foi possível conectar a api!");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { data, error, isLoading };
};

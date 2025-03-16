import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContext, useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import apiClient from "../utils/api";
import {
  AddTaskResponse,
  TaskContextType,
  TaskData,
  TaskInterface,
} from "../types/tasks";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async (queryParams?: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = queryParams ? `/v1/task?${queryParams}` : "/v1/task";

      const response: AxiosResponse<TaskData[]> = await apiClient.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch {
      setError("Não foi possível conectar à API!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = async (task: TaskInterface) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<AddTaskResponse> = await apiClient.post(
        "/v1/task",
        {
          title: task.title,
          description: task.description,
          favorite: task.favorite,
          color: task.color,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchData();
      toast.success(response.data.message);
    } catch (error) {
      let errorMessage = "Não foi possível conectar à API!";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || "Erro desconhecido";
      }

      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  const editTask = async (task: TaskInterface, taskId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<AddTaskResponse> = await apiClient.put(
        `/v1/task/${taskId}`,
        {
          title: task.title,
          description: task.description,
          favorite: task.favorite,
          color: task.color,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchData();
      toast.success(response.data.message);
    } catch {
      setError("Não foi possível conectar à API!");
    }
  };

  const removeTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<AddTaskResponse> = await apiClient.delete(
        `/v1/task/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchData();
      toast.success(response.data.message);
    } catch {
      setError("Não foi possível conectar à API!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TaskContext.Provider
      value={{
        data,
        filteredData,
        isLoading,
        error,
        addTask,
        fetchData,
        removeTask,
        editTask,
        search,
        setSearch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

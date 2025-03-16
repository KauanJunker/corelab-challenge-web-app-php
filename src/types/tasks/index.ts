import { Dispatch, SetStateAction } from "react";

export interface TaskContextType {
  data: TaskData[];
  isLoading: boolean;
  error: string | undefined;
  addTask: (task: TaskInterface) => Promise<void>;
  editTask: (task: TaskInterface, taskId: number) => Promise<void>;
  fetchData: (queryParams?: string) => Promise<void>;
  removeTask: (taskId: number) => Promise<void>;
  filteredData: TaskData[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
  color: string;
}

export interface TaskInterface {
  title: string;
  description: string;
  favorite?: boolean;
  color?: string;
}

export interface AddTaskResponse {
  message: string;
}

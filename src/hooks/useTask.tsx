import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask deve ser usado dentro de um TaskProvider");
  }
  return context;
};

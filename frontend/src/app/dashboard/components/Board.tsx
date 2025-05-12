"use client";
import { useState } from "react";
import Column from "./Column";

export interface Task {
  id: string;
  name: string;
  desc: string;
  category: string;
  assignee: string;
  deadline: string;
  reminder: boolean;
  status: "To-do" | "In-progress" | "Done";
}
const STATUSES: Task["status"][] = ["To-do", "In-progress", "Done"];

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]); //aLL TASKS ARE STORED

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleStatusChange = (id: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto justify-center">
      {STATUSES.map(
        (
          status //for each status, create col, & pass add&update status func
        ) => (
          <Column
            key={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
            onAddTask={handleAddTask}
            onStatusChange={handleStatusChange}
          />
        )
      )}
    </div>
  );
};

export default Board;

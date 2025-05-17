"use client";
import { useEffect, useState } from "react";
import Column from "./Column";

export interface Task {
  _id: string;
  name: string;
  description: string;
  category: string;
  assignee: string;
  Deadline: string;
  Reminder: boolean;
  status: "To-do" | "In-progress" | "Done";
}
const STATUSES: Task["status"][] = ["To-do", "In-progress", "Done"];

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]); //aLL TASKS ARE STORED

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/chores");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleStatusChange = async (_id: string, newStatus: Task["status"]) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === _id ? { ...task, status: newStatus } : task
        )
      );

      const response = await fetch(`http://localhost:4000/api/chores/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (_id: string) => {
    try {
      await fetch(`http://localhost:4000/api/chores/${_id}`, {
        method: "DELETE",
      });
      setTasks((prev) => prev.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = async (_id: string, updatedData: Partial<Task>) => {
    try {
      const response = await fetch(`http://localhost:4000/api/chores/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === _id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
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
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )
      )}
    </div>
  );
};

export default Board;

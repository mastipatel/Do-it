"use client";
import React, { useState } from "react";
import Card from "./Card";

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

interface ColumnProps {
  title: Task["status"];
  onStatusChange: (id: string, newStatus: Task["status"]) => void;
}

const Column: React.FC<ColumnProps> = ({ title, onStatusChange }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Omit<Task, "id">>({
    name: "",
    desc: "",
    category: "",
    assignee: "",
    deadline: "",
    reminder: false,
    status: title,
  });

  const handleAddTask = () => {
    const newTask: Task = { id: crypto.randomUUID(), ...formData };
    setTasks((prev) => [...prev, newTask]);
    setFormData({
      ...formData,
      name: "",
      desc: "",
      assignee: "",
      deadline: "",
      category: "",
      reminder: false,
    });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded w-80 min-w-[20rem] shadow flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="flex flex-col gap-4 flex-1 mb-4">
        {tasks.map((task) => (
          <Card key={task.id} {...task} onStatusChange={onStatusChange} />
        ))}
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          + Add Task
        </button>
      ) : (
        <div className="bg-white p-3 rounded shadow flex flex-col gap-2">
          <input
            type="text"
            placeholder="Task name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-1 rounded text-sm"
          />
          <input
            type="text"
            placeholder="Assignee"
            value={formData.assignee}
            onChange={(e) =>
              setFormData({ ...formData, assignee: e.target.value })
            }
            className="border p-1 rounded text-sm"
          />
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            className="border p-1 rounded text-sm"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white text-sm px-2 py-1 rounded mt-1"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;

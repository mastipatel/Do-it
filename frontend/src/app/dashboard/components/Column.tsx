"use client";
import React, { useState } from "react";
import Card from "./Card";
import type { Task } from "./Board";
interface ColumnProps {
  title: Task["status"];
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onStatusChange: (id: string, newStatus: Task["status"]) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  onAddTask,
  onStatusChange,
}) => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Omit<Task, "_id">>({
    name: "",
    description: "",
    category: "",
    assignee: "",
    Deadline: "",
    Reminder: false,
    status: title,
  });

  const handleAddTask = async () => {
    const data = { ...formData };

    try {
      const res = await fetch("http://localhost:4000/api/chores/add-chore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const savedChore = await res.json();

      onAddTask(savedChore);
      setFormData({
        name: "",
        description: "",
        category: "",
        assignee: "",
        Deadline: "",
        Reminder: false,
        status: title,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding chore:", error);
    }
  };

  return (
    <div className="column">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="flex flex-col gap-4 flex-1 mb-4">
        {tasks.map((task) => (
          <Card key={task._id} {...task} onStatusChange={onStatusChange} /> //For each task, it renders a card and passes all information to the card component
        ))}
      </div>

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="button">
          + Add Task
        </button>
      ) : (
        <div className="bg-white p-3 rounded shadow flex flex-col gap-2">
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="border p-1 rounded text-sm"
          >
            <option value="">Select category</option>
            <option value="kitchen">Kitchen</option>
            <option value="bathroom">Bathroom</option>
            <option value="backyard">Backyard</option>
          </select>
          <input
            type="text"
            placeholder="Task name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-1 rounded text-sm"
          />
          <input
            type="text"
            placeholder="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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
            value={formData.Deadline}
            onChange={(e) =>
              setFormData({ ...formData, Deadline: e.target.value })
            }
            className="border p-1 rounded text-sm"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded mt-1"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;

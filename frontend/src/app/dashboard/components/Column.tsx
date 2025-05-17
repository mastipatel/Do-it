"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import type { Task } from "./Board";
interface ColumnProps {
  title: Task["status"];
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onStatusChange: (id: string, newStatus: Task["status"]) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedData: Partial<Task>) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  onAddTask,
  onStatusChange,
  onDelete,
  onEdit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState<false | Task>(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    assignee: "",
    Deadline: "",
    Reminder: false,
    status: title,
  });

  useEffect(() => {
    if (editForm) {
      setFormData({
        name: editForm.name,
        description: editForm.description,
        category: editForm.category,
        assignee: editForm.assignee,
        Deadline: editForm.Deadline,
        Reminder: editForm.Reminder,
        status: editForm.status,
      });
    }
  }, [editForm]);

  const handleAddTask = async () => {
    const data = { ...formData };
    if (!data.name || !data.description || !data.category || !data.assignee) {
      alert("Please fill in all fields");
      return;
    }

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

  const handleLocalDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting chore:", error);
    }
  };

  const handleLocalEdit = async (id: string, updatedData: Partial<Task>) => {
    try {
      await onEdit(id, updatedData);
    } catch (error) {
      console.error("Error editing chore:", error);
    }
  };

  return (
    <div className="column">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="flex flex-col gap-4 flex-1 mb-4">
        {tasks.map((task: Task) => (
          <Card
            key={task._id}
            {...task}
            onStatusChange={onStatusChange}
            onDelete={handleLocalDelete}
            onEdit={handleLocalEdit}
          />
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
            value={formData.Deadline?.slice(0, 10) || ""}
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

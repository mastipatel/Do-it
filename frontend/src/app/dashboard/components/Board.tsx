"use client";
import { useEffect, useState } from "react";
import Column from "./Column";

import {
  getAllChores,
  updateChore,
  deleteChore,
  createChore,
} from "../../../../services/chores";

export interface Chore {
  _id: string;
  name: string;
  description: string;
  category: string;
  assignee: string;
  Deadline: string;
  Reminder: boolean;
  status: "To-do" | "In-progress" | "Done";
}

const STATUSES: Chore["status"][] = ["To-do", "In-progress", "Done"];

const Board = () => {
  const [chores, setChores] = useState<Chore[]>([]); // all chores

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const data = await getAllChores();
        setChores(data);
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };

    fetchChores();
  }, []);

  const handleAddChore = (chore: Chore) => {
    setChores((prev) => [...prev, chore]);
  };

  const handleStatusChange = async (
    _id: string,
    newStatus: Chore["status"]
  ) => {
    try {
      const updated = await updateChore(_id, { status: newStatus });
      setChores((prev) =>
        prev.map((chore) => (chore._id === _id ? updated : chore))
      );
    } catch (error) {
      console.error("Error updating chore status:", error);
    }
  };

  const handleDeleteChore = async (_id: string) => {
    try {
      await deleteChore(_id);
      setChores((prev) => prev.filter((chore) => chore._id !== _id));
    } catch (error) {
      console.error("Error deleting chore:", error);
    }
  };

  const handleEditChore = async (_id: string, updatedData: Partial<Chore>) => {
    try {
      const updated = await updateChore(_id, updatedData);
      setChores((prev) =>
        prev.map((chore) => (chore._id === _id ? updated : chore))
      );
    } catch (error) {
      console.error("Error editing chore:", error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-4 p-4 overflow-x-auto justify-center max-w-7xl w-full">
        {STATUSES.map((status) => (
          <Column
            key={status}
            title={status}
            chores={chores.filter((chore) => chore.status === status)}
            onAddChore={handleAddChore}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteChore}
            onEdit={handleEditChore}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;

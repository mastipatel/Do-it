"use client";
import { useState } from "react";
import Column from "./Column";

const STATUSES = ["To-do", "In-progress", "Done"] as const;

const Board = () => {
  const handleStatusChange = (
    id: string,
    status: "To-do" | "In-progress" | "Done"
  ) => {
    console.log("Task", id, "changed to", status);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {STATUSES.map((status) => (
        <Column
          key={status}
          title={status}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default Board;

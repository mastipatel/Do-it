"use client";
import React, { useState } from "react";

export interface CardProps {
  id: string;
  name: string;
  desc: string;
  category: string;
  assignee: string;
  deadline: string;
  reminder: boolean;
  status: "To-do" | "In-progress" | "Done";
  onStatusChange: (id: string, newStatus: CardProps["status"]) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [localStatus, setLocalStatus] = useState(props.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as CardProps["status"];
    setLocalStatus(newStatus);
    props.onStatusChange(props.id, newStatus);
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white p-4 rounded shadow cursor-pointer"
      >
        <div className="font-semibold text-gray-900 mb-1">{props.name}</div>
        <div className="text-xs text-gray-500">{props.assignee}</div>
        <div className="text-xs text-gray-500">Due: {props.deadline}</div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{props.name}</h2>
            <p>
              <strong>Category:</strong> {props.category || "None"}
            </p>
            <p>
              <strong>Description:</strong> {props.desc || "No description"}
            </p>
            <p>
              <strong>Assignee:</strong> {props.assignee}
            </p>
            <p>
              <strong>Deadline:</strong> {props.deadline}
            </p>
            <label className="block mt-2 text-sm font-medium">
              Change Status:
              <select
                value={props.status}
                onChange={(e) =>
                  props.onStatusChange(
                    props.id,
                    e.target.value as CardProps["status"]
                  )
                }
                className="ml-2 border p-1 rounded text-sm"
              >
                <option value="To-do">To-do</option>
                <option value="In-progress">In-progress</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

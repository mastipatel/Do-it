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

  return (
    <>
      <div
        className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="font-semibold text-gray-900 mb-1">{props.name}</div>
        <div className="text-xs text-gray-500">{props.assignee}</div>
        <div className="text-xs text-gray-500">Due: {props.deadline}</div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{props.name}</h2>
            <p>
              <strong>Category:</strong> {props.category}
            </p>
            <p>
              <strong>Status:</strong> {props.status}
            </p>
            <p>
              <strong>Assignee:</strong> {props.assignee}
            </p>
            <p>
              <strong>Deadline:</strong> {props.deadline}
            </p>
            {props.reminder && (
              <p className="text-yellow-700 font-medium">Reminder is set</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

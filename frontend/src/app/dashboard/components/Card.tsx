"use client";
import React, { useState } from "react";
import clsx from "clsx";

export interface CardProps {
  _id: string;
  name: string;
  description: string;
  category: string;
  assignee: string;
  Deadline: string;
  Reminder: boolean;
  status: "To-do" | "In-progress" | "Done";
  onStatusChange: (id: string, newStatus: CardProps["status"]) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedData: Partial<CardProps>) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setShowModal(true);
          //setEditModal(true);
        }}
      >
        <div
          className={clsx("relative pt-4 px-4 pb-4 border rounded-xl shadow", {
            "bg-pink-50 hover:bg-pink-100": props.status === "To-do",
            "bg-blue-50 hover:bg-blue-100": props.status === "In-progress",
            "bg-green-50 hover:bg-green-100": props.status === "Done",
          })}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="font-semibold text-gray-500">{props.name}</div>

            <div className="flex space-x-2">
              <button
                className="hover:bg-gray-200 rounded px-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModal(true);
                  setShowModal(true);
                }}
              >
                ✎
              </button>
              <button
                className="text-red-500 hover:bg-pink-50 rounded px-1"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Are you sure you want to delete this task?")) {
                    props.onDelete(props._id);
                  }
                  setShowModal(false);
                }}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-1 text-xs text-gray-500">
            <div>{props.assignee}</div>
            <div>{props.category}</div>
            <div>
              Due:{" "}
              {typeof props.Deadline === "string"
                ? props.Deadline.slice(0, 10)
                : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative border-3">
            <button
              className="absolute top-2 right-2 hover:bg-gray-200 rounded px-1"
              onClick={() => {
                setShowModal(false);
                setEditModal(false);
              }}
            >
              ✕
            </button>

            {editModal ? (
              <>
                <h2 className="text-lg font-semibold mb-2">Edit chore</h2>

                <select
                  value={props.category}
                  onChange={(e) =>
                    props.onEdit(props._id, { category: e.target.value })
                  }
                  className="w-full border p-1 mb-2 rounded text-sm hover:bg-gray-100"
                >
                  <option value="">Select category</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="backyard">Backyard</option>
                </select>
                <input
                  type="text"
                  value={props.name}
                  placeholder="Task name"
                  onChange={(e) =>
                    props.onEdit(props._id, { name: e.target.value })
                  }
                  className="w-full border p-1 mb-2 rounded text-sm hover:bg-gray-100"
                />
                <textarea
                  value={props.description}
                  placeholder="description"
                  onChange={(e) =>
                    props.onEdit(props._id, { description: e.target.value })
                  }
                  className="w-full border p-1 mb-2 rounded text-sm hover:bg-gray-100"
                />
                <input
                  type="text"
                  value={props.assignee}
                  placeholder="assignee"
                  onChange={(e) =>
                    props.onEdit(props._id, { assignee: e.target.value })
                  }
                  className="w-full border p-1 mb-2 rounded text-sm hover:bg-gray-100"
                />
                <input
                  type="date"
                  value={props.Deadline?.slice(0, 10) || ""}
                  placeholder="Deadline"
                  onChange={(e) =>
                    props.onEdit(props._id, { Deadline: e.target.value })
                  }
                  className="w-full border p-1 mb-2 rounded text-sm hover:bg-gray-100"
                />
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  onClick={() => {
                    setEditModal(false);
                    setShowModal(false);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">{props.name}</h2>
                <p>
                  <strong>Category:</strong> {props.category || "None"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {props.description || "No description"}
                </p>
                <p>
                  <strong>Assignee:</strong> {props.assignee}
                </p>
                <p>
                  <strong>Deadline:</strong> {props.Deadline?.slice(0, 10)}
                </p>
                <label className="block mt-2 text-sm font-medium">
                  Change Status:
                  <select
                    value={props.status}
                    onChange={(e) =>
                      props.onStatusChange(
                        props._id,
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

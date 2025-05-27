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

interface CreateChoreRequest {
  assignee: string;
  name: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
}

interface UpdateChoreRequest {
  assignee?: string;
  name?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  status?: "To-do" | "In-progress" | "Done"; 
}

interface ChoreResponse {
  message?: string;
}

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'https://do-it-backend-de38.onrender.com';
};

// Get all chores
export const getAllChores = async (): Promise<Chore[]> => {
  const res = await fetch(`${getBaseUrl()}/api/chores`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

// Get a single chore by ID
export const getChoreById = async (id: string): Promise<Chore> => {
  const res = await fetch(`${getBaseUrl()}/api/chores/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

// Get chores by email (assignee)
export const getChoresByEmail = async (email: string): Promise<Chore[]> => {
  const res = await fetch(`${getBaseUrl()}/api/chores/by-email/${email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

// Create a new chore
export const createChore = async (choreData: CreateChoreRequest): Promise<Chore> => {
  const res = await fetch(`${getBaseUrl()}/api/chores/add-chore`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(choreData),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

// Update a chore
export const updateChore = async (id: string, choreData: UpdateChoreRequest): Promise<Chore> => {
  const res = await fetch(`${getBaseUrl()}/api/chores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(choreData),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

// Delete a chore
export const deleteChore = async (id: string): Promise<ChoreResponse> => {
  const res = await fetch(`${getBaseUrl()}/api/chores/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

// Mark chore as completed (convenience method)
export const markChoreAsCompleted = async (id: string): Promise<Chore> => {
  return updateChore(id, { completed: true });
};

// Mark chore as incomplete (convenience method)
export const markChoreAsIncomplete = async (id: string): Promise<Chore> => {
  return updateChore(id, { completed: false });
};

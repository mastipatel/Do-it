interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  email?: string;
  message?: string;
}

export const signInUser = async (credentials: SignInRequest): Promise<SignInResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const res = await fetch(`${baseUrl}/api/users/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

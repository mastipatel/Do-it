interface SignUpRequest {
  email: string;
  password: string;
}

interface SignUpResponse {
  email?: string;
  message?: string;
}

export const signUpUser = async (credentials: SignUpRequest): Promise<SignUpResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  
  const res = await fetch(`${baseUrl}/api/users/sign-up`, {
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

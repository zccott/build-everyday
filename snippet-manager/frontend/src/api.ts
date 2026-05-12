const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";

const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  signup: async (username: string, password: string): Promise<any> => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  },

  login: async (username: string, password: string): Promise<any> => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    return data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },

  getSnippets: async (search: string = ""): Promise<any[]> => {
    const url = search ? `${API_URL}/snippets/?search=${search}` : `${API_URL}/snippets/`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch snippets");
    return res.json();
  },

  createSnippet: async (snippet: { title: string; language: string; code: string }): Promise<any> => {
    const res = await fetch(`${API_URL}/snippets/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(snippet),
    });
    if (!res.ok) throw new Error("Failed to create snippet");
    return res.json();
  },

  deleteSnippet: async (id: number): Promise<any> => {
    const res = await fetch(`${API_URL}/snippets/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete snippet");
    return res.json();
  },
};


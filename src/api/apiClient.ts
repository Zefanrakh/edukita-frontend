import { store } from "../redux/store";
import { logout } from "../redux/authSlice";
import { notification } from "antd";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const apiClient = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {
  const state = store.getState();
  const token = state.auth.token;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      store.dispatch(logout());
      notification.error({
        message: "Session Expired",
        description: "Your session has expired. Please log in again.",
      });
      return;
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    console.error("API Error:", error);

    notification.error({
      message: "API Error",
      description: error.message || "An unexpected error occurred.",
    });

    throw error;
  }
};

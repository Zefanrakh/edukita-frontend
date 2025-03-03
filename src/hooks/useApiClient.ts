import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";
import { apiClient } from "../api/apiClient";

export const useApiClient = () => {
  const dispatch = useDispatch<AppDispatch>();
  const apiWithRedirect = async (
    endpoint: string,
    method: string = "GET",
    body?: any
  ) => {
    try {
      const data = await apiClient(endpoint, method, body);
      return data;
    } catch (error: any) {
      if (error.message === "Session Expired") {
        dispatch(logout());
      }
      throw error;
    }
  };

  return { apiClient: apiWithRedirect };
};

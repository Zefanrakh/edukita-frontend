import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return { isAuthenticated: !!token };
};

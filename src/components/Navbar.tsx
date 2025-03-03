import { Flex, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../types/enums/Role.enum";

const Navbar = () => {
  /* --------------------- STATE HOOK --------------------- */

  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  /* --------------------- HOOK --------------------- */

  const navigate = useNavigate();
  const location = useLocation();

  /* --------------------- FUNCTION --------------------- */

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* --------------------- RENDER --------------------- */

  return (
    <Flex justify="space-between" align="center">
      <div style={{ flex: 1 }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname.slice(1)]}
          items={
            token
              ? [{ key: "logout", label: "Logout", onClick: handleLogout }]
              : [
                  {
                    key: "login",
                    label: "Login",
                    onClick: () => navigate("/login"),
                  },
                  {
                    key: "register",
                    label: "Register",
                    onClick: () => navigate("/register"),
                  },
                ]
          }
        />
      </div>
      {user && token ? (
        <h1 style={{ paddingRight: 20, marginBottom: 0 }}>
          {user?.role === Role.Student
            ? "Student Dashboard"
            : "Teacher Dashboard"}
        </h1>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Navbar;

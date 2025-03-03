import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  /* --------------------- HOOK --------------------- */

  const navigate = useNavigate();

  /* --------------------- RENDER --------------------- */

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(e) => navigate(e.key)}
          items={[
            { key: "/assignment", label: "Assignments" },
            { key: "/grade", label: "Grades" },
          ]}
        />
      </Sider>
      <Outlet />
    </Layout>
  );
}

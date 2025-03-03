import React from "react";
import { Layout } from "antd";
import AssignmentList from "../components/AssignmentList";
import HeaderTitle from "../components/HeaderTitle";

const { Content } = Layout;

const Assignment: React.FC = () => {
  /* --------------------- RENDER --------------------- */

  return (
    <Layout>
      <HeaderTitle title="Assignment" />
      <Content style={{ margin: "16px" }}>
        <AssignmentList />
      </Content>
    </Layout>
  );
};

export default Assignment;

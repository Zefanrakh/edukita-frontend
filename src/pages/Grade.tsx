import React from "react";
import { Layout } from "antd";
import HeaderTitle from "../components/HeaderTitle";
import GradeList from "../components/GradeList";

const { Content } = Layout;

const Grade: React.FC = () => {
  /* --------------------- RENDER --------------------- */

  return (
    <Layout>
      <HeaderTitle title="Grade" />
      <Content style={{ margin: "16px" }}>
        <GradeList />
      </Content>
    </Layout>
  );
};

export default Grade;

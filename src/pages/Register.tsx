import React, { useState } from "react";
import { Form, Input, Button, Card, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../hooks/useApiClient";

const { Option } = Select;

const Register: React.FC = () => {
  /* --------------------- HOOK --------------------- */

  const { apiClient } = useApiClient();
  const navigate = useNavigate();

  /* --------------------- STATE HOOK --------------------- */

  const [loading, setLoading] = useState(false);

  /* --------------------- FUNCTION --------------------- */

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setLoading(true);
    try {
      apiClient("/auth/register", "POST", {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      message.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };

  /* --------------------- RENDER --------------------- */

  return (
    <Card
      title="Register"
      style={{ width: 400, margin: "auto", marginTop: "100px" }}
    >
      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select>
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Register
        </Button>
      </Form>
    </Card>
  );
};

export default Register;

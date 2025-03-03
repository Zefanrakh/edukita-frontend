import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useApiClient } from "../hooks/useApiClient";

const Login: React.FC = () => {
  /* --------------------- STATE HOOK --------------------- */

  const [loading, setLoading] = useState(false);

  /* --------------------- HOOK --------------------- */

  const { apiClient } = useApiClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* --------------------- FUNCTION --------------------- */

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await apiClient("/auth/login", "POST", {
        email: values.email,
        password: values.password,
      });
      message.success("Login successful!");
      dispatch(login(data.data));
      navigate("/assignment");
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };

  /* --------------------- RENDER --------------------- */

  return (
    <Card
      title="Login"
      style={{ width: 400, margin: "auto", marginTop: "100px" }}
    >
      <Form layout="vertical" onFinish={handleLogin}>
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
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;

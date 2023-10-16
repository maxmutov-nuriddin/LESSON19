import { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { Button, Flex, Form, Input } from "antd";
import { LoginType } from "../types/login";
import { AuthContext } from "../context/AuthContext";
import { LoginResponseType } from "../types/loginResponse";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../constants";

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const onFinish = async (values: LoginType) => {
    try {
      const {
        data: { token },
      }: AxiosResponse<LoginResponseType> = await axios.post(
        "https://reqres.in/api/login",
        values
      );
      localStorage.setItem(TOKEN, token);
      setIsAuthenticated(true);
      navigate("/categories");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Form
        name="login"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<LoginType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;

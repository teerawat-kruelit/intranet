import styled from "styled-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { Carousel } from "antd";

const LoginPageCompnent = styled.div`
  .container-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
  }

  .sing-in {
    padding: 20px;
    width: 30%;
    border: 1px solid red;
    height: 300px;

    .title {
      text-align: center;
      font-weight: bold;
    }
    /* background-color: green; */
  }
  .sing-up {
    width: 30%;
    border: 1px solid red;

    height: 300px;
  }
  .button-slider {
    padding: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-login {
    border-radius: 20px;
    background-color: green;
    color: #ffff;
  }
  .img-sli {
    padding-top: 50px;
  }
`;
const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "200px",
  textAlign: "center",
  background: "#364d79",
};

export default function LoginPage() {
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    // console.log(values)
    let resp = await axios.post("http://localhost:4000/api/login", values, {
      withCredentials: true,
    });
    
    

    if (!resp.data.status) {
      swal.fire({
        title: "",
        text: resp.data.message,
        icon: "error",
        confirmButtonText: "X",
      });
    } else {

      // localStorage.setItem('currentUser', JSON.stringify(resp.data.user))
      window.location.href = "/";
    }
  };

  return (
    <LoginPageCompnent className="login-page">
      <div className="container-login">
        <div className="sing-in">
          <h1 className="title">Sign in</h1>
          <Form
            className="login-form-wrapper"
            form={form}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name={"EUsername"}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name={"EPassword"}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <button className="button-login" type="submit">
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="sing-up">
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>
                <div className="img-sli">
                  <img src="/capture.jpg" width={460} height={200}></img>
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <div className="img-sli">
                  <img src="/capture.jpg" width={460} height={200}></img>
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <div className="img-sli">
                  <img src="/capture.jpg" width={460} height={200}></img>
                </div>
              </h3>
            </div>
          </Carousel>
        </div>
      </div>
    </LoginPageCompnent>
  );
}

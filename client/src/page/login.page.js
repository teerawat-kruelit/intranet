import styled from "styled-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaUnlockAlt } from 'react-icons/fa'


const LoginPageCompnent = styled.div`
  width: 100%;
  
  background-color: #113D3D;
  color: #F3F3F3;
  margin: 0;
  padding: 0;
  
    .skel-bg{
      background-color: #ff8b19;
      padding: 50px 0;
      transform: skew(0deg, -10deg);
      margin-top: -140px;
        .content{
          transform: skew(0deg, 10deg);
          margin: 0 auto;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .sing-in {
          position: relative;
          top: 250px;
          background-color: #FFFF;
          padding: 20px;
          width: 35%;
          box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 40%);
          height: 400px;

          .img-chase{
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .title {
            font-weight: bold;
          }
          .input-login{
            border-radius: 10px;
          }
          .ant-form-item-control-input-content{
            display: flex;
            justify-content: end;
          }
          .icon-login{
            font-size: 20px;
            margin-right: 10px;
          }
        }
        
        .button-login {
          border-radius: 10px;
          padding: 8px;
          background-color: #015352;
          color: #ffff;
          width: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
        }
    }

    .footer{
      padding-top: 350px
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
      <div className="skel-bg">
        <div className="content">
        <div className="sing-in">
        <div className="img-chase">
        <img src="/chase.png" width={180} alt="" />
        </div>
        
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
                message: "Please input your username !",
              },
            ]}
          >
            <Input
              className="input-login"
              prefix={<BsFillPersonCheckFill className="icon-login" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name={"EPassword"}
            rules={[
              {
                required: true,
                message: "Please input your password !",
              },
            ]}
          >
            <Input
              className="input-login"
              prefix={<FaUnlockAlt className="icon-login" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <button className="button-login" type="submit">
              Login
            </button>
          </Form.Item>
        </Form>
      </div>
        </div>
      </div>
      <div className="footer">
        <div className="credit">
          
        </div>
      </div>
    </LoginPageCompnent>
  );
}

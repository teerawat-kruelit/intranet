import { Form, Input, Select } from "antd";
import axios from "axios";
import swal from "sweetalert2";
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { FaUnlockAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { MdAddIcCall } from 'react-icons/md'
import { BsPersonBoundingBox } from 'react-icons/bs'
import styled from "styled-components";

const FormLoginComponent = styled.div`
    background-color: #FFF;
    height: 100%;
    padding: 20px;

    .img-chase{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title {
        font-weight: bold;
    }
`
const FormComponent = styled(Form)`
    background-color: #FFF;
    display: flex;
    flex-wrap: wrap;
    .ant-form-item{
        margin-right: 5px;
        width: 48%;
    }

    .icon-login{
        font-size: 20px;
        margin-right: 10px;
    }
    .button-login {
        margin-top: 20px;
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
`

export default function FormRegister(props) {

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let resp = await axios.post("http://localhost:4000/api/register", values, {
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
            swal.fire({
                title: "",
                text: resp.data.message,
                icon: "success",
                confirmButtonText: "X",
            });
            props.setToggle('singin')
            form.resetFields()
        }
    };

    return (
        <FormLoginComponent className="sing-in">
            <div className="img-chase">
                <img src="/chase.png" width={180} alt="" />
            </div>

            <h1 className="title">Register</h1>
            <FormComponent
                className="login-form-wrapper"
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >

                <Form.Item
                    name={"TUserName"}
                    label={'Name-Surname(TH)'}
                    rules={[
                        { required: true, message: "Please input your Name-Surname !", },
                    ]}
                >
                    <Input autoComplete="off" className="input-login"
                        prefix={<BsFillPersonPlusFill className="icon-login" />} />
                </Form.Item>

                <Form.Item
                    name={"EUserName"}
                    label={'User-ID'}
                    rules={[
                        { required: true, message: "Please input your username !", },
                    ]}
                >
                    <Input autoComplete="off" className="input-login"
                        prefix={<BsFillPersonPlusFill className="icon-login" />} />
                </Form.Item>

                <Form.Item
                    name={"email"}
                    label={'Email'}
                    rules={[
                        { required: true, message: "Please input your Email !", },
                    ]}
                >
                    <Input autoComplete="off" className="input-login"
                        prefix={<MdEmail className="icon-login" />} />
                </Form.Item>
                <Form.Item
                    name={"EPassword"}
                    label={'Password'}
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
                <Form.Item
                    name={"ExtNo"}
                    label={'Phone-office'}
                    rules={[
                        { required: true, message: "Please input your Phone-office !", },
                    ]}
                >
                    <Input autoComplete="off" className="input-login"
                        prefix={<MdAddIcCall className="icon-login" />} />
                </Form.Item>
                <Form.Item
                    name={"Position"}
                    label={'Position'}
                    rules={[
                        { required: true, message: "Please input your Position !", },
                    ]}
                >
                    <Input autoComplete="off" className="input-login"
                        prefix={<BsPersonBoundingBox className="icon-login" />} />
                </Form.Item>
                <Form.Item>
                    <button className="button-login" type="submit">
                        Submit
                    </button>
                </Form.Item>
            </FormComponent>
        </FormLoginComponent>
    )
}

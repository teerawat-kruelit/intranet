import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components';
import Navbar from '../../components/navbar.compoenets';
import axios from 'axios';
import swal from 'sweetalert2'

const FormItComponent = styled.div`
    border: 1px solid;
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;

    .ant-form{
        display: flex;
    }

    .ant-form-item{
        margin: 0;
        margin-top: 15px;
        .ant-form-item-label{
            background-color:#157347;
            label{
                &::before{
                    display: none;
                }
                padding: 0px 10px;
                color: #FFF;
            }
        }
    }

    .sel-branch{
        .ant-form-item-control{
            width: 200px;
        }
    }

    .form-button{
        width: 100%;
        margin-top: 20px;

        .ant-form-item-control-input-content{
            display: flex;
            justify-content: center;
        }
    }

    .form-item-description{
        width: 100%;
        textarea{
            height: 150px;
        }
    }

    .form-header{
        color: #FFF;
        text-align: center;
        background-color: #015352;
    }

    .ticket{
        text-align: center;
        font-weight: bold;
    }

    .form-it-container{
        padding: 20px;
    }
`

export default function FormItAdmin() {

    const [expences, setExpences] = useState([]);
    const [status, setStatus] = useState([]);
    const [topics, setTopics] = useState([]);
    const { id } = useParams()
    const [form] = Form.useForm()
    const history = useNavigate();

    useEffect(() => {
        const init = async () => {
            console.log(id)
            try {
                let userData = await axios.get('http://localhost:4000/api/user/profile', { withCredentials: true });
                if (userData.data.status) {
                    form.setFieldsValue(userData.data.data)
                }

                let repaireData = await axios.get('http://localhost:4000/api/repair_list/it/' + id, { withCredentials: true });
                if (repaireData.data.status) {
                    let data = repaireData.data.data[0]
                    form.setFieldsValue(data)
                }
                console.log(repaireData.data)
            } catch (error) {
                if (error.response.status == 401) {
                    window.location.href = '/login'
                }
            }

        }


        init()
    }, []);

    const onFinish = async (values) => {
        let result = await axios.post('http://localhost:4000/api/repair_list/it', values, { withCredentials: true })
        if (result.data.status) {
            history('/repair')
        } else {
            swal.fire({
                title: '',
                text: result.data.message,
                icon: 'error',
                confirmButtonText: 'X'
            })
        }
    }

    return (
        <>
            <Navbar />
            <FormItComponent className='form-it'>
                <div className='h1 form-header'>UPDATE RECORD IT</div>
                <div className='form-it-container'>
                    <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
                        <Form.Item
                            className='form-item-ticket'
                            name={'ticket_no'}
                            label={'Ticket'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='form-item-date'
                            name={'create_date'}
                            label={'วันที่แจ้งซ่อม'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='TUserName'
                            name={'TUserName'}
                            label={'ผู้ติดต่อ'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='ExtNo'
                            name={'ExtNo'}
                            label={'เบอร์ติดต่อ'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='form-item-ip'
                            name={'ip'}
                            label={'IP เครื่อง'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='form-item-dep'
                            name={'branch'}
                            label={'หน่วยงาน'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='form-item-description'
                            name={'description'}
                            label={'แจ้งปัญหาการใข้งาน'}
                        >
                            <Input.TextArea readOnly />
                        </Form.Item>
                        <Form.Item
                            className='form-item-TUserName'
                            name={'TUserName'}
                            label={'It-Support'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            name={'expences_id'}
                            className={'sel-expences'}
                            label={'หัวข้อ'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกหัวข้อ',
                                },
                            ]}
                        >
                            <Select className='sel-expences' placeholder="กรุณาเลือกหัวข้อ">
                                {expences.map((expences) => {
                                    return <Select.Option key={expences.id} value={expences.id}>{expences.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={'status_id'}
                            className={'sel-status'}
                            label={'Status'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกสถานะ',
                                },
                            ]}
                        >
                            <Select className='sel-status' placeholder="กรุณาเลือกสถานะ">
                                {status.map((status) => {
                                    return <Select.Option key={status.id} value={status.id}>{status.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='form-item-comment'
                            name={'comment'}
                            label={'Comment'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกComment',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            className='form-item-remark'
                            name={'remark'}
                            label={'หมายเหตุ'}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={'topic_id'}
                            className={'sel-topics'}
                            label={'หมวดหมู่ปัญหา'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกหมวดหมู่ปัญหา',
                                },
                            ]}
                        >
                            <Select className='sel-topics' placeholder="กรุณาเลือกหมวดหมู่ปัญหา">
                                {topics.map((topics) => {
                                    return <Select.Option key={topics.id} value={topics.id}>{topics.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='form-item-close-date'
                            name={'close_date'}
                            label={'วันที่จบงาน'}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            className='form-item-close-time'
                            name={'close_time'}
                            label={'เวลาจบงาน'}
                        >
                            <DatePicker picker='time' />
                        </Form.Item>
                        <Form.Item className='form-button'>
                            <button className="button-submit" type="submit">
                                บันทึก
                            </button>
                            <button className="button-back" onClick={() => {
                                history('/repair')
                            }}>
                                ย้อนกลับ
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </FormItComponent>
        </>
    )
}
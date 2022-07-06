import React, { useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router'
import styled from 'styled-components';
import Navbar from '../../components/navbar.compoenets';
import axios from 'axios';
import dayjs from 'dayjs'
import swal from 'sweetalert2'

const FormItComponent = styled.div`
    border: 1px solid #e2e0e0;
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
            display: flex;
            justify-content: center;
            align-items: center;

            background-color:#015352;
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
            justify-content: start;
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
        font-size: 16px;
        font-weight:bold;
        padding:5px;
    }

    .ticket{
        padding: 8px;
        font-weight: bold;
        margin: 20px 15px 0px;
        width: 185px;
        background-color: #FD7D00;
        color: #FFF;
        border-radius: 10px;
        
        
    }

    .form-it-container{
        padding: 15px;
    }

    .form-item-tusername,
    .form-item-position,
    .form-item-exitno{
        width: 37.7%;
    }

    .form-item-ip,
    .sel-branch{
        width: 50%;
    }
    .button-submit{
        background-color: #015352;
        color: #FFF;
        border: none;
        padding: 7px;
        margin-right: 10px;
        border-radius: 5px;
    }
    .button-back{
        background-color: #015352;
        color: #FFF;
        border: none;
        padding: 7px;
        border-radius: 5px;
    }

`

export default function FormIt() {

    const [deparment, setDeparment] = useState([])
    const [newTicketNo, setnewTicketNo] = useState(null);
    const [form] = Form.useForm()
    const history = useNavigate();

    function padDigits(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }

    useEffect(() => {
        const init = async () => {
            let deparmentData = await axios.get('http://localhost:4000/api/m/branch', { withCredentials: true });
            setDeparment(deparmentData.data.data)

            let userData = await axios.get('http://localhost:4000/api/user/profile', { withCredentials: true });
            if (userData.data.status) {
                form.setFieldsValue(userData.data.data)
            }

            let lastTicketNoData = await axios.get('http://localhost:4000/api/ticket/last?type_id=1', { withCredentials: true })
            if (lastTicketNoData.data.data.length < 1) {
                let newTicketNo = dayjs().format('YYYY-MM-') + '0001'
                setnewTicketNo(newTicketNo)
            } else {
                let lastRicketNo = lastTicketNoData.data.data[0].ticket_no
                let newTicketNo = padDigits(parseInt(lastRicketNo.split('-')[2]) + 1, 4)
                newTicketNo = dayjs().format('YYYY-MM-') + newTicketNo
                setnewTicketNo(newTicketNo)
            }

        }


        init()
    }, []);

    const onFinish = async (values) => {
        values.ticket_no = newTicketNo

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

            let lastTicketNoData = await axios.get('http://localhost:4000/api/ticket/last', { withCredentials: true })
            if (lastTicketNoData.data.data.length < 1) {
                let newTicketNo = dayjs().format('YYYY-MM-') + '0001'
                setnewTicketNo(newTicketNo)
            } else {
                let lastRicketNo = lastTicketNoData.data.data[0].ticket_no
                let newTicketNo = padDigits(parseInt(lastRicketNo.split('-')[2]) + 1, 4)
                newTicketNo = dayjs().format('YYYY-MM-') + newTicketNo
                setnewTicketNo(newTicketNo)
            }
        }
    }

    return (
        <>
            <Navbar />
            <FormItComponent className='form-it'>
                <div className='form-header'>แจ้งซ่อมฝ่าย  IT-Support</div>
                <div className='ticket'>TICKET ID : {newTicketNo}</div>
                <div className='form-it-container'>
                    <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
                        <Form.Item
                            className='form-item-tusername'
                            name={'TUserName'}
                            label={'Name-Surname'}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            className='form-item-position'
                            name={'Position'}
                            label={'Position'}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            className='form-item-extno'
                            name={'ExtNo'}
                            label={'Phone'}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            className='form-item-ip'
                            name={'ip'}
                            label={'IP-Adress'}
                            
                        >
                            <Input placeholder="กรุณากรอก IP-เครื่องคอมพิวเตอร์"/>
                        </Form.Item>
                        <Form.Item
                            name={'branch'}
                            className={'sel-branch'}
                            label={'Branch'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกหน่วยงาน',
                                },
                            ]}
                        >
                            <Select className='sel-department' placeholder="กรุณาเลือกหน่วยงาน">
                                {deparment.map((dep) => {
                                    return <Select.Option key={dep.id} value={dep.id}>{dep.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='form-item-description'
                            name={'description'}
                            label={'Detail-Prompram'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกปัญหาที่ต่องแการแจ้ง',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="กรุณาแจ้งปัญหาการใช้งาน"/>
                        </Form.Item>
                        <Form.Item className='form-button'>
                            <button className="button-submit" type="submit">
                            ➤ SAVE
                            </button>
                            <button className="button-back" onClick={() => {
                                history('/repair')
                            }}>
                                HOME
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </FormItComponent>
            
        </>
    )
}

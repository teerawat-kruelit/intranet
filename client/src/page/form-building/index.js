import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Form, Input, Select } from 'antd';
import Navbar from '../../components/navbar.compoenets';
import { useNavigate } from 'react-router'
import axios from 'axios';
import dayjs from 'dayjs'
import swal from 'sweetalert2'


const FromBuildingComponent = styled.div`
    .Card-Building{
        border: 1px solid black;
        width: 1200px;
       margin: 0 auto;
       margin-top: 50px;

       .header{
        text-align: center;
        background-color: #015352;
        color: #FFF;
       }
       .ticket-id{
        text-align: center;
        font-weight: bold;
       }
        
    }

    .ant-form{
        display: flex;
        padding: 25px;
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

    .form-item-tusername,
    .form-item-position{
        width: 50%;
    }

    .form-item-extno,
    .sel-branch{
        width: 50%;
    }
`


export default function FromBuilding() {
    const [deparment, setDeparment] = useState([])
    const [form] = Form.useForm()
    const [newTicketNo, setnewTicketNo] = useState(null);
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

            let lastTicketNoData = await axios.get('http://localhost:4000/api/ticket/last?type_id=2', { withCredentials: true })
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
       
       let result = await axios.post('http://localhost:4000/api/repair_list/building', values, { withCredentials: true })
       if (result.data.status) {
           history('/repair')
       } else {
           swal.fire({
               title: '',
               text: result.data.message,
               icon: 'error',
               confirmButtonText: 'X'
           })

           let lastTicketNoData = await axios.get('http://localhost:4000/api/ticket/last?type_id=2', { withCredentials: true })
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
            <FromBuildingComponent>
                <div className='Card-Building'>
                    <div className='header h1'>
                        แจ้งซ่อมฝ่ายอาคาร
                    </div>
                    <div className='ticket-id h1'>
                        TICKET ID : {newTicketNo}
                    </div>
                    <Form className='form-building' form={form} onFinish={onFinish} layout="inline" size="large">
                        <Form.Item className='form-item-tusername' name={'TUserName'} label='ชื่อ-นามสกุล'>
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='form-item-position'
                            name={'Position'}
                            label={'แผนก'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            className='form-item-extno'
                            name={'ExtNo'}
                            label={'เบอร์ติดต่อ'}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            name={'branch'}
                            className={'sel-branch'}
                            label={'หน่วยงาน'}
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
                            label={'แจ้งปัญหาการใข้งาน'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกปัญหาที่ต่องแการแจ้ง',
                                },
                            ]}
                        >
                            <Input.TextArea />
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

            </FromBuildingComponent>
        </>
    )
}

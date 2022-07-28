import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import { useNavigate, useParams, useLocation } from 'react-router'
import styled from 'styled-components'
import Navbar from '../../components/navbar.compoenets'
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert2'

const FormItComponent = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;

  .ant-form {
    display: flex;
  }

  .ant-form-item {
    margin: 0;
    margin-top: 15px;
    .ant-form-item-label {
      background-color: #6c757d;
      label {
        &::before {
          display: none;
        }
        padding: 0px 10px;
        color: #fff;
      }
    }
  }

  .sel-branch {
    .ant-form-item-control {
      width: 200px;
    }
  }

  .form-button {
    width: 100%;
    margin-top: 10px;

    .button-submit {
      background-color: #015352;
      color: #fff;
      border: none;
      padding: 7px;
      margin-right: 10px;
      border-radius: 5px;
    }
    .button-back {
      background-color: #015352;
      color: #fff;
      border: none;
      padding: 7px;
      border-radius: 5px;
    }

    .ant-form-item-control-input-content {
      display: flex;
      justify-content: start;
    }
  }

  .form-header {
    margin-left: 10px;
    font-weight: bold;
    font-size: 17px;
    color: #015352;
  }

  .ticket {
    text-align: center;
    font-weight: bold;
  }

  .form-it-container {
    padding: 10px;
  }
  .form-item-TUserName,
  .form-item-sel-approve,
  .form-item-po_number,
  .form-item-inv_number,
  .form-item-po-date,
  .form-item-inv-date,
  .form-item-upload,
  .form-item-preview-img {
    width: 50%;
  }

  .image-repair {
    margin-top: 10px;
    display: flex;
    justify-content: start;
    width: 100%;
  }

  .head-user {
    width: 100%;
    padding: 5px;
    background-color: #6169d0;
    color: #fff;

    .icon-head {
      font-size: 20px;
      top: 4px;
      position: relative;
      margin-left: 5px;
    }
  }

  .user,
  .admin {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid #e2e0e0;
    background-color: #fff;
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 20%);
    .title {
      width: 100%;
      border: 1px solid black;
    }
  }
  .user {
    margin-bottom: 10px;
  }
`

export default function FormFin() {
  const [fileNameFin, setFileNameFin] = useState(null)
  const { id } = useParams()
  const [form] = Form.useForm()
  const history = useNavigate()
  let { search } = useLocation()

  useEffect(() => {
    const init = async () => {
      try {
        let repaireData = await axios.get('http://localhost:4000/api/repair_list_fin/' + id, { withCredentials: true })
        let fin_datetime = repaireData.data.data[0].fin_date

        repaireData.data.data[0].fin_date = fin_datetime ? moment(fin_datetime) : moment()

        let data = repaireData.data.data[0]
        form.setFieldsValue(data)
        setFileNameFin(data?.img_fin)

        if (!data?.fin_name) {
          let userData = await axios.get('http://localhost:4000/api/user/profile', { withCredentials: true })
          if (userData.data.status) {
            let data_fin_name = userData.data.data.TUserName
            form.setFieldsValue({ fin_name: data_fin_name })
          }
        }
      } catch (error) {
        if (error.response.status == 401) {
          window.location.href = '/login'
        }
      }
    }

    init()
  }, [])

  const onFinish = async (values) => {
    values.img_fin = fileNameFin
    values.fin_date = moment(values.fin_date).format('YYYY-MM-DD HH:mm:ss')

    try {
      let response = await axios.put('http://localhost:4000/api/repair_list_fin/' + id, values, { withCredentials: true })
      if (response.data.status) {
        swal
          .fire({
            title: '',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'X'
          })
          .then((result) => {
            const query = new URLSearchParams(search)
            const querTypeId = query.get('type_id')

            if (result.isConfirmed) {
              history('/repair-fin?tab=' + querTypeId)
            }
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <FormItComponent className="form-it">
        {/* <div className="h1 form-header">UPDATE RECORD IT</div> */}
        <div className="form-header">UPDATE-RECORD</div>
        <div className="form-it-container">
          <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">
            <div className="admin">
              <Form.Item className="form-item-TUserName" name={'fin_name'} label={'ผู้จัดทำ'}>
                <Input readOnly />
              </Form.Item>
              <Form.Item
                name={'fin_approve'}
                className={'form-item-sel-approve'}
                label={'Status'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกหมวดหมู่ปัญหา'
                  }
                ]}>
                <Select placeholder="กรุณาเลือก">
                  <Select.Option value={1}>Approve</Select.Option>
                  <Select.Option value={2}>Reject</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="form-item-fin_number" name={'fin_number'} label={'Number'}>
                <Input />
              </Form.Item>
              <Form.Item className="form-item-fin-date" name={'fin_date'} label={'Date'}>
                <DatePicker />
              </Form.Item>
              <Form.Item className="form-item-fin_recipient" name={'fin_recipient'} label={'ผู้รับเงินสด'}>
                <Input />
              </Form.Item>
              <Form.Item className="form-item-upload" label={'Upload'}>
                <input
                  type={'file'}
                  onChange={async (e) => {
                    try {
                      let formData = new FormData()
                      formData.append('image', e.target.files[0])

                      let resUpload = await axios.post('http://localhost:4000/api/upload/repair', formData, { withCredentials: true })
                      if (resUpload?.data?.status) {
                        setFileNameFin(resUpload?.data?.data?.filename)
                        swal.fire({
                          title: '',
                          text: resUpload?.data?.message,
                          icon: 'success',
                          confirmButtonText: 'X'
                        })
                      } else {
                        swal.fire({
                          title: '',
                          text: resUpload?.data?.message,
                          icon: 'error',
                          confirmButtonText: 'X'
                        })
                      }
                    } catch (error) {
                      if (error.response.status == 401) {
                        window.location.href = '/login'
                      }
                    }
                  }}
                />
              </Form.Item>
              {fileNameFin && (
                <div className="image-repair">
                  <img src={'http://localhost:4000/public/image/repair/' + fileNameFin} width={300} height={300} />
                </div>
              )}
            </div>
            <Form.Item className="form-button">
              <button className="button-submit" type="submit">
                ➤ SAVE
              </button>
              <button
                className="button-back"
                onClick={() => {
                  history('/repair-po')
                }}>
                ◀ HOME
              </button>
            </Form.Item>
          </Form>
        </div>
      </FormItComponent>
    </>
  )
}

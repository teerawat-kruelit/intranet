import { Form, Input } from 'antd'
import axios from 'axios'
import swal from 'sweetalert2'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaUnlockAlt } from 'react-icons/fa'
import styled from 'styled-components'

const FormLoginComponent = styled.div`
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .border-flex {
    width: 100%;

    .img-chase {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      font-weight: bold;
    }
  }
`
const FormComponent = styled(Form)`
  background-color: #fff;

  .input-login {
    border-radius: 10px;
  }
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: start;
  }
  .icon-login {
    font-size: 20px;
    margin-right: 10px;
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
`

export default function FormLogin() {
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    let resp = await axios.post('http://localhost:4000/api/login', values, {
      withCredentials: true
    })

    if (!resp.data.status) {
      swal.fire({
        title: '',
        text: resp.data.message,
        icon: 'error',
        confirmButtonText: 'X'
      })
    } else {
      if (resp?.data?.data?.role === 5) {
        window.location.href = '/repair-po'
      } else if (resp?.data?.data?.role === 6) {
        window.location.href = '/repair-fin'
      } else if (resp?.data?.data?.role === 4) {
        window.location.href = '/repair-acc'
      } else {
        window.location.href = '/repair'
      }
    }
  }

  return (
    <FormLoginComponent className="sing-in">
      <div className="border-flex">
        <div className="img-chase">
          <img src="/chase.png" width={230} alt="" />
        </div>

        <h1 className="title">Sign in</h1>
        <FormComponent className="login-form-wrapper" form={form} onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name={'EUsername'}
            rules={[
              {
                required: true,
                message: 'Please input your username !'
              }
            ]}>
            <Input className="input-login" prefix={<BsFillPersonCheckFill className="icon-login" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name={'EPassword'}
            rules={[
              {
                required: true,
                message: 'Please input your password !'
              }
            ]}>
            <Input className="input-login" prefix={<FaUnlockAlt className="icon-login" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <button className="button-login" type="submit">
              Login
            </button>
          </Form.Item>
        </FormComponent>
      </div>
    </FormLoginComponent>
  )
}

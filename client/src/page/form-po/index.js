import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useNavigate, useParams, useLocation } from "react-router";
import styled from "styled-components";
import Navbar from "../../components/navbar.compoenets";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";

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
      background-color: #6C757D;
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
  .form-item-preview-img
  {
    width: 50%;
  }
    
  .image-repair {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .head-user{
    width: 100%;
    padding: 5px;
    background-color: #6169D0;
    color: #FFF;
    
    .icon-head{
      font-size: 20px;
      top: 4px;
      position: relative;
      margin-left: 5px;
    }
  }

  .user,
  .admin{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid #e2e0e0;
    background-color: #FFF;
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 20%);
    .title{
      width: 100%;
      border: 1px solid black;
    }
  }
  .user{
    margin-bottom: 10px;
  }
`;

export default function FormPO() {
    const [fileNamePo, setFileNamePo] = useState(null);
    const [fileNameInv, setFileNameInv] = useState(null);
    const { id } = useParams();
    const [form] = Form.useForm();
    const history = useNavigate();
    let { search } = useLocation();

    useEffect(() => {
        const init = async () => {
            try {
                let repaireData = await axios.get(
                    "http://localhost:4000/api/repair_list_po/" + id,
                    { withCredentials: true }
                );
                let po_datetime = repaireData.data.data[0].po_date;
                let inv_datetime = repaireData.data.data[0].inv_date;

                repaireData.data.data[0].po_date = po_datetime
                    ? moment(po_datetime)
                    : moment()
                repaireData.data.data[0].inv_date = inv_datetime
                    ? moment(inv_datetime)
                    : moment();

                let data = repaireData.data.data[0];
                form.setFieldsValue(data);
                setFileNamePo(data?.img_po);
                setFileNameInv(data?.img_inv);

                if (!data?.po_name) {
                    let userData = await axios.get(
                        "http://localhost:4000/api/user/profile",
                        { withCredentials: true }
                    );
                    if (userData.data.status) {
                        let data_po_name = userData.data.data.TUserName
                        form.setFieldsValue({ po_name: data_po_name })
                    }
                }

            } catch (error) {
                if (error.response.status == 401) {
                    window.location.href = "/login";
                }
            }
        };

        init()
    }, []);

    const onFinish = async (values) => {
        values.img_po = fileNamePo;
        values.img_inv = fileNameInv;
        values.po_date =
            moment(values.po_date).format("YYYY-MM-DD HH:mm:ss")
        values.inv_date =
            moment(values.inv_date).format("YYYY-MM-DD HH:mm:ss")

        try {
            let response = await axios.put(
                "http://localhost:4000/api/repair_list_po/" + id,
                values,
                { withCredentials: true }
            );
            console.log(response)
            if (response.data.status) {
                swal
                    .fire({
                        title: "",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "X",
                    })
                    .then((result) => {
                        const query = new URLSearchParams(search);
                        const querTypeId = query.get('type_id');

                        if (result.isConfirmed) {
                            history("/repair-po?tab=" + querTypeId);
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <FormItComponent className="form-it">
                {/* <div className="h1 form-header">UPDATE RECORD IT</div> */}
                <div className="form-header">UPDATE-RECORD BY IT</div>
                <div className="form-it-container">
                    <Form
                        className="it-form-wrapper"
                        form={form}
                        onFinish={onFinish}
                        layout="inline"
                        size="large"
                    >
                        <div className="admin">
                            <Form.Item
                                className="form-item-TUserName"
                                name={"po_name"}
                                label={"ผู้อนุมัติ"}
                            >
                                <Input readOnly />
                            </Form.Item>
                            <Form.Item
                                name={"po_approve"}
                                className={"form-item-sel-approve"}
                                label={"Status"}
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาเลือกหมวดหมู่ปัญหา",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="กรุณาเลือก"
                                >
                                    <Select.Option value={1}>Approve</Select.Option>
                                    <Select.Option value={2}>Reject</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                className="form-item-po_number"
                                name={"po_number"}
                                label={"Number-Po"}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="form-item-inv_number"
                                name={"inv_number"}
                                label={"Number-Invioce"}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="form-item-po-date"
                                name={"po_date"}
                                label={"PO-Date"}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                className="form-item-invoice-date"
                                name={"inv_date"}
                                label={"Invoice-Date"}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item className="form-item-upload" label={"อัพโหลดรูปภาพ"}>
                                <input
                                    type={"file"}
                                    onChange={async (e) => {
                                        try {
                                            let formData = new FormData();
                                            formData.append("image", e.target.files[0]);

                                            let resUpload = await axios.post(
                                                "http://localhost:4000/api/upload/repair",
                                                formData,
                                                { withCredentials: true }
                                            );
                                            if (resUpload?.data?.status) {
                                                setFileNamePo(resUpload?.data?.data?.filename);
                                                swal.fire({
                                                    title: "",
                                                    text: resUpload?.data?.message,
                                                    icon: "success",
                                                    confirmButtonText: "X",
                                                });
                                            } else {
                                                swal.fire({
                                                    title: "",
                                                    text: resUpload?.data?.message,
                                                    icon: "error",
                                                    confirmButtonText: "X",
                                                });
                                            }
                                        } catch (error) {
                                            if (error.response.status == 401) {
                                                window.location.href = "/login";
                                            }
                                        }
                                    }}
                                />
                            </Form.Item>
                            <Form.Item className="form-item-upload" label={"อัพโหลดรูปภาพ"}>
                                <input
                                    type={"file"}
                                    onChange={async (e) => {
                                        try {
                                            let formData = new FormData();
                                            formData.append("image", e.target.files[0]);

                                            let resUpload = await axios.post(
                                                "http://localhost:4000/api/upload/repair",
                                                formData,
                                                { withCredentials: true }
                                            );
                                            if (resUpload?.data?.status) {
                                                setFileNameInv(resUpload?.data?.data?.filename);
                                                swal.fire({
                                                    title: "",
                                                    text: resUpload?.data?.message,
                                                    icon: "success",
                                                    confirmButtonText: "X",
                                                });
                                            } else {
                                                swal.fire({
                                                    title: "",
                                                    text: resUpload?.data?.message,
                                                    icon: "error",
                                                    confirmButtonText: "X",
                                                });
                                            }
                                        } catch (error) {
                                            if (error.response.status == 401) {
                                                window.location.href = "/login";
                                            }
                                        }
                                    }}
                                />
                            </Form.Item>
                            <Form.Item className="form-item-preview-img">
                                {fileNamePo && (
                                    <div className="image-repair">
                                        <img
                                            src={"http://localhost:4000/public/image/repair/" + fileNamePo}
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                )}

                            </Form.Item>
                            <Form.Item className="form-item-preview-img">
                                {fileNameInv && (
                                    <div className="image-repair">
                                        <img
                                            src={"http://localhost:4000/public/image/repair/" + fileNameInv}
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                )}

                            </Form.Item>
                        </div>
                        <Form.Item className="form-button">
                            <button className="button-submit" type="submit">
                                ➤ SAVE
                            </button>
                            <button
                                className="button-back"
                                onClick={() => {
                                    history("/repair-po");
                                }}
                            >
                                ◀ HOME
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </FormItComponent>
        </>
    );
}

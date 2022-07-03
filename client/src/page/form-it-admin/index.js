import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Navbar from "../../components/navbar.compoenets";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";

const FormItComponent = styled.div`
  border: 1px solid;
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;

  .ant-form {
    display: flex;
  }

  .ant-form-item {
    margin: 0;
    margin-top: 15px;
    .ant-form-item-label {
      background-color: #157347;
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
    margin-top: 20px;

    .ant-form-item-control-input-content {
      display: flex;
      justify-content: center;
    }
  }

  .form-item-description {
    width: 100%;
    textarea {
      height: 150px;
    }
  }

  .form-header {
    color: #fff;
    text-align: center;
    background-color: #015352;
  }

  .ticket {
    text-align: center;
    font-weight: bold;
  }

  .form-it-container {
    padding: 20px;
  }

  .image-repair {
    margin-top: 10px;
    width: 100%;
  }
`;

export default function FormItAdmin() {
  const [expences, setExpences] = useState([]);
  const [status, setStatus] = useState([]);
  const [topics, setTopics] = useState([]);
  const [fileName, setFileName] = useState(null);
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        let userData = await axios.get(
          "http://localhost:4000/api/user/profile",
          { withCredentials: true }
        );
        if (userData.data.status) {
          form.setFieldsValue(userData.data.data);
        }

        let repaireData = await axios.get(
          "http://localhost:4000/api/repair_list/it/" + id,
          { withCredentials: true }
        );
        let datetime = repaireData.data.data[0].close_date;
        repaireData.data.data[0].close_date = datetime
          ? moment(datetime)
          : moment();
        repaireData.data.data[0].close_time = datetime
          ? moment(datetime)
          : moment();
        if (repaireData.data.status) {
          let data = repaireData.data.data[0];
          console.log(data);
          form.setFieldsValue(data);
          setFileName(data?.img_repair);
        }

        let expencesData = await axios.get(
          "http://localhost:4000/api/m/expences",
          { withCredentials: true }
        );
        setExpences(expencesData.data.data);
        let topicData = await axios.get("http://localhost:4000/api/m/topic", {
          withCredentials: true,
        });
        setTopics(topicData.data.data);
        let statusData = await axios.get("http://localhost:4000/api/m/status", {
          withCredentials: true,
        });
        setStatus(statusData.data.data);
      } catch (error) {
        if (error.response.status == 401) {
          window.location.href = "/login";
        }
      }
    };
    init();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    values.img_repair = fileName;
    values.close_date =
      moment(values.close_date).format("YYYY-MM-DD") +
      " " +
      moment(values.close_time).format("HH:mm:ss");
    delete values.close_time;

    try {
      let response = await axios.put(
        "http://localhost:4000/api/repair_list/it/" + id,
        values,
        { withCredentials: true }
      );
      if (response.data.status) {
        swal
          .fire({
            title: "",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "X",
          })
          .then((result) => {
            if (result.isConfirmed) {
              history("/repair");
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
        <div className="h1 form-header">UPDATE RECORD IT</div>
        <div className="form-it-container">
          <Form
            className="it-form-wrapper"
            form={form}
            onFinish={onFinish}
            layout="inline"
            size="large"
          >
            <Form.Item
              className="form-item-ticket"
              name={"ticket_no"}
              label={"Ticket"}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              className="form-item-date"
              name={"create_date"}
              label={"วันที่แจ้งซ่อม"}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              className="TUserName"
              name={"TUserName"}
              label={"ผู้ติดต่อ"}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item className="ExtNo" name={"ExtNo"} label={"เบอร์ติดต่อ"}>
              <Input readOnly />
            </Form.Item>
            <Form.Item
              className="form-item-ip"
              name={"ip"}
              label={"IP เครื่อง"}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              className="form-item-dep"
              name={"branch"}
              label={"หน่วยงาน"}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              className="form-item-description"
              name={"description"}
              label={"แจ้งปัญหาการใข้งาน"}
            >
              <Input.TextArea readOnly />
            </Form.Item>
            <Form.Item
              className="form-item-TUserName"
              name={"TUserName"}
              label={"It-Support"}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              name={"topic_id"}
              className={"sel-topics"}
              label={"หมวดหมู่ปัญหา"}
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกหมวดหมู่ปัญหา",
                },
              ]}
            >
              <Select
                className="sel-topics"
                placeholder="กรุณาเลือกหมวดหมู่ปัญหา"
              >
                {topics.map((topics) => {
                  return (
                    <Select.Option key={topics.id} value={topics.id}>
                      {topics.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name={"status_id"}
              className={"sel-status"}
              label={"Status"}
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกสถานะ",
                },
              ]}
            >
              <Select className="sel-status" placeholder="กรุณาเลือกสถานะ">
                {status.map((status) => {
                  return (
                    <Select.Option key={status.id} value={status.id}>
                      {status.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className="form-item-comment"
              name={"comment"}
              label={"Comment"}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              className="form-item-remark"
              name={"remark"}
              label={"หมายเหตุ"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"expence_id"}
              className={"sel-expences"}
              label={"หัวข้อ"}
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกหัวข้อ",
                },
              ]}
            >
              <Select className="sel-expences" placeholder="กรุณาเลือกหัวข้อ">
                {expences.map((expences) => {
                  return (
                    <Select.Option key={expences.id} value={expences.id}>
                      {expences.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className="form-item-close-date"
              name={"close_date"}
              label={"วันที่จบงาน"}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              className="form-item-close-time"
              name={"close_time"}
              label={"เวลาจบงาน"}
            >
              <DatePicker picker="time" />
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
                      setFileName(resUpload?.data?.data?.filename);
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
            {fileName && (
              <div className="image-repair">
                <img
                  src={"http://localhost:4000/public/image/repair/" + fileName}
                  width={200}
                  height={200}
                />
              </div>
            )}
            <Form.Item className="form-button">
              <button className="button-submit" type="submit">
                บันทึก
              </button>
              <button
                className="button-back"
                onClick={() => {
                  history("/repair");
                }}
              >
                ย้อนกลับ
              </button>
            </Form.Item>
          </Form>
        </div>
      </FormItComponent>
    </>
  );
}

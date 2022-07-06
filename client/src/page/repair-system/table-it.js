import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "../../components/table";
import { AiTwotoneEdit } from "react-icons/ai";
import { Modal, Rate } from "antd";
import styled from "styled-components";
import axios from 'axios';
import swal from 'sweetalert2'

const RatingModel = styled(Modal)`
  .ant-modal-body{
    display: flex;
  }
`

const RatingPoint = styled.div`
  border: 1px solid red;
  border-radius: 50%;
  text-align: center;
  width: 20px;
  height: 20px;
`

export default function TableIt(props) {
  const [columns, setColumns] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false)

  useEffect(() => {
    const init = async () => {
      let column = [
        {
          title: "เลขที่แจ้งซ่อม",
          dataIndex: "ticket_no",
          sorter: (a, b) => {
            a = a.ticket_no || "";
            b = b.ticket_no || "";
            return a.localeCompare(b);
          },
        },
        {
          title: "วันที่แจ้งซ่อม",
          dataIndex: "create_date",
        },
        {
          title: "ผู้แจ้งซ่อม",
          dataIndex: "TUserName",
        },
        {
          title: "เบอร์ต่อ",
          dataIndex: "ExtNo",
        },
        {
          title: "IP-เครื่อง",
          dataIndex: "ip",
        },
        {
          title: "สาขาที่แจ้ง",
          dataIndex: "branch",
        },
        {
          title: "แจ้งปัญหา",
          dataIndex: "description",
        },
        {
          title: "ผู้ตรวจรับงาน",
          dataIndex: "admin_name",
        },
        {
          title: "ข้อมูลตอบกลับ",
          dataIndex: "remark",
        },
        {
          title: "status",
          dataIndex: "status",
          render: (_, record) => (
            <div className="table-button-group">
              <button className={"button-detail status-" + record.status} onClick={() => { }}>
                <b>{record.status || "-"}</b>
              </button>
            </div>
          ),
        }
      ];

      if (props?.user?.role === 2) {
        column.unshift({
          title: "",
          dataIndex: "",
          width: 20,
          render: (_, record) => (
            <NavLink to={"/form-it/" + record.id}>
              <button className={"button-edit"}>
                <AiTwotoneEdit />
              </button>
            </NavLink>
          ),
        });
      }

      if (props?.user?.role === 1) {
        column.push({
          title: "point",
          dataIndex: "",
          width: 20,
          render: (_, record) =>
            <>
              {record.status == 'success' && !record.rating ?
                (<button className={"button-rating"} onClick={() => { setIsModelOpen(true); setSelectedRecord(record) }}>
                ★
                </button>) : ''}
              {record.status == 'success' && record.rating ?
                (<RatingPoint>{record.rating}</RatingPoint>) : ''}
            </>
        });
      }
      setColumns(column);
    };

    init();
  }, [props.user, props.data]);

  return <>
    <Table dataSource={props.data} columns={columns} />
    <RatingModel title={"ให้คะแนนเลขแจ้งซ่อม " + selectedRecord?.ticket_no} visible={isModelOpen} closeIcon={<>X</>} onCancel={() => { setIsModelOpen(false) }} footer={[]} >
      <Rate style={{ margin: '0 auto' }} onChange={async (number) => {
        try {
          let updateResult = await axios.put('http://localhost:4000/api/repair_list/' + selectedRecord.id + '/update-rating', {
            rating: number
          }, { withCredentials: true })

          if (updateResult?.data?.status) {
            swal.fire({
              title: "",
              text: updateResult?.data?.message,
              icon: "success",
              confirmButtonText: "X",
            });

            props.setData(props.data.map((item) => item.id === selectedRecord.id ? { ...selectedRecord, rating: number } : item))
          } else {
            swal.fire({
              title: "",
              text: updateResult?.data?.message,
              icon: "error",
              confirmButtonText: "X",
            });
          }
          setIsModelOpen(false)
        } catch (error) {
          if (error.response.status == 401) {
            window.location.href = "/login";
          }
        }
      }} />
    </RatingModel>
  </>;
}

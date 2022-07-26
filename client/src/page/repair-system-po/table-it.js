import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "../../components/table";
import { AiTwotoneCreditCard, AiTwotoneEdit } from "react-icons/ai";
import { Input, Modal, Rate, message } from "antd";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert2";
import { Excel } from "antd-table-saveas-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import Swal from "sweetalert2";

const RatingModel = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
  }

  .button-group{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    .point{
      background-color: #015352;
      border-radius: 5px;
      border: none;
      padding: 5px;
      color: #FFFF;
    }
  }
  .comment_ratung{
    margin-top: 10px;
  }
`;

const ButtonGroup_it = styled.div`
  display: flex;
  
    .button-export-excel,
    .button-report-process {
      background-color: #015352;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      padding: 7px;
      margin-bottom: 10px;
      margin-right: 15px;
      cursor: pointer;

      .icon-add {
        font-size: 20px;
        margin-right: 5px;
        display: flex;
        align-items: center;
      }
    }  
`

export default function TableIt(props) {
  const [columns, setColumns] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment_ratting, setcomment_ratting] = useState(1);

  useEffect(() => {
    const init = async () => {
      let column = [
        {
          title: "",
          dataIndex: "",
          width: 20,
          render: (_, record) => (
            <NavLink to={"/form-po/" + record.id}>
              <button className={"button-edit"}>
                <AiTwotoneEdit />
              </button>
            </NavLink>
          ),
        },
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
          title: "ปัญหาที่เกิดขึ้น",
          dataIndex: "description",
        },
        {
          title: "ผู้ตรวจรับงาน",
          dataIndex: "admin_name",
        },
        {
          title: "Ref/No.1",
          dataIndex: "img_repair",
          render: (_, record) => record.img_repair && (
            <a href={"http://localhost:4000/public/image/repair/" + record.img_repair} target='__blank'>รูป</a>
          )
        },
        {
          title: "หมายเหตุ",
          dataIndex: "remark",
        },
        {
          title: "Approve",
          dataIndex: "po_approve",
          render: (_, record) => (
            <div className="table-button-group">
              <button
                className={"button-detail status-" + record?.po_approve && record?.po_approve > 0 ? 'approve' : 'not-approve'}
                onClick={() => { }}
              >
                <b>{record?.po_approve && record?.po_approve > 0 ? 'approve' : 'not approve'}</b>
              </button>
            </div>
          ),
        },
        {
          title: "ผู้ดำนเนินการ",
          dataIndex: "po_name",
        },
        {
          title: "PO-Number",
          dataIndex: "po_number",
        },
        {
          title: "PO-Date",
          dataIndex: "po_date",
        },
        {
          title: "PO-Img",
          dataIndex: "img_po",
          render: (_, record) => record.img_po && (
            <a href={"http://localhost:4000/public/image/repair/" + record.img_po} target='__blank'>รูป</a>
          )
        },
        {
          title: "INVOICE-Img",
          dataIndex: "img_inv",
          render: (_, record) => record.img_inv && (
            <a href={"http://localhost:4000/public/image/repair/" + record.img_inv} target='__blank'>รูป</a>
          )
        },
      ];

      setColumns(column);
    };

    init();
  }, [props.user, props.data]);

  const handleClick = async () => {
    try {
      let repairLogsData = await axios.get(
        "http://localhost:4000/api/repair_list/it-logs",
        { withCredentials: true }
      );


      console.log(repairLogsData)

      if (repairLogsData?.data?.status) {
        let excelColumn = [
          {
            title: "เลขที่แจ้งซ่อม",
            dataIndex: "ticket_no",
          },
          {
            title: "วันที่แจ้งซ่อม",
            dataIndex: "create_date",
          },
          {
            title: "ผู้ติดต่อ",
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
            title: "หมวดหมู่ปัญหา",
            dataIndex: "topic_id",
          },
          {
            title: "ข้อมูลตอบกลับ",
            dataIndex: "comment",
          },
          {
            title: "สถานะ",
            dataIndex: "status",
          },
          {
            title: "หมายเหตุ",
            dataIndex: "remark",
          },
          {
            title: "ประเภทการซ่อม",
            dataIndex: "expence_id",
          },
          {
            title: "วันจบงาน",
            dataIndex: "close_date",
          },
        ];

        const excel = new Excel();
        excel
          .addSheet("sheet1")
          .addColumns(excelColumn)
          .addDataSource(repairLogsData.data.data, {})
          .addColumns([{ title: 'จำนวนทั้งหมด ' + repairLogsData.data.data.length }])
          .saveAs("report-it.xlsx");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <Table dataSource={props.data} columns={columns} topLeftButton={
        <ButtonGroup_it>
          {props?.user?.role === 2 || props?.user?.role === 3 ? (
            <div className="button-export-excel" onClick={handleClick}>
              <RiFileExcel2Fill className="icon-add" />
            </div>
          ) : ""}

          {props?.user?.role === 3 ? (
            <NavLink to={"/report-process/it"}>
              <button className="button-report-process">
                <TbReportSearch className="icon-add" />

              </button>
            </NavLink>
          ) : ""}
        </ButtonGroup_it>
      } />
      <RatingModel
        title={"ให้คะแนนแจ้งซ่อมเลขที่ " + selectedRecord?.ticket_no}
        visible={isModelOpen}
        closeIcon={<>X</>}
        destroyOnClose={true}
        onCancel={() => {
          setIsModelOpen(false);
        }}
        footer={[]}
      >
        <Rate
          style={{ margin: "0 auto" }}
          onChange={async (number) => {
            setRating(number)
          }}
        />
        <div className={'comment_ratung'}>
          <Input.TextArea placeholder={'กรุณาแสดงความคิดเห็นก่อนให้คะแนน'} onChange={(comment) => {
            setcomment_ratting(comment.target.value)
          }} />
        </div>
        <div className={'button-group'}>
          <button className="point" onClick={async () => {

            if (!rating) return message.warning('กรุณาให้คะแนน')

            try {
              let updateResult = await axios.put(
                "http://localhost:4000/api/repair_list/" +
                selectedRecord.id +
                "/update-rating",
                {
                  rating: rating,
                  comment_rating: comment_ratting
                },
                { withCredentials: true }
              );
              if (updateResult?.data?.status) {
                swal.fire({
                  title: "",
                  text: updateResult?.data?.message,
                  icon: "success",
                  confirmButtonText: "X",
                });

                props.setData(
                  props.data.map((item) =>
                    item.id === selectedRecord.id
                      ? { ...selectedRecord, rating: rating }
                      : item
                  )
                );
              } else {
                swal.fire({
                  title: "",
                  text: updateResult?.data?.message,
                  icon: "error",
                  confirmButtonText: "X",
                });
              }
              setIsModelOpen(false);
            } catch (error) {
              if (error.response.status == 401) {
                if (error.response.status == 401) {
                  Swal.fire({
                    title: 'กรุณาเข้าสู่ระบบก่อนเข้าใข้งาน',
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "/login"
                    }
                  })
                }
              }
            }
          }}>ให้คะแนน</button>
        </div >
      </RatingModel>
    </>
  );
}
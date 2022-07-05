import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "../../components/table";
import { AiTwotoneEdit } from "react-icons/ai";

export default function TableIt(props) {
  const [columns, setColumns] = useState([]);

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
            record.status == 'success' && !record.rating ?
              (<button className={"button-edit"} onClick={()=>{alert(1)}}>
                point
              </button>) : ''
        });
      }
      setColumns(column);
    };

    init();
  }, [props.user]);

  return <Table dataSource={props.data} columns={columns} />;
}

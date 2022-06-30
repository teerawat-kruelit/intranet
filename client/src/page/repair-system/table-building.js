import { useEffect, useState } from "react";
import axios from 'axios'
import Table from "../../components/table"
import { AiTwotoneEdit } from 'react-icons/ai'
import { NavLink } from "react-router-dom";

export default function TableBuilding(props) {

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const init = async () => {
            let column = [
                {
                    title: 'เลขที่แจ้งซ่อม',
                    dataIndex: 'ticket_no',
                    sorter: (a, b) => {
                        a = a.ticket_no || ''
                        b = b.ticket_no || ''
                        return a.localeCompare(b)
                    },
                },
                {
                    title: 'วันที่แจ้งซ่อม',
                    dataIndex: 'create_date',
                },
                {
                    title: 'ผู้แจ้งซ่อม',
                    dataIndex: 'TUserName',
                },
                {
                    title: 'เบอร์ต่อ',
                    dataIndex: 'ExtNo',
                },
                {
                    title: 'สาขาที่แจ้ง',
                    dataIndex: 'branch',
                },
                {
                    title: 'แจ้งปัญหา',
                    dataIndex: 'description',
                },
                {
                    title: 'ผู้ตรวจรับงาน',
                    dataIndex: 'admin_name',
                },
                {
                    title: 'ข้อมูลตอบกลับ',
                    dataIndex: 'remark',
                },
                {
                    title: 'status',
                    dataIndex: 'status',
                    render: (_, record) => (
                        <div className="table-button-group">
                            <button className={"button-detail status-" + record.status}>
                                <b>{record.status || '-'}</b>
                            </button>
                        </div>
                    ),
                },
            ]

            if (props?.user?.role === 2) {
                column.unshift({
                    title: '',
                    dataIndex: '',
                    width: 20,
                    render: (_, record) => (
                        <NavLink to={'/form-building/' + record.id}>
                            <button className={"button-edit"} >
                                <AiTwotoneEdit />
                            </button>
                        </NavLink>
                    ),
                })
            }

            setColumns(column)
        }

        init()
    }, [props.user]);


    return (
        <Table dataSource={props.data} columns={columns} />
    )
}

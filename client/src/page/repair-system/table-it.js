import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Table from "../../components/table"
import { AiTwotoneEdit } from 'react-icons/ai'

export default function TableIt(props) {

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const init = async () => {
            let resp = await axios.get('http://localhost:4000/api/repair_list/it', { withCredentials: true })

            if (resp?.data?.status) {
                setData(resp.data.data)
            }

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
                    title: 'IP-เครื่อง',
                    dataIndex: 'ip',
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
                        <NavLink to={'/form-it/'+record.id}>
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
        <Table dataSource={data} columns={columns} />
    )
}

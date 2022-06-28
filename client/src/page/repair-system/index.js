import SideBar from "../../components/sidebar.components"
import Navbar from "../../components/navbar.compoenets"
import styled from "styled-components"
import { IoIosDocument } from "react-icons/io"
import Card from "../../components/card"
import { NavLink } from "react-router-dom"
import { Tabs } from 'antd';
import TableIt from "./table-it"
import TableBuilding from "./table-building"
import axios from "axios"
import { useEffect, useState } from "react"

const { TabPane } = Tabs;

const RepairSystemComponent = styled.div`
    display: flex;
    width: 100%;

    .content{
        width: 100%;
    }

    .panel-group-card{
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
    }

    .repair-table{
        /* padding: 20px; */
        margin: 20px;
    }

    .button-group{
        display: flex;
    }
`



export default function RepairSystem() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                let resp = await axios.get('http://localhost:4000/api/user/profile', { withCredentials: true })
                if (resp?.data?.status) {
                    setUser(resp.data.data)
                }
            } catch (error) {
                if (error.response.status == 401) {
                    window.location.href = '/login'
                }
            }
        }
        init()
    }, []);

    return (
        <RepairSystemComponent className="repair-system">
            <SideBar items={[
                {
                    key: '1',
                    //   icon: <UserOutlined />,
                    label: 'Home',
                },
                {
                    key: '2',
                    //   icon: <VideoCameraOutlined />,
                    label: 'nav 2',
                },
                {
                    key: '3',
                    //   icon: <UploadOutlined />,
                    label: 'nav 3',
                },
            ]} />
            <div className='content'>
                <Navbar />
                <div className="repair-panel">
                    <div className="panel-group-card">
                        <Card name="ใบงานแจ้งซ่อม" number={0} detail="รายการแจ้งซ่อมในระบบ" icon={<IoIosDocument />} color="#FFCA2C" disabled />
                        <Card name="ใบงานแจ้งซ่อม" number={0} detail="รายการแจ้งซ่อม-ดำเนินการอยู่" icon={<IoIosDocument />} color="#d73747" />
                        <Card name="ใบงานแจ้งซ่อม" number={0} detail="รายการแจ้งซ่อม-สำเร็จ" icon={<IoIosDocument />} color="#149759" />
                        <Card name="ใบงานแจ้งซ่อม" number={0} detail="รายการแจ้งซ่อม-ยกเลิก" icon={<IoIosDocument />} color="#878a8d" />
                    </div>
                </div>
                <div className="repair-table">
                    <div className="title">รายการแจ้งซ่อม</div>
                    {user?.role === 1 ? 
                        <div className="button-group">
                            <NavLink to={'/form-it'}><button className="button-create-it">แจ้งซ่อมไอที</button></NavLink>
                            <NavLink to={'/form-building'}><button className="button-create-building">แจ้งซ่อมอาคาร</button></NavLink>
                        </div> : ''
                    }
                    <br />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Table-IT" key="1">
                            <TableIt user={user}/>
                        </TabPane>
                        <TabPane tab="Table-Building" key="2">
                            <TableBuilding  user={user}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </RepairSystemComponent>
    )
}

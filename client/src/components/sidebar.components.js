
import { Layout, Menu } from 'antd';
import { useEffect, useState } from "react";
import axios from 'axios'
import { GiHamburgerMenu } from 'react-icons/gi'
import styled from 'styled-components';
import { ImUserTie } from 'react-icons/im'
import { GoTools } from 'react-icons/go'
import { FaHome } from 'react-icons/fa'
import { GoInbox } from 'react-icons/go'
import { MdLogout } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const { Sider } = Layout;

const SideBarComponent = styled(Sider)`
    height: 100vh;
    position: fixed;

    .sidebar-trigger{
        /* display: none; */
        font-size: 30px;
        color: #000;
        position: absolute;
        cursor: pointer;
        right: -45px;
        margin-top: 7px
    }    

 
    .title{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
        width: 100%;
        height: 50px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
        margin-top: 5px;
        color: #FFFF;
    }

    hr{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
    }
    .icon{
        font-size: 40px;
        margin-top: 15px;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;

        .icon-slider{
            margin-top: 5px;
            background-color:#FFFF;
            width: 60px;
            height: 60px;
            border-radius: 50px;
            padding: 7px;
        } 
    }
    .username{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
        font-size: medium;
        color: #FFFF;
        text-align: center;
        margin: 5px 0 10px;
    }
    .button-signout{
        visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
       

        .button-out{
            background-color: red;
            color: #FFF;
            font-weight:bold;
            padding: 6px;
            border-radius: 5px;
        }
    }
  
  
    .icon-sli{
        font-size: 18px;
    }

    .head-slider{
        color: #FFF;
    }
    
    .head-slider{
        /* border: 1px solid red; */
        padding: 10px;
        margin-top: 5px;
        text-align: center;
    }
    
`

export default function SideBar(props) {

    const [collapsed, setCollapsed] = useState(false);
    const history = useNavigate()
    const { pathname } = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (!props.disableUserProfile) {
                try {
                    let resp = await axios.get('http://localhost:4000/api/user/profile', { withCredentials: true })
                    if (resp?.data?.status) {
                        setData(resp.data.data)
                    }


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
            }
        }
        init()
    }, [pathname]);

    return (
        <SideBarComponent trigger={null} collapsible collapsed={collapsed}>

            {props.disableUserProfile ?
                <div style={{ height: '220px' }}>
                    <div className='head-slider'>
                        {/* <img src="/logo-chase.png" className="logo-w" width={140} height={25}></img> */}
                    </div>
                </div> : <>
                    <div className="sidebar-trigger" onClick={() => {
                        setCollapsed(!collapsed)
                    }}>
                        {/* <GiHamburgerMenu className="sidebar-trigger-button" /> */}
                    </div>
                    <div className="title">
                        <img src="/logo-chase.png" className="logo-w" width={140} height={25}></img>
                    </div>
                    <hr />
                    <div className="icon" ><ImUserTie className='icon-slider'></ImUserTie></div>
                    <div className="username"><div className='h5 name'>HI' {data?.EUserName}</div></div>
                    <div className='button-signout' onClick={async () => {
                        let logout = await axios.post('http://localhost:4000/api/logout', null, { withCredentials: true })
                        if (logout?.data?.status) {
                            window.location.href = '/login'
                        }
                    }}><div className='button-out'>Sign-out</div></div>
                </>}
            <div className='menu'>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname.replace('/', '')]}
                    items={[
                        {
                            key: '',
                            icon: <FaHome className='icon-sli' />,
                            label: 'Home',
                        },
                        {
                            key: 'repair',
                            icon: <GoTools className='icon-sli' />,
                            label: 'Help-Desk',
                        },
                        {
                            key: 'stock',
                            icon: <GoInbox className='icon-sli' />,
                            label: 'Stock',
                        },
                    ]}
                    onClick={(item) => { history('/' + item.key) }}
                />
            </div>

        </SideBarComponent>
    )
}

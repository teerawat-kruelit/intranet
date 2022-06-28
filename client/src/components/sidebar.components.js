
import { Layout, Menu } from 'antd';
import { useEffect, useState } from "react";
import axios from 'axios'
import { GiHamburgerMenu } from 'react-icons/gi'
import styled from 'styled-components';
import { ImUserTie } from 'react-icons/im'


const { Sider } = Layout;

const SideBarComponent = styled(Sider)`
    height: 100vh;

    .sidebar-trigger{
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
        padding-top: 10px;
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
        font-size: medium;
        color: #FFFF;
        text-align: center;
        margin: 5px 0 10px;
    }
    .button-signout{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: red;

        .button-out{
            background-color: orange;
        }
    }
    
`

export default function SideBar(props) {

    const [collapsed, setCollapsed] = useState(false);

    const [data, setData] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                let resp = await axios.get('http://localhost:4000/api/user/profile', { withCredentials: true })
                if (resp?.data?.status) {
                    setData(resp.data.data)
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
        <SideBarComponent trigger={null} collapsible collapsed={collapsed}>
            <div className="sidebar-trigger" onClick={() => {
                setCollapsed(!collapsed)
            }}>
                <GiHamburgerMenu className="sidebar-trigger-button" />
            </div>
            <div className="title"><div className='h1'>INTRANET</div> </div>
            <hr />
            <div className="icon" ><ImUserTie className='icon-slider'></ImUserTie></div>
            <div className="username"><div className='h5 name'>HI' {data?.EUserName}</div></div>
            <div className='button-signout'><div className='button-out'>Sign-out</div></div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={props.items ? props.items : []}
            />
        </SideBarComponent>
    )
}

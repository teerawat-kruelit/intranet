import styled from "styled-components"
import Navbar from "../components/navbar.compoenets";
import { GiCardboardBoxClosed } from 'react-icons/gi'
import { GoTools } from 'react-icons/go'
import { TbBuildingBank } from 'react-icons/tb'
import SideBarComponent from "../components/sidebar.components";
import { NavLink } from 'react-router-dom'

const HomepageComponent = styled.div`
    display: flex;

    .content{
        width: 100%;
    }
`

const Contentportal = styled.div`
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;

    .content-group-button{
        display: flex;
        width: 100%;
        justify-content: space-around;

        .item-button{
            cursor: pointer;
            width: 200px;
            height: 150px;
            border: 1px solid lightgray;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-radius: 30px;
            box-shadow: 10px 5px 5px 0px rgba(0,0,0,0.75);

            .item-button-name{
                color: #000;
            }
            .item-button-icon{
                font-size: 30px;
                color: #000;
            }
        }
    }
`
export default function HomePage() {

    return (
        <HomepageComponent className="home-page">
            <SideBarComponent />
            <div className="content">
                <Navbar />
                <Contentportal className="content-portal">
                    <div className="content-group-button">
                        <div className="item-button">
                            <NavLink to={'/repair'}>
                                <div className="item-button__container">
                                    <div><GoTools className="item-button-icon" /></div>
                                    <span className="item-button-name">HELP-DESK</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="item-button">
                            <NavLink to={'/repair'}>
                                <div className="item-button__container">
                                    <div><TbBuildingBank className="item-button-icon" /></div>
                                    <span className="item-button-name">Booking-Room</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="item-button">
                            <NavLink to={'/repair'}>
                                <div className="item-button__container">
                                    <div><GiCardboardBoxClosed className="item-button-icon" /></div>
                                    <span className="item-button-name">Stork-IT</span>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </Contentportal>
            </div>
        </HomepageComponent>
    )
}

import React, { useEffect, useState } from 'react'
import styled from "styled-components"

const PanelCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 20%;
    height: 80px;
    border-left: 8px solid ${props => props.color ? props.color : '#FFF'};;
    background-color: #FFFF;
    color: #295A45;
    /* background-color: ${props => props.color ? props.color : '#FFF'}; */
    font-weight:bold;
    padding: 12px;
    border-radius: 5px;
    /* color: ${props => props.disabled ? '#000' : '#FFF'}; */
    box-shadow: 7px 3px 3px 0px gray;

    .number{
        font-size: 20px;
    }

    .card-icon{
        display: flex;
        align-items: center;
        font-size: 60px;
        color: #e2dbdb;
    }
`
export default function Card(props) {

    const [number, setNumber] = useState(0);

    useEffect(() => {
        switch (props.detail) {
            case 'รายการแจ้งซ่อม-ทั้งหมด':
                setNumber(props.number.length)
                break;
            case 'รายการแจ้งซ่อม-Process':
                setNumber(props.number.filter(item => item.status === 'process').length)
                break;
            case 'รายการแจ้งซ่อม-Success':
                setNumber(props.number.filter(item => item.status === 'success').length)
                break;
            case 'รายการแจ้งซ่อม-Pending':
                setNumber(props.number.filter(item => item.status === 'pending').length)
                break;
        }

    }, [props.number]);

    return (
        <PanelCard className="panel-card" color={props.color}>
            <div className="card-text">
                <div className='h1'>{props.name}</div>
                <div className='h3'>{props.detail}</div>
                <div className='number'>{number}</div>
            </div>
            <div className="card-icon">
                {props.icon}
            </div>
        </PanelCard>
    )
}

import React from 'react'
import styled from "styled-components"

const PanelCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 23%;
    height: 100px;
    background-color: ${props => props.color ? props.color : '#FFF'};
    font-weight:bold;
    padding: 12px;
    border-radius: 15px;
    color: ${props => props.disabled ? '#000' : '#FFF'};
    box-shadow: 7px 3px 3px 0px gray;

    .card-icon{
        display: flex;
        align-items: center;
        font-size: 60px;
        color: #e2dbdb;
    }
`
export default function Card(props) {
    return (
        <PanelCard className="panel-card" color={props.color} disabled={props.disabled}>
            <div className="card-text">
                <div className='h1'>{props.name}</div>
                <div className='h2'>{props.number}</div>
                <div className='h3'>{props.detail}</div>
            </div>
            <div className="card-icon">
                {props.icon}
            </div>
        </PanelCard>
    )
}

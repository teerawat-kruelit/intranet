import React from 'react'
import { Table } from "antd"
import styled from 'styled-components'

const TableConponent = styled(Table)`
    .ant-table-tbody > tr > td,
    .ant-table-thead > tr > th{
        /* border: 1px solid gray; */
        font-size: 10px;
    }

    .ant-table-thead > tr > th{
        font-weight: bold;
        background-color: black;
        color: #FFFF;
        font-size: 12px;
    }

    .ant-table-thead .ant-table-cell{
        text-align: center;
    }

    .ant-table-thead th.ant-table-column-has-sorters:hover{
      background-color: #000;
    }

`

export default function table(props) {
  return (
    <TableConponent className="table" rowKey={'id'} dataSource={props.dataSource} columns={props.columns} bordered/>
  )
}

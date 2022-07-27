import { useState } from "react";
import { Table as AntdTable } from "antd";
import { Input } from "antd";
import styled from "styled-components";
import { useEffect } from "react";

const InputSerach = styled(Input.Search)`
  width: 300px;
`

const TableComponent = styled(AntdTable)`
  .ant-table-tbody > tr > td,
  .ant-table-thead > tr > th {
    /* border: 1px solid gray; */
    font-size: 10px;
  }

  .ant-table-tbody > tr > td{
    word-break: break-all;
  }

  .ant-table-thead > tr > th {
    font-weight: bold;
    background-color: black;
    color: #ffff;
    font-size: 12px;
    white-space: nowrap;
  }

  .ant-table-thead .ant-table-cell {
    text-align: center;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background-color: #000;
  }

  .table-search-input{
    color: gray;
  }
`

const TabletotalRows = styled.div`
    font-size:18px;
    position: absolute;
    bottom: -335px;
`;


export default function Table(props) {
  const [filterWord, setFilterWord] = useState(null);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (filterWord) {
      let filterData = props.dataSource.filter((entry) => {
        let objKey = Object.keys(entry)
          .map((key) =>
            entry[key] !== null &&
              entry[key] !== true &&
              entry[key] !== false &&
              entry[key].toString().includes(filterWord) &&
              props.columns.some((o) => o.dataIndex)
              ? key
              : null
          )
          .filter((item) => item);

        if (objKey.length > 0) return entry;
        return null;
      });

      setFilterData(filterData);
    }
  }, [props.columns, props.dataSource, filterWord]);

  return (
    <>
      <div className="Search" style={{ width: '100%', display: "flex", justifyContent: 'space-between', minHeight: '20px' }}>
        {props.topLeftButton ? props.topLeftButton : <></>}
        <InputSerach
          className={'table-search-input'}
          placeholder="Search"
          onChange={(e) => {
            let value = e.target.value;
            if (value === "") value = null;
            setFilterWord(value);
          }}
        />
      </div>

      <TableComponent
        className="table"
        rowKey={"id"}
        dataSource={filterWord ? filterData : props.dataSource}
        scroll={{ x: 400 }}
        columns={props.columns}
        bordered
      />
      {/* <TabletotalRows className={'table-total-rows'}>รายการทั้งหมด : {props.dataSource.length} Row</TabletotalRows> */}
    </>
  );
}

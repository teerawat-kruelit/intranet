import { useState, useEffect } from 'react'
import { Table as antdTable } from 'antd'
import styled from 'styled-components'
import InputSearch from './search'


const Container = styled.div`
  .data-length {
    width: 100%;
    margin-top: 5px;
    text-align: center;
  }

  .top-button {
    display: flex;
    justify-content: space-between;
  }
`
const Table = styled(antdTable)`
  margin-top: 5px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  color: #000;
  font-size: 16px !important;

  .ant-table {
    overflow-x: auto;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    color: black;
  }

  .ant-table-tbody > tr {
    cursor: ${(props) => (props.onClickRow || props.onDoubleClickRow ? 'pointer' : 'default')};
    &.odd {
      /* td{ background-color: #F5F5F5} */
    }
  }

  .ant-table-thead > tr > th {
    background-color: #800020;
    border-left: 0.5px solid #9e9e9e;
    border-bottom: 0.5px solid #9e9e9e;
    padding: 10px 2px;
    color: #fff;
    font-size: 14px;
    white-space: nowrap;

    &.action.ant-table-cell-fix-right {
      /* box-shadow: -4px 0px 5px -3px #616161; */
    }

    :first-child {
      border-top-left-radius: 5px !important;
      .ant-table-column-sorters {
        svg {
          font-size: 10px !important;
        }
        ::after {
          border-top-left-radius: 5px !important;
        }
      }
    }
    &:hover {
      background: #800020 !important;
      filter: brightness(120%);
    }

    span {
      text-align: center !important;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 10px 10px;
    /* max-width: 150px; */
    border-left: 0.5px solid #cacaca5b;
    border-bottom: 0.5px solid #cacaca5b;
    font-size: 16px;
    font-weight: 550;
    &.no-wrap {
      white-space: nowrap;
    }
    &.action {
      padding: 8px;
      button {
        height: 0px !important;
      }
    }
    &.action.ant-table-cell-fix-right {
      /* box-shadow: -4px 0px 5px -3px #616161; */
    }
    &.ant-table-column-sort {
      background: transparent !important;
    }
  }

  .ant-table-pagination {
    display: ${(props) => (props.disabledPagination ? 'none' : 'flex')};
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #800020;
    box-shadow: none;
  }
  .ant-pagination-next:hover .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-item-active,
  .ant-pagination-item:hover {
    border-color: #800020;
    a {
      color: #800020;
    }
    span {
      color: #800020;
    }
  }

  .action {
    width: 80px;
    button {
      box-shadow: none !important;
      width: 30px;
      min-height: 20px !important;
      border: none !important;
      background-color: transparent !important;
      padding: 0px !important;
    }
    &.item-3 {
      width: 120px;
    }

    @media only screen and (max-width: 768px) {
      width: 50px;
    }
  }
`

export default function Index(props) {
  const [mode, setMode] = useState('data')
  const [filterData, setFilterData] = useState([])
  const [allowSearch, setAllowSearch] = useState(null)

  useEffect(() => {}, [props.data, mode, filterData])

  const filterByValue = (e) => {
    let value = e.target.value
    value.length < 1 ? setMode('data') : setMode('filter')

    let newData = props.data.filter((entry) => {
      let isIncludes = false
      Object.keys(entry).map((key) => {
        if (
          entry[key] !== null &&
          entry[key] !== true &&
          entry[key] !== false &&
          entry[key].toString().includes(value) &&
          !isIncludes &&
          allowSearch.indexOf(key) >= 0 &&
          props.columns.some((o) => o.dataIndex)
        ) {
          isIncludes = true
        }
      })
      return isIncludes
    })

    setFilterData(newData)
  }
  return (
    <Container className={'table ' + (props.className ? props.className : '')}>
      <div className="table__container">
        <div className="top-button">
        {!props.disabledSearch && (
            <InputSearch
              data={props.data}
              filterByValue={filterByValue}
              columns={props.columns}
              allowSearch={allowSearch}
              setAllowSearch={setAllowSearch}
            />
          )}
          {props.topRightButton ? props.topRightButton : ''}
        </div>
        <Table
          rowClassName={(record, index) => (index % 2 === 0 ? 'even' : 'odd')}
          className={'table-control ' + (props.className ? props.className : '')}
          id={props.dataSet}
          rowSelection={props.rowSelection}
          rowKey={props.rowKey ? props.rowKey : 'id'}
          columns={props.columns}
          onChange={props.onChange ? props.onChange : () => {}}
          pagination={
            props.pagination
              ? props.pagination
              : {
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  // position: ["bottomCenter"],
                  pageSizeOptions: ['5', '10', '20', '30', '50', '100']
                }
          }
        //   onRow={(record, i) => {
        //     return {
        //       onClick: () => {
        //         props.onClickRow ? props.onClickRow(record, i) : () => {}
        //       },
        //       onDoubleClick: () => {
        //         props.onDoubleClickRow ? props.onDoubleClickRow(record, i) : () => {}
        //       }
        //     }
        //   }}
          onClickRow={props.onClickRow} //styled css cursor
          onDoubleClickRow={props.onDoubleClickRow} //styled css cursor
          disabledPagination={props.disabledPagination}
          dataSource={mode === 'data' ? props.data : filterData}
          loading={props.loading}></Table>
      </div>
    </Container>
  )
}

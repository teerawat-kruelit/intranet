import { useState, useEffect } from 'react'
import styled from 'styled-components'
import TableControl from './table'

const TableControlComponent = styled(TableControl)`
  width: 100%;
`

export default function TableMgtUser(props) {
  const [initLoading, setInitLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const init = async () => {
      if (!data) {
        setData([
          { id: 1, ticket_no: 'TK-001', first_name: 'อาม', phone: '099999999' },
          { id: 2, ticket_no: 'TC-002', first_name: 'TK-0002', phone: '099999999' },
          { id: 3, ticket_no: 'TK-003', first_name: 'อาม', phone: '099999999' },
          { id: 4, ticket_no: 'TK-004', first_name: 'อาม', phone: '099999999' },
          { id: 5, ticket_no: 'TK-004', first_name: 'อาม', phone: '099999999' },
          { id: 6, ticket_no: 'TK-004', first_name: 'อาม', phone: '099999999' },
          { id: 7, ticket_no: 'TK-004', first_name: 'อาม', phone: '099999999' },
          { id: 8, ticket_no: 'TK-004', first_name: 'อาม', phone: '099999999' },
          { id: 9, ticket_no: 'TK-004', first_name: 'อาม', phone: '099999999' },
          { id: 10, ticket_no: 'TK-004', first_name: 'อาม', phone: '099999999' },
          { id: 11, ticket_no: 'TK-005', first_name: 'อาม', phone: '099999999' }
        ])
      }
      setTimeout(() => {
        setInitLoading(false)
      }, 2000)
    }

    init()
  }, [data])

  const column = [
    {
      title: 'เลขที่แจ้งซ่อม',
      dataIndex: 'ticket_no',
      align: 'center',
      className: 'no-wrap on-search',
      sorter: (a, b) => {
        a = a.ticket_no || ''
        b = b.ticket_no || ''
        return a.localeCompare(b)
      }
    },
    {
      title: 'ผู้แจ้งซ่อม',
      dataIndex: 'first_name',
      align: 'center',
      className: 'no-wrap on-search',
      sorter: (a, b) => {
        a = a.first_name || ''
        b = b.first_name || ''
        return a.localeCompare(b)
      }
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'phone',
      align: 'center',
      className: 'no-wrap on-search',
      sorter: (a, b) => {
        a = a.tel || ''
        b = b.tel || ''
        return a.localeCompare(b)
      }
    },
    {
      title: 'action',
      dataIndex: '',
      align: 'center',
      className: 'no-wrap',
      render: (_, record) => {
        return (
          <button
            onClick={() => {
              alert(record.ticket_no)
            }}>
            sdadsd
          </button>
        )
      }
    }
  ]

  return (
    <TableControlComponent
      className={'table-mgt-user-user' + (props.className ? props.className : '')}
      rowKey={'id'}
      data={data}
      columns={column}
      loading={initLoading}
      onDoubleClickRow={(record) => {}}
    />
  )
}

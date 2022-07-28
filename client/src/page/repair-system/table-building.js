import { useEffect, useState } from 'react'
import Table from '../../components/table'
import { AiTwotoneEdit } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { Excel } from 'antd-table-saveas-excel'
import axios from 'axios'
import styled from 'styled-components'
import swal from 'sweetalert2'
import { Input, message, Modal, Rate } from 'antd'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import Swal from 'sweetalert2'

const RatingModel = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
  }

  .button-group {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    .point {
      background-color: #015352;
      border-radius: 5px;
      border: none;
      padding: 5px;
      color: #ffff;
    }
  }

  .comment_ratung {
    margin-top: 20px;
  }
`

const RatingPoint = styled.div`
  border: 1px solid red;
  border-radius: 50%;
  text-align: center;
  width: 20px;
  height: 20px;
  background-color: #564cf1;
  border: none;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50px;
`

const ButtonGroup_it = styled.div`
  display: flex;

  .button-export-excel,
  .button-report-process {
    background-color: #015352;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    padding: 7px;
    margin-bottom: 10px;
    margin-right: 15px;
    cursor: pointer;

    .icon-add {
      font-size: 20px;
      margin-right: 5px;
      display: flex;
      align-items: center;
    }
  }
`
export default function TableBuilding(props) {
  const [columns, setColumns] = useState(null)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(false)
  const [rating, setRating] = useState(null)
  const [comment_ratting, setcomment_ratting] = useState(1)

  useEffect(() => {
    const init = async () => {
      let column = [
        {
          title: 'เลขที่แจ้งซ่อม',
          dataIndex: 'ticket_no',
          sorter: (a, b) => {
            a = a.ticket_no || ''
            b = b.ticket_no || ''
            return a.localeCompare(b)
          }
        },
        {
          title: 'วันที่แจ้งซ่อม',
          dataIndex: 'create_date'
        },
        {
          title: 'ผู้แจ้งซ่อม',
          dataIndex: 'TUserName'
        },
        {
          title: 'เบอร์ต่อ',
          dataIndex: 'ExtNo'
        },
        {
          title: 'สาขาที่แจ้ง',
          dataIndex: 'branch'
        },
        {
          title: 'แจ้งปัญหา',
          dataIndex: 'description'
        },
        {
          title: 'ผู้ตรวจรับงาน',
          dataIndex: 'admin_name'
        },
        {
          title: 'ข้อมูลตอบกลับ',
          dataIndex: 'remark'
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
          render: (_, record) => (
            <div className="table-button-group">
              <button className={'button-detail status-' + record.status}>
                <b>{record.status || '-'}</b>
              </button>
            </div>
          )
        }
      ]

      if (props?.user?.role === 2) {
        column.unshift({
          title: '',
          dataIndex: '',
          width: 20,
          render: (_, record) => (
            <NavLink to={'/form-building/' + record.id}>
              <button className={'button-edit'}>
                <AiTwotoneEdit />
              </button>
            </NavLink>
          )
        })
      }

      if (props?.user?.role === 1) {
        column.push({
          title: 'point',
          dataIndex: '',
          width: 20,
          render: (_, record) => (
            <>
              {record.status == 'success' && !record.rating ? (
                <button
                  className={'button-rating'}
                  onClick={() => {
                    setIsModelOpen(true)
                    setSelectedRecord(record)
                  }}>
                  ★
                </button>
              ) : (
                ''
              )}
              {record.status == 'success' && record.rating ? <RatingPoint>{record.rating}</RatingPoint> : ''}
            </>
          )
        })
      }
      setColumns(column)
    }

    init()
  }, [props.user, props.data])

  const handleClick = async () => {
    try {
      let repairLogsData = await axios.get('http://localhost:4000/api/repair_list/building-logs', { withCredentials: true })

      if (repairLogsData?.data?.status) {
        let excelColumn = [
          {
            title: 'เลขที่แจ้งซ่อม',
            dataIndex: 'ticket_no'
          },
          {
            title: 'ผู้ติดต่อ',
            dataIndex: 'TUserName'
          },
          {
            title: 'ผู้ตรวจรับงาน',
            dataIndex: 'admin_name'
          }
        ]

        const excel = new Excel()
        excel
          .addSheet('sheet1')
          .addColumns(excelColumn)
          .addDataSource(repairLogsData.data.data, {})
          .setTHeadStyle({ background: '#FFF' })
          .setTBodyStyle({ color: 'red' })
          .saveAs('report-building.xlsx')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Table
        dataSource={props.data}
        columns={columns}
        topLeftButton={
          <ButtonGroup_it>
            {props?.user?.role === 2 || props?.user?.role === 3 ? (
              <div className="button-export-excel" onClick={handleClick}>
                <RiFileExcel2Fill className="icon-add" />
              </div>
            ) : (
              ''
            )}

            {props?.user?.role === 3 ? (
              <NavLink to={'/report-process/building'}>
                <button className="button-report-process">
                  <TbReportSearch className="icon-add" />
                </button>
              </NavLink>
            ) : (
              ''
            )}
          </ButtonGroup_it>
        }
      />
      <RatingModel
        title={'ให้คะแนนแจ้งซ่อมเลขที่ ' + selectedRecord?.ticket_no}
        visible={isModelOpen}
        closeIcon={<>X</>}
        destroyOnClose={true}
        onCancel={() => {
          setIsModelOpen(false)
        }}
        footer={[]}>
        <Rate
          style={{ margin: '0 auto' }}
          onChange={async (number) => {
            setRating(number)
          }}
        />
        <div className={'comment_ratung'}>
          <Input.TextArea
            placeholder={'กรุณาแสดงความคิดเห็นก่อนให้คะแนน'}
            onChange={(comment) => {
              setcomment_ratting(comment.target.value)
            }}
          />
        </div>
        <div className={'button-group'}>
          <button
            className="point"
            onClick={async () => {
              if (!rating) return message.warning('กรุณาให้คะแนน')

              try {
                let updateResult = await axios.put(
                  'http://localhost:4000/api/repair_list/' + selectedRecord.id + '/update-rating',
                  {
                    rating: rating,
                    comment_rating: comment_ratting
                  },
                  { withCredentials: true }
                )

                if (updateResult?.data?.status) {
                  swal.fire({
                    title: '',
                    text: updateResult?.data?.message,
                    icon: 'success',
                    confirmButtonText: 'X'
                  })

                  props.setData(props.data.map((item) => (item.id === selectedRecord.id ? { ...selectedRecord, rating: rating } : item)))
                } else {
                  swal.fire({
                    title: '',
                    text: updateResult?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'X'
                  })
                }
                setIsModelOpen(false)
              } catch (error) {
                if (error?.response?.status == 401) {
                  if (error.response.status == 401) {
                    Swal.fire({
                      title: 'กรุณาเข้าสู่ระบบก่อนเข้าใข้งาน',
                      confirmButtonText: 'OK'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.href = '/login'
                      }
                    })
                  }
                } else {
                  console.log(error)
                }
              }
            }}>
            ให้คะแนน
          </button>
        </div>
      </RatingModel>
    </>
  )
}

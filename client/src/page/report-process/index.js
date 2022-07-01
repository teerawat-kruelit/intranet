import React, { useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router'
import styled from 'styled-components';
import Navbar from '../../components/navbar.compoenets';
import axios from 'axios';
import dayjs from 'dayjs'
import swal from 'sweetalert2'
import { Progress } from 'antd';
dayjs.locale('th')

const ReportProcessComponent = styled.div`
    border: 1px solid #e2e0e0;
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;

    .form-header{
        color: #FFF;
        text-align: center;
        background-color: #015352;
        font-size: 16px;
        font-weight:bold;
        padding:5px;
    }
    
    .procress-group{
      width: 500px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid lightgray;

      .process-date{
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: bold;
      }
      
      .summary{
        text-align: center;
        margin-top: 10px;
        font-size: 18px;
        font-weight: 400;
      }

      .process-item{
        margin-top: 15px;
      }

      .label-icon.success{
        color: #52c41a;
      }
      .label-icon.pending{
        color: yellow;
      }
      .label-icon.process{
        color: red;
      }
      .label-icon.reject{
        color: #1890ff;
      }

      .process-bar{
        display: flex;
        & > div {
          margin-left: 10px;
        }
      }
    }
`

const ProcessComponent = styled(Progress)`
    &.success.ant-progress-status-normal,
    &.success.ant-progress-status-success{
      .ant-progress-bg{
        background-color: #52c41a;
      }
    }

    &.pending.ant-progress-status-normal,
    &.pending.ant-progress-status-success{
      .ant-progress-bg{
        background-color: yellow;
      }
    }

    &.process.ant-progress-status-normal,
    &.process.ant-progress-status-success{
      .ant-progress-bg{
        background-color: red;
      }
    }

    &.reject.ant-progress-status-normal,
    &.reject.ant-progress-status-success{
      .ant-progress-bg{
        background-color: #1890ff;
      }
    }
`

export default function ReportProcess() {

  const [reportIt, setreportIt] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const history = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        let itResp = await axios.get('http://localhost:4000/api/repair_list/it', { withCredentials: true })
        if (itResp?.data?.status) {
          setreportIt(itResp.data.data)
        }
        
      } catch (error) {
        console.log(error.response.status)
        if (error.response.status === 401){
          window.location.href = '/login'
        }
      }
    }

    init()
  }, [currentDate]);



  return (
    <>
      <Navbar />
      <ReportProcessComponent className='report-process'>
        <div className='form-header'>Report Process</div>
        <div className="procress-group">
          <div className="process-date">
            <button className="prev" onClick={() => {
              setCurrentDate(currentDate.subtract(1, 'month'))
            }}>{'<'}</button>
            <span>{currentDate.format('MMMM')} {currentDate.format('YYYY')}</span>
            <button className="next" onClick={() => {
              setCurrentDate(currentDate.add(1, 'month'))
            }}>{'>'}</button>
          </div>
          <div className="process-item">
            <div className="label"> <span className='label-icon success'>██</span> <span>Success</span></div>
            <div className="process-bar">
              <ProcessComponent className='success' percent={150} showInfo={false} />
              <div className="amount">150</div>
            </div>
          </div>
          <div className="process-item pending">
            <div className="label"> <span className='label-icon pending'>██</span> <span>Pending</span></div>
            <div className="process-bar">
              <ProcessComponent className='pending' percent={150} showInfo={false} />
              <div className="amount">150</div>
            </div>
          </div>
          <div className="process-item process">
            <div className="label"> <span className='label-icon process'>██</span> <span>Process</span></div>
            <div className="process-bar">
              <ProcessComponent className='process' percent={150} showInfo={false} />
              <div className="amount">150</div>
            </div>
          </div>
          <div className="process-item reject">
            <div className="label"> <span className='label-icon reject'>██</span> <span>Reject</span></div>
            <div className="process-bar">
              <ProcessComponent className='reject' percent={150} showInfo={false} />
              <div className="amount">150</div>
            </div>

            <div className="summary">
              <div className="total">ทั้งหมด {reportIt.length} รายการ</div>
            </div>
          </div>
        </div>
      </ReportProcessComponent>

    </>
  )
}

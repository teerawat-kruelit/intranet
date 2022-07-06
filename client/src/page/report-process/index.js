import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar.compoenets";
import axios from "axios";
import dayjs from "dayjs";
import { Progress } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router'

const ReportProcessComponent = styled.div`
  border: 1px solid #e2e0e0;
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;

  .form-header {
    color: #fff;
    text-align: center;
    background-color: #015352;
    font-size: 16px;
    font-weight: bold;
    padding: 5px;
  }

  .report-display{
    display: flex;
    justify-content: center;
    padding: 40px 0px;

    & > div:not(:first-child){
      margin-left: 20px;
    }
  }

  .procress-group {
    width: 500px;
    background-color: #FFF;
    position: relative;
    /* margin: 20px 0; */
    padding: 20px;
    padding-bottom: 40px;
    border: 1px solid lightgray;
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 5%);

    .process-date {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: bold;
    }

    .summary {
      position: absolute; 
      width: 100%;
      bottom: 0;
      font-size: 18px;
      text-align: center;
    }

    .process-item {
      margin-top: 15px;
    }

    .label-icon.success {
      color: #52c41a;
      margin-right: 5px;
    }
    .label-icon.pending {
      color: yellow;
    }
    .label-icon.process {
      color: red;
    }
    .label-icon.reject {
      color: #1890ff;
    }

    .process-bar {
      display: flex;
      & > div {
        margin-left: 10px;
      }
    }
  }
`;

const ProcessComponent = styled(Progress)`
  &.success.ant-progress-status-normal,
  &.success.ant-progress-status-success {
    .ant-progress-bg {
      background-color: #52c41a;
    }
  }

  &.rating.ant-progress-status-normal,
  &.rating.ant-progress-status-success,
  &.pending.ant-progress-status-normal,
  &.pending.ant-progress-status-success {
    .ant-progress-bg {
      background-color: yellow;
    }
  }

  &.process.ant-progress-status-normal,
  &.process.ant-progress-status-success {
    .ant-progress-bg {
      background-color: red;
    }
  }

  &.reject.ant-progress-status-normal,
  &.reject.ant-progress-status-success {
    .ant-progress-bg {
      background-color: #1890ff;
    }
  }
`;

const RatingComponent = styled.div`
  border: 1px solid #e2e0e0;
  background-color: #FFF;
  box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 5%);
  max-width: 500px;
  padding: 20px 20px;
  width: 500px;
  position: relative;

  .rating-item{
    margin-top: 10px;
    display: flex;
    .admin-img{
      background-color: #7A798A;
      border-radius: 50%;
      width: 60px;
      height: 45px;
      margin-right: 10px;
      overflow: hidden;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .admin-rating{
      width: 100%;
    }
  }

  .total-rating{
    width: 100%;
    position: absolute; 
    bottom: 0;
    font-size: 18px;
    text-align: center;
  }
`

export default function ReportProcess() {
  const [reportIt, setReportIt] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { type } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        let itResp = await axios.get(
          "http://localhost:4000/api/report/repair",
          {
            params: {
              month: currentDate.format("MM"),
              year: currentDate.format("YYYY"),
              type_id: type === "it" ? 1 : 2,
            },
            withCredentials: true,
          }
        );

        if (itResp?.data?.status) {
          setReportIt(itResp.data.data);
        }

        let ratingResp = await axios.get(
          "http://localhost:4000/api/report/rating",
          {
            params: {
              month: currentDate.format("MM"),
              year: currentDate.format("YYYY"),
              type_id: type === "it" ? 1 : 2,
            },
            withCredentials: true,
          }
        );

        if (ratingResp?.data?.status) {
          setRatingData(ratingResp.data.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
      }
    };
    init();
  }, [currentDate]);

  return (
    <div className="content" style={{backgroundColor: 'rgba(88, 115, 254, 0.04)', minHeight: '100vh'}}>
      <Navbar />
      <ReportProcessComponent className="report-process">
        <div className="form-header">Report Process</div>
        <div className="report-display">
          <div className="procress-group">
            <div className="process-date">
              <button
                className="prev"
                onClick={() => {
                  setCurrentDate(currentDate.subtract(1, "month"));
                }}
              >
                {"<"}
              </button>
              <span>
                {currentDate.format("MMMM")} {currentDate.format("YYYY")}
              </span>
              <button
                className="next"
                onClick={() => {
                  setCurrentDate(currentDate.add(1, "month"));
                }}
              >
                {">"}
              </button>
            </div>
            <div className="process-item">
              <div className="label">
                <span className="label-icon success">██</span>
                <span>Success</span>
              </div>
              <div className="process-bar">
                <ProcessComponent
                  className="success"
                  percent={reportIt?.success}
                  showInfo={false}
                />
                <div className="amount">{reportIt?.success}</div>
              </div>
            </div>
            <div className="process-item pending">
              <div className="label">
                <span className="label-icon pending">██</span>{" "}
                <span>Pending</span>
              </div>
              <div className="process-bar">
                <ProcessComponent
                  className="pending"
                  percent={reportIt?.pending}
                  showInfo={false}
                />
                <div className="amount">{reportIt?.pending}</div>
              </div>
            </div>
            <div className="process-item process">
              <div className="label">
                <span className="label-icon process">██</span>{" "}
                <span>Process</span>
              </div>
              <div className="process-bar">
                <ProcessComponent
                  className="process"
                  percent={reportIt?.process}
                  showInfo={false}
                />
                <div className="amount">{reportIt?.process}</div>
              </div>
            </div>
            <div className="process-item reject">
              <div className="label">
                <span className="label-icon reject">██</span> <span>Reject</span>
              </div>
              <div className="process-bar">
                <ProcessComponent
                  className="reject"
                  percent={reportIt?.reject}
                  showInfo={false}
                />
                <div className="amount">{reportIt?.reject}</div>
              </div>

              <div className="summary">
                <div className="total">
                  ทั้งหมด{" "}
                  {reportIt?.total || 0}{" "}
                  รายการ
                </div>
              </div>
            </div>

          </div>
          <RatingComponent>
            <div className="admin-group">
              {ratingData.map((item) => (
                <div className="rating-item" key={item.id}>
                  <div className="admin-img"><img src={'http://localhost:4000/public/image/repair/' + item.image}></img></div>
                  <div className="admin-rating">
                    <div className="admin-name">{item.admin_name} {item.sum_rating || 0}</div>
                    <div className="admin-process"> <ProcessComponent
                      className="rating"
                      percent={item.sum_rating || 0}
                      showInfo={false}
                    /></div>
                  </div>
                </div>))}
            </div>
            <div className="total-rating">ทั้งหมด {ratingData.reduce((rating, object) => {
              return rating + object.sum_rating;
            }, 0)} คะแนน</div>
          </RatingComponent>

        </div>
        <button className="button-back" onClick={() => {
          history('/repair')
        }}>
          HOME
        </button>
      </ReportProcessComponent>
    </div>
  );
}

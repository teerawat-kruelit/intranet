import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar.compoenets";
import axios from "axios";
import dayjs from "dayjs";
import { Progress } from "antd";
import { useParams } from "react-router-dom";
import { ImStarFull } from 'react-icons/im'

const ReportProcessComponent = styled.div`
  border: 1px solid #e2e0e0;
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 0px 0px 20px 0px;

  .form-header {
    color: #fff;
    text-align: center;
    background-color: #015352;
    font-size: 16px;
    font-weight: bold;
    padding: 5px;
  }

  .procress-group {
    width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid lightgray;

    .process-date {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: bold;
    }

    .summary {
      text-align: center;
      margin-top: 10px;
      font-size: 18px;
      font-weight: 400;
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
  max-width: 500px;
  padding: 20px 20px;
  margin: 0 auto;

  .rating-icon{
    display: flex;
    justify-content: center;
    font-size: 32px;
  }

  .rating-label{
    margin-top: 10px;
    font-size: 32px;
    text-align: center;
  }

  .rating-number{
    font-size: 30px;
    text-align: center;
  }
`

export default function ReportProcess() {
  const [reportIt, setReportIt] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { type } = useParams();

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
    <div className="content">
      <Navbar />
      <ReportProcessComponent className="report-process">
        <div className="form-header">Report Process</div>
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
        <RatingComponent className="rating-form">
          <div className="rating-icon">
            <ImStarFull />
          </div>
          <div className="rating-label">
            คะแนน
          </div>
          <div className="rating-number">
            {ratingData?.sum_rating || 0}
          </div>
        </RatingComponent>
      </ReportProcessComponent>
    </div>
  );
}

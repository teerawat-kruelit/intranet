import SideBar from "../../components/sidebar.components";
import Navbar from "../../components/navbar.compoenets";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import { Progress } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'

const Content = styled.div`
  display: flex;
  width: 100%;
    .report-container{
      width: 100%;
    }
  
`

const ReportProcessComponent = styled.div`
  width: 100%;

  .report-display{
    display: flex;
    justify-content: center;  
    padding: 40px 0px;
    flex-wrap: wrap;

    & > div:not(:first-child){
      margin-left: 20px;
    }
    .prev,.next{
      border: none;
      font-size: 30px;
    }
  }

  .procress-group {
    width: 500px;
    background-color: #FFF;
    position: relative;
    /* margin: 20px 0; */
    padding: 20px;
    padding-bottom: 40px;
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 5%);

    .process-date {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 15px;
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
      color: #157347;
      margin-right: 5px;
    }
    .label-icon.pending {
      color: #FFCA2C;
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

  .topic-group{
    width: 500px;
    background-color: #FFF;
    position: relative;
    /* margin: 20px 0; */
    padding: 20px;
    padding-bottom: 40px;
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 5%);

    .process-date {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 15px;
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
      color: #157347;
      margin-right: 5px;
    }
    .label-icon.pending {
      color: #FFCA2C;
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
      background-color: #157347;
    }
  }

  &.rating.ant-progress-status-normal,
  &.rating.ant-progress-status-success,
  &.pending.ant-progress-status-normal,
  &.pending.ant-progress-status-success {
    .ant-progress-bg {
      background-color: #FFCA2C;
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
  background-color: #FFF;
  box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 5%);
  max-width: 400px;
  padding: 20px 20px;
  width: 400px;
  position: relative;

  .rating-item{
    margin-top: 20px;
    display: flex;
    .admin-img{
      background-color: #7A798A;
      border-radius: 50%;
      width: 77px;
      height: 63px;
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
  const [topicData, setTopicData] = useState([]);
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

        let topicResp = await axios.get(
          "http://localhost:4000/api/report/topic",
          {
            params: {
              month: currentDate.format("MM"),
              year: currentDate.format("YYYY"),
              type_id: type === "it" ? 1 : 2,
            },
            withCredentials: true,
          }
        );
        if (topicResp?.data?.status) {
          setTopicData(topicResp.data.data);
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
    <Content style={{ backgroundColor: 'rgba(88, 115, 254, 0.04)', minHeight: '100vh' }}>
      <SideBar />
      <div className="report-container">
        <Navbar />
        <ReportProcessComponent className="report-process">
          <div className="report-display">
            <div className="process-group-wrapper">
              <div className="procress-group">
                <div className="process-date">
                  <button
                    className="prev"
                    onClick={() => {
                      setCurrentDate(currentDate.subtract(1, "month"));
                    }}
                  >
                    {<BsFillArrowLeftSquareFill />}
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
                    {<BsFillArrowRightSquareFill />}
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
            </div>


            <div className="rating-group">
              <RatingComponent>
                <div className="admin-group">
                  {ratingData.map((item) => (
                    <div className="rating-item" key={item.id}>
                      <div className="admin-img"><img src={'http://localhost:4000/public/image/repair/' + item.image}></img></div>
                      <div className="admin-rating">
                        <div className="admin-name">{item.admin_name}</div>
                        <div className="admin-process">
                          <ProcessComponent
                            className="rating"
                            percent={item.sum_rating || 0}
                            showInfo={false}
                          />
                          <div class="rating-total">{item.sum_rating || 0}</div>
                        </div>
                      </div>
                    </div>))}
                </div>
                <div className="total-rating">ทั้งหมด {ratingData.reduce((rating, object) => {
                  return rating + object.sum_rating;
                }, 0)} คะแนน</div>
              </RatingComponent>
            </div>

            <div className="process-group">
              <div className="head-topic">
                <div className="head-flex">
                  <h3>Report-Topic</h3>
                </div>
              </div>
              <div className="topic-group">
                {topicData.map((item) => (
                  <div className="process-item" key={item.id}>
                    <div className="label">
                      <span className="label-icon success">██</span>
                      <span>{item?.name}</span>
                    </div>
                    <div className="process-bar">
                      <ProcessComponent
                        className="success"
                        percent={item?.sum_topic || 0}
                        showInfo={false}
                      />
                      <div className="amount">{item?.sum_topic || 0}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </ReportProcessComponent>
      </div>
    </Content>
  );
}

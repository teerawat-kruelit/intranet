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
import Table from '../../components/table'

const Content = styled.div`
  display: flex;
  width: 100%;
    .report-container{
      width: 100%;
      height: 200vh;
    }
    .Text-head{
      padding: 15px 0px;
      padding-left: 95px;

      .head{
      font-size: 20px;
    }
    }

    .group-report{
       display: flex;
       flex-wrap: wrap;
       padding-left: 55px;
       padding-right :  25px;

        .report-process{
          /* & > div:not(:first-child){
            margin-left: 20px;
          } */
          .prev,.next{
            border: none;
            font-size: 30px;
          }
        }

        .procress-group {
          margin-right: 40px;
          width: 400px;
          background-color: #FFF;
          position: relative;
          /* margin: 20px 0; */
          padding: 20px;
          padding-bottom: 30px;
          box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 5%);

          .process-date {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            font-weight: bold;
            padding-bottom: 10px;
          }

          .summary {
            position: relative; 
            width: 100%;
            font-size: 18px;
            text-align: center;
            padding: 10px 5px 0px;
          }

          .process-item {
            margin-top: 15px;
          }

          .label-icon.success {
            color: #157347;
            margin-right: 10px;
          }
          .label-icon.pending {
            color: #FFCA2C;
            margin-right: 10px;
          }
          .label-icon.process {
            color: red;
            margin-right: 10px;
          }
          .label-icon.reject {
            color: #1890ff;
            margin-right: 10px;
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
          padding: 10px;
          padding-bottom: 10px;
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

          .head{
            display: flex;
            justify-content: center;
            font-weight:bold;
          }
        }
        .rating-group{
          margin-left: 20px;
        }
  }
    
  @media only screen and (min-width: 1600px) {
    
  }
`

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
`

const RatingComponent = styled.div`

  background-color: #FFF;
  box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 5%);
  max-width: 400px;
  padding: 10px 20px;
  width: 400px;
  position: relative;
  padding-right: 20px;

                
  .admin-group{
    box-sizing:border-box
  }

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
    position: relative; 
    font-size: 18px;
    text-align: center;
    padding-bottom: 10px;
  }
 
`

const Comment_User = styled.div`
  width: 90%;
  .head-text{
    margin-top: 20px;
    background-color:red;
    width: 90%;
    height: 50px;
  }
  .body-comment{
    background-color: yellow;
  }

  .Search{
    display: none !important;
  }

  .table-total-rows{
    text-align: right;
  }
`

export default function ReportProcess() {
  const [reportIt, setReportIt] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [topicData, setTopicData] = useState([]);
  const [sumTopicData, setSumTopicData] = useState(0);
  const [comment, setComment] = useState([]);
  const { type } = useParams();

  const columns = [
    {
      title: 'Ticket-Number',
      dataIndex: 'ticket_no',
      width: 140,
      aling: 'center',
    },
    {
      title: 'Comment-Detail',
      dataIndex: 'comment_rating',
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  useEffect(() => {
    const init = async () => {

      let params = {
        month: currentDate.format("MM"),
        year: currentDate.format("YYYY"),
        type_id: type === "it" ? 1 : 2,
      }
      try {
        let itResp = await axios.get(
          "http://localhost:4000/api/report/repair",
          {
            params: params,
            withCredentials: true,
          }
        );

        if (itResp?.data?.status) {
          setReportIt(itResp.data.data);
        }

        let ratingResp = await axios.get(
          "http://localhost:4000/api/report/rating",
          {
            params: params,
            withCredentials: true,
          }
        );

        if (ratingResp?.data?.status) {
          setRatingData(ratingResp.data.data);
        }

        let topicResp = await axios.get(
          "http://localhost:4000/api/report/topic",
          {
            params: params,
            withCredentials: true,
          }
        );
        if (topicResp?.data?.status) {
          setTopicData(topicResp.data.data);
        }

        let commentResp = await axios.get(
          "http://localhost:4000/api/report/comment-rating",
          {
            params: params,
            withCredentials: true,
          }
        );
        if (commentResp?.data?.status) {
          setComment(commentResp.data.data);
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
    <Content >
      <SideBar />
      <div className="report-wrapper content">
        <Navbar />
        <div className="report-container ">
          <div className="Text-head">
            <div className="head">Admin-Dashbaord</div>
          </div>

          <div className="group-report">
            <div className="report-process">
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

              <br />
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
                          <div className="rating-total">{item.sum_rating || 0}</div>
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
              <div className="topic-group">
                <h4 className="head">REPORT-TOPIC</h4>
                {topicData.map((item) => {
                  return (
                    <div className="process-item" key={item.id}>
                      <div className="label">
                        <span>{item?.name}</span>
                      </div>
                      <div className="process-bar">
                        <ProcessComponent
                          percent={item?.sum_topic || 0}
                          showInfo={false}
                        />
                        <div className="amount">{item?.sum_topic || 0}</div>
                      </div>
                    </div>
                  )
                })}
                <div className="total">ทั้งหมด {topicData.reduce((topic, object) => {
                  return topic + object.sum_topic;
                }, 0)} คะแนน</div>
              </div>
            </div>
            <Comment_User className="comment-group">
              <div className="head-text">
                Comment-User
              </div>
              <div className="body-comment">
                <Table columns={columns} dataSource={comment} onChange={onChange} />;
              </div>
            </Comment_User>
          </div>
        </div>
      </div>
    </Content>

  );
}

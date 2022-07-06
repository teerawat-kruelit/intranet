import SideBar from "../../components/sidebar.components";
import Navbar from "../../components/navbar.compoenets";
import styled from "styled-components";
import { IoIosDocument } from "react-icons/io";
import Card from "../../components/card";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
import TableIt from "./table-it";
import TableBuilding from "./table-building";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

const { TabPane } = Tabs;

const RepairSystemComponent = styled.div`
  display: flex;
  width: 100%;

  .content {
    width: 100%;
  }

  .panel-group-card {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }

  .repair-table {
    /* padding: 20px; */
    margin: 30px;
  }

  .button-group {
    display: flex;

    .button-create-it,
    .button-create-building,
    .button-export-excel {
      background-color: #015352;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      padding: 10px;
      margin-right: 15px;

      .icon-add {
        font-size: 25px;
        margin-right: 5px;
      }
    }
    .button-create-building {
      background-color: #015352;
    }

    .button-export-excel {
      background-color: green;
    }
  }
`;

export default function RepairSystem() {
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState("1");
  const [itData, setItData] = useState([]);
  const [buildData, setBuildData] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        let resp = await axios.get("http://localhost:4000/api/user/profile", {
          withCredentials: true,
        });
        if (resp?.data?.status) {
          setUser(resp.data.data);
        }

        let itResp = await axios.get(
          "http://localhost:4000/api/repair_list/it",
          { withCredentials: true }
        );
        if (itResp?.data?.status) {
          setItData(itResp.data.data);
        }
        let buildingtResp = await axios.get(
          "http://localhost:4000/api/repair_list/building",
          { withCredentials: true }
        );
        if (buildingtResp?.data?.status) {
          setBuildData(buildingtResp.data.data);
        }
      } catch (error) {
        if (error.response.status == 401) {
          window.location.href = "/login";
        }
      }
    };

    init();
  }, [currentTab]);

  return (
    <RepairSystemComponent className="repair-system">
      <SideBar />
      <div className="content">
        <Navbar />
        <div className="repair-panel">
          <div className="panel-group-card">
            <Card
              number={currentTab == "1" ? itData : buildData}
              detail="รายการแจ้งซ่อม-ทั้งหมด"
              icon={<IoIosDocument />}
              color="#0B5ED7"
            />
            <Card
              number={currentTab == "1" ? itData : buildData}
              detail="รายการแจ้งซ่อม-Process"
              icon={<IoIosDocument />}
              color="#d73747"
            />
            <Card
              number={currentTab == "1" ? itData : buildData}
              detail="รายการแจ้งซ่อม-Success"
              icon={<IoIosDocument />}
              color="#149759"
            />
            <Card
              number={currentTab == "1" ? itData : buildData}
              detail="รายการแจ้งซ่อม-Pending"
              icon={<IoIosDocument />}
              color="#FFCA2C"
            />
          </div>
        </div>
        <br />
        <div className="repair-table">
          {user?.role === 1 ? (
            <div className="button-group">
              <NavLink to={"/form-it"}>
                <button className="button-create-it">
                  <IoMdAddCircle className="icon-add" />
                  แจ้งซ่อม IT-Support
                </button>
              </NavLink>
              <NavLink to={"/form-building"}>
                <button className="button-create-building">
                  <IoMdAddCircle className="icon-add" />
                  แจ้งซ่อม ฝ่ายอาคาร
                </button>
              </NavLink>
            </div>
          ) : (
            ""
          )}
          <div className="button-group">
            {user?.role === 2 || user?.role === 3 ? (
              <button className="button-export-excel">
                <IoMdAddCircle className="icon-add" />
                Export Excel
              </button>) : ''}
            {user?.role === 3 ? (
              <>
                <NavLink to={"/report-process/it"}>
                  <button className="button-report-process">
                    <IoMdAddCircle className="icon-add" />
                    Report It
                  </button>
                </NavLink>
                <NavLink to={"/report-process/building"}>
                  <button className="button-report-process">
                    <IoMdAddCircle className="icon-add" />
                    Report Building
                  </button>
                </NavLink>
              </>) : ''}
          </div>
          <br />
          <Tabs
            defaultActiveKey={currentTab}
            onChange={(e) => {
              setCurrentTab(e);
            }}
          >
            <TabPane tab="ฝ่าย IT-Support" key="1">
              <TableIt user={user} data={itData} setData={setItData} />
            </TabPane>
            <TabPane tab="ฝ่าย อาคาร" key="2">
              <TableBuilding user={user} data={buildData} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </RepairSystemComponent>
  );
}

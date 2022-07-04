import styled from "styled-components"
import Navbar from "../components/navbar.compoenets";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Row } from 'antd';
import { MdEmail } from 'react-icons/md'
import { FaPhoneSquareAlt } from 'react-icons/fa'


import SideBarComponent from "../components/sidebar.components";
import { useState } from "react";

const HomepageComponent = styled.div`
  display: flex;

  .content {
    width: 100%;
  }
  .sidebar-trigger-button {
    color: #fff;
  }
`;

const Contentportal = styled.div`
  height: 400px;

  .content-group-button {
    display: flex;
    width: 100%;
    justify-content: space-around;

    .item-button {
      cursor: pointer;
      width: 200px;
      height: 150px;
      border: 1px solid lightgray;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 30px;
      box-shadow: 10px 5px 5px 0px rgba(0, 0, 0, 0.75);

      .item-button-name {
        color: #000;
      }
      .item-button-icon {
        font-size: 30px;
        color: #000;
      }
    }
  }
  .img-company {
    height: 25%;

    .backgroud {
      width: 100%;
      height: 150px;
    }
  }
  .head {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: blueviolet;
    padding-top: 70px;
  }
  hr {
    width: 40px;
    border: 1px solid red;
    color: red;
    background-color: red;
  }
  .card-person {
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
  }

       .red{
         width: 40px;
         border: 1px solid red;
         color: red;
         background-color: red;


     }
     .card-person{
         margin-top: 25px;
         display: flex;
         justify-content: space-evenly;
     }
     .name-card{
         font-size: 17px;
         text-align: start;
         font-weight: bold;
     }
     .position{
         text-align: start;
     }
     .phone{
         display: flex;
         margin-bottom:15px;
     }
     .iconphone{
         font-size: 20px;
         margin-top:2px;
         margin-right:10px;
     }
     .button-group{
         display: flex;
         justify-content: space-evenly;
         margin-top:20px;

         .group{
         width: 15%;
         text-align: center;
         background-color: red;
         border: 1px solid black;
     }
     }
`;
//         font-weight: bold;
//         color: #223A66;
//         padding-top: 70px;

//     }



// `
const { Meta } = Card;

export default function HomePage() {

  const [userData, setUserData] = useState([
    { name: 'a', ext: 111 },
    { name: 'b', ext: 222 },
    { name: 'c' },
    { name: 'd' },
    { name: 'd' },
    { name: 'd' },
    { name: 'd' },
    { name: 'd' },
  ]);

  return (
    <HomepageComponent className="home-page">
      <SideBarComponent />
      <div className="content">
        <Contentportal className="content-portal">
          <div className="img-company">
            <img src="/back02.jpg" className="backgroud" alt="" />
          </div>

          <div className="head">
            WellCome
          </div>
          <hr className="red" />
          <div className="card-person">
            {userData.map((item, index) => {
              if (index > 3) return
              return (
                <Card
                  hoverable
                  key={index}
                  style={{ width: 240 }}
                  cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                  <div>
                    <div className="name-card">{item.name} </div>
                    <div className="position">Chief Executive Officer </div>
                  </div>
                  <p></p>
                  <div className="phone">
                    <FaPhoneSquareAlt className="iconphone" />
                    <div>EXT-{item.ext}</div>
                  </div>
                </Card>
              )
            })}
          </div>
          <hr />
          <div className="button-group">
            <div className="group"><span>IT-Support</span></div>
            <div className="group"><span>IT-Support</span></div>
            <div className="group"><span>IT-Support</span></div>
            <div className="group"><span>IT-Support</span></div>
            <div className="group"><span>IT-Support</span></div>
          </div>
          <br />
          <div className="department-team">
            jhjhjhj
          </div>

        </Contentportal>
      </div>
    </HomepageComponent>
  )
}

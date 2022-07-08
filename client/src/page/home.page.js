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
    width: 1100px;
    border: 1px solid #F3F3F3;
  }
  .card-person {
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
  }

       .red{
         width: 40px;
         border: 2px solid red;
         color: red;
         background-color: red;


     }
     .card-person{
         margin-top: 25px;
         display: flex;
         justify-content: space-evenly;
     }
     .name-card{
         text-align: start;
         font-weight: bold;
     }
     .position{
         text-align: start;
         color: #FD7D00;
         font-weight: bold;
     }
     .phone{
         display: flex;
         margin-bottom:10px;

     }
     .iconphone{
         font-size: 20px;
         margin-top:2px;
         margin-right:7px;
     }
     .button-group{
         display: flex;
         justify-content: space-evenly;
         margin-top:35px;

         .group{
         width: 12%;
         padding: 10px;
         text-align: center;
         font-weight: bold;
         background-color: #E12454;
         color: #FFFF;
        }
     }
     .department-team{
        margin-top: 25px;
        display: flex;
        justify-content: space-evenly;
        
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
    { name: 'K.Pracha Udome', ext: 111 },
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
          <Card
          style={{ width: 250, height: 430 }}
          hoverable
          cover={<img alt="example" src="/4.jpg" className="pee" height={315} />}
        >
          <div>
            <div className="name-card">K. Pracha Chaisuwan</div>
            <div className="position">Chief Executive Officer </div>
          </div>
          <p></p>
          <div className="phone">
            <FaPhoneSquareAlt className="iconphone" />
            <div>02-558-9009</div>
          </div>
        </Card>
        <Card
          style={{ width: 250, height: 430 }}
          hoverable
          cover={<img alt="example" src="/3.jpg" className="pee" height={315} />}
        >
          <div>
            <div className="name-card">K. Hathairat Kaewsaenmuang</div>
            <div className="position">Chief Operating Officer</div>
          </div>
          <p></p>
          <div className="phone">
            <FaPhoneSquareAlt className="iconphone" />
            <div>02-558-9488</div>
          </div>
        </Card>
        <Card
          style={{ width: 250, height: 430 }}
          hoverable
          cover={<img alt="example" src="/6.jpg" className="pee" height={315} />}
        >
          <div>
            <div className="name-card">K. Waraluck Chaisuwan</div>
            <div className="position">Finance Director</div>
          </div>
          <p></p>
          <div className="phone">
            <FaPhoneSquareAlt className="iconphone" />
            <div>02-558-9009</div>
          </div>
        </Card>
        <Card
          style={{ width: 250, height: 430 }}
          hoverable
          cover={<img alt="example" src="/7.jpg" className="pee" height={315} />}
        >
          <div>
            <div className="name-card">K. Suthida Chaisuwan</div>
            <div className="position">General Counsel</div>
          </div>
          <p></p>
          <div className="phone">
            <FaPhoneSquareAlt className="iconphone" />
            <div>02-558-9422</div>
          </div>
        </Card>
          </div>
          <br />
          <hr />
          <div className="button-group">
            <div className="group"><span>IT-Support</span></div>
            <div className=""><span>Account</span></div>
            <div className=""><span>Marketting</span></div>
            <div className=""><span>Messenger</span></div>
            <div className=""><span>Other</span></div>
          </div>
          <br />

          <div className="department-team">
          {userData.map((item, index) => {
            if (index > 3) return
            return (
              <Card
                hoverable
                key={index}
                style={{ width: 230, height: 420 }}
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

        </Contentportal>
      </div>
    </HomepageComponent>
  )
}

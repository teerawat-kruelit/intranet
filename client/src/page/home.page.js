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
  background-color: transparent;

  .content {
    width: 100%;
  }
  .sidebar-trigger-button {
    color: #fff;
  }
`;

const Contentportal = styled.div`
  background-color: transparent;

  .img-top{
    width: 100%;
    height: 380px;
  }
  .content-group-button {
    display: flex;
    width: 100%;
    background-color: #F2F6F6;
    

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
  .head {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: blueviolet;
    padding-top: 70px;
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
     hr{
      border: 1px solid red;
      background-color: red;
      height: 5px;
      width: 100px;
      margin-bottom: 20px;
     }

     .head-member{
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      color:#015352;
     }
`;

const FlexCard = styled.div`
  padding-left: 30px;
  display: flex;
  justify-content: space-evenly;
  

  .flip-card {
    background-color: transparent;
    width: 250px;
    height: 300px;
    perspective: 1000px;
    

    .flip-card-inner {
      top: -100px;
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      /* border: 1px solid green; */
      /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); */
    }

    &:hover .flip-card-inner {
      transform: rotateY(180deg);
    }

    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .flip-card-front {
      color: black;
      background-color: #FFF;
      height:380px;
      width: 203px;
      border-radius: 5px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

        .text-detail{
          padding: 7px;
          margin-top: 5px;
        }
        .img-card{
          border-radius: 8px;
        }
    }

    .flip-card-back {
      color: black;
      background-color: #FFF;
      height:380px;
      width: 203px;
      border-radius: 5px;
      transform: rotateY(180deg);
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

        .text-detail{
          padding: 7px;
          margin-top: 5px;
        }
        .img-card{
          border-radius: 8px;
        }
    }
  }
`

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
          <div className="img-top">
            <img src="https://www.chase.co.th/storage/banner/MRiPHna98lyBPVSE91xVINa4JLdlJFDPf0yAMeS2.png" alt="" className="img-top" />
          </div>
          <br />
          <FlexCard className="flex-card">
            {/*card 1 พี่ประชา*/}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div>
                  <img alt="example" src="/4.jpg" height={290} width={205} className="img-card" />
                  </div>
                  <div className="text-detail">
                    <div className="name-card">K. Pracha Chaisuwan</div>
                    <div className="position">Chief Executive Officer </div>
                    <div className="phone">02-558-9009</div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <img alt="example" src="/4.jpg" height={290} width={205} className="img-card" />
                  <div className="text-detail">
                    <div className="name-card">K. Pracha Chaisuwan</div>
                    <div className="position">Chief Executive Officer </div>
                    <div className="phone">02-558-9009</div>
                  </div>
                </div>
              </div>
            </div>
            {/*card 1 พี่ประชา*/}

            {/*card 2 พี่จิบ*/}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div>
                  <img alt="example" src="/3.jpg" height={290} width={205} className="img-card" />
                  </div>
                  <div className="text-detail">
                    <div className="name-card">K. Hathairat Kaewsaenmuang</div>
                    <div className="position">Chief Operating Officer</div>
                    <div className="phone">02-558-9488</div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <img alt="example" src="/3.jpg" height={290} width={205} className="img-card" />
                  <div className="text-detail">
                    <div className="name-card">K. Hathairat Kaewsaenmuang</div>
                    <div className="position">Chief Operating Officer</div>
                    <div className="phone">02-558-9488</div>
                  </div>
                </div>
              </div>
            </div>
            {/*card 2 พี่จิบ*/}


            {/*card 3 พี่อุ*/}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div>
                  <img alt="example" src="/6.jpg" height={290} width={205} className="img-card" />
                  </div>
                  <div className="text-detail">
                    <div className="name-card">K. Waraluck Chaisuwan</div>
                    <div className="position">Finance Director</div>
                    <div className="phone">02-558-9009</div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <img alt="example" src="/6.jpg" height={290} width={205} className="img-card" />
                  <div className="text-detail">
                    <div className="name-card">K. Waraluck Chaisuwan</div>
                    <div className="position">Finance Director</div>
                    <div className="phone">02-558-9009</div>
                  </div>
                </div>
              </div>
            </div>
            {/*card 3 พี่อุ*/}

            {/*card 3 พี่อุ้ย*/}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div>
                  <img alt="example" src="/7.jpg" height={290} width={205} className="img-card" />
                  </div>
                  <div className="text-detail">
                    <div className="name-card">K. Suthida Chaisuwan</div>
                    <div className="position">General Counsel</div>
                    <div className="phone">02-558-9009</div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <img alt="example" src="/7.jpg" height={290} width={205} className="img-card" />
                  <div className="text-detail">
                    <div className="name-card">K. Suthida Chaisuwan</div>
                    <div className="position">General Counsel</div>
                    <div className="phone">02-558-9009</div>
                  </div>
                </div>
              </div>
            </div>
            {/*card 3 พี่อุ้ย*/}

          </FlexCard>
          <br />
          <hr />
          <div className="head-member">
            <div>WELL COME TO CHASE</div>
          </div>
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

import styled from "styled-components"
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { MdEmail } from 'react-icons/md'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import SideBarComponent from "../components/sidebar.components";
import { useEffect, useState } from "react";
import axios from "axios";

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

    .img-brand{
      width: 100%;
      height: 250px;
    }

   
    
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
     .name-card{
         font-weight: bold;
     }
     .position{
         color: #FD7D00;
     }
     
     .back-group-team{
      background-color: #F2F6F6;
      padding-top: 20px;
      padding-bottom: 50px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
     

      .head-member{
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      color:#015352;
      }

      .button-group{
         display: flex;
         justify-content: space-evenly;
         margin-top:35px;

         .item{
          width: 12%;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          color: #000;
          transition: 0.25s ease;
          cursor: pointer;
         }

        .item:hover,
        .group{
          color: #FFF;
         background-color: #E12454;
        }
      }

      .department-team{
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(4, 24%);
        grid-row-gap: 30px;
        .ant-card{
          margin: 0 auto;
        }
      }

     }
     
    

     hr{
      border: 1px solid red;
      background-color: red;
      height: 2px;
      width: 80px;
      position: relative;
      top: -13px;
     }

     .border-step{
      margin-top: 30px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      
        .flex-step{
          display: flex;
          padding: 5px;

            .img-step{
              
              width: 50%;
                .step{
                  width: 100%;
                }
            }
            .detail-step{
              
              width: 50%;
              padding: 20px;
              background-color: #015352;
              color:#FFFF;
              .lag{
                font-size: 25px;
                text-align: center;
              }
            }
        }
     }
  
`;

const CarouselComponent = styled(Carousel)`
  width: 100%;
  .slick-dots {
    visibility: hidden;
  }
  .slick-slide > div > div > img{
  object-fit: cover;
  width: 100%;
  height: 300px;
  }
`


const HeadCard = styled.div`
  padding-left: 30px;
  display: flex;
  justify-content: space-evenly;

  
     .group-card-head{
      position: relative;
      top: -50px;
      transition: 0.25s ease;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
      &:hover{
        transform: scale(1.2);
        z-index: 999;
      }
      
          .img-head,.detail-head{
            width: 220px;
            padding: 5px;
           
            
            .img-card{
              border-radius: 5px;
            }
          }
          
      }
`

const CardUser = styled.div`
  padding-left: 90px;
  transition: 0.25s ease;
  &:hover{
    transform: scale(1.1);
    z-index: 999;
  }

  .border-team{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
  

      .img-head{
        width: 220px;
        border: 1px;
      }

      .img-team{
        width: 230px;
        border-radius: 5px;
      }
      .detail-team{
        margin-left:5px;
        padding: 3px;
      }
  }
`


export default function HomePage() {

  const [userData, setUserData] = useState([]);
  const [dep_id, setdep_id] = useState(1)

  useEffect(() => {
    const init = async () => {
      let params = {
        type_dep: dep_id,
      }

      let employeeResp = await axios.get(
        "http://localhost:4000/api/user/employee",
        {
          params: params,
          withCredentials: true,
        }
      );
      if (employeeResp?.data?.status) {
        setUserData(employeeResp.data.data);
      }
    }

    init()
  }, [dep_id])


  return (
    <HomepageComponent className="home-page">
      <SideBarComponent disableUserProfile={true} />
      <div className="content">
        <Contentportal className="content-portal">

          {/* <div className="img-top">
            <img src="https://www.chase.co.th/storage/page/service/F5M7O0kzmSJgbUMobl3V1E17RTnypi7stMG3R8NV.jpg" alt="" className="img-brand" />

          </div> */}
          <CarouselComponent className={'landing-carousel'} autoplay>
            <div>
              <img src="https://www.chase.co.th/storage/page/service/F5M7O0kzmSJgbUMobl3V1E17RTnypi7stMG3R8NV.jpg" alt="" className="img-brand" />
            </div>
            <div>
              <img src="https://www.chase.co.th/storage/page/home-hr/YKplPFVAbL5vkkFf0XBOL6RsHiBtCQenkRREMgJn.jpg" alt="" className="img-brand" />
            </div>
            <div>
              <img src="https://www.chase.co.th/storage/banner/MRiPHna98lyBPVSE91xVINa4JLdlJFDPf0yAMeS2.png" alt="" className="img-brand" />
            </div>
          </CarouselComponent>


          <HeadCard>
            <div className="group-card-head">
              <div className="img-head">
                <img alt="example" src="/4.jpg" height={290} width={210} className="img-card" />
              </div>
              <div className="detail-head">
                <div className="name-card">K. Pracha Chaisuwan</div>
                <div className="position">Chief Executive Officer</div>
              </div>
            </div>
            <div className="group-card-head">
              <div className="img-head">
                <img alt="example" src="/3.jpg" height={290} width={210} className="img-card" />
              </div>
              <div className="detail-head">
                <div className="name-card">K. Hathairat Kaewsaenmuang</div>
                <div className="position">Chief Operating Officer</div>
              </div>
            </div>
            <div className="group-card-head">
              <div className="img-head">
                <img alt="example" src="/6.jpg" height={290} width={210} className="img-card" />
              </div>
              <div className="detail-head">
                <div className="name-card">K. Waraluck Chaisuwan</div>
                <div className="position">Chief Finance Officer</div>
              </div>
            </div>
            <div className="group-card-head">
              <div className="img-head">
                <img alt="example" src="/7.jpg" height={290} width={210} className="img-card" />
              </div>
              <div className="detail-head">
                <div className="name-card">K. Suthida Chaisuwan</div>
                <div className="position">Chief Legal Officer</div>
              </div>
            </div>
          </HeadCard>
          <hr />

          <div className="back-group-team">

            <div className="head-member">
              <div>EMPLOYEE CHASE-ASIA</div>
            </div>

            <div className="button-group">
              <div className={'item ' + (dep_id == 1 ? 'group' : '')} onClick={() => { setdep_id(1) }}><span>IT-Support</span></div>
              <div className={'item ' + (dep_id == 2 ? 'group' : '')} onClick={() => { setdep_id(2) }}><span>Account</span></div>
              <div className={'item ' + (dep_id == 3 ? 'group' : '')} onClick={() => { setdep_id(3) }}><span>Marketting</span></div>
              <div className={'item ' + (dep_id == 4 ? 'group' : '')} onClick={() => { setdep_id(4) }}><span>Messenger</span></div>
              <div className={'item ' + (dep_id == 5 ? 'group' : '')} onClick={() => { setdep_id(5) }}><span>Other</span></div>
            </div>
            <br />

            <div className="department-team">
              {userData.map((item, index) => {
                return (
                  <CardUser className="group-team" key={index}>
                    <div className="border-team">
                      <div className="img-head">
                        <img alt="example" className="img-team" src={"http://localhost:4000/public/image/employee/" + item.image} />
                      </div>
                      <div className="detail-team">
                        <div className="name-card">K. {item.TUserName}</div>
                        <div className="position">{item.Position}</div>
                        <div className="phone"><div>EXT-{item.ExtNo}</div></div>
                      </div>
                    </div>
                  </CardUser>
                )
              })}
            </div>

          </div>
          {/* {เพิ่มข้อมูลเข้าไปใหม่} */}
          <div className="border-step">
            <div className="flex-step">

              <div className="img-step">
                <img src="https://www.chase.co.th/storage/page/service/FjzdxuFE8XUWKgJtFjagnPEJoyCoJoubznIettnG.jpg" alt="" className="step" />
              </div>

              <div className="detail-step">
                <p className="lag">มาตรฐานการจัดขั้นตอนการปฏิบัติงาน</p>
                <p>&nbsp;</p>
                <p>&nbsp;&nbsp;&nbsp;บริษัท เชฎฐ์ เอเชีย จำกัด มีมาตรฐานการจัด ขั้นตอนการปฏิบัติงานให้กับพนักงาน อย่างเป็นระบบ เพื่อช่วยให้พนักงานเข้าใจวิธีการทำงานและมีวิสัยทัศน์ไป ในทิศทางเดียวกัน เพื่อก่อให้เกิดประสิทธิภาพสูงสุด ในการทำงาน ตลอดจนการลดข้อผิดพลาดในการ ปฏิบัติหน้าที่ของพนักงานด้วย</p>
                <p>
                  &nbsp;</p>
                <p>&nbsp;&nbsp;&nbsp;บริษัทฯ จะนำข้อมูลใหม่ที่ได้รับจากลูกค้าเข้าสู่ ระบบ และระบบจะพิมพ์หนังสือทวงถามส่งให้กับลูกหนี้ ภายใน 24 ชั่วโมงหลังจากรับข้อมูลมาจากลูกค้าและ บัญชีลูกค้าทุกรายจะถูกส่งให้กับพนักงานทวงถาม ซึ่งทำหน้าที่ติดต่อกับลูกค้า โดยระบบจะจัดการส่งข้อมูล ไปโดยอัตโนมัติตามเงื่อนไขที่ได้กำหนดไว้ก่อนแล้ว สำหรับลูกค้าที่ไม่มีข้อมูล ที่อยู่ปัจจุบันหรือหมายเลข โทรศัพท์ บริษัทฯ จะจัดส่งผู้ชำนาญการไปทำการสืบหา ข้อมูล ที่อยู่ เพื่อให้สามารถติดต่อลูกหนี้ได้</p>
              </div>

            </div>

          </div>
          {/* {เพิ่มข้อมูลเข้าไปใหม่} */}

        </Contentportal>
      </div>
    </HomepageComponent>
  )
}

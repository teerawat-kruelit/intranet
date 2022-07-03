import styled from "styled-components";
import { Card } from "antd";
import SideBarComponent from "../components/sidebar.components";

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
`;
const { Meta } = Card;

export default function HomePage() {
  return (
    <HomepageComponent className="home-page">
      <SideBarComponent />
      <div className="content">
        <Contentportal className="content-portal">
          <div className="img-company">
            <img src="/back02.jpg" className="backgroud" alt="" />
          </div>

          <div className="head">Member</div>
          <hr />
          <div className="card-person">
            <Card
              hoverable
              style={{ width: 220 }}
              cover={
                <img alt="example" width={200} height={250} src="/giuu.jpg" />
              }
            >
              <p>K. Waruen Wanwanich</p>
              <div>Programer</div>
              <div className="email">
                <div>waruen.css@gmail.com</div>
              </div>
              <div>
                <div>PHONE: 1310</div>
              </div>
            </Card>
            <Card
              hoverable
              style={{ width: 220 }}
              cover={
                <img
                  alt="example"
                  width={200}
                  height={250}
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card
              hoverable
              style={{ width: 220 }}
              cover={
                <img
                  alt="example"
                  width={200}
                  height={250}
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        </Contentportal>
      </div>
    </HomepageComponent>
  );
}

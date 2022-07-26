import styled from "styled-components";
import PanelAuth from "../layouts/Form/PanelAuth";


const LoginPageCompnent = styled.div`
  width: 100%;
  /* background: linear-gradient(180deg, #ff0000 50%, #0000ff 50%); */
  /* background-color: #113D3D; */
  color: #F3F3F3;
  margin: 0;
  padding: 0;

  .content{
    margin: 0px;
    min-height: 100vh;
  }
  
    .skel-bg{
      background-color: #ff8b19;
      padding: 50px 0;
      transform: skew(0deg, -10deg);
      margin-top: -140px;
        .content{
          transform: skew(0deg, 10deg);
          margin: 0 auto;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .sing-in {
          position: relative;
          top: 250px;
          background-color: #FFFF;
          padding: 20px;
          width: 35%;
          box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 40%);
          height: 400px;
        }
    }

    .footer{
      padding-top: 350px
    }

`;
export default function LoginPage() {




  return (
    <LoginPageCompnent className="login-page">
      <div className="content">
        <PanelAuth />
      </div>
      <div className="footer">
        <div className="credit">
        </div>
      </div>
    </LoginPageCompnent>
  );
}

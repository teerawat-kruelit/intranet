import SideBar from "../../components/sidebar.components";
import Navbar from "../../components/navbar.compoenets";
import styled from "styled-components";

const StockSystemComponent = styled.div`
  display: flex;
  width: 100%;

  .content {
    width: 100%;
  }

  .text-box{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }
  .delveloping{
    font-size: 72px;
  }

`;

export default function StockSystem() {

    return (
        <StockSystemComponent className="repair-system">
            <SideBar />
            <div className="content">
                <Navbar />
                <div className="text-box">
                    <div className="delveloping">
                        กำลังพัฒนา
                    </div>
                </div>
            </div>
        </StockSystemComponent>
    );
}

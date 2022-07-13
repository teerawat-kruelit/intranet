import styled from "styled-components"

const NavbarComponent = styled.div`

    background-color: #015352;
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 20%);
    
    .navbar__container{

        display: flex;

        .navbar-left-group{
            background-color: #FFF;
            box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 20%);
            .navbar-logo-group{
               
                display: flex;
                background-color: #015352;
                padding: 0px 70px;
                border-bottom: 65px solid rgb(243, 243, 243);
                border-left: 0px solid transparent;
                border-right: 25px solid transparent;
                height: 0;

                & > div:first-child{
                    margin-top: 10px;
                }
                .logo1{
                    animation-name: spin;
                    animation-duration: 4000ms;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                }
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }

        to {
            transform: rotate(360deg);
        }
    
                }
            }
        }

        .navbar-right-group{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .navbar-name{
                h2{
                    color: #FFF;
                }
            }
            
        }
    }
`

export default function Navbar() {
    return (
        <NavbarComponent className="navbar">
            <div className="navbar__container">
                <div className="navbar-left-group">
                    <div ></div>
                    <div className="navbar-logo-group">
                        <div className="navbar-logo-item">
                            <img src="/react.png" className="logo1" width={40} height={40}></img>
                        </div>
                        <div className="navbar-logo-item">
                            <img src="/chase.png" width={150} height={60}></img>
                        </div>
                    </div>
                </div>
                <div className="navbar-right-group">
                    <div className="navbar-name">
                        
                    </div>
                </div>
            </div>
        </NavbarComponent>
    )
}

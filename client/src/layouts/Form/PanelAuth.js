import { useState } from 'react'
import styled from 'styled-components'
import FormLogin from './FormLogin'
import FormRegister from './FormRegister'

const PanelAuthCoomponent = styled.div`
    top: 70px;
    left: -20px;
    top: 50%;  /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */
    box-shadow: 0px 0px 13px 0px rgb(82 63 105 / 60%);

    transform: translate(-50%, -50%); /* This is a shorthand of
                                         translateX(-50%) and translateY(-50%) */

    position: absolute;
    width: 1000px;
    .panel-auth__cotnainer{
        position: relative;
        height: 500px;
    }
`

const Layer1 = styled.div`
    position: absolute;
    height: 100%;
    display: flex;
    justify-content: center;
`

const FormSingin = styled.div`
    width: 500px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: ${props => props.toggle === 'singin' ? '9' : '0'};
    .form{
        height: 100%;
        width: 100%;
        background-color: green;
        transition: 1s all ease;
        transform: translate(${props => props.toggle === 'singin' ? '0%' : '100%'}, 0px);
    }
    
`
const FormSingup = styled.div`
    width: 500px;
    height: 100%;
    overflow: hidden;

    .form{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: blue;
        transition: 1s all ease;
    transform: translate(${props => props.toggle !== 'singin' ? '0%' : '-100%'}, 0px);
    }
`
const Layer2 = styled.div`
    position: absolute;
    height: 100%;
    display: flex;
    justify-content: center;
`
const Overlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 100%;
    background-image: url("/back01.jpg");
    background-size: cover;
    /* background-color: #FF4551; */
    transition: 1s all ease;
    z-index: 10;
    transform: translate(${props => props.toggle === 'singin' ? '100%' : '0%'}, 0px);

    .head-text{
        font-size: 30px;
        font-weight: bold;
        padding-bottom: 20px;
    }

    .border-button{
        display: flex;
        justify-content: center;
        align-items: center;

        .btn-sing{
        font-size: 15px;
        padding: 10px;
        width: 150px;
        border: 2px solid #FFFF;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        }
    }
    
`

export default function PanelAuth() {

    const [toggle, setToggle] = useState('singin')

    return (
        <PanelAuthCoomponent>
            <div className="panel-auth__cotnainer">
                <Layer1>
                    <FormSingin toggle={toggle}><div className="form"><FormLogin className='form' /></div></FormSingin>
                    <FormSingup toggle={toggle}><div className="form"><FormRegister className='form' setToggle={setToggle} /></div></FormSingup>
                </Layer1>
                <Layer2>
                    <Overlay toggle={toggle} >
                        {toggle === 'singin' ?
                            <div className="overlay">
                                <div>
                                    <div className='head-text'>WELLCOME! CHASE ASIA</div>
                                </div>
                                <div className='border-button'>
                                    <button className='btn-sing' onClick={() => {
                                        setToggle(toggle === 'singin' ? 'register' : 'singin')
                                    }}
                                    >SING-UP
                                    </button>
                                </div>

                            </div>
                            :
                            <div className="overlay">
                                <div className='head-text'>WELLCOME! CHASE ASIA</div>
                                <div className='border-button'>
                                    <button className='btn-sing' onClick={() => {
                                        setToggle(toggle === 'singin' ? 'register' : 'singin')
                                    }}>SING-IN</button>
                                </div>
                            </div>
                        }
                    </Overlay>
                </Layer2>
            </div>
        </PanelAuthCoomponent >
    )
}

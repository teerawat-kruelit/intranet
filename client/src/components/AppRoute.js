import styled from "styled-components"

const AppRouteComponent = styled.div`
    cursor: pointer;
    background-color: green;
    width: 300px;
    height: 200px;
`

export default function AppRoute(props) {

    const handleClick = () => {
    }

    return (
        <AppRouteComponent className="app-route" onClick={handleClick}>
            <div className="app-route-component">
                {props.name}
            </div>
        </AppRouteComponent>
    )
}

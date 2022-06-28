export default function ShowNumber(props){
    console.log(props)
    return (<div onClick={()=>{
        props.fncPlus(props.number + 1)
    }}>+++++</div>)
}
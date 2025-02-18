import '../styles/card.css'
export default function Card({url,score,setScore}){
    function handelClick(e){
        
    }
    return (
        <>
        <div className='card'>
            <img src={url} onClick={e=>{handelClick(e)}}/>
        </div>
        </>
    )
}
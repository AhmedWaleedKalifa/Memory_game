import '../styles/card.css'
export default function Card({url,score,setScore,selectedCards,setSelectedCards}){
    function handleClick(){
        console.log("url: ",url)
        console.log("selected cards: ")
        selectedCards.forEach(e=>{
            console.log(e)
        })
        if(!selectedCards.includes(url)){
            // setSelectedCards(selectedCards.push(url))
            setScore(score+1);
            setSelectedCards([...selectedCards, url]);
        }else{
            setScore(0)
            setSelectedCards([])
        }
    }
    return (
        <>
        <div className='card'>
            <img src={url} onClick={()=>{handleClick()}}/>
        </div>
        </>
    )
}
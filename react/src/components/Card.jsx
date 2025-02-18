import '../styles/card.css'
export default function Card({url,score,setScore,selectedCards,setSelectedCards}){
    function handleClick(){
        
        if(!selectedCards.includes(url)){
            // setSelectedCards(selectedCards.push(url))
            let sound = new  Audio("../../public/mouse-click-sound-233951.mp3");  
            sound.play();
            setScore(score+1);
            setSelectedCards([...selectedCards, url]);
        }else{
            setScore(0)
            setSelectedCards([])
            let sound =new Audio("../../public/wronganswer-37702.mp3")
            sound.play();
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
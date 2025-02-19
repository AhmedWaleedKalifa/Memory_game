import '../styles/card.css'
export default function Card({url,score,setScore,selectedCards,setSelectedCards}){
    function handleClick(){
        
        if(!selectedCards.includes(url)){
            // setSelectedCards(selectedCards.push(url))
            let sound = new  Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");  
            sound.play();
            setScore(score+1);
            setSelectedCards([...selectedCards, url]);
        }else{
            setScore(0)
            setSelectedCards([])
            let sound =new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/player_shoot.wav")
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
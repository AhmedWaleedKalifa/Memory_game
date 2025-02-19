
import { useEffect, useState } from 'react';
import './App.css'
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';



async function getBerryNames(number) {
  // let random = Math.floor(Math.random() * 44)
  // //
  // random=0
  // let limit=20;
  // limit=64

  let response = await fetch(`https://pokeapi.co/api/v2/berry/?offset=${0}&limit=${64}`, { mode: "cors" })

  let json = await response.json();
  let array = []

  for (let i = 0; i < 64; i++) {
    array.push({index:i,value:Math.random(),url:json.results[i].name})
  }
  array.sort((a, b) => a.value - b.value)
  let tempCards = [];
  for (let i = 0; i < number; i++) {
    tempCards.push(array[i].url)
  }

  return tempCards
}

async function getImageUrl(name) {
  let response = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}-berry.png`, { mode: "cors" })
  let imageUrl = await response.url
  return imageUrl
}

async function makeImagesArray(number) {
  let names = await getBerryNames(number);
  let urlsArray = []
  for (let i = 0; i < number; i++) {
    urlsArray[i] = await getImageUrl(names[i])
  }
  return urlsArray
}
function randomCards(cards,number) {
  let randomArray = []
  for (let i = 0; i < number; i++) {
    randomArray.push({ index: i, value: Math.random().toFixed(2), url: cards[i] })
  }
  randomArray.sort((a, b) => a.value - b.value)
  let tempCards = [];
  for (let i = 0; i < number; i++) {
    tempCards.push(randomArray[i].url)
  }
  return tempCards;
}

function App() {
  const [imageUrls, setImageUrls] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfCards, setNumberOfCards] = useState(40);
  useEffect(() => {
    makeImagesArray(numberOfCards).then(urls => {
      setImageUrls(randomCards(urls,numberOfCards))
      setIsLoading(false)
    });
  },[numberOfCards])

  useEffect(() => {
    if (imageUrls.length > 1) {
      setImageUrls(randomCards(imageUrls,numberOfCards));
    }
    if (score > bestScore) {
      setBestScore(score)
      let sound = new Audio("../../public/game-bonus-2-294436.mp3")
      sound.play();
    }
    if(score==numberOfCards){
      setBestScore(" Max")
      let bestScoreParagraph=document.querySelector(".scoreBoard").lastChild;
      bestScoreParagraph.style.color="green"
      
    }
  }, [score])

  function handleClick(){
    let number=Number(prompt("Enter the number of cards from 1 to 64",numberOfCards));
    if(number<=1){
      number=1
    }else if(number>64){
      number=64;
    }else if(isNaN(number)){
      number=numberOfCards
    }
    setNumberOfCards(number)
    setIsLoading(true)
    setScore(0)
    setBestScore(0)
    setSelectedCards([])
      let bestScoreParagraph=document.querySelector(".scoreBoard").lastChild;
      bestScoreParagraph.style.color="black"
  }
  return (
    <>
      <div className='colored'>
        <h1><span>Memory Game</span></h1>
      </div>
      <ScoreBoard score={score} bestScore={bestScore}></ScoreBoard>
      <button className='newGame' onClick={()=>{handleClick()}}>New Game</button>
      {isLoading ? (<p style={{textAlign:"center",fontSize:"25px",color:"rgb(205, 39, 2)",marginTop:"70px"}}>loading...</p>)
        :
        (<GameBoard array={imageUrls} score={score} setScore={setScore} selectedCards={selectedCards} setSelectedCards={setSelectedCards} ></GameBoard>)
      }
    </>

  )
}

export default App





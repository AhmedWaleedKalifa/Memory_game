
import { useEffect, useState } from 'react';
import './App.css'
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';


async function getBerryNames(number) {
  let random = Math.floor(Math.random() * 44)
  let response = await fetch(`https://pokeapi.co/api/v2/berry/?offset=${random}&limit=20`, { mode: "cors" })

  let json = await response.json();
  let array = []
  for (let i = 0; i < number; i++) {
    array.push(json.results[i].name)
  }
  return array
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
function randomCards(cards) {
  let randomArray = []
  for (let i = 0; i < 20; i++) {
    randomArray.push({ index: i, value: Math.random().toFixed(2), url: cards[i] })
  }
  randomArray.sort((a, b) => a.value - b.value)
  let tempCards = [];
  for (let i = 0; i < 20; i++) {
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

  useEffect(() => {
    makeImagesArray(20).then(urls => {
      setImageUrls(randomCards(urls))
      setIsLoading(false)
    });
  },[])

  useEffect(() => {
    if (imageUrls.length > 1) {
      setImageUrls(randomCards(imageUrls));
    }
    if (score > bestScore) {
      setBestScore(score)
      let sound = new Audio("../../public/game-bonus-2-294436.mp3")
      sound.play();
    }
  }, [score])

  return (
    <>
      <div className='colored'>
        <h1><span>Memory Game</span></h1>
      </div>
      {/* <button style={{background:"red",width:"20px",height:"20px"}} onClick={()=>{setScore(score+1)}}></button> */}
      <ScoreBoard score={score} bestScore={bestScore}></ScoreBoard>
      {isLoading ? (<p style={{textAlign:"center",fontSize:"25px",color:"rgb(205, 39, 2)",marginTop:"70px"}}>loading...</p>)
        :
        (<GameBoard array={imageUrls} score={score} setScore={setScore} selectedCards={selectedCards} setSelectedCards={setSelectedCards} ></GameBoard>)
      }
    </>

  )
}

export default App





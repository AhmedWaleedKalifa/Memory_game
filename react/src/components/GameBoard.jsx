import Card from "./Card"
import "../styles/gameBoard.css"
export default function GameBoard({ array,score,setScore,selectedCards,setSelectedCards }) {
    return (
        <div className="gameBoard">
            <div className="container">
                {
                    array.map((url, index) => (
                        <Card key={index} url={url} score={score} setScore={setScore} selectedCards={selectedCards} setSelectedCards={setSelectedCards}/>
                    ))}
            </div>

        </div>

    )
}
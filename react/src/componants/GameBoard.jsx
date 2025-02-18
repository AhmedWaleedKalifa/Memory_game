import Card from "./Card"
import "../styles/gameBoard.css"
export default function scoreBoard({ array,score,setScore }) {
    return (
        <div className="gameBoard">
            <div className="container">
                {
                    array.map((url, index) => (
                        <Card key={index} url={url} score={score} setScore={setScore}/>
                    ))}
            </div>

        </div>

    )
}
import '../styles/scoreBoard.css'
export default function ScoreBoard({score,bestScore}){
    return(
        <>
        <div className="scoreBoard">
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </div>
        </>
    )
}
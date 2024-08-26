export default function DetailBox({player, score}){
    
    return (
        <div className="detail-box">
            <span className="player body-text">{player}</span>
            <span className="score medium-text">{score}</span>
        </div>
    );
}
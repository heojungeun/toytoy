/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from "../Button/Button";
import "./CoverScreen.css";

const CoverScreen = ({ score, onStartGame, duration }) => {
    return (
        <div className="intro">
            <h1 className="title">
                {score > -1 ? "Game over!" : "Pop a balloon! 🎈"}
            </h1>
            <p className="description">
                {score > -1 ? (
                    `You scored ${
                        score === 0 ? "nothing" : `${score} ${score > 1 ? "hits" : "hit"}`
                    }`
                ) : (
                    `A small & simple ${duration}-second balloon game built with React.
                    Find the source here.`
                )}
            </p>
            <div className="action">
                <Button onClick={onStartGame} width={"wide"}>
                    {score > -1 ? "Play again" : "Start Game"}
                </Button>
            </div>
        </div>
    );
}

export default CoverScreen;
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import constants from "../../utils/constants";
import { CSSTransition } from "react-transition-group";
import CoverScreen from "../CoverScreen/CoverScreen";
import ScoreCard from "../ScoreCard/ScoreCard";
import Button from "../Button/Button";
import BallonGrid from "../BallonGrid/BalloonGrid";
import Toast from "../Toast/Toast";
import "./Game.css";

const Game = ({ numberOfBalloons, gameDuration }) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [activeBalloons, setActiveBallons] = useState([]);
    const [score, setScore] = useState(-1);
    const [timeRemaining, setTimeRemaining] = useState(gameDuration);
    const [stop, setStop] = useState(false);
    const [hit, setHit] = useState(false);

    const timerRef = useRef();

    useEffect(() => {
        if (gameStarted && !stop) {
            timerRef.current = setInterval(() => {
                setTimeRemaining((prevTimeRemaining) => {
                    if(prevTimeRemaining > 0) {
                        return prevTimeRemaining - 1;
                    } else {
                        clearInterval(timerRef.current);
                        setGameStarted(false);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
        }
    }, [gameStarted, stop]);

    const handleBalloonClick = (id) => {
        setScore((prevScore) => prevScore + 1);
        setHit(true);

        setActiveBallons((prevActiveBalloons) => 
            prevActiveBalloons.filter((activeId) => activeId !== id)
        );

        setTimeout(() => {
            setHit(false);
        }, constants.randomnessLimits.lower);
    };

    // game 시작 전, 상태 초기화
    const startGame = () => {
        setGameStarted(true);
        setScore(0);
        setActiveBallons([]);
        setTimeRemaining(gameDuration);
        setStop(false);
    };

    // game 중지 전, 상태 수정
    const stopGame = () => {
        setGameStarted(false);
        setStop(true);
    }

    return (
        <div className="game-container">
            {(!gameStarted || stop) && (
                <CoverScreen 
                    score={score}
                    onStartGame={startGame}
                    duration={constants.gameDuration}
                />
            )}
            <CSSTransition
                in={gameStarted}
                timeout={250}
                classNames="balloons-screen"
                mountOnEnter
                unmountOnExit
            >
                {(state) => (
                    <div className={`balloon-screen balloons-screen--${state}`}>
                        <div className="game-nav">
                            <h1 className="game-title">Pop-a-balloon!</h1>
                            <div className="game-settings">
                                <ScoreCard score={score} time={timeRemaining} />
                                <Button type={"alert"} onClick={stopGame}>
                                    Stop
                                </Button>
                            </div>
                        </div>
                        <BallonGrid
                            numberOfBalloons={numberOfBalloons}
                            activeBalloons={activeBalloons}
                            onBalloonClick={handleBalloonClick}
                            isGameStarted={gameStarted}
                        /> 
                    </div>
                )}
            </CSSTransition>
            <Toast message={"+1 hits"} trigger={hit} />
        </div>
    );
};
export default Game;
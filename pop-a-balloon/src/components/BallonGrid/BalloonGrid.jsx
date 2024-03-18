/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from "react";
import constants from "../../utils/constants";
import getRandomNumber from "../../utils/randomNumber";
import Balloon from "../Balloon/Balloon";
import "./BalloongGrid.css";

const BalloongGrid = ({ numberOfBalloons, onBalloonClick }) => {
    const [activeBalloons, setActiveBalloons] = useState([]);
    const intervalIdsRef = useRef([]);

    useEffect(() => {
        intervalIdsRef.current = [];

        const generateRandomBalloon = () => {
            const randomBalloonId = Math.floor(Math.random() * numberOfBalloons);
    
            setActiveBalloons((prevActiveBalloons) => {
                if (prevActiveBalloons.includes(randomBalloonId)) {
                    return prevActiveBalloons.filter(
                        (activeId) => activeId !== randomBalloonId
                    );
                } else {
                    return [...prevActiveBalloons, randomBalloonId];
                }
            });
        };
    
        for (let i=0; i<numberOfBalloons; i++) {
            const intervalId = setInterval(
                generateRandomBalloon, 
                getRandomNumber(
                constants.randomnessLimits.lower,
                constants.randomnessLimits.upper
            ));
            intervalIdsRef.current.push(intervalId);
        }
       
        return () => {
            intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));
        }
    }, []);

    const handleBalloonClick = (id) => {
        if (onBalloonClick) {
            onBalloonClick(id);
        }
    }

    const balloons = [];
    for (let i=0; i < numberOfBalloons; i++) {
        balloons.push(
            <Balloon
                key={i}
                id={i}
                color={constants.balloonColor}
                isActive={activeBalloons.includes(i)}
                onClick={() => handleBalloonClick(i)}
            />
        );
    }

    return (
        <div className="ballloon-grid-wrapper">
            <p className="balloon-grid-caption">Click a balloon to score</p>
            <div className="balloon-grid">{balloons}</div>
        </div>
    );
};

export default BalloongGrid;
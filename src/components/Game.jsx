import React, { useState, useEffect } from 'react';
import he from 'he';

const Game = (props) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const options = props.wrongAnswers.map(wrongAnswer => ({
            answer: wrongAnswer,
            isCorrect: false
        }));

        options.push({ answer: props.correctAnswer, isCorrect: true });
        const shuffled = shuffleArray(options);
        setShuffledOptions(shuffled);

    }, [props.correctAnswer, props.wrongAnswers]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        if (selectedOption && props.checkAnswers) {
            shuffledOptions.forEach((option, index) => {
                if (selectedOption === `option${index + 1}` && option.isCorrect) {
                    props.incrementScore();
                }
            });
        }
    }, [selectedOption, props.checkAnswers, shuffledOptions]);

    return (
        <div className="question">
            <h2 className="question-title">{he.decode(props.questions)}</h2>
            {shuffledOptions.map((option, index) => (
                <label
                    key={index}
                    className={`radio-button ${
                        (() => {
                            if (selectedOption === `option${index + 1}`) {
                                if (props.checkAnswers) {
                                    return option.isCorrect ? "correct" : "wrong";
                                } else {
                                    return "checked";
                                }
                            } else {
                                return props.checkAnswers ? "no-answer" : "";
                            }
                        })()
                    }`}
                >
                    <input
                        type="radio"
                        name="options"
                        value={`option${index + 1}`}
                        checked={selectedOption === `option${index + 1}`}
                        onChange={handleOptionChange}
                        required
                    />
                    {he.decode(option.answer)}
                </label>
            ))}
        </div>
    );
};

export default Game;
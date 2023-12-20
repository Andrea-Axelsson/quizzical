import React, { useState, useEffect } from 'react';
import Start from "./components/Start";
import Game from "./components/Game";

const App = () => {
    const [startQuiz, setStartQuiz] = useState(false);
    const [checkAnswers, setCheckAnswers] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    function incrementScore() {
        setScore(prevScore => prevScore + 1);
    }

    function startNewQuiz() {
        setScore(0);
        setStartQuiz(prevStartQuiz => !prevStartQuiz);
        setCheckAnswers(false);
    }

    function handleCheckAnswersButtonClick(e) {
        e.preventDefault();
        if (checkAnswers) {
            setQuestions([]);
            startNewQuiz();
        } else {
            setCheckAnswers(prevCheckAnswers => !prevCheckAnswers);
        }
    }

    useEffect(() => {
        async function getQuestion() {
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple");
            const data = await res.json();

            const quizResults = data.results;

            const newQuestions = quizResults.map(result => ({
                question: result.question,
                correctAnswer: result.correct_answer,
                wrongAnswers: result.incorrect_answers
            }));

            setQuestions(newQuestions);
        }
        getQuestion();
    }, [startQuiz]);

    const gameElements = questions.map((quest, index) => (
        <Game
            key={index}
            questions={quest.question}
            correctAnswer={quest.correctAnswer}
            wrongAnswers={quest.wrongAnswers}
            checkAnswers={checkAnswers}
            incrementScore={incrementScore}
        />
    ));

    return (
        <main>
            <section className="background">
                {startQuiz ? (
                    <>
                        <form>
                            {gameElements}
                            <div className="button-and-score">
                                <input
                                    onClick={handleCheckAnswersButtonClick}
                                    className="check-answers-button"
                                    type="submit"
                                    value={checkAnswers ? "Play Again" : "Check Answers"}
                                />
                                <h2 className={`your-score-text ${checkAnswers ? "show-score" : ""}`}>You scored {score} / {questions.length} correct answers</h2>
                            </div>
                        </form>
                    </>
                ) : (
                    <Start start={startNewQuiz} />
                )}
            </section>
        </main>
    );
}

export default App;
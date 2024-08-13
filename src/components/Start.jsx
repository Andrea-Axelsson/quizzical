import React, { useEffect } from 'react';

const Start = (props) => {
    useEffect(() => {
        const startSection = document.querySelector('.start');
        startSection.classList.add('fade-in');
    }, []);

    return (
        <section className="start">
            <h1 className="start-h1">Quizzical</h1>
            <p className="start-p">Do you got what it takes???</p>
            <button onClick={props.start} className="start-button">Start quiz</button>
        </section>
    );
}

export default Start;
  
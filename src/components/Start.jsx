const Start = (props) => {
    return (
      <section className="start">
              <h1 className="start-h1" >Quizzical</h1>
              <p className="start-p">Some description if needed</p>
              <button onClick={props.start} className="start-button">Start quiz</button>
          </section>
    )
  }
  
  export default Start
  
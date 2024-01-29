import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GiveFeedback = () => {
    return (
      <>
        <h1>give feedback</h1>
        <FeedbackButton text="good" rating={good} setRating={setGood} />
        <FeedbackButton text="neutral" rating={neutral} setRating={setNeutral} />
        <FeedbackButton text="bad" rating={bad} setRating={setBad} />
      </>
    );
  }

  const FeedbackButton = ({ text, rating, setRating }) => {
    return <button onClick={() => setRating(rating + 1)}>{text}</button>
  }

  const Statistics = () => {
    return (
      <>
        <h1>statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
      </>
    );
  }



  return (
    <div>
      <GiveFeedback />
      <Statistics />
    </div>
  )
}

export default App
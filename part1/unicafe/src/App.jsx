import { useState } from 'react'



const Button = ({ text, rating, setRating }) => {
  return <button onClick={() => setRating(rating + 1)}>{text}</button>
}

const GiveFeedback = (props) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" rating={props.good} setRating={props.setGood} />
      <Button text="neutral" rating={props.neutral} setRating={props.setNeutral} />
      <Button text="bad" rating={props.bad} setRating={props.setBad} />
    </>
  );
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={props.all} />
        <StatisticsLine text="average" value={props.average} />
        <StatisticsLine text="positive" value={props.positive} />
      </tbody>
    </table>
  );
}

const StatisticsLine = ({ text, value }) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100 + ' %'



  return (
    <div>
      <GiveFeedback good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
      <h1>statistics</h1>
      {all > 0 ? <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} /> : "No feedback given"}
    </div>
  )
}

export default App
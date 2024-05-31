import { useState } from 'react'

const sum = (...values) => {
  return values.reduce((prev, curr) => prev + curr, 0)
}
/**
 * @alias sum
 */
const calculateSum = sum

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const data = {
    good,
    neutral,
    bad
  }

  const hasEnteredInput = sum(data.good, data.neutral, data.bad) > 0

  return (
    <div>
      <Header title="Give feedback" />
      <Button handleClick={() => setGood(good + 1)}>good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button handleClick={() => setBad(bad + 1)}>bad</Button>

      <Header level="h2" title="Statistics" />
      {hasEnteredInput ? <Statistics data={data} /> : 'No feedback given'}
    </div>
  )
}

function StatisticLine({ title, value }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )
}

function Statistics({ data }) {
  const { good, neutral, bad } = data

  const sum = calculateSum(good, neutral, bad)
  // where good = 1 point, neutral = 0 points and bad = -1 points
  const score = good - bad
  const average = score / sum || 0
  const positive = (good / sum) * 100 || 0

  return (
    <table>
      <tbody>
        {Object.keys(data).map(title => (
          <StatisticLine key={title} title={title} value={data[title]} />
        ))}

        <StatisticLine title="all" value={sum} />
        <StatisticLine title="average" value={average} />
        <StatisticLine title="positive" value={`${positive} %`} />
      </tbody>
    </table>
  )
}

function Button({ handleClick, children }) {
  return <button onClick={handleClick}>{children}</button>
}

function Header({ title, level: Level = 'h1' }) {
  return <Level>{title}</Level>
}

export default App

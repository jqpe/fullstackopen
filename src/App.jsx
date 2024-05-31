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

  const data = [
    { title: 'good', value: good },
    { title: 'neutral', value: neutral },
    { title: 'bad', value: bad }
  ]

  const hasEnteredInput = sum(data[0].value, data[1].value, data[2].value) > 0

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
    <p>
      {title} {value}
    </p>
  )
}

function Statistics({ data }) {
  const [good, neutral, bad] = [data[0].value, data[1].value, data[2].value]

  const sum = calculateSum(good, neutral, bad)
  // where good = 1 point, neutral = 0 points and bad = -1 points
  const score = good - bad
  const average = score / sum || 0
  const positive = (good / sum) * 100 || 0

  return (
    <>
      {data.map(row => (
        <StatisticLine key={row.title} title={row.title} value={row.value} />
      ))}

      <StatisticLine title="all" value={sum} />
      <StatisticLine title="average" value={average} />
      <StatisticLine title="positive" value={`${positive} %`} />
    </>
  )
}

function Button({ handleClick, children }) {
  return <button onClick={handleClick}>{children}</button>
}

function Header({ title, level: Level = 'h1' }) {
  return <Level>{title}</Level>
}

export default App

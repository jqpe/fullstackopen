import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const data = [
    { title: 'good', value: good },
    { title: 'neutral', value: neutral },
    { title: 'bad', value: bad }
  ]

  return (
    <div>
      <Header title="Give feedback" />
      <Button handleClick={() => setGood(good + 1)}>good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button handleClick={() => setBad(bad + 1)}>bad</Button>

      <Header level="h2" title="Statistics" />
      <Statistics data={data} />
    </div>
  )
}

function StatisticsRow({ title, value }) {
  return (
    <p>
      {title} {value}
    </p>
  )
}

function Statistics({ data }) {
  return (
    <>
      <StatisticsRow title={data[0].title} value={data[0].value} />
      <StatisticsRow title={data[1].title} value={data[1].value} />
      <StatisticsRow title={data[2].title} value={data[2].value} />
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

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  )
}

function Header({ course }) {
  return <h1>{course}</h1>
}

function Part({ name, numExercises }) {
  return (
    <p>
      {name} {numExercises}
    </p>
  )
}

function Content(props) {
  const { part1, exercises1, part2, exercises2, part3, exercises3 } = props

  return (
    <>
      <Part name={part1} numExercises={exercises1} />
      <Part name={part2} numExercises={exercises2} />
      <Part name={part3} numExercises={exercises3} />
    </>
  )
}
function Total({ exercises1, exercises2, exercises3 }) {
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
}

export default App

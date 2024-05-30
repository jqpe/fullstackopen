const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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

function Content({ parts }) {
  return (
    <>
      <Part name={parts[0].name} numExercises={parts[0].exercises} />
      <Part name={parts[1].name} numExercises={parts[1].exercises} />
      <Part name={parts[2].name} numExercises={parts[2].exercises} />
    </>
  )
}
function Total({ parts }) {
  return <p>Number of exercises {parts[0] + parts[1] + parts[2]}</p>
}

export default App

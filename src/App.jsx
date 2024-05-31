const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

function Total({ parts }) {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)

  return <strong>total of {total} exercises</strong>
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
  return parts.map(part => (
    <Part key={part.id} name={part.name} numExercises={part.exercises} />
  ))
}

export default App

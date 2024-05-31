export function Course({ course }) {
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

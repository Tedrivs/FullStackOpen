const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = (props) => {
    return <h1>{props.course}</h1>;
  }

  const Content = () => {
    return (<>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </>);
  }

  const Part = (props) => {
    return (<p>
      {props.name} {props.exercises}
    </p>);
  }

  const Total = () => {
    return <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>;
  }
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}

export default App
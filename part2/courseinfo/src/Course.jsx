const Course = ({ course }) => {
    const sum = course.parts.reduce((prev, part) => prev + part.exercises, 0)

    const Header = ({ course }) => <h1>{course}</h1>

    const Total = ({ sum }) => <b>total of {sum} exercises</b>



    const Part = ({ part }) =>
        <p>
            {part.name} {part.exercises}
        </p>

    const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={sum} />
        </>
    )
}

export default Course
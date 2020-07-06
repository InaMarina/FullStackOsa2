import React from 'react'

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>

    )
}


const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce(function (sum, part) {
        return sum = sum + part.exercises;
    }, 0);

    return (
        <h3>total of {sum} exercises</h3>
    )
}

const Part = ({ part }) => {

    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {


    return (
        <>
            {course.parts.map(parts =>
                <Part key={parts.id} part={parts} />)}
        </>
    )

}


export default Course
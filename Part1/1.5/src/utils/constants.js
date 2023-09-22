export const courseInfo = {
  name: 'Half Stack application development',
  parts: [
    {
      id: 1,
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      id: 2,
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      id: 3,
      name: 'State of a component',
      exercises: 14
    }
  ],
  total: function () { 
    return this.parts.reduce((total, current) => total + current.exercises, 0)
  }
}

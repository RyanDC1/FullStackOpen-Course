import { Course } from "./components"
import { courseInfo } from "./utils/constants"

const App = () => {

  return (
    courseInfo.map(({ name, id, parts }) => (
      <Course 
        key={id}
        name={name}
        parts={parts}
        total={parts?.reduce?.((total, current) => total + current.exercises, 0) ?? 0}
      />
    ))
  )
}

export default App
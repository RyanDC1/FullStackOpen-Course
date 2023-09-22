import { Content, Total } from "./components"
import Header from "./components/Header"
import { courseInfo } from "./utils/constants"

const App = () => {
  const { name, parts } = courseInfo

  return (
    <div>
      <Header title={name}/>
      <Content contentItems={parts}/>
      <Total total={courseInfo.total()}/>
    </div>
  )
}

export default App
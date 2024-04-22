import SingleComponent from "~/components/singleComponent"

function App() {
  return (
    <div>
      <SingleComponent
        num={1}
        messsage="Hello World"
        children={<span>test</span>}
      />
    </div>
  )
}


export default App;

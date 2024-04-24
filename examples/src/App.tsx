import SingleComponent from "~/components/singleComponent"

function App() {
  return (
    <div>
      <SingleComponent
          messsage="11"
          num={1000}
          msg1="1"
          bool={false}
          msg3="3"
          onUpdate:modelValue={val => console.log(val)}
          onUpdate:value={val => console.log(val)}
      />
    </div>
  )
}


export default App;

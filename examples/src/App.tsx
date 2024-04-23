import { onMounted, ref } from "vue";
import SingleComponent from "~/components/singleComponent"

function App() {
  return (
    <div>
      <SingleComponent
          messsage="11"
          num={1000}
          msg1="1"
          msg2="2"
          msg3="3"
      >
        111
      </SingleComponent>
    </div>
  )
}


export default App;

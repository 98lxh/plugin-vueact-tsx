import { onMounted, ref } from "vue";
import SingleComponent from "~/components/singleComponent"

function App() {
  return (
    <div>
      <SingleComponent
          messsage="11"
          num={1}
      >
        111
      </SingleComponent>
    </div>
  )
}


export default App;

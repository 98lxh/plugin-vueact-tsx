import { onMounted, ref } from "vue";
import SingleComponent from "~/components/singleComponent"

function App() {

  const instance = ref(null);

  onMounted(() => {
    console.log(instance.value)
  })

  return (
    <div>
      <SingleComponent
          ref={instance}
          messsage="11"
          num={1}
      >
        111
      </SingleComponent>
    </div>
  )
}


export default App;

import { defineComponent } from "vue";

const SingleComponent = defineComponent({
  name: "SingleComponent",
  props: {
    "num": { type: Number, "required": true },
    "messsage": { type: String, "required": true },
    "children": { type: [Object, String] }
  },
  setup(props) {
    return () => (
      <div>
        <p>{props.messsage}</p>
        <p>{props.children}</p>
        <p>{props.num}</p>
      </div>
    )
  }
})

export default SingleComponent;

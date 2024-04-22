import { VNode } from "vue";

interface DefineProps {
  num: number;
  messsage: string;
  children?: VNode | string;
}
 
function SingleComponent(props: DefineProps) {
  return (
    <div>
      <p>{props.messsage}</p>
      <p>{props.children}</p>
      <p>{props.num}</p>
    </div>
  )
}


export default SingleComponent;

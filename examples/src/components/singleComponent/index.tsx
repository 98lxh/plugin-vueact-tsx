import { FC } from "./../../../../src/index"
import { First,Second } from "./types";


interface DefineProps extends First,Second{
  num: number;
  messsage: string;
  children?: string;
}

const SingleComponent: FC<DefineProps> = function (props, { slots }) {
  const { messsage, num, children, msg1, msg3, bool } = props;

  function demo(){

  }

  return (
    <div>
      {slots.default && slots.default()}
      <p>{msg1}</p>
      <p>{bool ? 1 : 2}</p>
      <p>{msg3}</p>
      <p>{messsage}</p>
      <p>{children}</p>
      <p>{num}</p>
    </div>
  );
}

export default SingleComponent;

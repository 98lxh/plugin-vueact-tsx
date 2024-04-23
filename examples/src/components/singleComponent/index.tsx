import { FC } from "./../../../../src/index"
import { DefineProps } from "./types";

const SingleComponent: FC<DefineProps> = function (props, { slots }) {
  const { messsage, num, children } = props;

  return (
    <div>
      {slots.default && slots.default()}
      <p>{messsage}</p>
      <p>{children}</p>
      <p>{num}</p>
    </div>
  );
}

export default SingleComponent;

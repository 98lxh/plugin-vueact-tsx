import { FC } from "./../../../../src/index"
import { DefineProps } from "./types";

const SingleComponent: FC<DefineProps> = function (props, { slots }) {
  const { messsage, num, children, msg1, msg2, msg3 } = props;

  return (
    <div>
      {/* {slots.default && slots.default()} */}
      <p>{msg1}</p>
      <p>{msg2}</p>
      <p>{msg3}</p>
      <p>{messsage}</p>
      <p>{children}</p>
      <p>{num}</p>
    </div>
  );
}

export default SingleComponent;

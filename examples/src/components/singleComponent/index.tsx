import { FC } from "./../../../../src/index"

interface DefineProps {
  num: number;
  messsage: string;
  children?: string;
}

const SingleComponent: FC<DefineProps> = function (props) {
  return (
    <div>
      <p>{props.messsage}</p>
      <p>{props.num}</p>
    </div>
  );
}

export default SingleComponent;

import { FC } from "./../../../../src/index";

import { First, Second } from "./types";


import { onMounted } from "vue";


interface DefineProps extends First, Second {
  num: number;
  messsage: string;
  children?: string;
}


interface DefineEmits {
  (name: 'update:modelValue', value: string):void
  (name: 'update:value', value: boolean):void 
}

const SingleComponent: FC<DefineProps,DefineEmits> = function (props, { emit }) {
  const { messsage, num, children, msg1, msg3, bool } = props;

  function demo() {
    emit('update:modelValue','true')
    emit('update:value', true)
  }

  onMounted(() => demo());

  return (
    <div>
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

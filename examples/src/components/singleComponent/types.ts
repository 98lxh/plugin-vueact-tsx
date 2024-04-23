import { Demo } from "./../../../types";

interface First {
  msg1: string;
}

interface Second extends Demo {
  msg3: string;
}

export interface DefineProps extends First,Second {
  num: number;
  messsage: string;
  children?: string;
}

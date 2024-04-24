import { Demo } from "./../../../types";

export interface First {
  msg1: string;
}

export interface Second extends Demo {
  msg3: string;
}

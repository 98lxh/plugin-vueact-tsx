import { emitsRegex } from "../utils/regex";
import { parser } from "./parser";

export async function parseEmits(code: string, id: string, _resolve: any) {
  const emitsDeclaration = await parser(code, id, _resolve, 'DefineEmits');
  if (!emitsDeclaration) return null

  return {
    ...emitsDeclaration,
    resolved: JSON.stringify(ts2VueEmits(emitsDeclaration.resolved))
  }
}


function ts2VueEmits(resolved: string) {
  let emits: string[] = [];
  let matched;

  while ((matched = emitsRegex.exec(resolved)) !== null) {
    emits.push(matched[1]);
  }

  return emits;
}

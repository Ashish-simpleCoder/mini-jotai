import type { Atom, DispatchAtomUpdate } from "./atom";
import { useAtomDispatch } from "./use-atom-dispatch";
import { useAtomValue } from "./use-atom-value";

export function useAtom<AtomType>(
  atom: Atom<AtomType>
): [AtomType, DispatchAtomUpdate<AtomType>] {
  return [useAtomValue(atom), useAtomDispatch(atom)];
}

import type { Atom, DispatchAtomUpdate } from "./atom";
import { useCallback } from "react";

export function useAtomDispatch<AtomType>(atom: Atom<AtomType>) {

  const setter: DispatchAtomUpdate<AtomType> = useCallback((cb) => {
    if (typeof cb == "function") {
      const val = (cb as (atom: AtomType) => AtomType)(atom.get());
      atom.set(val);
    } else {
      atom.set(cb);
    }
  }, []);

  return setter;
}

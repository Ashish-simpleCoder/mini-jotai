import type { Atom } from "./atom";
import { useState, useEffect, useSyncExternalStore } from "react";

export function useAtomValue<AtomType>(
  atom: Atom<AtomType>,
  cb?: <Target>(atom: AtomType) => Target
): AtomType;
export function useAtomValue<AtomType, Output>(
  atom: Atom<AtomType>,
  cb: (atom: AtomType) => Output
): Output;
export function useAtomValue<AtomType>(
  atom: Atom<AtomType>,
  cb?: <Target>(atom: AtomType) => Target
) {
  // old way for getting state

  // const [state, setState] = useState(() => {
  // if (!cb) {
  //   return atom.get();
  // }
  // return cb(atom.get());
  // });

  // useEffect(() => {
  //   return atom.subscribe(() => {
  //     setState(() => {
  //       if (!cb) {
  //         return atom.get();
  //       }
  //       return cb(atom.get());
  //     });
  //   });
  // }, []);

  // return state;


  return useSyncExternalStore(atom.subscribe, () => {
    if (!cb) {
      return atom.get();
    }
    return cb(atom.get());
  })
}

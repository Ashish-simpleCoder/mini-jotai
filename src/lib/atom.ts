export type CleanUpFn = () => void;

export type DispatchAtomUpdate<AtomType> = (new_value: AtomType | ((atom: AtomType) => AtomType)) => void;

export type AtomGetter<AtomType> = (get: <Target>(a: Atom<Target>) => Target) => AtomType;

export type Atom<AtomType> = {
  get: () => AtomType;
  set: (atom: AtomType) => void;
  subscribe: (cb: (new_value: AtomType) => void) => CleanUpFn;
};



export const atom = <AtomType>(
  initial_value: AtomType | AtomGetter<AtomType>
): Atom<AtomType> => {
  let value = typeof initial_value == "function" ? (null as AtomType) : initial_value;
  const subscribers = new Set<(new_value: AtomType) => void>();

  const get = <Target>(atom: Atom<Target>) => {
    let currentValue = atom.get();
    atom.subscribe((newValue) => {
      if (currentValue === newValue) return;
      currentValue = newValue;
      computeAtom();
      subscribers.forEach((cb) => cb(value));
    });
    return currentValue;
  };

  // for computed-atom
  const computeAtom = () => {
    value =
      typeof initial_value == "function"
        ? (initial_value as AtomGetter<AtomType>)(get)
        : initial_value;
  };
  computeAtom();

  return {
    get: () => value,
    set: (new_value) => {
      value = new_value;
      subscribers.forEach((cb) => cb(value));
    },
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
  };
};

# Mini-Jotai

### Inspired with `jotai` (an awesome state management library) [read more about it](https://jotai.org/).

### Big Thanks to `BlueCollarCoder` (an awesome youtuber) for making a tutorial on how to build core-jotai from scratch. [channel link](https://www.youtube.com/@jherr).

### Here's the video link for the video. (https://www.youtube.com/watch?v=gg31JTZmFUw)

## Features

- Written in Typescript
- Components are type-safe
- Small and easy to use
- Share states globally without React.context
- Hooks for getting the state with subscription
- Test cases written

## Components

- `atom` (for creating the atoms)
- `useAtom` (getting the state and setter function for provided atom)
- `useAtomValue` (getting only the state for provided atom)
- `useAtomDispatch` (getting only the setter function for provided atom)

## Examples

### Usage with `atom` and `useAtom`

```tsx
import { atom, useAtom } from "mini-jotai";

const counterAtom = atom(10);

export default function Counter() {
  const [counter, setCounter] = useAtom(counterAom);

  return (
    <div>
      <p>{counter}</p>
      <button
        onClick={() =>
          setCounter((old_counter) => {
            old_counter++;
            return old_counter;
          })
        }
      ></button>
    </div>
  );
}
```

### Usage with `atom`, `useAtomValue` and `useAtomDispatch`

```tsx
import { atom, useAtom } from "mini-jotai";

const userAtom = atom({ name: "ashish" });

export default function Counter() {
  // providing the getter-callback for getting the specific item from the atom
  const username = useAtomValue(userAom, (user) => user.name);

  //   atom setter function for updating the atom
  const setUser = useAtomDispatch(userAtom);

  //   if getter-callback is not provided, then `user` object will be output
  const user = useAtomValue(userAtom);

  return (
    <div>
      <input
        value={username}
        onChange={(e) =>
          setUser((old_user) => {
            old_user.name = e.target.value;
            return { ...old_user };
          })
        }
      />

      <p>User:- {JSON.stringify(user)}</p>
    </div>
  );
}
```

# Note
- working examples available in `examples` directory in root of the projects.
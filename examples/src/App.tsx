import type { ChangeEventHandler } from "react";
import { atom, useAtom, useAtomValue, useAtomDispatch } from "../../src";
import "./App.css";


// atoms
const CounterAtom = atom(1);
const Counter2Atom = atom(5);
const SumCounterAom = atom((get) => get(CounterAtom) + get(Counter2Atom))

const FormAtom = atom({
  general_details: {
    f_name: "asis",
    l_name: "simple-coder",
  },
  coding_details: {
    skills_checked: { js: true, elixir: false, php: false, java: true },
  },
});



export default function App() {
  return (
    <>
      <CounterDemo />
      <FormDemo />
    </>
  );
}



function CounterDemo() {
  const [counter, setCounter] = useAtom(CounterAtom);
  const [counter2, setCounter2] = useAtom(Counter2Atom);


  return (
    <div className="border border-purple-900 px-4 py-4 mb-6 rounded-md">
      <h2 className="text-xl text-center">Counter</h2>

      <div className="flex gap-4 items-center mt-2">
        <p className='font-bold'>Counter-1</p>

        <button
          onClick={() =>
            setCounter((old_counter) => {
              old_counter--;
              return old_counter;
            })
          }
          title="decrement counter"
          aria-label="decrement counter"
          className="text-red-700"
        >
          -
        </button>
        <span>{counter}</span>
        <button
          onClick={() =>
            setCounter((old_counter) => {
              old_counter++;
              return old_counter;
            })
          }
          title="increment counter"
          aria-label="increment counter"
          className="text-green-700"
        >
          +
        </button>
      </div>

      <div className="flex gap-4 items-center mt-2">
        <p className='font-bold'>Counter-2</p>
        <button
          onClick={() =>
            setCounter2((old_counter) => {
              old_counter--;
              return old_counter;
            })
          }
          title="decrement counter"
          aria-label="decrement counter"
          className="text-red-700"
        >
          -
        </button>
        <span>{counter2}</span>
        <button
          onClick={() =>
            setCounter2((old_counter) => {
              old_counter++;
              return old_counter;
            })
          }
          title="increment counter"
          aria-label="increment counter"
          className="text-green-700"
        >
          +
        </button>
      </div>

      <SumCounter />
    </div>
  );
}

function SumCounter() {
  const sum = useAtomValue(SumCounterAom)
  return (
    <div>
      <p className='mt-2 text-left text-green-200'>Sum of the counters:- {sum}</p>
    </div>
  )
}




function FormDemo() {
  return (
    <div className="border border-purple-800 px-4 py-4 mb-6 rounded-md">
      <h2 className="text-xl text-center">Form</h2>

      <div className="flex flex-col gap-4 justify-center mt-2">
        <GeneralDetails />
        <div className="border-t-2"></div>

        <CodingDetails />
      </div>
    </div>
  );
}

function GeneralDetails() {
  const setFormDetails = useAtomDispatch(FormAtom);
  const f_name = useAtomValue(FormAtom, (form) => form.general_details.f_name);
  const l_name = useAtomValue(FormAtom, (form) => form.general_details.l_name);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormDetails((old_details) => {
      old_details.general_details = { ...old_details.general_details, [e.target.name]: e.target.value };
      return { ...old_details };
    });
  };



  return (
    <div>
      <h3 className="text-start text-lg mb-2">General Details</h3>

      <div className="flex justify-between gap-4 mb-2">
        <label htmlFor="f_name" className="w-1/4 text-left">First Name</label>
        <input
          name="f_name"
          id="f_name"
          value={f_name}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-between gap-4">
        <label htmlFor="l_name" className="w-1/4 text-left">Last Name</label>
        <input
          name="l_name"
          id="l_name"
          value={l_name}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function CodingDetails() {
  const setFormDetails = useAtomDispatch(FormAtom);
  const skills = useAtomValue(
    FormAtom,
    (form) => form.coding_details.skills_checked
  );


  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormDetails((old_details) => {
      old_details.coding_details.skills_checked = {
        ...old_details.coding_details.skills_checked,
        [e.target.name]: e.target.checked,
      };
      return { ...old_details };
    });
  };



  return (
    <div>
      <h3 className="text-start text-lg mb-2">Coding Details</h3>

      {(Object.keys(skills) as Array<keyof typeof skills>).map((skill) => {
        return (
          <div key={skill} className="flex gap-4">
            <input
              type="checkbox"
              name={skill}
              id={skill}
              onChange={handleChange}
              checked={skills[skill]}
            />
            <label htmlFor={skill}>{skill}</label>
          </div>
        );
      })}
    </div>
  );
}

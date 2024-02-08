import { useEffect, useState } from "react";

export function useLocaleStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

// And in this case, we made it so

// that this hook looks as close as possible

// to the useState hook.

// So, we also pass in some initial state,

// and then we get back a state variable

// and the updated function as always.

// But thanks to our special custom hook,

// now these work a bit different.

// So, this piece of state here can be read

// from local storage as the component first mounts.

// While the setter function

// will not only update the state itself,

// but it will also update the local storage.

// And so, we coded all this functionality right here

// in this reusable custom hook.

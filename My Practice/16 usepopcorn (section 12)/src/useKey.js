// let's now create another custom hook called UseKey

// which will abstract the functionality

// of attaching and removing an event handler for a key press.
import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const callback = function (e) {
        if (e.code.toLowerCase === key.toLowerCase) {
          action();
        }
      };

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  ); //* learn about passing onCloseMovieDetails to dep arr later
}

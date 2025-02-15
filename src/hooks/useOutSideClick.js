import { useEffect, useRef } from "react";

export function useOutSideClick(close) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // console.log("ijsij");
        if (ref.current && !ref.current.contains(e.target)) {
          console.log(ref);
          close();
        }
      }
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick);
    },
    [close]
  );
  return ref;
}

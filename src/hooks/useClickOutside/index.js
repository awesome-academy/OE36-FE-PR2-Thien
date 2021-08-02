import { useEffect } from "react";

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;

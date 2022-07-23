import { useEffect, MutableRefObject } from "react";

export function useClickOutside(
  ref: MutableRefObject<any>,
  callback: (e: MouseEvent) => void
) {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback(e);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}

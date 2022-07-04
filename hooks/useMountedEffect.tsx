import { useEffect, useState } from "react";

export function useMountedEffect(cb: () => void, deps?: any[]) {
  const [isMounted, setMounted] = useState(false);

  const dependencies = deps ? deps : [];

  useEffect(() => {
    if (isMounted) {
      cb();
    } else {
      setMounted(true);
    }
  }, [isMounted, ...dependencies]);
}

import {
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

type UseDisclosureArgs = Partial<{
  initialState: boolean;
  preventSkipOnDoubleClick: boolean;
}>;

type RenderDisclosure = (
  el: (isUnmounting: boolean) => ReactNode
) => ReactNode;

type UseDisclosureReturn<T extends HTMLElement> = {
  render: RenderDisclosure;
  ref: RefObject<T>;
  toggleDisclosure: () => void;
  isVisible: boolean;
  isExiting: boolean;
};

export function useAnimatedDisclosure<T extends HTMLElement>(
  args?: UseDisclosureArgs
): UseDisclosureReturn<T> {
  const elementRef = useRef<T>(null);
  const listener = useRef<() => void>(() => {});
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isVisible, setVisible] = useState(
    args?.initialState ?? false
  );

  const removeListener = () => {
    if (elementRef.current && listener.current) {
      elementRef.current.removeEventListener(
        "animationend",
        listener.current
      );
    }
  };

  const hide = () => {
    setIsAnimatingOut(false);
    setVisible(false);
  };

  const setupListener = () => {
    if (elementRef.current) {
      const onAnimationEnd = () => {
        hide();
        removeListener();
      };
      listener.current = onAnimationEnd;
      elementRef.current.addEventListener(
        "animationend",
        listener.current
      );
    }
  };

  const toggleDisclosure = () => {
    if (isVisible) {
      if (isAnimatingOut && !args?.preventSkipOnDoubleClick) {
        // Abort animation and hide immediately
        removeListener();
        hide();
        return;
      }
      setupListener();
      setIsAnimatingOut(true);
      return;
    }
    setVisible(true);
  };

  const renderDisclosure = (
    el: (animatingExit: boolean) => ReactNode
  ) => {
    if (!isAnimatingOut && !isVisible) {
      return null;
    }
    return el(isAnimatingOut);
  };

  useEffect(() => {
    const animatedElement = elementRef.current;
    const storedListener = listener.current;

    return () => {
      if (animatedElement && storedListener) {
        animatedElement.removeEventListener(
          "animationend",
          storedListener
        );
      }
    };
  }, []);

  return {
    render: renderDisclosure,
    ref: elementRef,
    toggleDisclosure,
    isVisible,
    isExiting: isAnimatingOut,
  };
}

import {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { ButtonKind, ButtonSize } from "../types/ryfrea";
import { getTotalOffset } from "../utils";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKind;
  size?: ButtonSize;
  isFixedPosition?: boolean;
  ripple?: boolean;
  /** Made for MUI-icons */
  icon?: ReactNode;
  hideFocus?: boolean;
}

export function Button({
  kind = "regular",
  size = "md",
  children,
  icon,
  isFixedPosition,
  ripple,
  hideFocus,
  dangerouslySetInnerHTML,
  ...rest
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const disableMouseTrack = !ripple;
  const onMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef?.current && !disableMouseTrack) {
      const { pageX, pageY } = event;
      const { offsetLeft, offsetTop } = getTotalOffset(
        buttonRef?.current
      );

      let x = pageX - offsetLeft;
      let y = pageY - offsetTop;
      if (isFixedPosition) {
        x -= window.scrollX;
        y -= window.scrollY;
      }

      setMousePos({
        x,
        y,
      });
    }
    rest?.onMouseMove?.(event);
  };
  return (
    <StyledButton
      kind={kind}
      size={size}
      type={rest?.type ?? "button"}
      ref={buttonRef}
      onMouseMove={
        disableMouseTrack ? rest?.onMouseMove : onMouseMove
      }
      disableMouseTrack={disableMouseTrack}
      hideFocus={hideFocus}
      {...rest}
      style={
        {
          "--x": mousePos.x,
          "--y": mousePos.y,
          ...(rest?.style ?? {}),
        } as CSSProperties
      }
      className={`ryfre--button ryfre--button-${kind} ${
        rest?.className ?? ""
      }`}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      children={
        dangerouslySetInnerHTML ? undefined : (
          <span>
            {icon ?? ""}
            {children}
          </span>
        )
      }
    />
  );
}

type StyledProps = {
  kind: ButtonKind;
  size: ButtonSize;
  disableMouseTrack?: boolean;
  hideFocus?: boolean;
};

const KIND_TO_BG: Record<ButtonKind, string> = {
  regular: "var(--c-ui-03)",
  danger: "var(--c-danger-01)",
  ghost: "transparent",
  primary: "var(--c-primary-01)",
  success: "var(--c-success-01)",
};

const KIND_TO_HOVER_BG: Record<ButtonKind, string> = {
  regular: "var(--c-ui-04)",
  danger: "var(--c-danger-02)",
  ghost: "var(--c-ui-04)",
  primary: "var(--c-primary-02)",
  success: "var(--c-success-02)",
};

const KIND_TO_ACTIVE_BG: Record<ButtonKind, string> = {
  regular: "#000",
  danger: "var(--c-danger-03)",
  ghost: "#000",
  primary: "var(--c-primary-03)",
  success: "var(--c-success-03)",
};

const KIND_TO_CONTRAST: Record<ButtonKind, string> = {
  regular: "var(--c-text-04)",
  danger: "var(--c-text-04)",
  ghost: "var(--c-text-01)",
  primary: "var(--c-text-04)",
  success: "var(--c-text-04)",
};

const SIZE_TO_HEIGHT: Record<ButtonSize, string> = {
  md: "42px",
  lg: "var(--s-09)",
  field: "36px",
  sm: "2rem",
};

const SIZE_TO_GAP: Record<ButtonSize, string> = {
  md: "var(--s-03)",
  lg: "var(--s-03)",
  field: "var(--s-03)",
  sm: "var(--s-02)",
};

const SIZE_TO_ICON_SIZE: Record<ButtonSize, string> = {
  md: "0.75em",
  lg: "0.75em",
  field: "0.75em",
  sm: "0.75em",
};

const iconAnim = keyframes`
    from {
      transform:scale(0.5) rotate(20deg);
      opacity:0;
    }
  `;

export const StyledButton = styled.button<StyledProps>`
  ${applyFontKind("button")}
  border: none;
  margin: 0;
  padding: var(--s-03) var(--s-05);
  border-radius: var(--roundness-01);
  background: ${(props) => KIND_TO_BG[props.kind]};
  color: ${(props) => KIND_TO_CONTRAST[props.kind]};
  display: flex;
  align-items: center;
  height: ${(props) => SIZE_TO_HEIGHT[props.size]};
  box-shadow: 0px 1px 0px 0px
    ${(props) => KIND_TO_HOVER_BG[props.kind]};
  transition: background 0.1s var(--ease-01);
  transform: translate3d(0, 0, 0);
  ${(props) =>
    props.kind === "ghost" &&
    `
      box-shadow:none;
    `}
  ${(props) => applyFocusStyles(props.hideFocus ?? false)}
    &:focus {
    box-shadow: none !important;
    &:hover {
      box-shadow: none;
    }
  }
  &:hover {
    transition: background 0.2s var(--ease-01);
    background: ${(props) => KIND_TO_HOVER_BG[props.kind]};
    color: var(--c-text-04);
    box-shadow: 0px 1px 0px 0px
      ${(props) => KIND_TO_BG[props.kind]};
    ${(props) =>
      props.kind === "ghost" &&
      `
      box-shadow:none;
    `}
  }
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    transform: translate(-50%, -50%) scale(0);
    height: 120%;
    aspect-ratio: 1/1;
    @supports not (aspect-ratio: 1/1) {
      width: 3rem;
      height: 3rem;
    }
    background: #fff;
    pointer-events: none;
    opacity: 0.1;
    top: calc(var(--y) * 1px);
    left: calc(var(--x) * 1px);
    transition: transform 0.2s var(--ease-01),
      opacity 0.2s var(--ease-01);
    border-radius: 50%;
    z-index: 0;
  }
  &:hover::after {
    opacity: 0;
    transition: transform 0.4s var(--ease-01),
      opacity 0.6s var(--ease-01);
    transform: translate(-50%, -50%) scale(3);
  }
  &:active::after {
    transition: transform 0.6s var(--ease-01),
      opacity 0.7s var(--ease-01);
    opacity: 0.2;
    transform: translate(-50%, -50%) scale(1);
  }
  > span {
    transition: transform 0.1s var(--ease-01);
    display: flex;
    align-items: center;
    gap: ${(props) => SIZE_TO_GAP[props.size]};
    > svg {
      --size: ${(props) => SIZE_TO_ICON_SIZE[props.size]};
      width: var(--size);
      height: var(--size);
      animation: ${iconAnim} 0.3s var(--ease-01);
    }
  }
  &:active {
    background: ${(props) => KIND_TO_ACTIVE_BG[props.kind]};
    color: var(--c-text-04);
    transition: background 0.2s var(--ease-01);
    box-shadow: none;
    > span {
      transform: translateY(1px);
    }
  }
  ${(props) =>
    props.disableMouseTrack &&
    `
      &::after {
        display:none !important;
      }
    `}
  cursor: pointer;
`;

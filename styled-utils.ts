import {
  createGlobalStyle,
  css,
  FlattenSimpleInterpolation,
} from "styled-components";
import { ColorToken, FontKind } from "./types/ryfrea";
import tokens from "./tokens";

export const GlobalStyles = createGlobalStyle`
    :root {
      ${Object.keys(tokens.spacing).map(
        (level) => css`
        --s-${String(level).padStart(2, "0")}: ${
          tokens.spacing[Number(level)]
        };
      `
      )}
      ${Object.keys(tokens.roundness).map(
        (level) => css`
        --roundness-${String(level).padStart(2, "0")}: ${
          tokens.roundness[Number(level)]
        };
      `
      )}
      ${Object.keys(tokens.easing).map(
        (level) => css`
        --ease-${String(level).padStart(2, "0")}: ${
          tokens.easing[Number(level)]
        };
      `
      )}
      ${Object.keys(tokens.colors.lm).map(
        (colorName) => css`
        --c-${colorName}: ${
          tokens.colors.lm[colorName as ColorToken]
        };
      `
      )}
    }
    body.dm {
      ${Object.keys(tokens.colors.dm).map(
        (colorName) => css`
        --c-${colorName}: ${
          tokens.colors.dm[colorName as ColorToken]
        };
      `
      )}
    }
    body {
        background:var(--c-ui-bg);
        color: var(--c-text-02);
    }
  `;

const focusStyles = css`
  transition: outline 0.1s var(--ease-01);
  outline: 2px solid var(--c-focus-01);
  outline-offset: 1px;
  position: relative;
`;

const resetFocusStyles = css`
  transition: none;
  outline: none;
  outline-offset: 0;
  position: unset;
`;

export const applyFocusStyles = (focusVisible?: boolean) =>
  focusVisible
    ? css`
        &:focus {
          ${focusStyles}
        }
        &:focus:not(:focus-visible) {
          ${resetFocusStyles}
        }
        &:focus-visible {
          ${focusStyles}
        }
      `
    : css`
        &:focus {
          ${focusStyles}
        }
      `;

export const applyFocusWithinStyles = css`
  &:focus-within:focus-visible {
    ${focusStyles}
  }
`;

export function applyFontKind(
  fontName: FontKind
): FlattenSimpleInterpolation {
  switch (fontName) {
    case "h1":
      return css`
        font-size: 36px;
        letter-spacing: -0.01em;
        font-weight: bold;
        line-height: auto;
        color: var(--c-text-01);
      `;
    case "h2":
      return css`
        font-size: 27.5px;
        letter-spacing: -0.01em;
        font-weight: medium;
        line-height: auto;
        color: var(--c-text-01);
      `;
    case "h3":
      return css`
        font-size: 23px;
        font-weight: normal;
        letter-spacing: 0px;
        line-height: auto;
        color: var(--c-text-01);
      `;
    case "subtitle":
      return css`
        font-size: 19.2px;
        font-weight: bold;
        letter-spacing: -0.01em;
        line-height: auto;
        color: var(--c-text-01);
      `;
    case "body":
      return css`
        font-size: 16px;
        line-height: 1.5em;
        letter-spacing: 0.025em;
        font-weight: normal;
        line-height: auto;
        color: var(--c-text-01);
      `;
    case "label":
      return css`
        font-size: 12px;
        line-height: 1.25em;
        letter-spacing: -0.28px;
        font-weight: normal;
        color: var(--c-text-01);
      `;
    case "small":
      return css`
        font-size: 14px;
        line-height: 1.25em;
        letter-spacing: -0.28px;
        font-weight: normal;
        color: var(--c-text-01);
      `;
    case "code":
      return css`
        font-family: "Ubuntu Mono", monospace;
        font-size: 16px;
        letter-spacing: 0.05em;
        font-weight: normal;
        color: var(--c-text-01);
      `;
    case "button":
      return css`
        font-size: 11.1px;
        font-weight: bold;
        letter-spacing: 0.555px;
        text-transform: uppercase;
        color: var(--c-text-01);
      `;
  }
}

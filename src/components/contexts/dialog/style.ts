import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

interface IBackdrop {
  open: boolean
  visible: boolean
}

interface IDialogWrapper {
  open: boolean
}

export const Backdrop = styled.div<IBackdrop>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    transparentize(0.8, props.theme.colors.primary.main)};
  backdrop-filter: blur(15px);
  z-index: 1000;
  opacity: 0;
  transition: opacity 500ms ease-in-out;

  ${(props) =>
    !!props.open
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`

export const DialogWrapper = styled.div<IDialogWrapper>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1010;
  opacity: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  transition: opacity 500ms ease-in-out;

  ${(props) =>
    !!props.open
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`

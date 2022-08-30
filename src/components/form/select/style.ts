import { darken, lighten } from 'polished'
import styled, { css } from 'styled-components'

export interface IField {
  fullWidth?: boolean
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > * + * {
    margin-top: 10px;
  }
`

export const Label = styled.label`
  font-size: 14px;
  color: ${(props) => darken(0.5, props.theme.colors.grey.light.main)};
`

export const Field = styled.select<IField>`
  border-style: solid;
  border-color: transparent;
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.colors.grey.light.main};
  border-radius: ${(props) => props.theme.shape?.radius ?? 0}px;
  padding: 10px;
  outline: none;
  font-weight: bold;
  color: black;
  transition: background-color 500ms ease-in-out, border-color 500ms ease-in-out,
    color 500ms ease-in-out;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::-ms-expand {
    display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
  }

  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(props) => darken(0.1, props.theme.colors.grey.light.main)};
  }

  &:hover,
  &:focus {
    background-color: ${(props) =>
      lighten(0.05, props.theme.colors.grey.light.main)};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary.main};
  }

  ${(props) =>
    !!props.fullWidth &&
    css`
      width: 100%;
      flex-grow: 1;
    `}
`

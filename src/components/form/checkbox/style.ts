import { darken } from 'polished'
import styled from 'styled-components'

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(props) => darken(0.5, props.theme.colors.grey.light.main)};

  input {
    margin-right: 10px;
  }
`

export const Field = styled.input.attrs({ type: 'checkbox' })`
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.theme.colors.grey.light.main};
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  border-radius: ${(props) => props.theme.shape.radius}px;

  &::before {
    content: ' ';
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.colors.primary.main};
    border-radius: ${(props) => props.theme.shape.radius / 2}px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
  }
  &:checked::before {
    transform: scale(1);
  }
`

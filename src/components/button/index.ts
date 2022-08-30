import { darken, transparentize } from 'polished'
import styled from 'styled-components'
import { ColorPath, getColor } from '../../styles/theme'

interface IButton {
  color?: ColorPath
}

export const Button = styled.button<IButton>`
  border: none;
  height: 40px;
  padding: 0 15px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${(props) =>
    props.color ? getColor(props.color)?.contrast : 'inherit'};
  background-color: ${(props) =>
    props.color ? getColor(props.color)?.main : 'transparent'};
  border-radius: ${(props) => props.theme.shape.radius}px;
  cursor: pointer;
  transition: background-color 500ms ease-in-out, box-shadow 500ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: 0 5px 10px
      ${(props) =>
        transparentize(
          0.5,
          getColor(props.color ?? 'transparent')?.main ?? 'transparent'
        )};
    background-color: ${(props) =>
      props.color
        ? darken(0.05, getColor(props.color)?.main ?? 'transparent')
        : transparentize(0.95, '#000')};
  }

  &[disabled] {
    background-color: ${(props) => props.theme.colors.grey.normal.main};
    box-shadow: none;
    cursor: default;
  }
`

export const IconButton = styled.button`
  position: relative;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-radius: 20px;
  transition: background-color 500ms ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.grey.light.main};
  }
`

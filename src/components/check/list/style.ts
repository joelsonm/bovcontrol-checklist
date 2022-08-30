import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

interface IItem {
  badgeColor?: string
}

export const List = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 10px;
  }
`
export const Item = styled.div<IItem>`
  background-color: white;
  padding: 15px;
  border-radius: ${(props) => props.theme.shape.radius}px;
  box-shadow: 0 3px 8px ${() => transparentize(0.8, '#000')};
  transition: border-width 500ms ease-in-out, box-shadow 500ms ease-in-out;

  ${(props) =>
    !!props.badgeColor &&
    css`
      border-left: ${props.theme.shape.radius}px solid ${props.badgeColor};

      &:hover {
        border-left-width: ${props.theme.shape.radius + 3}px;
      }
    `}
`

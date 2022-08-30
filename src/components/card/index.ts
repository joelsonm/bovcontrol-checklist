import { transparentize } from 'polished'
import styled from 'styled-components'

export const Card = styled.div`
  min-width: 350px;
  background-color: white;
  border-radius: ${(props) => props.theme.shape.radius}px;
  box-shadow: 0 5px 10px ${transparentize(0.9, '#000')};
`

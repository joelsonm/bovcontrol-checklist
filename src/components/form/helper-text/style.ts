import styled from 'styled-components'
import { ColorPath, getColor } from '../../../styles/theme'

interface IWrapper {
  color: 'error' | ColorPath
}

export const Wrapper = styled.span<IWrapper>`
  display: block;
  font-size: 14px;
  margin-top: 10px;
  color: ${(props) => {
    if (props.color === 'error') return '#f55'
    return getColor(props.color)?.main
  }};
`

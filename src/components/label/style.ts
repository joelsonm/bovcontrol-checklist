import { lighten } from 'polished'
import styled from 'styled-components'

export const Caption = styled.span`
  display: block;
  font-size: 12px;
  color: ${lighten(0.7, '#000')};
`

export const Text = styled.span`
  font-size: 14px;
`

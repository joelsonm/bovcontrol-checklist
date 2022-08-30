import styled from 'styled-components'

export const Caption = styled.h1`
  font-size: 20px;
  text-transform: uppercase;
  color: black;
`

export const Text = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.grey.normal};
`

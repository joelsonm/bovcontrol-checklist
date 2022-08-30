import styled from 'styled-components'

export const Chip = styled.div`
  background-color: ${(props) => props.theme.colors.grey.light.main};
  color: ${(props) => props.theme.colors.grey.light.contrast};
  padding: 10px 15px;
  border-radius: 40px;
`

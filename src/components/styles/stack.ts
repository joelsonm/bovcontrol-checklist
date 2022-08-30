import styled, { css, CSSProperties } from 'styled-components'

interface IStack {
  direction?: CSSProperties['flexDirection']
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  space?: CSSProperties['gap']
}

export const Stack = styled.div<IStack>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? 'row'};
  justify-content: ${(props) => props.justify ?? 'inherit'};
  align-items: ${(props) => props.align ?? 'inherit'};

  ${(props) =>
    !!props.space &&
    props.direction === 'column' &&
    css`
      > * + * {
        margin-top: ${props.space}px;
      }
    `}

  ${(props) =>
    !!props.space &&
    props.direction === 'row' &&
    css`
      > * + * {
        margin-left: ${props.space}px;
      }
    `}
`

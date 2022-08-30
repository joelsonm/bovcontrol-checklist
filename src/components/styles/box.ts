import styled, { css, CSSProperties } from 'styled-components'
import { ColorPath, getColor } from '../../styles/theme'

type Padding = Record<'p' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr', number>
type Margin = Record<'m' | 'mx' | 'my' | 'mt' | 'mb' | 'ml' | 'mr', number>
type Space = Padding & Margin

interface IBox extends Partial<Space> {
  bgcolor?: ColorPath
  height?: CSSProperties['height']
}

export const Box = styled.div<IBox>`
  background-color: ${(props) =>
    props.bgcolor ? getColor(props.bgcolor)?.main : 'transparent'};

  ${(props) =>
    props.height &&
    css`
      height: ${typeof props.height === 'number'
        ? `${props.height}px`
        : props.height};
    `}

  // MARGIN
  ${(props) =>
    props.m &&
    css`
      margin: ${props.m}px;
    `}

  ${(props) =>
    props.mt &&
    css`
      margin-top: ${props.mt}px;
    `}

  ${(props) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb}px;
    `}

  ${(props) =>
    props.ml &&
    css`
      margin-left: ${props.ml}px;
    `}
  
  ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr}px;
    `}

  ${(props) =>
    props.my &&
    css`
      margin: ${props.my}px 0;
    `}

  ${(props) =>
    props.mx &&
    css`
      margin: 0 ${props.mx}px;
    `}

  //PADDING
  ${(props) =>
    props.p &&
    css`
      padding: ${props.p}px;
    `}

  ${(props) =>
    props.py &&
    css`
      padding: ${props.py}px 0;
    `}

  ${(props) =>
    props.px &&
    css`
      padding: 0 ${props.px}px;
    `}
  
  ${(props) =>
    props.pl &&
    css`
      padding-left: ${props.pl}px;
    `}
  
  ${(props) =>
    props.pr &&
    css`
      padding-right: ${props.pr}px;
    `}

  ${(props) =>
    props.pt &&
    css`
      padding-top: ${props.pt}px;
    `}
  
  ${(props) =>
    props.pb &&
    css`
      padding-bottom: ${props.pb}px;
    `}
`

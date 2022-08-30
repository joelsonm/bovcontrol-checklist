import dot from 'dot-object'
import { DefaultTheme } from 'styled-components'
import { Palette } from '../@types/styled-components'

export type ColorPath = 'primary' | 'secondary' | string

const theme: DefaultTheme = {
  awesomegrid: {
    container: {
      xs: 'full',
      sm: 'full',
      md: 60,
      lg: 60,
      xl: 60,
    },
  },
  shape: {
    radius: 5,
  },
  colors: {
    primary: {
      main: '#10b981',
      contrast: 'white',
    },
    secondary: {
      main: '#3d3d3d',
      contrast: '#ffffff',
    },
    grey: {
      normal: {
        main: '#ccc',
        contrast: 'black',
      },
      dense: {
        main: '#ccc',
        contrast: 'black',
      },
      light: {
        main: '#eaeaea',
        contrast: 'black',
      },
    },
  },
}

export const getColor = (path: ColorPath): Palette | undefined => {
  const colors: any = theme.colors
  if (['primary', 'secondary'].includes(path)) {
    return colors[path]
  }
  return dot.pick(path, colors) ?? path
}

export default theme

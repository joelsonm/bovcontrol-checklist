import 'styled-components'

type Palette = Record<'main' | 'contrast', string>

declare module 'styled-components' {
  export interface DefaultTheme {
    awesomegrid: {
      container: {
        xs: string | number
        sm: string | number
        md: string | number
        lg: string | number
        xl: string | number
      }
    }
    shape: {
      radius: number
    }
    colors: {
      primary: Palette
      secondary: Palette
      grey: {
        light: Palette
        dense: Palette
        normal: Palette
      }
    }
  }
}

import { forwardRef, InputHTMLAttributes } from 'react'
import { Field, Label, Wrapper } from './style'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type?: 'text' | 'password' | 'number' | 'search'
  fullWidth?: boolean
}

const Input = forwardRef<any, IInput>(({ label, ...props }, ref) => {
  return (
    <Wrapper>
      {!!label && <Label>{label}</Label>}
      <Field ref={ref} {...props} />
    </Wrapper>
  )
})

export default Input

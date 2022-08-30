import { forwardRef, SelectHTMLAttributes } from 'react'
import { Field, Label, Wrapper } from './style'

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  fullWidth?: boolean
}

const Select = forwardRef<any, ISelect>(({ label, ...props }, ref) => {
  return (
    <Wrapper>
      {!!label && <Label>{label}</Label>}
      <Field ref={ref} {...props} />
    </Wrapper>
  )
})

export default Select

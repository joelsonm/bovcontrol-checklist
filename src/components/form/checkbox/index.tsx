import { forwardRef, InputHTMLAttributes } from 'react'
import { Field, Label } from './style'

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Checkbox = forwardRef<any, ICheckbox>(({ label, ...props }, ref) => {
  return (
    <Label>
      <Field ref={ref} {...props} type="checkbox" /> {label}
    </Label>
  )
})

export default Checkbox

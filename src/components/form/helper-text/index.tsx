import { useFormContext } from 'react-hook-form'
import dot from 'dot-object'
import { ColorPath } from '../../../styles/theme'
import { Wrapper } from './style'

interface IHelperText {
  name: string
  color: 'error' | ColorPath
}

const HelperText: React.FC<IHelperText> = ({ name, color }) => {
  const { formState } = useFormContext()

  const { message } = dot.pick(name, formState.errors) ?? {}

  if (!message) return null

  return <Wrapper color={color}>{message}</Wrapper>
}

export default HelperText

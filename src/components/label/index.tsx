import { Stack } from '../styles/stack'
import { Caption, Text } from './style'

interface ILabel {
  caption?: string
  value: string
}

const Label: React.FC<ILabel> = ({ caption, value }) => {
  return (
    <Stack space={5} direction="column">
      {!!caption && <Caption>{caption}</Caption>}
      <Text>{value}</Text>
    </Stack>
  )
}

export default Label

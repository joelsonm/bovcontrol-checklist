import { useRouter } from 'next/dist/client/router'
import { Button } from '../button'
import { Card } from '../card'
import { useDialogItem } from '../contexts/dialog'
import { Box } from '../styles/box'
import { Stack } from '../styles/stack'
import { Caption, Text } from '../typography'

interface IAlert {
  caption: string
  message: string
}

const Alert: React.FC<IAlert> = ({ caption, message }) => {
  const router = useRouter()
  const dialogItem = useDialogItem()
  return (
    <Card>
      <Box p={30}>
        <Stack direction="column" space={20}>
          <Caption>{caption}</Caption>
          <Text>{message}</Text>
          <Button
            color="primary"
            onClick={() => {
              dialogItem.close()
              router.push('/')
            }}
          >
            OK
          </Button>
        </Stack>
      </Box>
    </Card>
  )
}

export default Alert

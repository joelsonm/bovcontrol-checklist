import Image from 'next/image'
import { Container } from 'styled-bootstrap-grid'
import { Box } from '../styles/box'
import { Stack } from '../styles/stack'

import logo from '../../assets/logo.svg'

interface IBaseLayout {
  withContainer?: boolean
}

const BaseLayout: React.FC<IBaseLayout> = ({
  children,
  withContainer = true,
}) => {
  const content = (
    <Stack direction="column" space={30}>
      <Image height={30} src={logo} alt="AgroDo" />
      {children}
    </Stack>
  )

  return (
    <Box my={30}>
      {withContainer ? <Container>{content}</Container> : content}
    </Box>
  )
}

export default BaseLayout

import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useCallback } from 'react'
import { Container } from 'styled-bootstrap-grid'
import Alert from '../../../components/alert'
import CheckForm, { schema } from '../../../components/check/form'
import { Chip } from '../../../components/chip'
import { useDialog } from '../../../components/contexts/dialog'
import BaseLayout from '../../../components/layout/base'
import { Stack } from '../../../components/styles/stack'
import { Caption } from '../../../components/typography'
import { Check } from '../../../models/check'
import http from '../../../services'

const DetailCheck: NextPage<{ check: Check }> = ({ check }) => {
  const dialog = useDialog()
  const onSubmit = useCallback(
    async (data: any) => {
      const formValue = schema.cast(data, { stripUnknown: true })
      const { status } = await http.put(`checkList/${check.id}`, formValue)
      if (status === 200) {
        dialog.open({
          element: (
            <Alert caption="Sucesso" message="Item atualizado com sucesso" />
          ),
        })
      }
    },
    [check, dialog]
  )

  return (
    <>
      <Head>
        <title>{check.farmer.name} | Agro Do</title>
      </Head>
      <BaseLayout withContainer={false}>
        <Container>
          <Stack direction="column" space={30}>
            <Stack direction="row" space={5} align={'center'}>
              <Caption>{check.farmer.name}</Caption>
              <Chip>{check.type}</Chip>
            </Stack>
            <CheckForm defaultValues={check} onSubmit={onSubmit} />
          </Stack>
        </Container>
      </BaseLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: check } = await http.get<Check>(`checkList/${query.id}`)

  return {
    props: {
      check,
    },
  }
}

export default DetailCheck

import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback } from 'react'
import { Container } from 'styled-bootstrap-grid'
import Alert from '../../../components/alert'
import CheckForm, { schema } from '../../../components/check/form'
import { useDialog } from '../../../components/contexts/dialog'
import BaseLayout from '../../../components/layout/base'
import http from '../../../services'

const CreateCheck: NextPage = () => {
  const dialog = useDialog()
  const onSubmit = useCallback(
    async (data: any) => {
      const formValue = schema.cast(data, { stripUnknown: true })
      const { status } = await http.post(`checkList`, {
        checklists: [{ id: moment().millisecond().toString(), ...formValue }],
      })
      if (status === 201) {
        dialog.open({
          element: (
            <Alert caption="Sucesso" message="Item criado com sucesso" />
          ),
        })
      }
    },
    [dialog]
  )

  return (
    <>
      <Head>
        <title>Novo | Agro Do</title>
      </Head>
      <BaseLayout withContainer={false}>
        <Container>
          <CheckForm
            title="Novo"
            defaultValues={{
              created_at: moment().toISOString(),
              updated_at: moment().toISOString(),
            }}
            onSubmit={onSubmit}
          />
        </Container>
      </BaseLayout>
    </>
  )
}

export default CreateCheck

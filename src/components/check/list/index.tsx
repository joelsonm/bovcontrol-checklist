import React, { useCallback, useMemo, useState } from 'react'
import { MdDelete, MdVisibility } from 'react-icons/md'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Col, Container, Row } from 'styled-bootstrap-grid'
import { Check } from '../../../models/check'
import { useSearch } from '../../contexts/search'
import Label from '../../label'
import { Item, List } from './style'
import { Button, IconButton } from '../../button'
import { Stack } from '../../styles/stack'
import http from '../../../services'
import { useDialog, useDialogItem } from '../../contexts/dialog'
import { Caption, Text } from '../../typography'
import { Box } from '../../styles/box'
import { Card } from '../../card'
import { useRouter } from 'next/dist/client/router'
import Map from '../../map'
import { findCenter } from '../../../helpers/geo'
import CheckHeader from '../header'

interface ICheckItem {
  check: Check
  onDeleted(check: Check): void
}

const ConfirmDialog: React.FC<{ check: Check }> = () => {
  const dialogItem = useDialogItem()
  return (
    <Card>
      <Box p={30}>
        <Stack space={20} direction="column">
          <Caption>Confirmação</Caption>
          <Text>
            Deseja realmente <strong>excluir</strong> o item?
          </Text>
          <Stack justify="flex-start" direction="row" space={10}>
            <Button color="primary" onClick={() => dialogItem.close(true)}>
              Confirmar
            </Button>
            <Button onClick={() => dialogItem.close()}>Cancelar</Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  )
}

const CheckItem: React.FC<ICheckItem> = ({ check, onDeleted }) => {
  const router = useRouter()
  const dialog = useDialog()
  const color = useMemo(() => {
    switch (check.type) {
      case 'Antibiotico':
        return '#d13303'
      case 'BPA':
        return '#eec407'
      case 'ATN':
        return '#07ee5c'
      case 'BPF':
        return '#07c0ee'
    }
  }, [check.type])

  const deleteItem = useCallback(
    async (check: Check) => {
      dialog.open({
        element: <ConfirmDialog check={check} />,
        async onClose(confirm) {
          if (confirm) {
            const { status } = await http.delete(`checkList/${check._id}`)
            if (status === 200) {
              onDeleted(check)
            }
          }
        },
      })
    },
    [onDeleted, dialog]
  )

  return (
    <Item badgeColor={color}>
      <Row justifyContent="start" alignItems="center">
        <Col xs={12} md>
          <Label caption="Fazendeiro" value={check.to.name} />
        </Col>
        <Col xs={12} md={4}>
          <Label caption="Fazenda" value={check.farmer.name} />
        </Col>
        <Col md={2}>
          <Label caption="Localização" value={check.farmer.city} />
        </Col>
        <Col md={2}>
          <Label
            caption="Data de criação"
            value={moment(check.created_at).fromNow()}
          />
        </Col>
        <Col md="auto">
          <Stack direction="row" space={5}>
            <IconButton
              onClick={() => router.push('check/[id]', `check/${check._id}`)}
            >
              <MdVisibility />
            </IconButton>
            <IconButton onClick={() => deleteItem(check)}>
              <MdDelete />
            </IconButton>
          </Stack>
        </Col>
      </Row>
    </Item>
  )
}

const CheckList: React.FC<{ checks: Check[] }> = ({ checks }) => {
  const { match, query } = useSearch()

  const [itemsDeleted, setItemsDeleted] = useState<number[]>([])

  const filteredChecks = checks
    .filter((check) => {
      return (
        match(check.farmer.name) ||
        match(check.farmer.city) ||
        match(check.to.name) ||
        match(check.from.name) ||
        !query
      )
    })
    .filter((check) => !itemsDeleted.includes(check._id || check.id))

  const onDeletedItem = useCallback(async (check: Check) => {
    setItemsDeleted((olds) => {
      return [...olds, check._id || check.id]
    })
  }, [])

  return (
    <>
      <Box bgcolor="grey.light" height={'60vh'}>
        <Map
          scrollWheelZoom={false}
          center={findCenter(filteredChecks.map((check) => check.location))}
          zoom={4}
        >
          {({ TileLayer, Marker, Popup }: any) => (
            <>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredChecks.map((check, key) => (
                <Marker
                  key={key}
                  position={[check.location.latitude, check.location.longitude]}
                >
                  <Popup>{check.farmer.name}</Popup>
                </Marker>
              ))}
            </>
          )}
        </Map>
      </Box>
      <Container>
        <Stack space={30} direction="column">
          <CheckHeader />
          <List>
            {filteredChecks.map((check, key) => (
              <CheckItem check={check} key={key} onDeleted={onDeletedItem} />
            ))}
          </List>
        </Stack>
      </Container>
    </>
  )
}

export default CheckList

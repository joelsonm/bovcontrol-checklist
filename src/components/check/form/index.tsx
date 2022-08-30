import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Col, Row } from 'styled-bootstrap-grid'
import { Check } from '../../../models/check'
import { Button } from '../../button'
import HelperText from '../../form/helper-text'
import Input from '../../form/input'
import { Stack } from '../../styles/stack'
import { yupResolver } from '@hookform/resolvers/yup'
import Validator from '../../../helpers/validator'
import { Card } from '../../card'
import { Box } from '../../styles/box'
import Map from '../../map'
import { Caption } from '../../typography'
import { LatLngExpression } from 'leaflet'
import Checkbox from '../../form/checkbox'
import { Label } from '../../form/input/style'
import Select from '../../form/select'

interface ICheckForm {
  title?: string
  defaultValues?: Partial<Check>
  onSubmit(any: any): Promise<void>
}

export const schema = Validator.object().shape({
  type: Validator.string().required().label('Tipo'),
  amount_of_milk_produced: Validator.number()
    .transform((v) => (!!v ? Number(v) : null))
    .nullable()
    .required()
    .label('Quantidade de leite produzida'),
  farmer: Validator.object().shape({
    name: Validator.string().required().label('Nome da Fazenda'),
    city: Validator.string().required().label('Cidade da Fazenda'),
  }),
  from: Validator.object().shape({
    name: Validator.string().required().label('Supervisor'),
  }),
  to: Validator.object().shape({
    name: Validator.string().required().label('Fazendeiro'),
  }),
  number_of_cows_head: Validator.number()
    .transform((v) => (!!v ? Number(v) : null))
    .nullable()
    .required()
    .label('Número de cabeças de gado'),
  had_supervision: Validator.boolean().required().label('Teve supervisão'),
  location: Validator.object().shape({
    latitude: Validator.number()
      .required('Localização obrigatória')
      .label('Latitude'),
    longitude: Validator.number().required().label('Longitude'),
  }),
  created_at: Validator.string().label('Data de criação'),
  updated_at: Validator.string().label('Data de atualização'),
})

const CheckForm: React.FC<ICheckForm> = ({
  defaultValues,
  title,
  onSubmit,
}) => {
  const [position, setPosition] = useState<LatLngExpression | undefined>(() => {
    if (defaultValues?.location)
      return [
        defaultValues?.location.latitude,
        defaultValues?.location.longitude,
      ]
    return undefined
  })
  const form = useForm<Partial<Check>>({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  })

  return (
    <FormProvider {...form}>
      <Stack space={30} direction="column">
        {title && <Caption>{title}</Caption>}
        <Row>
          <Col md={5}>
            <Stack direction="column" space={30}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack space={30} direction="column">
                  <Select label="Tipo" {...form.register('type')}>
                    <option value="" hidden>
                      Selecione
                    </option>
                    <option value="Antibiotico">Antibiotico</option>
                    <option value="BPA">BPA</option>
                    <option value="ATN">ATN</option>
                    <option value="BPF">BPF</option>
                  </Select>
                  <HelperText color="error" name="type" />
                  <Input
                    label="Nome do Fazendeiro"
                    {...form.register('to.name')}
                  />
                  <HelperText color="error" name="to.name" />
                  <Row>
                    <Col md={7}>
                      <Input
                        label="Nome da Fazenda"
                        {...form.register('farmer.name', {})}
                      />
                      <HelperText color="error" name="farmer.name" />
                    </Col>
                    <Col md={5}>
                      <Input
                        label="Localização"
                        {...form.register('farmer.city')}
                      />
                      <HelperText color="error" name="farmer.city" />
                    </Col>
                  </Row>
                  <Input label="Supervisor" {...form.register('from.name')} />
                  <HelperText color="error" name="from.name" />
                  <Row>
                    <Col md={6}>
                      <Input
                        label="Quantidade de leite produzida"
                        type="number"
                        {...form.register('amount_of_milk_produced')}
                      />
                      <HelperText
                        color="error"
                        name="amount_of_milk_produced"
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        label="Cabeças de Gado"
                        type="number"
                        {...form.register('number_of_cows_head')}
                      />
                      <HelperText color="error" name="number_of_cows_head" />
                    </Col>
                  </Row>
                  <Checkbox
                    label="Teve supervisão?"
                    {...form.register('had_supervision')}
                  />
                  <HelperText color="error" name="had_supervision" />
                  <Button
                    color="primary"
                    type="submit"
                    style={{ alignSelf: 'flex-end' }}
                  >
                    Salvar
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Col>
          <Col md={7}>
            <Stack direction="column" space={10}>
              <Label>Localização</Label>
              <Card style={{ overflow: 'hidden' }}>
                <Box
                  bgcolor="grey.light"
                  height={'70vh'}
                  style={{ position: 'sticky' }}
                >
                  <Map
                    onClickMap={(event) => {
                      setPosition(event.location)
                      event.map.flyTo(event.location)
                      form.setValue('location', {
                        latitude: event.location.lat,
                        longitude: event.location.lng,
                      })
                    }}
                    zoom={5}
                    center={
                      position || [-15.961329081596647, -48.51562500000001]
                    }
                  >
                    {({ TileLayer, Marker }: any) => (
                      <>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {position && <Marker position={position} />}
                      </>
                    )}
                  </Map>
                </Box>
              </Card>
            </Stack>
            <HelperText color="error" name="location.latitude" />
          </Col>
        </Row>
      </Stack>
    </FormProvider>
  )
}

export default CheckForm

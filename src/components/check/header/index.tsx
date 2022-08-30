import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { Button } from '../../button'
import { useSearch } from '../../contexts/search'
import Input from '../../form/input'
import Link from 'next/link'

const CheckHeader: React.FC = () => {
  const { query, set } = useSearch()
  return (
    <Row justifyContent="between">
      <Col xs md={6}>
        <Input
          type="search"
          placeholder="Buscar por nome do fazendeiro ou cidade da fazenda"
          value={query || ''}
          onChange={(event) => {
            set(
              event.currentTarget.value !== ''
                ? event.currentTarget.value
                : null
            )
          }}
        />
      </Col>
      <Col xs={'auto'} md={'auto'}>
        <Link href={'/check/create'}>
          <Button color="primary">Novo</Button>
        </Link>
      </Col>
    </Row>
  )
}

export default CheckHeader

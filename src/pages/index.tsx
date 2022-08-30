import React from 'react'
import { GetServerSideProps, NextPage } from 'next'

import { Check } from '../models/check'
import http from '../services'
import CheckList from '../components/check/list'
import BaseLayout from '../components/layout/base'
import SearchProvider from '../components/contexts/search'

const Home: NextPage<{ checks: Check[] }> = ({ checks }) => {
  return (
    <BaseLayout withContainer={false}>
      <SearchProvider>
        <CheckList checks={checks} />
      </SearchProvider>
    </BaseLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: checks } = await http.get<Check[]>('checkList')

  return {
    props: {
      checks: checks.map((check) => ({
        ...check,
      })),
    },
  }
}

export default Home

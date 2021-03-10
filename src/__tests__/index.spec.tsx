import { NextPageContext } from 'next'
import React from 'react'
import IndexPage, { getStaticProps } from '@app/pages/index'
import { render } from '@app/tests/testing-utils'

describe('Index Page', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<IndexPage />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('getStaticProps method works properly', async () => {
    const end = jest.fn()
    const writeHead = jest.fn()
    const ctxMock = { res: { end, writeHead } } as unknown
    const staticProps = getStaticProps(ctxMock as NextPageContext)

    expect(staticProps.props).toEqual({})
    expect(writeHead).toBeCalledWith(302, { Location: '/search' })
    expect(end).toBeCalled()
  })
})

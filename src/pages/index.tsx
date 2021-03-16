import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()

  // Make sure we are in the browser
  if (typeof window !== 'undefined') {
    router.push('/search')
  }

  return <></>
}

export const getStaticProps = (ctx: NextPageContext) => {
  // We check for ctx.res to make sure we are on the server
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/search' })
    ctx.res.end()
  }
  return { props: {} }
}

export default IndexPage

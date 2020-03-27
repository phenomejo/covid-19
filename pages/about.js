import Link from 'next/link'

// import { Button } from 'antd'

const Second = ({ as }) => {
  console.log(as)
  return (
    <>
      <Link href="/index"><a title="index">Go to index.</a></Link> <br />
      <h1>This about page.</h1>
    </>
  )
}

Second.getInitialProps = (ctx) => {
  return {
    as: 1111
  }
}

export default Second
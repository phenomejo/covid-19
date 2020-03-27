import { Provider } from 'react-redux'
// import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { store } from '../store'
import Head from 'next/head'

import 'antd/dist/antd.css'
import '../style/App.css'

const MyApp = (props) => {
  const {Component, store, pageProps} = props

  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/static/covid-19.png" />
        <title>Covid 19</title>
        <script src="https://apis.google.com/js/api.js" ></script>
        {/* <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyClIV8CuVGsLzFapU2QeZPlM9XEuDMeq58&callback=initMap" type="text/javascript"></script> */}
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps  = async ({ Component, ctx }) => {
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    }
  }
}

export default withRedux(store)(MyApp)
 
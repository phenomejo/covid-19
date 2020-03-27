// import Link from 'next/link'
import React from 'react'
import { Layout, Divider, Popover } from 'antd'
import moment from 'moment'
import GoogleMapReact from 'google-map-react'
import Statistics from '../components/Statistics'
import CovidApi from '../api/CovidApi'

import { GEOLOCATION } from '../utils/Constant'

const content = (v) => {
  return (
    <div>
      <p>ผู้ติดเชื้อทั้งหมด {v.cases.total}</p>
      <p>กำลังรักษา { v.cases.active }</p>
      <p>รักษาหายแล้ว { v.cases.recovered }</p>
      <p>เสียชีวิต { v.deaths.total }</p>
  </div>
  )
}

const AnyReactComponent = ({ text }) => <Popover content={content(text)} title={text.country}>
  <div className="mark">
  </div>
</Popover>

const { Content, Header, Footer } = Layout
// const { Option } = Select

const Index = ({ covidTh, covidGobal, dataLine, dataDonut, center, zoom, country }) => {

  const renderMark = () => covidGobal.map((v) => {
    return (
      <AnyReactComponent
        key={v.country}
        lat={v.lat}
        lng={v.lng}
        text={v}
      />
    )
  })

  return (
    <>
      <Layout>
      {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content>
          <div className="container">
            <div className="page-content">
              <Divider orientation="left">
                <img src={require('../static/covid-19.png')} />
                <span style={{ fontSize: '24px' }}>สถิติผู้ติดเชื้อ Covid-19</span> 
                {/* small>อัพเดทล่าสุด: { moment(data.time).format('DD-MMM-YYYY HH:mm') }</small> */}
              </Divider>
              {/* <Select defaultValue="Thailand" style={{ width: 350 }} allowClear
                      showSearch
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
              {countryList.map(province => (
                <Option key={province}>{province}</Option>
              ))}
              </Select> */}
              <Statistics covidTh={covidTh} dataLine={dataLine} dataDonut={dataDonut} />
              <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyClIV8CuVGsLzFapU2QeZPlM9XEuDMeq58' }}
                  defaultCenter={center}
                  defaultZoom={zoom}
                >
                  { renderMark() }
                </GoogleMapReact>
              </div> 
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  )
}

Index.getInitialProps = async (ctx) => {
  const respTh = await CovidApi.getStatistics({ country: 'Thailand' })
  const respGobal = await CovidApi.getStatistics()
  const history = await CovidApi.getHistory({ country: 'Thailand' })
  // const country = await CovidApi.getCountries()

  let covidTh = []
  respTh.response.forEach((v) => {
    covidTh.push(
      { label: 'จำนวนผู้ติดเชื้อ', value: v.cases.total, new: `(เพิ่มขึ้น ${v.cases.new.substring(v.cases.new.indexOf('+') + 1)})`, color: 'card-tomato' },
      { label: 'กำลังรักษา', value: v.cases.active, color: 'card-goldenrod' },
      { label: 'รักษาหายแล้ว', value: v.cases.recovered, color: 'card-lightgreen' },
      { label: 'เสียชีวิต', value: v.deaths.total, new: `(เพิ่มขึ้น ${v.deaths.new.substring(v.deaths.new.indexOf('+') + 1)})`, color: 'card-orangered' }
    )
  })

  let arr = []
  respGobal.response.forEach((v) => {
    for (const iterator of GEOLOCATION) {
      if (iterator.country === v.country) {
        arr.push({ ...iterator, ...v })
        break;
      }
    }
  })

  let labels = []
  let dataL = []
  if (history && history.response.length > 0) {
    history.response.forEach(v => v.time = moment(v.time).format('DD-MM-YYYY HH:mm'))
    labels = history.response.map(v => v.time).reverse()
    dataL = history.response.map(v => v.cases.total).reverse()
  }

  const dataLine = {
    labels,
    datasets: [
      {
        label: 'ผู้ติดเชื้อ',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'black',
        borderColor: 'red',
        borderWidth: 2,
        data: dataL
      }
    ]
  }

  const dataDonut = {
    labels: ['กำลังรักษา', 'รักษาหายแล้ว', 'เสียชีวิต'],
    datasets: [
      {
        label: 'อัตราส่วน',
        backgroundColor: [
          '#daa520',
          '#90ee90',
          '#ff4500',
        ],
        hoverBackgroundColor: [
        '#c48d03',
        '#47cd47',
        '#ca3700'
        
        ],
        data: covidTh.map(v => v.value)
      }
    ]
  }

  return {
    covidTh,
    covidGobal: arr,
    dataDonut,
    dataLine,
    // countryList: country.response,
    center: {
      lat: 15.870032,
      lng: 100.992541
    },
    zoom: 5
  }
}
 
export default Index
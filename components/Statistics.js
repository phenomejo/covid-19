import React from 'react'

import { Card, Col, Row, Statistic } from 'antd'
// import GoogleMapReact from 'google-map-react'
// import { PlusOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Line, Doughnut } from 'react-chartjs-2'
import moment from 'moment'

const AnyReactComponent = ({ text }) => <div style={{
  color: 'white', 
  background: 'grey',
  padding: '15px 10px',
  display: 'inline-flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  transform: 'translate(-50%, -50%)',
  cursor: 'Pointer'
}}>{text}</div>

const Statistics = ({ covidTh, dataLine, dataDonut,center, zoom, country }) => {
  const renderData = () => covidTh.map((v, i) => {
    return (
      <Col span={i == 0 ? 24 : null}
           xs={ i === 0 ? null : { span: 24 } }
           md={ i === 0 ? null : { span: 24 } }
           lg={ i === 0 ? null : { span: 8 } }
           key={i}>
        <Card className={v.color} hoverable>
          <Statistic
            title={<h1>{v.label} <br /></h1>}
            value={v.value}
            suffix={v.new}
          />
        </Card>
      </Col>
    )
  })

  return (
    <>
      <Row gutter={12}>
        <Col md={{ span: 12, offset: 6 }} xl={{ span: 12, offset: 6 }}>
          <Row gutter={12}>
            { renderData() }
          </Row>
        </Col>

        <Col md={{ span: 24 }} xl={{ span: 12 }}>

        </Col>
      </Row>
      <Row gutter={12}>
        <Col md={{ span: 24 }} xl={{ span: 12 }}>
          <Line
            data={dataLine}
            options={{
              title:{
                display:true,
                text:'จำนวนผู้ติดเชื้อย้อนหลัง 7 วัน',
                fontSize:20
              },
              legend:{
                display:true,
                position:'bottom'
              }
            }}
          />
        </Col>
        <Col md={{ span: 24 }} xl={{ span: 12 }}>
          <Doughnut
            data={dataDonut}
            options={{
              title:{
                display:true,
                text:'อัตราส่วน',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default Statistics

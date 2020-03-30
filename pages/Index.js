// import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Layout, Divider, Spin } from 'antd'
import moment from 'moment'
import Statistics from '../components/Statistics'
import MyMap from '../components/MyMap'
import CovidApi from '../api/CovidApi'
import { GEOLOCATION } from '../utils/Constant'

const { Content, Footer } = Layout
// const { Option } = Select

const initState = {
  th: [],
  global: [],
  line: [],
  donut: [],
}

const Index = () => {
  const [obj, setObj] = useState(initState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [th, history, global] = await Promise.all([
        CovidApi.getStatistics({ country: 'Thailand' }),
        CovidApi.getHistory({ country: 'Thailand' }),
        CovidApi.getStatistics()
      ])
      // const th = await CovidApi.getStatistics({ country: 'Thailand' })
      // const history = await CovidApi.getHistory({ country: 'Thailand' })
      // const global = await CovidApi.getStatistics()
  
      let arrTh = []
      let arrGlobal = []
      let labels = []
      let data = []

      th.response.forEach((v) => {
        arrTh.push(
          { label: 'จำนวนผู้ติดเชื้อ', value: v.cases.total, new: `(เพิ่มขึ้น ${v.cases.new.substring(v.cases.new.indexOf('+') + 1)})`, color: 'card-tomato' },
          { label: 'กำลังรักษา', value: v.cases.active, color: 'card-goldenrod' },
          { label: 'รักษาหายแล้ว', value: v.cases.recovered, color: 'card-lightgreen' },
          { label: 'เสียชีวิต', value: v.deaths.total, new: !v.deaths.new ? null : `(เพิ่มขึ้น ${v.deaths.new.substring(v.deaths.new.indexOf('+') + 1)})`, color: 'card-orangered' }
        )
      })
  

      global.response.forEach((v) => {
        for (const iterator of GEOLOCATION) {
          if (iterator.country === v.country) {
            arrGlobal.push({ ...iterator, ...v })
            break;
          }
        }
      })

      if (history && history.response.length > 0) {
        history.response.forEach(v => v.time = moment(v.time).format('DD-MM-YYYY HH:mm'))
        labels = history.response.map(v => v.time).reverse()
        data = history.response.map(v => v.cases.total).reverse()
      }
    
      const line = {
        labels,
        datasets: [
          {
            label: 'ผู้ติดเชื้อ',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'black',
            borderColor: 'red',
            borderWidth: 2,
            data
          }
        ]
      }    

      const donut = {
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
            data: arrTh.map(v => v.value)
          }
        ]
      }

      setObj({ ...obj, th: arrTh, global: arrGlobal, line, donut })
      setIsLoading(false)
    }

    fetchData()
  
  }, [])

  return (
    <>
      <Layout>
      {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content>
          <div className="container">
            <div className="page-content">
              {
                isLoading ? <Spin size="large" />  :
                <>
                  <Divider orientation="left">
                  <img src={require('../static/covid-19.png')} alt="covid" />
                  <span style={{ fontSize: '24px' }}>สถิติผู้ติดเชื้อ Covid-19</span> 
                  {/* small>อัพเดทล่าสุด: { moment(data.time).format('DD-MMM-YYYY HH:mm') }</small> */}
                  </Divider>
                  <Statistics covidTh={obj.th} dataLine={obj.line} dataDonut={obj.donut} />
                  <MyMap dataGlobal={obj.global} />
                </>
              }
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  )
}
 
export default Index
import React from 'react'
import { Popover } from 'antd'
import GoogleMapReact from 'google-map-react'

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

const AnyReactComponent = ({ obj }) => <Popover content={content(obj)} title={obj.country}>
  <div className="mark">
  </div>
</Popover>

const MyMap = ({ dataGlobal }) => {

  const renderMark = () => dataGlobal.map((v) => {
    return (
      <AnyReactComponent
        key={v.country}
        lat={v.lat}
        lng={v.lng}
        obj={v}
      />
    )
  })

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyClIV8CuVGsLzFapU2QeZPlM9XEuDMeq58' }}
        defaultCenter={{lat: 15.870032,lng: 100.992541}}
        defaultZoom={5}
      >
        { renderMark() }
      </GoogleMapReact>
    </div> 
  )
}

export default MyMap
import Form from './compontents/form'
import Map from './compontents/map'
import React from 'react'
import Hero2 from '../components/hero2'
import ContactInformation from './ContactInformation'


function Conctact() {
  return (
    <>
    <Hero2 title="Contact Us"/>
    
      <div className='grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2'>
        <div>
          <ContactInformation/>
        </div>

        <div>
          <Form />
        </div>

      </div>

      <div className='container mx-auto'>
        <Map />
      </div>
    
    
    </>
  )
}

export default Conctact
import Form from './compontents/form'
import Map from './compontents/map'
import React from 'react'
import Hero2 from '../components/hero2'
import ContactInformation from './ContactInformation'
import ContactMap from './ContactMap'

function Conctact() {
  return (
    <>
      <div className='grid grid-cols-2'>
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
    
    <Hero2 title="Contact Us"/>
    
    </>
  )
}

export default Conctact
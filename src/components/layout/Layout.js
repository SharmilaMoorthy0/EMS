import React from 'react'


import './layout.css'
import Admin from '../Admin'




function Layout({children}) {
  return (
    <div className=''>
       
       <Admin/>
        <div className='main-box'>
       {
        children
       }
      </div>
    </div>
  )
}

export default Layout
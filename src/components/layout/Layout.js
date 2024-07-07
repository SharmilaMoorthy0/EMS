import React from 'react'
import Dashboard from '../Sidebar'
import Login from '../loginadmin/Login'
import Employelist from '../EmployePage/Employe'
import Home from '../Dashboard/Home'
import Sidebar from '../Sidebar'
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
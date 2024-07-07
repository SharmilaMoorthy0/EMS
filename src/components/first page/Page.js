import React from 'react'
import { useNavigate } from 'react-router-dom'
import './page.css'
import Layout from '../layout/Layout'
import img2 from '../images/img2.jpg'

function Page() {
  const navigate = useNavigate()
  return (


    <div className='container-fluid w-100 m-auto register-pages '>
    <div className="container ">
        <div class="row  ">
            <div class='forms   '>
               
              <h4>employe management system</h4>
              <h3>Login as</h3>
              <div className='d-flex justify-content-center'>
              <button className='mx-5' type='' onClick={()=>navigate('/login')}>Admin</button>
              <button  onClick={()=>navigate('/employelogin')}>Employe</button>
              </div>
            </div>
        </div >
    </div>
</div >


   







  )
}

export default Page
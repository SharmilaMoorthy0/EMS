import React, { useEffect } from 'react'
import { useState } from 'react'


import { isToday } from 'date-fns'
import axios from 'axios'
import Layout from '../layout/Layout'
import './home.css'
function Home() {
  let user = JSON.parse(localStorage.getItem('userData'))
  const [Employelist, setEmployelist] = useState([])
  const [categoryList, setcategoryList] = useState([])
  const [LeaveList, setLeaveList] = useState([])
  const [LeaveTypeList, setLeaveTypeList] = useState([])
 

 

 
  const getEmployelist = () => {
    axios.get("https://management-backend-hu4p.onrender.com/all/employe/admin"
    ).then((res) => {
      if (res.data.status === 1) {
        setEmployelist(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getEmployelist()
  }, [])
  const getlist = () => {
    axios.get("https://management-backend-hu4p.onrender.com/all/category"

    ).then((res) => {
      if (res.data.status === 1) {
        setcategoryList(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getlist()
  }, [])

  const getLeavelist = () => {

    axios.get("https://management-backend-hu4p.onrender.com/all/leave/admin", {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }
    ).then((res) => {
      if (res.data.status === 1) {
        setLeaveList(res.data.response)
      }

    }).catch((err) => { console.log(err) })



  }
  useEffect(() => {
    getLeavelist()
  }, [])

  const getLeaveTypelist = () => {
    axios.get("https://management-backend-hu4p.onrender.com/all/leave/type"

    ).then((res) => {
      if (res.data.status === 1) {
        setLeaveTypeList(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getLeaveTypelist()
  }, [])


  const cardData = [

    {
      name: "Employee",
      color: "primary",
      text: "Total:",
      count: Employelist?.length
    },
    {
      name: "Category",
      color: "success",
      text: "Total:",
      count: categoryList?.length

    },
    {
      name: "Leave",

      color: "danger",
      text: "Total:",
      count: LeaveList?.length
    },
    {
      name: "Leave Types",
      color: "info",
      text: "Total:",
      count: LeaveTypeList?.length

    },
    
  ]

  return (
    <Layout>  <div className='container w-100 bg '>
        <div class="mb-4 d-sm-flex align-items-center justify-content-between">
          <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
         
        </div>

        <div class="row">

          {cardData.map((item) => {
            return <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div class={`card border-left-${item.color} shadow  mx-1  py-2`}>
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-1">
                      <div class={`text-xs font-weight text-${item.color}  text-capitalize mb-1`}>
                        {item.name}</div>
                      <div class={`h5 mb-0 font-weight text-${item.color}-800`}>{item.text}{item.count}</div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          })}


        </div>
      </div>
      
    







      </Layout >













  
  )
}

export default Home
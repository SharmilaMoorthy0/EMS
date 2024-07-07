import React, { useEffect, useState } from 'react'
import './admin.css'
import Layout from './layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Admin() {

    const navigate = useNavigate()
    const [LeaveList, setLeaveList] = useState([])
    let token = localStorage.getItem('myapptoken')
    let user = JSON.parse(localStorage.getItem('userData'))
    let Data = JSON.parse(localStorage.getItem('LeaveData'))
    const onLogout = () => {
        localStorage.removeItem('myapptoken')
        localStorage.removeItem('userData')
        navigate('/')
    }
    const getLeavelist = () => {
        let url = ""
        if (user?.role === "admin") {
            url = "http://localhost:4000/all/leave/admin"
        }
        else {
            url = "http://localhost:4000/all/leave"
        }
        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("myapptoken")
            }
        },
        ).then((res) => {
            if (res.data.status === 1) {
                setLeaveList(res.data.response)
            }

        }).catch((err) => { console.log(err) })
    }
    useEffect(() => {
        getLeavelist()
    }, [])
    return (

        <div className='sidebox'>


            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

              

                {user?.role === "admin" &&
                    <li class="nav-item ">
                        <a class="nav-link" href="/home">
                            <i class="fa fa-tachometer" aria-hidden="true"></i>
                            <span className='span text-capitalize  mx-2'>Dashboard</span>
                        </a>
                    </li>
                }
                {user?.role === "admin" ? "" : <li class="nav-item ">
                    <a class="nav-link" href="/profile" >
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <span className='span text-capitalize  mx-2'>Profile</span>
                    </a>
                </li>
                }
                {user?.role === "admin" ? "" : <hr />}
                {user?.role === "admin" && <li class="nav-item ">
                    <a class="nav-link" href="/employe">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <span className='span  text-capitalize mx-2'>Employe</span>
                    </a>
                </li>

                }
                {user?.role === "admin" && <hr />}
                {user?.role === "admin" &&
                    <li class="nav-item ">
                        <a class="nav-link" href="/category">
                            <i class="fa fa-id-card-o" aria-hidden="true"></i>
                            <span className='span mx-2 text-capitalize'>Category</span>
                        </a>
                    </li>
                }


                <li class="nav-item ">
                    <a class="nav-link" href="/leave">
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                        <span className='span mx-2 text-capitalize'>Leave</span>
                    </a>
                </li>
                <hr />
                <li class="nav-item ">
                    <a class="nav-link" href="/salary">
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <span className='span mx-2 text-capitalize'>Salary</span>
                    </a>
                </li>

                {user?.role === "admin" && <li class="nav-item ">
                    <a class="nav-link" href="/leave/type">
                        <i class="fa fa-table" aria-hidden="true"></i>
                        <span className='span  text-capitalize mx-2'>LeaveType</span>
                    </a>
                </li>
                }
                {user?.role === "admin" ? <hr /> : ""}
                {user?.role === "admin" && <li class="nav-item ">
                    <a class="nav-link" href="/leave/status">
                        <i class="fa fa-table" aria-hidden="true"></i>
                        <span className='span  text-capitalize mx-2'>LeaveStatus</span>
                    </a>
                </li>
                }

                {user?.role === "admin" ? "" : <hr />}
                {user?.role === "admin" ? "" : <li class="nav-item ">
                    <a class="nav-link" href="/password" >
                        <i class="fa fa-meh-o" aria-hidden="true"></i>
                        <span className='span text-capitalize  mx-2'>Change Password</span>
                    </a>
                </li>}


                {user?.role === "admin" ? "" : <hr />}

                {token && <li class="nav-item ">
                    <a class="nav-link" href="" onClick={() => onLogout()} >
                        <i class="fa fa-power-off" aria-hidden="true"></i>
                        <span className='span text-capitalize  mx-2'>LogOut</span>
                    </a>
                </li>}

                <hr />























            </ul>








        </div>








    )
}
export default Admin
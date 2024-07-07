import React from 'react'
import './sidebar.css'
import Layout from './layout/Layout'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()
    let token = localStorage.getItem('myapptoken')
    let user = JSON.parse(localStorage.getItem('userData'))
    const onLogout = () => {
        localStorage.removeItem('myapptoken')
        localStorage.removeItem('userData')
        navigate('/')
    }
    return (

        <div className='container-fluid text-lowercase'>
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3"> <sup>2</sup></div>
                </a>


                <hr class="sidebar-divider my-0" />
                <li class="nav-item ">
                    <a class="nav-link" href="/admin">
                        <i class="fa fa-tachometer" aria-hidden="true"></i>
                        <span className='span  mx-2 text-lowercase'>Admin</span>
                    </a>
                </li>
                {user?.role === "admin" &&
                    <li class="nav-item ">
                        <a class="nav-link" href="/home">
                            <i class="fa fa-tachometer" aria-hidden="true"></i>
                            <span className='span  mx-2'>Dashboard</span>
                        </a>
                    </li>
                }
                {user.role === "admin" ? "" : <li class="nav-item ">
                    <a class="nav-link" href="/profile" >
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <span className='span   mx-2'>Profile</span>
                    </a>
                </li>
                }


                <li class="nav-item ">
                    <a class="nav-link" href="/employe">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <span className='span   mx-2'>Employe</span>
                    </a>
                </li>
                <hr />
                {user?.role === "admin" &&
                    <li class="nav-item ">
                        <a class="nav-link" href="/category">
                            <i class="fa fa-sign-in" aria-hidden="true"></i>
                            <span className='span mx-2'>Category</span>
                        </a>
                    </li>
                }


                <li class="nav-item ">
                    <a class="nav-link" href="/leave">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        <span className='span mx-2'>Leave</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="/salary">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        <span className='span mx-2'>Salary</span>
                    </a>
                </li>
                <hr />
                {user.role === "admin" && <li class="nav-item ">
                    <a class="nav-link" href="/leave/type">
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        <span className='span mx-2'>LeaveType</span>
                    </a>
                </li>
                }

                <li>
                    {
                        token && <button className=' btn btn-sm btn btn-danger mx-1' onClick={() => onLogout()}>Logout</button>
                    }
                </li>

            </ul>

        </div>

    )
}

export default Sidebar
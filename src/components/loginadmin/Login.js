import React, { useState } from 'react'
import './login.css'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../layout/Layout'
import LeaveType from '../leaveType/LeaveType'

function Login() {

    const navigate = useNavigate()

    const [showpassword, setshowpassword] = useState()
    const [login, setlogin] = useState({
        Email: "",
        password: ""
    })
    const handleChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }
    const OnLogin = () => {
        if (login.Email === "") {
            return toast.error("Email required")
        }
        if (login.password === "") {
            return toast.error("password requried")
        }
        axios.post("https://management-backend-hu4p.onrender.com/login/user", login).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                console.log(res.data.token)

                localStorage.setItem("myapptoken", res.data.token)
                localStorage.setItem("userData", JSON.stringify(res.data.user))
                setlogin({
                    Email: "",
                    password: ""
                })
                navigate('/admin')
            }

            if (res.data.status === 0) {
                toast.error(res.data.message)
            }
        }).catch((err) => { console.log(err) })


    }
    return (


        <div className='container-fluid register-pages'>
            <div className="container">
                <div class="row  ">
                    <div class='forms '>
                        <div className='col'>
                            <div class="mb-3 mt-3">
                                <input type='email'
                                    placeholder='Email'
                                    name='Email'
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                       
                            <div className='col'>
                                <div class="mb-3 mt-3">
                                    <input type='password'
                                        placeholder='password'
                                        name='password'
                                        onChange={(e) => handleChange(e)} />
                                </div >
                            </div >
                            <button type='submit' onClick={() => OnLogin()}>Login</button>
                            <span>
                                don't have account?
                                <a href='' onClick={() => navigate('/signup')}>REGISTER</a>
                            </span>
                        </div>
                    </div >
                </div>
            </div >



            )
}

            export default Login
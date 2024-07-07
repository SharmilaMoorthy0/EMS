import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import './signup.css'
import Layout from '../layout/Layout'
function Signup() {
    const navigate = useNavigate()

    const [user, setuser] = useState({
        username: "",
        Email: "",
        password: ""

    }
    )
    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const validateEmail = (Email) => {
        let result = /^([A-Za-z0-9\.])+\@([A-Za-z0-9])+\.([A-Za-z]{2,4})$/;
        return result.test(Email)
    }

    const onsubmit = () => {
        // e.preventDefault()
        if (user.username === "") {
            return toast.error("username requried")
        }
        if (user.Email === "") {
            return toast.error("Email requried")
        }
        if (!validateEmail(user.Email)) {
            return toast.error("invalid email")
        }
        if (user.password === "") {
            return toast.error(" password requried")
        }



        axios.post("https://management-backend-hu4p.onrender.com/user/signup", user).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                navigate('/')
                setuser({
                    username: "",
                    Email: "",
                    password: ""
                })
            }

            if (res.data.status === 0) {
                toast.error(res.data.message)
            }

        }).catch((err) => { console.log(err) })

    }

    return (
       
        <div className='container-fluid register-pages '>
            <div className="container">
                <div class="row  ">
                    <div class='forms'>
                        <div className='col'>
                            <div class="mb-1 mt-1">
                                <input type='text'
                                    placeholder='Username'
                                    name='username' 
                                    onChange={(e)=> handleChange(e)}/>
                            </div>
                            </div >
                            <div className='col'>
                                <div class="mb-1 mt-1">
                                    <input type='email'
                                        placeholder='Email'
                                        name='Email' 
                                        onChange={(e)=> handleChange(e)}/>
                                </div>
                            </div>
                            <div className='col'>
                                <div class="mb-1 mt-1">
                                    <input type='password'
                                        placeholder='password'
                                        name='password' 
                                        onChange={(e)=> handleChange(e)}/>
                                </div >
                            </div >
                            <button type='submit' className='' onClick={()=>onsubmit()}>create user</button>
                            <span className='mb-5'>
                                already have account?
                                <a href='' onClick={() => navigate('/')}>Login</a>
                            </span>
                        </div>
                    </div >
                </div>
            
        </div>
        
    )
}
export default Signup
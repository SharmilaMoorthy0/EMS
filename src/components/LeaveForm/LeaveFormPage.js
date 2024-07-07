import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import axios from 'axios'
import './leaveform.css'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'



function LeaveFormPage() {
    const navigate = useNavigate()
    const [LeaveTypeList, setLeaveTypeList] = useState([])
    const [LeaveList, setLeaveList] = useState([])
    const [leave, setleave] = useState({
        From: "",
        To: "",
        Reason: "",
        Description: ""
    })
    const getLeaveTypelist = () => {
        axios.get("http://localhost:4000/all/leave/type"

        ).then((res) => {
            if (res.data.status === 1) {
                setLeaveTypeList(res.data.response)
            }

        }).catch((err) => { console.log(err) })
    }
    useEffect(() => {
        getLeaveTypelist()
    }, [])
    const handleChange = (e, name) => {
        setleave({ ...leave, [name]: e.target.value })
    }

    const handlesubmit = () => {
        let profile = JSON.parse(localStorage.getItem("userData")).Image
        let client = JSON.parse(localStorage.getItem("userData")).FirstName
        let LeaveDetails = { ...leave, client: client, Image: profile }
        axios.post("http://localhost:4000/new/leave", LeaveDetails, {
            headers: {
                Authorization: localStorage.getItem("myapptoken")
            }
        })
            .then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)

                    navigate('/leave')
                    localStorage.setItem("LeaveData", JSON.stringify(res.data.leave))
                    setLeaveList({ ...LeaveList, LeaveDetails })
                    setLeaveList({
                        From: "",
                        To: "",
                        Reason: ""

                    })

                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)
                }
            }).catch((error) => { console.log(error) })
    }
    return (
        <Layout>
            <div className='container-fluid '>
                <div className='container bg  '>
                    <div className='card  shadow w-100  '>

                        <div className='card-body '>
                            <h1>Apply leave form</h1>
                            <div className='row '>

                                <div className='col-sm-12 col-md-12 col-lg-6'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">From

                                        </label>
                                        <input type="date" class="form-control" name='From'
                                            value={leave.From}
                                            onChange={(e) => handleChange(e, "From")}
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-12 col-md-12 col-lg-6'>
                                    <div class="mb-3 needs-validation" >
                                        <label class="form-label text-primary mx-2">TO

                                        </label>
                                        <input type="date" class="form-control" name='To'
                                            value={leave.To}
                                            onChange={(e) => handleChange(e, "To")}
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-12 col-md-12 col-sm-12'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">Reason

                                        </label>
                                        <select className='form-control form-select'
                                            onChange={(e) => setleave({ ...leave, Reason: e.target.value })}
                                        >


                                            {LeaveTypeList.map((list) => {
                                                return <option value={list.leaveType}

                                                > {list.leaveType}</option>
                                            })}


                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-12 col-sm-12'>
                                    <div class="mb-3 needs-validation" >
                                        <label class="form-label text-primary mx-2">Description

                                        </label>
                                        <input type="textarea" class="form-control" name='Description'
                                            value={leave.Description}
                                            onChange={(e) => handleChange(e, "Description")}
                                        />
                                    </div>
                                </div>

                                <div className='text-start'>
                                    <button className='btn btn-sm btn btn-success' onClick={() => handlesubmit()}>submit</button>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>



            </div>


        </Layout>
    )
}

export default LeaveFormPage
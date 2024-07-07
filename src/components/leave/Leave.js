import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Layout from '../layout/Layout'
import LeaveType from '../leaveType/LeaveType'

function Leave() {
    const navigate = useNavigate()
    const [LeaveStatusList, setLeaveStatusList] = useState([])
    const [LeaveTypeList, setLeaveTypeList] = useState([])
    const [statusmodal, setstatusmodal] = useState(false)
    const [LeaveList, setLeaveList] = useState([])
    const [editLeave, seteditLeave] = useState({})
    let user = JSON.parse(localStorage.getItem('userData'))




    const getLeavelist = () => {
        let url = ""
        if (user?.role === "admin") {
            url = "https://management-backend-hu4p.onrender.com/all/leave/admin"
        }
        else {
            url = "https://management-backend-hu4p.onrender.com/all/leave"
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

    const getLeaveStatuslist = () => {
        axios.get("https://management-backend-hu4p.onrender.com/all/leave/Status"

        ).then((res) => {
            if (res.data.status === 1) {
                setLeaveStatusList(res.data.response)
            }

        }).catch((err) => { console.log(err) })
    }
    useEffect(() => {
        getLeaveStatuslist()
    }, [])

    const removeLeave = (list) => {
        axios.delete(`https://management-backend-hu4p.onrender.com/Delete/leave/${list._id}`,
            {
                headers: {
                    Authorization: localStorage.getItem("myapptoken")
                }
            }
        )
            .then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)
                    getLeavelist()
                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)

                }

            }).catch((err) => { console.log(err) })
    }

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


    const leavestatus = (data) => {
        setstatusmodal(!statusmodal)
        seteditLeave(data)
    }
    const HandleChange = (e, name) => {
        seteditLeave({ ...editLeave, [name]: e.target.value })
    }


    const submit = () => {
        axios.put(`https://management-backend-hu4p.onrender.com/update/leave/${editLeave._id}`, editLeave, {
            headers: {
                Authorization: localStorage.getItem("myapptoken")
            }
        }

        ).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                setstatusmodal(false)
                seteditLeave({})
                getLeavelist()
            }
            if (res.data.status === 0) {
                toast.error(res.data.message)
            }

        }).catch((err) => { console.log(err) })
    }

    return (
        <Layout>

            {/* <div className='container-fluid bg1'>
                <div className='container mt-5 w-100'>
                    <div className=' d-sm-flex justify-content-between align-items-center mb-4 '>
                        <h2 className='text-secondary'>Leave status</h2>
                        <div>
                            {user?.role == "admin" ? ""
                                : <button className='btn btn-sm btn btn-primary' onClick={() => navigate('/leave/form')}> Apply leave</button>
                            }
                        </div>


                    </div>
                    <div className='card shadow mb-4 '>
                        <div className="card-header">
                            <h6 className='text-primary'>Leave Data</h6>
                        </div>

                        <div className='card-body text-center'>

                            <div className='table-responsive' id="cart">
                                <table class="" style={{ width: "100%" }}>
                                    <thead className=' text-uppercase text-light'>
                                        <tr>
                                            <td scope="col">S.no</td>

                                            {user?.role === "admin" && <td scope='col'>Profile</td>
                                            }
                                            {user?.role === "admin" &&
                                                <td scope='col'>Name</td>
                                            }



                                            <td scope='col'>From</td>
                                            <td scope="col">To</td>
                                            <td scope="col">Reason</td>
                                            <td scope="col">Description</td>
                                            <td scope="col">Status</td>

                                            <td scope="col">Actions</td>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LeaveList.length > 0 && LeaveList?.map((list, index) => {
                                            return <tr>
                                                <td scope="row">{index + 1}</td>
                                                {user?.role === "admin" &&
                                                    <td><img className='' height={"62px"} src={list?.Image} /></td>}
                                                {user?.role === "admin" && <td>{list.client}</td>
                                                }

                                                <td>{list.From}</td>
                                                <td>{list.To}</td>
                                                <td>{list.Reason}</td>
                                                <td>{list.Description}</td>
                                                <td className={`${list.status === "Approved" ? 'text-success' : 'text-danger'}`}>{list?.status}</td>

                                                <td>

                                                    {user?.role === "admin" ?
                                                        <button className=" btn btn-sm mx-1" onClick={() => leavestatus(list)} ><i class="fa fa-pencil" aria-hidden="true"></i></button>


                                                        :

                                                        <button className='btn btn-sm text-danger mx-1 ' onClick={() => removeLeave(list)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    }



                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>




                    <Modal isOpen={statusmodal} toggle={() => setstatusmodal(!statusmodal)} size='lg'>
                        <ModalHeader toggle={() => setstatusmodal(!statusmodal)}></ModalHeader>
                        <ModalBody>

                            <div className='container'>
                                <div className='card shadow  mt-5 '>

                                    <div className='card-body '>
                                        <h1>Apply leave form</h1>
                                        <div className='row mt-5'>
                                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                                <div class="mb-3 needs-validation" novalidate>
                                                    <label class="form-label text-primary mx-2">From

                                                    </label>
                                                    <input type="date" class="form-control" name='From'
                                                        value={editLeave.From}

                                                    />
                                                </div>
                                            </div>

                                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                                <div class="mb-3 needs-validation" novalidate>
                                                    <label class="form-label text-primary mx-2">TO

                                                    </label>
                                                    <input type="date" class="form-control" name='To'
                                                        value={editLeave.To}

                                                    />
                                                </div>
                                            </div>

                                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                                <div class="mb-3 needs-validation" novalidate>
                                                    <label class="form-label text-primary mx-2">Reason

                                                    </label>
                                                    <select className='form-select' name='Reason'

                                                        value={editLeave.Reason}
                                                    >


                                                        {LeaveTypeList.map((list) => {
                                                            return <option value={list.leaveType}

                                                            > {list.leaveType}</option>
                                                        })}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">Status </label>


                                                    <select className='form-select' name='status'
                                                        value={editLeave.status}
                                                        onChange={(e) => HandleChange(e, "status")}>
                                                        {LeaveStatusList.map((list) => {
                                                            return <option className='text-danger'

                                                            > {list.leaveStatus}</option>
                                                        })}



                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </ModalBody>
                        <ModalFooter> <button onClick={() => submit()} >submit</button></ModalFooter>
                    </Modal>

                </div>
            </div> */}
               <div class="container-fluid mt-3 bg1  ">
               
                    <div className=' d-sm-flex justify-content-between align-items-center mb-4'>
                        <h2 className='h3 mb-0 text-gray-800'>Leave Data</h2>
                        <div>
                            {user?.role === "admin" ?"" : <button className='btn btn-sm btn btn-primary' onClick={() => navigate('/leave/form')}>Apply Leave</button>
                            }


                        </div>
                    </div>




                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">leave details</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="dataTable" width="100%" cellspacing="0">

                                    <thead className='text-uppercase text-primary'>
                                    <tr>
                                            <th scope="col">S.no</th>

                                            {user?.role === "admin" && <th scope='col'>Profile</th>
                                            }
                                            {user?.role === "admin" &&
                                                <th scope='col'>Name</th>
                                            }



                                            <th scope='col'>From_Date</th>
                                            <th scope="col">To_Date</th>
                                            <th scope="col">Reason</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Status</th>

                                            <th scope="col">Actions</th>


                                        </tr>
                                    </thead>

                                    <tbody>
                                    {LeaveList.length > 0 && LeaveList?.map((list, index) => {
                                            return <tr >
                                                <td scope="row">{index + 1}</td>
                                                {user?.role === "admin" &&
                                                    <td><img className='' height={"62px"} src={list?.Image} /></td>}
                                                {user?.role === "admin" && <td>{list.client}</td>
                                                }

                                                <td>{list.From}</td>
                                                <td>{list.To}</td>
                                                <td>{list.Reason}</td>
                                                <td>{list.Description}</td>
                                                <td className={`${list.status === "Approved" ? 'text-success' : 'text-danger'}`}>{list?.status}</td>

                                                <td>

                                                    {user?.role === "admin" ?
                                                        <button className=" btn btn-sm mx-1" onClick={() => leavestatus(list)} ><i class="fa fa-pencil" aria-hidden="true"></i></button>


                                                        :

                                                        <button className='btn btn-sm text-danger mx-1 ' onClick={() => removeLeave(list)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    }



                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
              
                <Modal isOpen={statusmodal} toggle={() => setstatusmodal(!statusmodal)} size='lg'>
                        <ModalHeader toggle={() => setstatusmodal(!statusmodal)}>  <h1>leave status Actions</h1></ModalHeader>
                        <ModalBody>

                            <div className='container'>
                                <div className='card shadow '>

                                    <div className='card-body '>
                                      
                                        <div className='row'>
                                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                                <div class="mb-3 needs-validation" novalidate>
                                                    <label class="form-label text-primary mx-2">From

                                                    </label>
                                                    <input type="date" class="form-control" name='From'
                                                        value={editLeave.From}

                                                    />
                                                </div>
                                            </div>

                                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                                <div class="mb-3 needs-validation" novalidate>
                                                    <label class="form-label text-primary mx-2">TO

                                                    </label>
                                                    <input type="date" class="form-control" name='To'
                                                        value={editLeave.To}

                                                    />
                                                </div>
                                            </div>

                                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                                <div class="mb-3 needs-validation" novalidate>
                                                    <label class="form-label text-primary mx-2">Reason

                                                    </label>
                                                    <select className='form-control form-select' name='Reason'

                                                        value={editLeave.Reason}
                                                    >


                                                        {LeaveTypeList.map((list) => {
                                                            return <option value={list.leaveType}

                                                            > {list.leaveType}</option>
                                                        })}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">Status </label>


                                                    <select className='form-select form-control' name='status'
                                                        value={editLeave.status}
                                                        onChange={(e) => HandleChange(e, "status")}>
                                                        {LeaveStatusList.map((list) => {
                                                            return <option className='text-danger'

                                                            > {list.leaveStatus}</option>
                                                        })}



                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </ModalBody>
                        <div> <button  className='btn btn btn btn-success mx-5 mb-2'onClick={() => submit()} >submit</button></div>
                    </Modal>

            </div>
        </Layout >
    )
}
export default Leave
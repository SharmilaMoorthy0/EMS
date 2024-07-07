import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios, { Axios } from 'axios'
import toast from 'react-hot-toast'
import './salary.css'

function Salary() {
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('userData'))
    const [salaryModal, setsalaryModal] = useState(false)
    const [salaryList, setsalaryList] = useState([])
    const [EditModal, setEditModal] = useState(false)
    const [EditSalary, setEditSalary] = useState({})


    const getSalarylist = () => {
        let url = ""
        if (user?.role === "admin") {
            url = "http://localhost:4000/all/salary/admin"
        }
        else {
            url = "http://localhost:4000/all/salary"
        }
        axios.get(url,
            {
                headers: {
                    Authorization: localStorage.getItem("myapptoken")
                }
            }
        ).then((res) => {
            if (res.data.status === 1) {
                setsalaryList(res.data.response)
            }

        }).catch((err) => { console.log(err) })
    }
    useEffect(() => {
        getSalarylist()
    }, [])

    const editToggle = (data) => {
        setEditModal(!EditModal)
        setEditSalary(data)
    }
    const HandleChange = (e, name) => {
        setEditSalary({ ...EditSalary, [name]: e.target.value })
    }

    const UpdateSubmit = (id) => {
        axios.put(`http://localhost:4000/update/salary/${EditSalary._id}`, EditSalary, {
            headers: {
                Authorization: localStorage.getItem("myapptoken")
            }
        }

        ).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                setEditModal(false)
                setEditSalary({})
                getSalarylist()
            }
            if (res.data.status === 0) {
                toast.error(res.data.message)
            }

        }).catch((err) => { console.log(err) })
    }

    const removeSalary = (id) => {
        axios.delete(`http://localhost:4000/Delete/salary/${id}`).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                getSalarylist()
            }
            if (res.data.status === 0) {
                toast.error(res.data.message)

            }

        }).catch((err) => { console.log(err) })
    }
    return (
        <Layout>
            {/* <body>
            <div className='container-fluid bg1'>
                <div className='container mt-5 w-75'>
                    <div className=' d-sm-flex justify-content-between align-items-center mb-4'>
                        <h2 className='h3 mb-0 text-secondary'>Salary Status</h2>
                        <div>
                            {user?.role === "admin" && <button className='btn btn-sm btn btn-primary' onClick={() => navigate('/salary/form')}>Create Salary +</button>
                            }


                        </div>
                    </div>
                    <div className='card shadow mb-4 '>
                    <div className="card-header">
                            <h6 className='text-secondary'>Salary Data</h6>
                        </div>
                        <div className='card-body text-center'>

                            <div className='table-responsive' >
                                <table  className='table table-bordered ' style={{ width: "100%" }}>
                                    <thead className='  text-uppercase '>
                                        <tr>
                                            <td scope="col">S.no</td>
                                           

                                            {user.role === "admin" && <td scope='col'>Email</td>
                                            }
                                            <td scope="col">BaseSalary</td>
                                            <td scope="col">Bonus</td>
                                            <td scope="col">TotalSalary</td>
                                            {user?.role === "admin" && <td scope="col">Action</td>
                                            }

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salaryList.length > 0 && salaryList?.map((list, index) => {
                                            return <tr>
                                                <td scope="row">{index + 1}</td>
                                               
                                                {user?.role === "admin" && <td>{list.Email}</td>}

                                                <td>{list.BaseSalary}</td>
                                                <td>{list.Bonus}%</td>
                                                <td>{list.TotalSalary}</td>
                                                {user?.role === "admin" && <td>

                                                    <button className='btn btn-sm text-secondary mx-2' onClick={() => editToggle(list)} > <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                    <button className="btn btn-sm text-danger mx-2" onClick={() => removeSalary(list._id)} ><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                </td>}

                                            </tr>
                                        })}
                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>

                    <Modal isOpen={EditModal} toggle={() => setEditModal(!EditModal)}>
                        <ModalHeader toggle={() => setEditModal(!EditModal)}>Edit Salary Details</ModalHeader>
                        <ModalBody>
                            <div className='row mt-5'>
                                <div className='col-sm-12 col-md-12 col-sm-12'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">
                                            Email
                                        </label>
                                        <input type="text" class="form-control" name='Email'
                                            value={EditSalary.Email}
                                            onChange={(e) => HandleChange(e, "Email")}
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-12 col-md-12 col-sm-12'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">BaseSalary

                                        </label>
                                        <input type="number" class="form-control" name='BaseSalary'
                                            value={EditSalary.BaseSalary}
                                            onChange={(e) => HandleChange(e, "BaseSalary")}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-12 col-sm-12'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">Bonus

                                        </label>
                                        <input type="number" class="form-control" name='Bonus'
                                            value={EditSalary.Bonus}
                                            onChange={(e) => HandleChange(e, "Bonus")}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-12 col-sm-12'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">TotalSalary

                                        </label>
                                        <input type="number" class="form-control" name='TotalSalary'
                                            value={EditSalary.TotalSalary}
                                            onChange={(e) => HandleChange(e, "TotalSalary")}
                                        />
                                    </div>
                                </div>

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={() => UpdateSubmit()} >Update</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
            </body> */}
            <div class="container-fluid mt-3 w-75 bg1 ">
               
                    <div className=' d-sm-flex justify-content-between align-items-center mb-4'>
                        <h2 className='h3 mb-0 text-gray-800'>Salary Status</h2>
                        <div>
                            {user?.role === "admin" && <button className='btn btn-sm btn btn-primary' onClick={() => navigate('/salary/form')}>Create Salary +</button>
                            }


                        </div>
                    </div>




                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">SalaryList</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered align-items-center" id="dataTable" width="100%" cellspacing="0">

                                    <thead className='text-uppercase text-primary'>
                                        <tr className=''>

                                            <th scope="col">S.no</th>


                                            {user.role === "admin" && <th scope='col'>Email</th>
                                            }
                                            <th scope="col">BaseSalary</th>
                                            <th scope="col">Bonus</th>
                                            <th scope="col">TotalSalary</th>
                                            {user?.role === "admin" && <th scope="col">Action</th>
                                            }

                                        </tr>

                                    </thead>

                                    <tbody>
                                        {salaryList.length > 0 && salaryList?.map((list, index) => {
                                            return <tr>
                                                <td scope="row">{index + 1}</td>

                                                {user?.role === "admin" && <td>{list.Email}</td>}

                                                <td>{list.BaseSalary}</td>
                                                <td>{list.Bonus}%</td>
                                                <td>{list.TotalSalary}</td>
                                                {user?.role === "admin" && <td>

                                                    <button className='btn btn-sm text-secondary mx-2' onClick={() => editToggle(list)} > <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                    <button className="btn btn-sm text-danger mx-2" onClick={() => removeSalary(list._id)} ><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                </td>}

                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
              
                <Modal isOpen={EditModal} toggle={() => setEditModal(!EditModal)}>
                    <ModalHeader toggle={() => setEditModal(!EditModal)}>Edit Salary Details</ModalHeader>
                    <ModalBody>
                        <div className='row mt-5'>
                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                <div class="mb-3 needs-validation" novalidate>
                                    <label class="form-label text-primary mx-2">
                                        Email
                                    </label>
                                    <input type="text" class="form-control" name='Email'
                                        value={EditSalary.Email}
                                        onChange={(e) => HandleChange(e, "Email")}
                                    />
                                </div>
                            </div>

                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                <div class="mb-3 needs-validation" novalidate>
                                    <label class="form-label text-primary mx-2">BaseSalary

                                    </label>
                                    <input type="number" class="form-control" name='BaseSalary'
                                        value={EditSalary.BaseSalary}
                                        onChange={(e) => HandleChange(e, "BaseSalary")}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                <div class="mb-3 needs-validation" novalidate>
                                    <label class="form-label text-primary mx-2">Bonus

                                    </label>
                                    <input type="number" class="form-control" name='Bonus'
                                        value={EditSalary.Bonus}
                                        onChange={(e) => HandleChange(e, "Bonus")}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-12 col-sm-12'>
                                <div class="mb-3 needs-validation" novalidate>
                                    <label class="form-label text-primary mx-2">TotalSalary

                                    </label>
                                    <input type="number" class="form-control" name='TotalSalary'
                                        value={EditSalary.TotalSalary}
                                        onChange={(e) => HandleChange(e, "TotalSalary")}
                                    />
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <div>
                        <button className='btn btn-sm btn btn-success mx-5 mb-2' onClick={() => UpdateSubmit()} >Update</button>
                    </div>
                </Modal>
            </div>
            
        </Layout>
    )
}

export default Salary
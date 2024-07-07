import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import toast from 'react-hot-toast'

function Password() {
    let token = localStorage.getItem('myapptoken')
    let user = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()
    const [Employelist, setEmployelist] = useState([])

    const [isEdit, setisEdit] = useState(false)
    const [loading, setloading] = useState(false)
    const [showpassword, setshowpassword] = useState()
    const [editEmployeDetail, seteditEmployeDetail] = useState({})



    const getEmployelist = () => {
        let url = ""
        if (user?.role === "admin") {
            url = "http://localhost:4000/all/employe/admin"
        }
        else {
            url = "http://localhost:4000/all/employe"
        }
        axios.get(url,
            {
                headers: {
                    Authorization: localStorage.getItem("myapptoken")
                }
            }
        ).then((res) => {
            if (res.data.status === 1) {
                setloading(false)

                setEmployelist(res.data.response)
            }

        }).catch((err) => { console.log(err) })
    }
    useEffect(() => {
        getEmployelist()
    }, [])
    const edittoggle = (data) => {
        setisEdit(!isEdit)
        seteditEmployeDetail(data)
    }
    const handlechange = (event, name) => {
        seteditEmployeDetail({ ...editEmployeDetail, [name]: event.target.value })
    }
    const handleUpdateEmploye = () => {
        toast.loading("Updating...")
        console.log(editEmployeDetail)
        axios.put(`http://localhost:4000/update/employe/${editEmployeDetail._id}`, editEmployeDetail, {
            headers: {
                Authorization: localStorage.getItem("myapptoken")
            }
        }
        )
            .then((res) => {
                if (res.data.status === 1) {
                    toast.remove()
                    toast.success(res.data.message)

                    setisEdit(false)
                    getEmployelist()

                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)
                }

            }).catch((err) => { console.log(err) })
    }
   
    return (
        <Layout>
            <div className='container-fluid '>
                <div className='container bg'>
                    <div className='card shadow w-50 mt-5 '>

                        <div className='card-body '>
                            <div className='row'>
                                {
                                    loading ? <div>loading...</div> : Employelist.map((list) => {
                                        return <> <div className='col-sm-12 col-md-6 col-lg-12'>

                                            <label class="form-label   text-primary">Password

                                            </label>
                                            <div className='input-group mb-3'>
                                                <input type={showpassword ? "text" : "password"} class="form-control"
                                                    value={list.Password}

                                                />
                                                <span class="input-group-text" id="basic-addon2" onClick={() => setshowpassword(!showpassword)} >
                                                    {showpassword ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                                                </span>
                                            </div>

                                        </div>





                                            <div className="my-2">
                                                <button className="btn btn-sm btn btn-success mx-2" onClick={() => edittoggle(list)} >Change</button>

                                            </div>


                                        </>
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <Modal
                        isOpen={isEdit} toggle={() => setisEdit(!isEdit)} size='md'>
                        <ModalHeader toggle={() => setisEdit(!isEdit)}></ModalHeader>
                        <ModalBody>
                            <div className='row'>
                                {
                                    loading ? <div>Loading...</div> : Employelist.map((list) => {
                                        return <>  <div className='col-sm-12 col-md-12 col-lg-12'>

                                            <label class="form-label  text-primary ">Password

                                            </label>
                                            <div className='input-group mb-3'>
                                                <input type={showpassword ? "text" : "password"} class="form-control"
                                                    value={editEmployeDetail?.Password}
                                                    onChange={(event) => handlechange(event, "Password")}
                                                />
                                                <span class="input-group-text" id="basic-addon2" onClick={() => setshowpassword(!showpassword)} >
                                                    {showpassword ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                                                </span>
                                            </div>

                                        </div>
                                        </>


                                    })
                                }

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-success' onClick={() => handleUpdateEmploye()}>Update</button>
                        </ModalFooter>
                    </Modal>

                </div>

            </div>
        </Layout>
    )
}

export default Password
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import Layout from '../layout/Layout'
import { Genderoption } from '../Form'
import Select from 'react-select'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
export const Categoryoption = [
    { value: "Designer", label: "Designer" },
    { value: "Management", label: "Management" },
    { value: "Developer", label: "Developer" },
    { value: "IT", label: "IT" },
    { value: "Medical Coding", label: "Medical Coding" }
]

function Profile() {
    let token = localStorage.getItem('myapptoken')
    let user = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()
    const params = useParams()
    const [EmployeDetails, setEmployeDetails] = useState({})
    const [Employelist, setEmployelist] = useState([])
    const [isEdit, setisEdit] = useState(false)
    const [view, setview] = useState(false)
    const [editEmployeDetail, seteditEmployeDetail] = useState({})

    const [profile, setprofile] = useState([])
    const [loading, setloading] = useState(false)
    const [categoryList, setcategoryList] = useState([])
    const [Category, setCategory] = useState("")
    const [Gender, setGender] = useState("")
    const [showpassword, setshowpassword] = useState()



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








    const editToggle = (data) => {
        seteditEmployeDetail(data)
        setisEdit(!isEdit)
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
    const getlist = () => {
        axios.get("http://localhost:4000/all/category"

        ).then((res) => {
            if (res.data.status === 1) {
                setcategoryList(res.data.response)
            }

        }).catch((err) => { console.log(err) })
    }
    useEffect(() => {
        getlist()
    }, [])
    return (
        <Layout>
            <div className='container-fluid'>
                <div className='container  bg'>
                  
                    <div className='row mt-5'>

                        {
                            loading ? <div>Loading...</div> : Employelist.map((list) => {
                                return <> <div className='col-sm-12 col-md-6 col-lg-6'>

                                    <div class="mb-3">
                                        <label class="form-label   text-primary">FirstName</label>
                                        <input type="text" class="form-control"
                                            value={list.FirstName}

                                        />
                                    </div>
                                </div>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                        <div class="mb-3">
                                            <label class="form-label   text-primary">LastName</label>
                                            <input type="text" class="form-control"
                                                value={list.LastName}

                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                        <div class="mb-3">
                                            <label class="form-label   text-primary">Email</label>
                                            <input type="text" class="form-control"
                                                value={list.Email}

                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-sm-6'>

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

                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                        <div class="mb-3">
                                            <label class="form-label   text-primary">Mobile</label>
                                            <input type="text" class="form-control"
                                                value={list.Mobile}

                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                        <div class="mb-3">
                                            <label class="form-label   text-primary">Date Of Birth</label>
                                            <input type="text" class="form-control"
                                                value={list.DateOfBirth}

                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                        <div class="mb-3">
                                            <label class="form-label   text-primary">DateOfJoining</label>
                                            <input type="date" class="form-control"
                                                value={list.DateOfJoining}

                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                        <div class="mb-3">
                                            <label class="form-label   text-primary">Category</label>

                                            <input type="text" class="form-control"
                                                value={list.Category}

                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                        <div class="mb-3">
                                            <label class="form-label   text-primary">Gender</label>

                                            <input type="text" class="form-control"
                                                value={list.Gender}

                                            />
                                        </div>
                                    </div>




                                    <div className="my-2">
                                        <button className="btn btn-sm btn btn-success mx-2" onClick={() => editToggle(list)} >Edit</button>

                                    </div>


                                </>
                            })
                        }
                    </div>

                    <Modal isOpen={isEdit} toggle={() => setisEdit(!isEdit)} size='lg'>
                        <ModalHeader toggle={() => setisEdit(!isEdit)}>Edit Profile</ModalHeader>
                        <ModalBody>
                            <div className='row'>
                                {
                                    loading ? <div>Loading...</div> : Employelist.map((list) => {
                                        return <>  <div className='col-sm-12 col-md-6 col-lg-6'>

                                            <div class="mb-3">
                                                <label class="form-label  text-primary">FirstName</label>
                                                <input type="text" class="form-control"
                                                    value={editEmployeDetail.FirstName}
                                                    onChange={(event) => handlechange(event, "FirstName")}
                                                />
                                            </div>
                                        </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">LastName</label>
                                                    <input type="text" class="form-control"
                                                        value={editEmployeDetail.LastName}
                                                        onChange={(event) => handlechange(event, "LastName")}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">Email</label>
                                                    <input type="text" class="form-control"
                                                        value={editEmployeDetail.Email}
                                                        onChange={(event) => handlechange(event, "Email")}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>

                                                <label class="form-label  text-primary">Password

                                                </label>
                                                <div className='input-group mb-3'>
                                                    <input type={showpassword ? "text" : "password"} class="form-control"
                                                        value={editEmployeDetail.Password}
                                                        onChange={(event) => handlechange(event, "Password")}
                                                    />
                                                    <span class="input-group-text" id="basic-addon2" onClick={() => setshowpassword(!showpassword)} >
                                                        {showpassword ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                                                    </span>
                                                </div>

                                            </div>

                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">Mobile</label>
                                                    <input type="text" class="form-control"
                                                        value={editEmployeDetail.Mobile}
                                                        onChange={(event) => handlechange(event, "Mobile")}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">Date Of Birth</label>
                                                    <input type="date" class="form-control"
                                                        value={editEmployeDetail.DateOfBirth}
                                                        onChange={(event) => handlechange(event, "DateOfBirth")}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">DateOfJoining</label>
                                                    <input type="date" class="form-control"
                                                        value={editEmployeDetail.DateOfJoining}
                                                        onChange={(event) => handlechange(event, "DateOfJoining")}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">Category </label>


                                                    <select className='form-select' name='Category'
                                                        value={editEmployeDetail.Category}
                                                        onChange={(e) => handlechange(e, "Category")}>
                                                        {categoryList.map((list) => {
                                                            return <option

                                                            > {list.category}</option>
                                                        })}



                                                    </select>
                                                </div>

                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                                <div class="mb-3">
                                                    <label class="form-label  text-primary">Gender

                                                    </label>
                                                    <Select options={Genderoption}

                                                        value={Genderoption.filter((list) => list.value === editEmployeDetail.Gender)}
                                                        onChange={(op) => seteditEmployeDetail({ ...editEmployeDetail, Gender: op.value })}
                                                    />
                                                </div>

                                            </div>

                                           
                                        </>
                                    })
                                }

                            </div>
                        </ModalBody>
                        <div>
                        <button className='btn btn-success mx-2 my-2' onClick={() => handleUpdateEmploye()}>Update</button>
                        </div>
                    </Modal>



                </div>
            </div>

        </Layout >
    )
}
export default Profile
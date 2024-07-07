import axios from 'axios'
import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import './form.css'
import Layout from './layout/Layout'

export const Genderoption = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "TransGender", label: "Transgender" },

]
export const Categoryoption = [
    { value: "Designer", label: "Designer" },
    { value: "Management", label: "Management" },
    { value: "Developer", label: "Developer" },
    { value: "IT", label: "IT" },
    { value: "Medical Coding", label: "Medical Coding" }
]

function Form() {
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('userData'))
    const [Image, setImage] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Mobile, setMobile] = useState("")
    const [DateOfBirth, setDateOfBirth] = useState("")
    const [DateOfJoining, setDateOfJoining] = useState("")
    const [Gender, setGender] = useState("")
    const [Category, setCategory] = useState("")
    const [categoryList, setcategoryList] = useState([])
    const [Age, setAge] = useState("")
    const [showpassword, setshowpassword] = useState()





    const [Employelist, setEmployelist] = useState([])

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
    const validateEmail = (Email) => {
        let result = /^([A-Za-z0-9\.])+\@([A-Za-z0-9])+\.([A-Za-z]{2,4})$/;
        return result.test(Email)
    }





    const handlesubmit = () => {


        if (FirstName === "") {
            return toast.error("FirstName is required")
        }
        if (FirstName.length < 4) {
            return toast.error("minium length 8 ")
        }
        if (LastName === "") {
            return toast.error("LastName is required")
        }

        if (Email === "") {
            return toast.error("Email is required")
        }
        if (!validateEmail(Email)) {

            return toast.error("invalid email")
        }
        if (Password === "") {
            return toast.error("Password is required")
        }
        if (Mobile === "") {
            return toast.error("Mobile is required")
        }
        if (Mobile.length < 9) {
            return toast.error("Must contain 10 Digits")

        }
        if (Age === "") {
            return toast.error("Age is required")

        }
        if (DateOfBirth === "") {
            return toast.error("DateOfBirth is required")
        }
        if (DateOfJoining === "") {
            return toast.error("DateOfJoining is required")
        }
        if (Category === "") {
            return toast.error("Any one Category is required")
        }
        if (Gender === "") {
            return toast.error("Any one Gender is required")
        }

        axios.post("https://management-backend-hu4p.onrender.com/new/employe", { Image, FirstName, LastName, Email, Password, Mobile, Age, DateOfBirth, DateOfJoining, Category, Gender }

        )
            .then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)
                    navigate('/employe')
                    setEmployelist([...Employelist, Age, Image, FirstName, LastName, Email, Password, Mobile, DateOfBirth, DateOfJoining, Category, Gender])
                    setImage("")
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setPassword("")
                    setMobile("")
                    setDateOfBirth("")
                    setDateOfJoining("")
                    setCategory("")
                    setGender("")
                    setAge("")

                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)
                }
            }).catch((error) => { console.log(error) })



    }

    const uploadImage = (e) => {
        console.log(e)

        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("error:", error)
        }
    }






    return (
        <Layout>
            {/* <div className='container-fluid bg'>

                <div className='card shadow  w-100  '>

                    <div className='card-body '>
                        <h1 className='text-center text-dark '>Registration Info</h1>


                        <div className='row' >
                                
                            
   
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">FirstName

                                        </label>
                                        <input type="text" class="form-control" 
                                            value={FirstName}
                                            onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">LastName

                                        </label>
                                        <input type="text" class="form-control" value={LastName}
                                            onChange={(e) => setLastName(e.target.value)} />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Email

                                        </label>
                                        <input type="email" class="form-control" value={Email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className='col-sm-12 col-md-6 col-lg-6'>

                                    <label class="form-label  text-primary">Password

                                    </label>
                                    <div className='input-group mb-3'>
                                        <input type={showpassword ? "text" : "password"} class="form-control" value={Password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />
                                        <span class="input-group-text" id="basic-addon2" onClick={() => setshowpassword(!showpassword)} >
                                            {showpassword ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                                        </span>
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Mobile

                                        </label>
                                        <input type="number" class="form-control" value={Mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Age

                                        </label>
                                        <input type="number" class="form-control" value={Age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Date of Birth

                                        </label>
                                        <input type="date" class="form-control" value={DateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Date of Joining

                                        </label>
                                        <input type="date" class="form-control" value={DateOfJoining}
                                            onChange={(e) => setDateOfJoining(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Category </label>


                                        <select className='form-select' name='Category'
                                            onChange={(e) => setCategory(e.target.value)}>

                                            {categoryList.map((list) => {
                                                return <option value={list.category}

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
                                          
                                            onChange={(op) => setGender(op.value)} />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label text-primary">Image

                                        </label>
                                        <input type="file" class="form-control" 

                                            onChange={(e) => uploadImage(e)} />
                                        {Image == "" || Image == null ? "" : <img width={"100"} height={"100"} src={Image} />}
                                    </div>
                                </div>











                            </div>
                       
                            
                            <input type="submit" onClick={() => handlesubmit()} class="input-submit" />       

                    </div>
                </div>
            </div> */}
            <div className='container-fluid w-100  '>
                <div className='container bg w-75'>
                    <div className='card shadow w-100 '>

                        <div className='card-body '>
                            <h1 className='text-center text-primary'>Registration</h1>


                            <div className='row '>


                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">FirstName

                                        </label>
                                        <input type="text" class="form-control"
                                            value={FirstName}
                                            onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">LastName

                                        </label>
                                        <input type="text" class="form-control" value={LastName}
                                            onChange={(e) => setLastName(e.target.value)} />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Email

                                        </label>
                                        <input type="email" class="form-control" value={Email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className='col-sm-12 col-md-6 col-lg-6'>

                                    <label class="form-label  text-primary">Password

                                    </label>
                                    <div className='input-group mb-3'>
                                        <input type={showpassword ? "text" : "password"} class="form-control" value={Password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />
                                        <span class="input-group-text" id="basic-addon2" onClick={() => setshowpassword(!showpassword)} >
                                            {showpassword ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                                        </span>
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Mobile

                                        </label>
                                        <input type="number" class="form-control" value={Mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Age

                                        </label>
                                        <input type="number" class="form-control" value={Age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Date of Birth

                                        </label>
                                        <input type="date" class="form-control" value={DateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Date of Joining

                                        </label>
                                        <input type="date" class="form-control" value={DateOfJoining}
                                            onChange={(e) => setDateOfJoining(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label  text-primary">Category </label>


                                        <select className='form-select form-control' name='Category'
                                            onChange={(e) => setCategory(e.target.value)}>

                                            {categoryList.map((list) => {
                                                return <option value={list.category}

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

                                            onChange={(op) => setGender(op.value)} />
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-6 col-lg-6'>
                                    <div class="mb-3">
                                        <label class="form-label text-primary">Image

                                        </label>
                                        <input type="file" class="form-control"

                                            onChange={(e) => uploadImage(e)} />
                                        {Image == "" || Image == null ? "" : <img width={"100"} height={"100"} src={Image} />}
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
        </Layout >


    )
}


export default Form


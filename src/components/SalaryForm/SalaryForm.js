import React, { useState } from 'react'
import Layout from '../layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SalaryForm() {
    const navigate = useNavigate()
    const [salaryList, setsalaryList] = useState([])
    const [Salary, setSalary] = useState({
        Email: "",
        BaseSalary: "",
        Bonus: "",
        TotalSalary: ""

    })
    const handleChange = (e, name) => {
        setSalary({ ...Salary, [name]: e.target.value })
    }
    const handleSubmit = () => {
        axios.post("https://management-backend-hu4p.onrender.com/new/salary", Salary, {
            headers: {
                Authorization: localStorage.getItem("myapptoken")
            }
        }
        ).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                setsalaryList({ ...salaryList, Salary })
                setSalary({
                    Email: "",
                    BaseSalary: "",
                    Bonus: "",
                    TotalSalary: ""
                })
                navigate('/salary')
            }
            if (res.data.status === 0) {
                toast.success(res.data.message)
            }
        }).catch((err) => { console.log(err) })
    }
    return (
        <Layout>
            <div className='container-fluid '>
                <div className='container bg w-100'>
                    <div className='card shadow w-100 mt-5 '>

                        <div className='card-body '>
                            <h1 className='text-center text-primary'>Create Salary For Employee </h1>
                            

                            <div className='row mt-5'>
                                <div className='col-sm-12 col-md-12 col-lg-6'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">
                                            Email
                                        </label>
                                        <input type="text"  className='form-control' name='Email' 
                                            value={Salary.Email}
                                            onChange={(e) => handleChange(e, "Email")}
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-12 col-md-12 col-lg-6'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">BaseSalary

                                        </label>
                                        <input type="number" className='form-control' name='BaseSalary'
                                            value={Salary.BaseSalary}
                                            onChange={(e) => handleChange(e, "BaseSalary")}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">Bonus

                                        </label>
                                        <input type="number"className='form-control' name='Bonus'
                                            value={Salary.Bonus}
                                            onChange={(e) => handleChange(e, "Bonus")}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-6'>
                                    <div class="mb-3 needs-validation" novalidate>
                                        <label class="form-label text-primary mx-2">TotalSalary

                                        </label>
                                        <input type="number"   className='form-control' name='TotalSalary'
                                            value={Salary.TotalSalary}
                                            onChange={(e) => handleChange(e, "TotalSalary")}
                                        />
                                    </div>
                                </div>
                                <div className='text-start'>
                                    <button className='btn btn-sm btn btn-success' onClick={() => handleSubmit()}>submit</button>
                                </div>
                              

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default SalaryForm
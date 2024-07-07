import axios from 'axios'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import swal from 'sweetalert'
import Select from 'react-select'
import { Link, useParams } from 'react-router-dom'
import './employe.css'
import { Categoryoption, Genderoption, } from '../Form'
import DataTable from 'react-data-table-component'
import Layout from '../layout/Layout'
import Pagination from 'react-js-pagination'
import ResponsivePagination from 'react-responsive-pagination';


function Employe() {
  const [loading, setLoading] = useState(false)
  let token = localStorage.getItem('myapptoken')
  let user = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate()
  const params = useParams()
  const [EmployeDetails, setEmployeDetails] = useState({})
  const [categoryList, setcategoryList] = useState([])
  const [Employelist, setEmployelist] = useState([])
  const [isEdit, setisEdit] = useState(false)
  const [view, setview] = useState(false)
  const [editEmployeDetail, seteditEmployeDetail] = useState({})
  const [showpassword, setshowpassword] = useState()

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;
  const LastIndex = currentPage * totalPages
  const FirstIndex = LastIndex - totalPages
  const records = Employelist.slice(FirstIndex, LastIndex)
  const npage = Math.ceil(Employelist.lengtd / totalPages)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    axios.post("https://localhost:4000/employe/search", { query: searchQuery },

    )
      .then((res) => {
        setLoading(false);
        setSearchResults(res.data.response);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error('Error searching products');
      });
  };

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
          Autdorization: localStorage.getItem("myapptoken")
        }
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setEmployelist(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getEmployelist()
  }, [])




  const removeEmploye = (list) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure tdat you want to delete tdis Employe ${list.FirstName} ${list.LastName}?`,
      icon: "warning",
      dangerMode: true,
      buttons: true


    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4000/Delete/employe/${list._id}`,
          {
            headers: {
              Autdorization: localStorage.getItem("myapptoken")
            }
          }
        ).then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.message)
            getEmployelist()
          }
          if (res.data.status === 0) {
            toast.success(res.data.message)
          }

        }).catch((err) => { console.log(err) })
      }
      else {
        swal("your file is safe")
      }

    })

  }




  const editToggle = (data) => {
    seteditEmployeDetail(data)
    setisEdit(!isEdit)
  }

  const ViewToggle = (data) => {
    setEmployeDetails(data)
    setview(!view)
  }

  const handlechange = (event, name) => {
    seteditEmployeDetail({ ...editEmployeDetail, [name]: event.target.value })
  }

  const handleUpdateEmploye = () => {
    toast.loading("Updating...")
    console.log(editEmployeDetail)
    axios.put(`http://localhost:4000/update/employe/${editEmployeDetail._id}`, editEmployeDetail, {
      headers: {
        Autdorization: localStorage.getItem("myapptoken")
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
      <div className='container-fluid  mt-3 bg1'>

        <div className=' d-sm-flex justify-content-between align-items-center mb-4'>
          <h2 className='h3 mb-0 text-gray-800'>Employee Data</h2>
          <div>
            {user?.role === "admin" && <button className='btn btn-sm btn btn-primary' onClick={() => navigate('/form')}>Create Employe +</button>
            }


          </div>
        </div>




        <div class="card shadow mb-4">
          <div class="card-header d-flex justify-content-between text-center py-3">
            <h6 class="m-0 font-weight-bold text-primary">Employe Details</h6>
            <div className='text-end d-flex justify-content-center'>
              <label className='mx-2'>Search:</label>
              <div className='d-flex justify-content-between'>
                <input type="text"
                  className="form-control"


                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}

                />
                <a className="btn btn-sm login" onClick={handleSearch}>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </a>

              </div>
            </div>
          </div>



          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered align-items-center" id="dataTable" width="100%" cellspacing="0">

                <thead className='text-uppercase '>


                  <tr className='text-center'>
                    <th>S.NO</th>
                    <th>Profile</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>



                </thead>

                <tbody>
                  {Employelist && Employelist?.map((list, index) => {
                    return <tr className='text-center'>
                      <td>{index + 1}</td>
                      <td><img className='' height={"62px"} src={list?.Image} /></td>
                      <td>{list?.FirstName}</td>
                      <td>{list?.LastName}</td>
                      <td>{list.Email}</td>
                      <td>{list.Password}</td>
                      <td>{list?.Age}</td>
                      <td>{list?.Gender}</td>
                      <td>{list.Category}</td>
                      <td>
                        <a className='mx-2 text-primary' onClick={() => ViewToggle(list)}><i class="fa fa-eye" aria-hidden="true"></i> </a>
                        <a className='mx-2 text-success' onClick={() => editToggle(list)}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                        <a className='mx-2 text-danger' onClick={() => removeEmploye(list)}> <i class="fa fa-trash-o" aria-hidden="true"></i> </a>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal isOpen={isEdit} size='lg' centered>
          <ModalHeader toggle={() => setisEdit(!isEdit)}>Edit Employe</ModalHeader>
          <ModalBody>
            <div className='container'>
              <div className='row '>


                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">FirstName</label>
                    <input type="text" class="form-control"
                      value={editEmployeDetail.FirstName}
                      onChange={(event) => handlechange(event, "FirstName")}
                    />
                  </div>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">LastName</label>
                    <input type="text" class="form-control"
                      value={editEmployeDetail.LastName}
                      onChange={(event) => handlechange(event, "LastName")}
                    />
                  </div>
                </div>

                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">Email</label>
                    <input type="email" class="form-control"
                      value={editEmployeDetail.Email}
                      onChange={(event) => handlechange(event, "Email")}
                    />
                  </div>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>

                  <label class="form-label text-primary ">Password

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
                    <label class="form-label text-primary">Mobile</label>
                    <input type="number" class="form-control"
                      value={editEmployeDetail.Mobile}
                      onChange={(event) => handlechange(event, "Mobile")}
                    />
                  </div>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">Age</label>
                    <input type="number" class="form-control"
                      value={editEmployeDetail.Age}
                      onChange={(event) => handlechange(event, "Age")}
                    />
                  </div>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">Date Of Birtd</label>
                    <input type="date" class="form-control"
                      value={editEmployeDetail.DateOfBirth}
                      onChange={(event) => handlechange(event, "DateOfBirth")}
                    />
                  </div>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">Date Of Joining</label>
                    <input type="date" class="form-control"
                      value={editEmployeDetail.DateOfJoining}
                      onChange={(event) => handlechange(event, "DateOfJoining")}
                    />
                  </div>
                </div>

                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">Category</label>
                    <select className='form-select' name='Category'
                      value={editEmployeDetail.Category}
                      onChange={(e) => handlechange(e, "Category")}>
                      {categoryList.map((list) => {
                        return <option value={list.category}

                        > {list.category}</option>
                      })}



                    </select>
                  </div>
                </div>

                <div className='col-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">Gender</label>
                    <Select
                      options={Genderoption}
                      value={Genderoption.filter((list) => list.value === editEmployeDetail.Gender)}
                      onChange={(op) => seteditEmployeDetail({ ...editEmployeDetail, Gender: op.value })}
                    />
                  </div>
                </div>





              </div>
            </div>
            <button className='btn btn-sm btn btn-success text-start' onClick={() => handleUpdateEmploye()}>update</button>
          </ModalBody>

        </Modal>

        <Modal className='' isOpen={view} centered>
          <ModalHeader toggle={() => setview(!view)}>Employe Details</ModalHeader>
          <ModalBody>
            <div class="card" style={{ widtd: "30rem" }}>
              <div class="card-body">
                <div className='row'>
                  <div className='col-6'>
                    <h6 class="card-title mb-2 text-body-secondary"><b className='text-primary'>Profile:</b><img className='' height={"62px"} src={EmployeDetails?.Image} /></h6>
                    <h6 class="card-title"><b className='text-primary'>Name:</b>{EmployeDetails.FirstName} {EmployeDetails.LastName}</h6>
                    <h6 class="card-title mb-2 text-body-secondary"><b className='text-primary'>Email:</b>{EmployeDetails.Email}</h6>
                    <h6 class="card-title mb-2 text-body-secondary"> <b className='text-primary'>Password:</b>{EmployeDetails.Password}</h6>
                    <h6 class="card-title mb-2 text-body-secondary "> <b className='text-primary'>Mobile:</b>{EmployeDetails.Mobile}</h6>
                  </div>
                  <div className='col-6'>
                    <h6 class="card-title mb-2 text-body-secondary"> <b className='text-primary'>Age:</b>{EmployeDetails.Age}</h6>
                    <h6 class="card-title mb-2 text-body-secondary"><b className='text-primary'>Category:</b>{EmployeDetails.Category}</h6>
                    <h6 class="card-title mb-2 text-body-secondary"><b className='text-primary'> Gender:</b>{EmployeDetails.Gender}</h6>
                    <h6 class="card-title mb-2 text-body-secondary"><b className='text-primary'>Date Of Birtd:</b>{EmployeDetails.DateOfBirth
                    }</h6>
                    <h6 class="card-title mb-2 text-body-secondary"><b className='text-primary'> Date Of Joining:</b>{EmployeDetails.DateOfJoining}</h6>



                  </div>
                </div>



              </div>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>

      </div >

    </Layout >


  )
}
export default Employe




















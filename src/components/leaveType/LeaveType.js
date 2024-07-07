import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import swal from 'sweetalert'

function LeaveType() {
  const [LeaveTypeList, setLeaveTypeList] = useState([])
  const [leaveModal, setleaveModal] = useState(false)
  const [editmodal, seteditmodal] = useState(false)

  const [editLeave, seteditLeave] = useState({})
  const [LeaveType, setLeaveType] = useState({
    leaveType: ""
  })
  let user = JSON.parse(localStorage.getItem('userData'))
  const createLeaveType = () => {
    if (LeaveType.leaveType === "") {
      toast.error(" LeaveType filled cannot be empty!")
    }
    axios.post("http://localhost:4000/new/leave/type", LeaveType,

    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setleaveModal(false)
        setLeaveType({
          leaveType: ""
        })

        getLeaveTypelist()
      }

      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }

  const edittoggle = (data) => {
    seteditmodal(!editmodal)
    seteditLeave(data)
  }
  const updateLeaveType = () => {
    if (editLeave.leaveType === "") {
      return toast.error(" leaveType filled cannot be empty!")

    }
    axios.put(`http://localhost:4000/update/leave/type/${editLeave._id}`, editLeave

    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        seteditmodal(false)
        seteditLeave({})
        getLeaveTypelist()
      }
      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }
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

  const removeLeaveType = (list) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete this leave Type ${list.leaveType}?`,
      icon: "warning",
      dangerMode: true,
      buttons: true


    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4000/Delete/leave/type/${list._id}`

        ).then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.message)
            getLeaveTypelist()
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
  return (
    <Layout>
      {/* <div className='container-fluid bg1'>
        <div className='container mt-5 w-75'>
          
          <div className='card shadow mb-4 '>
            <div className="card-header d-sm-flex justify-content-between align-items-center mb-4">
              <h6 className='text-secondary '>Leave Data</h6>
              {user?.role == "admin" &&
                <button className='btn btn-sm btn btn-primary px-4 py-1' onClick={() => setleaveModal(!leaveModal)}>  Add+</button>
              }
            </div>
            <div className='card-body  text-center'>

              <div className='table-responsive' id="cart">
                <table class="" style={{ width: "100%" }}>
                  <thead className=' text-uppercase text-light'>
                    <tr>
                      <td scope="col">S.no</td>
                      <td scope='col'>LeaveType</td>

                      <td scope="col">Actions</td>


                    </tr>
                  </thead>
                  <tbody>
                    {LeaveTypeList.length > 0 && LeaveTypeList?.map((list, index) => {
                      return <tr>
                        <td scope="row">{index + 1}</td>
                        <td>{list.leaveType}</td>



                        <td>

                          <button className='btn btn-sm text-dark mx-2' onClick={() => edittoggle(list)} > <i class="fa fa-pencil" aria-hidden="true"></i></button>
                          <button className="btn btn-sm text-danger mx-2" onClick={() => removeLeaveType(list)} ><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>

              </div>
            </div>
          </div>

          <Modal isOpen={leaveModal} toggle={() => setleaveModal(!leaveModal)} size='md'>
            <ModalHeader toggle={() => setleaveModal(!leaveModal)}>Leave Form</ModalHeader>
            <ModalBody>
              <div className='container'>
                <div className='mb-3'>
                  <input type='text' className='form-control' placeholder='enter the category'

                    onChange={(e) => setLeaveType({ ...LeaveType, leaveType: e.target.value })} />

                </div>
                <div>
                  <button className='btn btn-sm btn-outline-success' onClick={() => createLeaveType()}>create</button>
                </div>
              </div>
            </ModalBody>

          </Modal>

          <Modal isOpen={editmodal} toggle={() => seteditmodal(!editmodal)} size='md'>
            <ModalHeader toggle={() => seteditmodal(!editmodal)}></ModalHeader>
            <ModalBody>
              <div className='container'>
                <div className='mb-3'>
                  <input type='text' className='form-control' placeholder='enter the task'
                    value={editLeave?.leaveType}

                    onChange={(e) => seteditLeave({ ...editLeave, leaveType: e.target.value })}
                  />
                </div>
                <div>
                  <button className='btn btn-sm btn-outline-success' onClick={() => updateLeaveType()}>update</button>

                </div>
              </div>

            </ModalBody>

          </Modal>

        </div>
      </div> */}
      <div class="container-fluid ">
        <div className='container bg1 mt-5 w-50'>
          <div className=' d-sm-flex justify-content-between align-items-center mb-4'>
            <h2 className='h3 mb-0 text-gray-800'>Leave Type</h2>
            <div>
              {user?.role === "admin" && <button className='btn btn-sm btn btn-primary' onClick={() => setleaveModal(!leaveModal)}>Create  +</button>
              }


            </div>
          </div>




          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Types</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered text-center" id="dataTable" width="100%" cellspacing="0">

                  <thead className='text-uppercase text-primary'>
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope='col'>LeaveType</th>

                      <th scope="col">Actions</th>


                    </tr>

                  </thead>

                  <tbody>
                    {LeaveTypeList.length > 0 && LeaveTypeList?.map((list, index) => {
                      return <tr>
                        <td scope="row">{index + 1}</td>
                        <td>{list.leaveType}</td>



                        <td>

                          <button className='btn btn-sm text-dark mx-2' onClick={() => edittoggle(list)} > <i class="fa fa-pencil" aria-hidden="true"></i></button>
                          <button className="btn btn-sm text-danger mx-2" onClick={() => removeLeaveType(list)} ><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


        <Modal isOpen={leaveModal} toggle={() => setleaveModal(!leaveModal)} size='md'>
          <ModalHeader toggle={() => setleaveModal(!leaveModal)}>Leave Type Form</ModalHeader>
          <ModalBody>
            <div className='container'>
              <div className='mb-3'>
                <input type='text' className='form-control' placeholder='enter the category'

                  onChange={(e) => setLeaveType({ ...LeaveType, leaveType: e.target.value })} />

              </div>
              <div className='text-start'>
                <button className='btn btn-sm btn btn-success' onClick={() => createLeaveType()}>create</button>
              </div>
            </div>
          </ModalBody>

        </Modal>

        <Modal isOpen={editmodal} toggle={() => seteditmodal(!editmodal)} size='md'>
          <ModalHeader toggle={() => seteditmodal(!editmodal)}>Edit leave Type </ModalHeader>
          <ModalBody>
            <div className='container'>
              <div className='mb-3'>
                <input type='text' className='form-control' placeholder='enter the task'
                  value={editLeave?.leaveType}

                  onChange={(e) => seteditLeave({ ...editLeave, leaveType: e.target.value })}
                />
              </div>
              <div>
                <button className='btn btn-sm  btn btn-success' onClick={() => updateLeaveType()}>update</button>

              </div>
            </div>

          </ModalBody>

        </Modal>
      </div>
    </Layout>
  )
}

export default LeaveType
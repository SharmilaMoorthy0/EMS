import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import swal from 'sweetalert'
import Layout from '../layout/Layout'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

function LeaveStatus() {
  const [LeaveStatusList, setLeaveStatusList] = useState([])
  const [leaveModal, setleaveModal] = useState(false)
  const [editmodal, seteditmodal] = useState(false)

  const [editLeave, seteditLeave] = useState({})
  const [LeaveStatus, setLeaveStatus] = useState({
    leaveStatus: ""
  })
  let user = JSON.parse(localStorage.getItem('userData'))
  const createLeaveStatus = () => {
    if (LeaveStatus.leaveStatus === "") {
      toast.error(" LeaveStatus filled cannot be empty!")
    }
    axios.post("http://localhost:4000/new/leave/Status", LeaveStatus,

    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setleaveModal(false)
        setLeaveStatus({
          leaveStatus: ""
        })

        getLeaveStatuslist()
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
  const updateLeaveStatus = () => {
    if (editLeave.leaveStatus === "") {
      return toast.error(" leaveStatus filled cannot be empty!")

    }
    axios.put(`http://localhost:4000/update/leave/Status/${editLeave._id}`, editLeave

    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        seteditmodal(false)
        seteditLeave({})
        getLeaveStatuslist()
      }
      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }
  const getLeaveStatuslist = () => {
    axios.get("http://localhost:4000/all/leave/Status"

    ).then((res) => {
      if (res.data.status === 1) {
        setLeaveStatusList(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getLeaveStatuslist()
  }, [])

  const removeLeaveStatus = (list) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete this leave Status ${list.leaveStatus}?`,
      icon: "warning",
      dangerMode: true,
      buttons: true


    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4000/Delete/leave/Status/${list._id}`

        ).then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.message)
            getLeaveStatuslist()
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
      {/* <div className='container-fluid '>
      <div className='container bg1 mt-5 w-50'>
          <div className='card shadow mb-4 '>
          <div className="card-header d-sm-flex justify-content-between align-items-center mb-4">
              <h6 className='text-secondary '>Leave Status Data</h6>
              {user?.role == "admin" &&
                <button className='btn btn-sm btn btn-primary px-3 py-1' onClick={() => setleaveModal(!leaveModal)}> add +</button>
              }

            </div>
            <div className='card-body text-center'>

              <div className='table-responsive'  id="cart">
                <table class="" style={{ width: "100%" }}>
                  <thead className=' text-uppercase text-light'>
                    <tr>
                      <td scope="col">S.no</td>
                      <td scope='col'>LeaveStatus</td>

                      <td scope="col">Actions</td>


                    </tr>
                  </thead>
                  <tbody>
                    {LeaveStatusList.length > 0 && LeaveStatusList?.map((list, index) => {
                      return <tr>
                        <td scope="row">{index + 1}</td>
                        <td>{list.leaveStatus}</td>



                        <td>

                          <button className='btn btn-sm text-dark mx-2' onClick={() => edittoggle(list)} > <i class="fa fa-pencil" aria-hidden="true"></i></button>
                          <button className="btn btn-sm text-danger mx-2" onClick={() => removeLeaveStatus(list)} ><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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
                  <input Status='text' className='form-control' placeholder='enter the Leave Status'

                    onChange={(e) => setLeaveStatus({ ...LeaveStatus, leaveStatus: e.target.value })} />

                </div>
                <div>
                  <button className='btn btn-sm btn-outline-success' onClick={() => createLeaveStatus()}>create</button>
                </div>
              </div>
            </ModalBody>

          </Modal>

          <Modal isOpen={editmodal} toggle={() => seteditmodal(!editmodal)} size='md'>
            <ModalHeader toggle={() => seteditmodal(!editmodal)}></ModalHeader>
            <ModalBody>
              <div className='container'>
                <div className='mb-3'>
                  <input Status='text' className='form-control' placeholder='enter the task'
                    value={editLeave?.leaveStatus}

                    onChange={(e) => seteditLeave({ ...editLeave, leaveStatus: e.target.value })}
                  />
                </div>
                <div>
                  <button className='btn btn-sm btn-outline-success' onClick={() => updateLeaveStatus()}>update</button>

                </div>
              </div>

            </ModalBody>

          </Modal>

        </div>
      </div> */}
      <div class="container-fluid ">
        <div className='container bg1 mt-5 w-50'>
          <div className=' d-sm-flex justify-content-between align-items-center mb-4'>
            <h2 className='h3 mb-0 text-gray-800'>Leave Status</h2>
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
                      <th scope='col'>LeaveStatus</th>

                      <th scope="col">Actions</th>


                    </tr>

                  </thead>

                  <tbody>
                    {LeaveStatusList.length > 0 && LeaveStatusList?.map((list, index) => {
                      return <tr>
                        <td scope="row">{index + 1}</td>
                        <td>{list.leaveStatus}</td>



                        <td>

                          <button className='btn btn-sm text-dark mx-2' onClick={() => edittoggle(list)} > <i class="fa fa-pencil" aria-hidden="true"></i></button>
                          <button className="btn btn-sm text-danger mx-2" onClick={() => removeLeaveStatus(list)} ><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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
          <ModalHeader toggle={() => setleaveModal(!leaveModal)}>Leave status Form</ModalHeader>
          <ModalBody>
            <div className='container'>
              <div className='mb-3'>
                <input Status='text' className='form-control' placeholder='enter the Leave Status'

                  onChange={(e) => setLeaveStatus({ ...LeaveStatus, leaveStatus: e.target.value })} />

              </div>
              <div>
                <button className='btn btn-sm btn btn-success' onClick={() => createLeaveStatus()}>create</button>
              </div>
            </div>
          </ModalBody>

        </Modal>

        <Modal isOpen={editmodal} toggle={() => seteditmodal(!editmodal)} size='md'>
          <ModalHeader toggle={() => seteditmodal(!editmodal)}>Edit leave status</ModalHeader>
          <ModalBody>
            <div className='container'>
              <div className='mb-3'>
                <input Status='text' className='form-control' placeholder='enter the task'
                  value={editLeave?.leaveStatus}

                  onChange={(e) => seteditLeave({ ...editLeave, leaveStatus: e.target.value })}
                />
              </div>
              <div>
                <button className='btn btn-sm btn btn-success' onClick={() => updateLeaveStatus()}>update</button>

              </div>
            </div>

          </ModalBody>

        </Modal>
      </div>
    </Layout>
  )
}

export default LeaveStatus
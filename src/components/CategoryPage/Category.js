import React, { useEffect, useState } from 'react'
import './category.css'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import axios from 'axios'
import toast from 'react-hot-toast'
import swal from 'sweetalert'
import Layout from '../layout/Layout'

function Category() {
  const [addModal, setaddModal] = useState(false)
  const [Category, setCategory] = useState({
    category: ""
  })
  const [categoryList, setcategoryList] = useState([])
  const [Editmodal, setEditmodal] = useState(false)
  const [editCategory, seteditCategory] = useState({})


  const createCategory = () => {
    if (Category.category === "") {
      toast.error(" category filled cannot be empty!")
    }
    axios.post("https://management-backend-hu4p.onrender.com/new/category", Category,

    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setaddModal(false)
        setCategory({
          category: ""
        })

        getlist()
      }

      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }

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

  const editToggle = (data) => {
    setEditmodal(!Editmodal)
    seteditCategory(data)
  }
  const updateCategory = () => {
    if (editCategory.category === "") {
      return toast.error("task filled cannot be empty!")

    }
    axios.put(`https://management-backend-hu4p.onrender.com/update/category/${editCategory._id}`, editCategory

    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setEditmodal(false)
        seteditCategory({})
        getlist()
      }
      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }

  const removeCategory = (id) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete the category ${id.category}?`,
      icon: "warning",
      dangerMode: true,
      buttons: true


    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`https://management-backend-hu4p.onrender.com/Delete/Category/${id}`

        ).then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.message)
            getlist()
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

      <div className='container-fluid '>
        <div className='container bg1 w-100  '>
          <div className='row '>
            <div className='text-dark mt-5 '>
              <div className='d-flex align-items-center  text-center '>
                <h2 className=' mt-3 category mx-3'>Add Category</h2>
                <div className='mt-3'>
                  <a className='text-success' onClick={() => setaddModal(!addModal)}> <i class="fa fa-plus" aria-hidden="true"></i></a>
                </div>
              </div>

              {categoryList?.length > 0 && (
                categoryList.map((list) => {
                  return <div className="row">

                    <div className='col-3'>
                      <div className='mb-3 mx-2'>
                        <input type='text' className='form-control text-center' placeholder='enter the category'

                          value={list.category}

                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div>

                        <a className=' text-warning rounded mx-3' onClick={() => editToggle(list)} >
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                        <a className=' text-danger' onClick={() => removeCategory(list._id)}><i class="fa fa-trash-o" aria-hidden="true"></i></a>

                      </div>
                    </div>
                  </div>
                })
              )}

            </div>
            <Modal isOpen={addModal} toggle={() => setaddModal(!addModal)}>
              <ModalHeader toggle={() => setaddModal(!addModal)}>Add Category</ModalHeader>
              <ModalBody>
                <div className='container'>
                  <div className='mb-3'>
                    <input type='text' className='form-control' placeholder='enter the category'

                      onChange={(e) => setCategory({ ...Category, category: e.target.value })} />

                  </div>
                  <div>
                    <button className='btn btn-sm btn btn-success' onClick={() => createCategory()}>create</button>
                  </div>
                </div>
              </ModalBody>
            </Modal>

            <Modal isOpen={Editmodal} size='md' toggle={() => setEditmodal(!Editmodal)}>
              <ModalHeader toggle={() => setEditmodal(!Editmodal)}>Edit Category</ModalHeader>
              <ModalBody>
                <div className='container'>
                  <div className='mb-3'>
                    <input type='text' className='form-control' placeholder='enter the task'
                      value={editCategory?.category}

                      onChange={(e) => seteditCategory({ ...editCategory, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <button className='btn btn-sm btn btn-success' onClick={() => updateCategory()}>update</button>

                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>


        </div>
      </div>
    </Layout>

  )
}



export default Category
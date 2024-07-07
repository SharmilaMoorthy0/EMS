import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Sidebar';
import Category from './components/CategoryPage/Category';

import Home from './components/Dashboard/Home';
import Form from './components/Form';
import Login from './components/loginadmin/Login';
import Signup from './components/signup/Signup';
import Employe from './components/EmployePage/Employe';
import Sidebar from './components/Sidebar';
import Leave from './components/leave/Leave';
import Salary from './components/salary/Salary';
import EmployeLogin from './components/loginEmploye/EmployeLogin'
import Page  from './components/first page/Page'
import LeaveType from './components/leaveType/LeaveType'
import Profile from './components/Profile/Profile'
import Admin from './components/Admin';
import LeaveStatus from './components/LeaveStatus/LeaveStatus';
import Password from './components/Password/Password';
import LeaveFormPage from './components/LeaveForm/LeaveFormPage';
import SalaryForm from './components/SalaryForm/SalaryForm';

function App() {
  const toastoption = {
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363646',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },

  }


  return (
    <BrowserRouter>
    
      <Routes>
       <Route path='/' element={<Page/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/Employelogin' element={<EmployeLogin/>} />
         <Route path='/signup' element={<Signup />} />
        {/* <Route path='/sidebar' element={<Sidebar />} /> */}
        <Route path='/employe' element={<Employe />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/category' element={<Category />} />
        <Route path='/leave' element={<Leave />} />
        <Route path='/salary' element={<Salary />} />
        <Route path='/leave/type' element={<LeaveType/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/leave/status' element={<LeaveStatus/>} />
        <Route path='/password' element={<Password/>} />
        <Route path='/leave/form' element={<LeaveFormPage/>} />
        <Route path='/salary/form' element={<SalaryForm/>} />
       
       







      </Routes>

      <Toaster position='top-center' toastOptions={toastoption} />
    </BrowserRouter >
  );
}

export default App;

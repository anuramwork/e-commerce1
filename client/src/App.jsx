import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Loginpage from './components/login'
import Registerpage from './components/register'
import Userhome from './components/userComponents/userhome'
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminhome from './components/adminComponents/adminhome'
import Adminviewuser from './components/adminComponents/adminViewUser'
import Adminaddproducts from './components/adminComponents/adminAddProducts'
import AdminViewProducts from './components/adminComponents/adminViewProducts'
import Admineditproduct from './components/adminComponents/adminEditProduct'
import Cartpage from './components/userComponents/cartPage'
import Orderpage from './components/userComponents/orderPage'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loginpage/>}/>
        <Route path="/register" element={<Registerpage/>}/>
        <Route path="/userhome" element={<Userhome/>}/>
        <Route path="/usercart" element={<Cartpage/>}/>
        <Route path="/orderpage" element={<Orderpage/>}/>

        <Route path="/adminhome" element={<Adminhome/>}/>
        <Route path="/viewuser" element={<Adminviewuser/>}/>
        <Route path="/addproduct" element={<Adminaddproducts/>}/>
        <Route path="/adminviewproducts" element={<AdminViewProducts/>}/>
        <Route path="/admineditproduct/:id" element={<Admineditproduct/>}/>



      </Routes>
    </>
  )
}

export default App

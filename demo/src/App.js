import './App.css';
import NavigationBar from './Components/Navigation';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Form from './Pages/Form';
import  Details  from './Pages/Details';
import Store from './Context/Store';
import EditeD  from './Pages/EditeD';
import Profile from './Pages/Profile';
import Sign from './Pages/Sign';
import Login from './Pages/Login';
import Protected from './Pages/Protected';
import Logout from './Pages/Logout';
// import 'bootstrap/dist/css/bootstrap.min.css';






function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(



      <Route path='/' element={<NavigationBar />}>
         <Route path='/home' element={<Home />} />
         <Route path = '/form' element={<Form/>} />
         <Route path = '/details' element={<Details/>} />
         <Route path = '/edited/:id' element={<EditeD/>} />

            <Route element = {<Protected/>}>
                <Route path='/profile/:id' element={<Profile/>} />
             </Route>

         <Route path = '/sign' element = {<Sign/>} />
         <Route path = '/login' element = {<Login/>} />
         <Route path =  '/login' element = {<Logout/>}/>
    

         
      </Route>
     

    )
  )
  return (
    <>
      <Store>
      <RouterProvider router={router} />
      </Store>
    </>
  )
}


export default App;
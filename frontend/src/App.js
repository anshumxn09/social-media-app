import React, { useEffect } from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  const {isAuthenticated} = useSelector(state => state.user); 
  return (
    <Router>
      {
        isAuthenticated && <Header/>
      }
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home/> : <Login/>}></Route>
        <Route path='/login' element={isAuthenticated ? <Home/> : <Login/>}></Route>

        <Route path='/register' element={isAuthenticated ? <Account/> : <Register/>}></Route>

        <Route path='/account' element={isAuthenticated ? <Account/> : <Login/>}></Route>
        <Route path='/newpost' element={isAuthenticated ? <NewPost/> : <Login/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
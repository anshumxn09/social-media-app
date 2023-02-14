import React from 'react'
import User from '../User/User';
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
        <div className="homeleft"></div>
        <div className="homeright">
        <User 
        userId={"user._id"}
        name={"user.name"}
        avatar={"https://avatars.githubusercontent.com/u/25058652?v=4"}
        ></User>
        </div>
    </div>
  )
}

export default Home;
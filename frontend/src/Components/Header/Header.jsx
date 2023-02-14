import React, { useState } from 'react'
import './Header.css';
import {Link} from 'react-router-dom';
import {Home, HomeOutlined, Add, AddOutlined, Search, SearchOutlined, AccountCircle, AccountCircleOutlined} from '@mui/icons-material'
const Header = () => {
    const [tap, setTap] = useState(window.location.pathname)
  return (
    <div className="header">
        <Link to={"/"} onClick={()=>setTap("/")}>
            {
                tap==="/" ? <Home style={{color: "black"}}/> : <HomeOutlined/>
            }
        </Link>
        <Link to={"/newpost"} onClick={()=>setTap("/newpost")}> 
            {
                tap==="/newpost" ? <Add style={{color: "black"}} /> : <AddOutlined/>
            }
        </Link>
        <Link to={"/search"} onClick={()=>setTap("/search")}>
            {
                tap==="/search" ? <Search style={{color: "black"}}/> : <SearchOutlined/>
            }  
        </Link>
        <Link to={"/account"} onClick={()=>setTap("/account")}>
            {
                tap==="/account" ? <AccountCircle style={{color: "black"}}/> : <AccountCircleOutlined/>
            }
        </Link>
    </div>
  )
}

export default Header
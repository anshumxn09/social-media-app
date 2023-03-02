import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';
import './Search.css';

const Search = () => {
    const dispatch = useDispatch();
    const [name , setName] = useState("")
    const {users, loading : userLoading} = useSelector(state => state.allUserReducer);

    const searchHandler = (e) => {
        e.preventDefault();
        dispatch(getAllUsers(name));
    }
  return (
    <div className="search">
        <form className="searchForm" onSubmit={searchHandler}>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Search for the account'/>

            <Button type='submit' disabled={false}>Search</Button>

            <div className="searchResults">
            {
                users && users.map((elem) => (
                    <User 
                        key={elem._id}
                        name={elem.name}
                        userId={elem._id}
                        avatar={elem.avatar.url}
                    />
                ))
            }
        </div>
        </form>
    </div>
  )
}

export default Search;
import { Typography } from '@mui/material';
import React from 'react'
import ReactLoading from 'react-loading';

const NotFound = () => {
  return (
    <div className="loaderContainer">
    <img src="https://freepngimg.com/save/149483-honey-vector-bumblebee-bee-free-download-png-hq/512x512" alt="" height={70} width={70} />
      <ReactLoading color={"black"} height={200} width={200} />
        <hr />
      <Typography variant='h3' style={{textAlign : "center"}}>404 NOT FOUND</Typography>
    </div>
  )
}

export default NotFound;
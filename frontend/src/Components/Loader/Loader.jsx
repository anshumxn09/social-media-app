import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

const Loader = () => {
  return (
    <div className="loaderContainer">
      <ReactLoading color={"black"} height={200} width={200} />
    </div>
  )
}

export default Loader;
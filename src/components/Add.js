
import React, { useState, useEffect, Suspense } from 'react';
import FileUpload from './FileUpload';


const Add = () => {

  // axios.post("/api/pets", [])
  //   .then()

  return (
    <div className="App">

      <h1>Add a new pet to play with!</h1>

      <h3>
        <FileUpload />

      </h3>

    </div>
  );
}


export default Add

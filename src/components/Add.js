
import React, { useState, useEffect, Suspense } from 'react';
import FileUpload from './FileUpload';
import axios from 'axios';

const Add = () => {

  // axios.post("/api/pets", [])
  //   .then()

  return (
    <div className="App">

      <b>Add a Dog Picture</b>

      <h5>

        <FileUpload />
        <hr className="hr" />

      </h5>

    </div>
  );
}


export default Add

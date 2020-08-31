
import React, { useState, useEffect, Suspense } from 'react';
import FileUpload from './FileUpload';

const Add = ({ auth, setAuth }) => {


  return (
    <div className="App">

      <div
        id='imageUploadForm'
        action='upload.php'
        method='post'
        encType='multipart/form-data'>
        <h5>
          <h5 className="text-center mb-4">
            <b>Upload Profile Photo</b>
          </h5>

          <FileUpload auth={auth} setAuth={setAuth} />
          <hr className="hr" />

          <b>Add a Dog Picture</b>
        </h5>
        <input type='file' name='imageToUpload' id='imageToUpload' />
        <input type='submit' value='Upload' name='submitImage' />
      </div>
    </div>
  );
}


export default Add

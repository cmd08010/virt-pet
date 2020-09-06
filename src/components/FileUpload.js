import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [petName, setPetName] = useState('')

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const addName = (e) => {
    setPetName(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file && !petName) {
      alert('Please choose a file and input a name')
    } else if (!file) {

      alert('Please choose a file to upload')
    }
    else if (!petName) {
      alert('Please input a name for your new pet!')
    } else {
      const formData = new FormData();
      formData.append('file', file, 'name', petName)
      try {
        const res = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { url, original_filename } = res.data.result;
        setUploadedFile({ url, original_filename });
        setMessage('File Uploaded');
        setFileName('Choose file');
        const newPet = { name: petName, image: url };
        axios.post('/api/pets', newPet).then((res) => {
          console.log(res);
        });

      } catch (err) {
        if (err.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(err.response.data.msg);
        }
      }
    }
  }

  return (
    <Fragment>
      {uploadedFile ? (
        <div id="uploadedFile">
          <img src={uploadedFile.url} className="userProfileImage" alt="avatar" />
        </div>
      ) : null}
      {message ? (
        <div
          className="alert alert-secondary alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      <form onSubmit={onSubmit} className="fileUpload">
        <div className="custom-file">
          <input type="text" onChange={addName}></input>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn button mt-1"
          id="submitImageButton"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;

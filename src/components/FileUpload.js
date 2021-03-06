import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [petName, setPetName] = useState('')
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
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
          setFileName("Upload Successful!");
          setLoading(false)
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
      {Object.keys(uploadedFile) != 0 &&
        <div id="uploadedFile">
          <img src={uploadedFile.url} alt="avatar" class="loading" />
        </div>
      }
      {loading ? <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="avatar" class="loading" /> : null

      }
      {message ? (
        <div
          className="alert alert-secondary alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>
      ) : null
      }
      <form onSubmit={onSubmit} className="fileUpload">
        Name:
          <input type="text" onChange={addName} className=""></input>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
          <input
            type="submit"
            value="Upload"
            className="button"
            id="submitImageButton"
          />
        </div>
      </form>


    </Fragment>
  );
};

export default FileUpload;

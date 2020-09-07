const express = require("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const path = require("path")
const morgan = require("morgan")
const db = require("./src/db/db")
const bodyParser = require("body-parser")
const port = process.env.PORT || 8080
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(bodyParser.json())

app.use(express.static("assets"))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);
var myLogger = function (req, res, next) {
  next();
};
app.use(myLogger);


cloudinary.config({
  cloud_name: 'dos6dfcoldun',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/build"))
})

app.get("/api/pets", (req, res, next) => {
  db.getPet().then(response => {
    res.send(response)
  })
})

app.get("/api/pets/:id", (req, res, next) => {
  db.getPetById(req.params.id).then(response => {
    res.send(response)
  })
})


///***Post***** */

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  cloudinary.uploader.upload(file.tempFilePath, {
    transformation: [
      { width: 0.25, radius: "max", crop: "scale" }
    ]
  }, function (err, result) {
    res.send({ success: true, result });
  });
});


app.post('/api/pets', (req, res, next) => {
  db.setPet(req.body.name, req.body.image).then(response => res.send(response))
})


app.put("/api/pets/:action", (req, res, next) => {
  if (req.params.action === "Feed") {
    db.decreaseHungerLevel(req.body.id).then(hungerResponse => {
      db.setLoveLevel(req.body.id).then(response => {
        res.send(response)
      })
    })
  }
  if (req.params.action === "Full") {
    db.setLoveLevel(req.body.id).then(response => {
      res.send(response)
    })
  }

  if (req.params.action === "Play") {
    db.increaseTiredLevel(req.body.id).then(playResponse => {
      db.increaseHungerLevel(req.body.id).then(hunResponse => {
        db.setLoveLevel(req.body.id).then(response => {
          res.send(response)
        })
      })
    })
  }

  if (req.params.action === "Nap") {
    db.decreaseTiredLevel(req.body.id).then(response => res.send(response))
  }

  if (req.params.action === "Love") {
    db.setLoveLevel(req.body.id).then(response => {
      res.send(response)
    })
  }
  if (req.params.action === "Switch pets") {
    db.decreaseLoveLevel(req.body.id).then(response => {
      res.send(response)
    })
  }
})


app.get('/*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '/build'))
);

app.use((err, req, res, next) => {
  console.log('error:', err.status);
  res.status(err.status || 500).send({ message: err.message });
});

db.sync()
  .then(() => {
    console.log("db synced")
    app.listen(port, () => console.log(`listening on port ${port}`))
  })
  .catch(ex => console.log(ex))

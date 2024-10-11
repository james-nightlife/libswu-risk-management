const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors')
const fs = require('fs')

const app = express();
app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    var fullname = file.originalname;
    var name = fullname.substring(0, fullname.lastIndexOf('.'));
    var suffix = fullname.substring(fullname.lastIndexOf('.')+1);
    var time = new Date();
    var newname = `${name}_${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}_${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}.${suffix}`
    cb(null, newname)
  }
})
const upload = multer({ storage: storage });

// Handle file uploads
app.post('/risk/upload', upload.single('file'), (req, res) => {
  // File is available as req.file
  console.log('File uploaded:', req.file);
  res.send({
    filename: req.file.filename
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, '/uploads')));

const uploadDir = path.join(__dirname, '/uploads');

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

app.get('/view', (req, res) => {
  // Get list of files in the upload directory
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading upload directory');
    }

    // Render HTML with links to the files
    const fileLinks = files.map(file => `<a href="/uploads/${file}">${file}</a>`).join('<br>');
    res.send(`<h1>Uploaded Files</h1>${fileLinks}`);
  });
});


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

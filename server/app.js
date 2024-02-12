const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors())
const upload = multer({ dest: 'uploads/' });

// Handle file uploads
app.post('/risk/upload', upload.single('file'), (req, res) => {
  // File is available as req.file
  console.log('File uploaded:', req.file);
  res.send('File uploaded successfully');
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
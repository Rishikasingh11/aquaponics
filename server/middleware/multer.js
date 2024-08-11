const multer = require('multer'); // We need multer to handle file uploads
const path = require('path'); // We need path to work with file and directory paths

// Setting up storage for uploaded files
const storage = multer.diskStorage({
  // Where to save the uploaded files
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/')); // Save files in the 'uploads' folder
  },
  // How to name the uploaded files
  filename: function(req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname)); // Name files with their original name + current time + their extension
  }
});

// Creating the upload object with our storage settings
const upload = multer({ storage: storage });

// Exporting the upload object so we can use it in other files
module.exports = upload;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

const port = 3000;

app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
  const filePath = __dirname + '/uploads/' + uploadedFile.name;

  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!');
  });
});

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = __dirname + '/uploads/' + filename;

  res.download(filePath, filename, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


module.exports = router;

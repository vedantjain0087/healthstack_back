const express = require('express');
const app = express();
var Tesseract = require('tesseract.js')
var cors = require('cors');
var bodyParser = require('body-parser');
var async = require('async');
var multer  = require('multer');
const rp = require('request-promise')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost' }));
//https://vedantjain0087.github.io
//http://localhost
//https://jwireinvoice.herokuapp.com
//http://localhost:3000


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

app.post('/upload_aadhaar',function(req, response){
var upload = multer({
    storage: storage
  }).single("file")
  upload(req, response, function(err) {
Tesseract.recognize('./uploads/'+req.file.filename)
       .progress(function  (p) { })
       .then(function (result) {
        arr = result.text.split(' ');
        adhaar = "";
        for(i=0;i<arr.length;i++){
          if(arr[i].length == 6 && arr[i+1].length == 4 && arr[i+2].length == 4){
            adhaar += arr[i]+arr[i+1]+arr[i+2]
            break;
          }
        }
        adhaar = adhaar.slice(2,adhaar.length);
        console.log(adhaar);
         response.json({success:true,aadhaar:adhaar})
          })
  });
});

app.post('/upload_medical',function(req, response){
  var upload = multer({
      storage: storage
    }).single("file")
    upload(req, response, function(err) {
      if(err){
        response.send("error")
      }else{
        response.send("Success")
      }
    });
  });

port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening to port' + port));

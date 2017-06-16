const express = require('express')
const session = require('express-session')
const fs = require('fs')
const bodyParser = require('body-parser')
const helper = require('./dbUtilities')

const path = require('path')
/* * * * MULTER FOR EXTRACTING IMAGE DATA * * */
const multer = require('multer')
/* * * * AXIOS FOR PROMISES * * */
const axios = require('axios')

const { extractText } = require('./utilities')

const app = express()
const imgUpload = multer({dest: 'temp/'})



process.env.GOOGLE_APPLICATION_CREDENTIALS = './credentials/googleServiceAccountKeys.json'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, '../dist')))

/* * * * genuuid is not yet defined, so commented out to appease server :) * * * */

app.use(session({
  secret: 'Split Session Secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
  }));


/* * * * ON IMAGE UPLOAD * * * */
/* Steve comment - It would be super helpful to me to also send the path name where the file is stored. I added commented code accordingly, please let me know if this is incorrect */

// app.post('/image', imgUpload.single('image'), (req, res) => {
//   const { path } = req.file
//   extractText(path)
//   .then((text) => {
    
//     let response = {
//       text: { text },
//       path: path
//     } 

//     let response = { text }
//     res.status(200).json(response)
//   })
// })
app.get('/*', helper.checkUser);
app.post('/users/submitbill', helper.addBill);
app.get('/users/checkStatus', helper.checkUser);
app.get('/users/logout', helper.logoutUser);
app.post('/users/signup', helper.userSignUp);
app.post('/users/signin', helper.signInUser);

app.listen(8080, () => {
  console.log('Ready and listening on port 8080')
})

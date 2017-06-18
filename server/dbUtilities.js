const request = require('request');
const db = require('./dbConfig');
const path = require('path')
const User = require('./models/user');
const Bill = require('./models/bills');
const Debtor = require('./models/debtor');
const fs = require('fs');
const bcrypt = require('bcryptjs');



exports.checkUser = function(req, res){ 
  let username = req.session.username;
  if(username){ 
    User.findOne({username: username})
      .exec(function(err, user){
        if(user === null) {
          // res.redirect('/login');
          res.sendStatus(500);
        } else {
          
          req.session.username = user.username;
          req.session.userID = user.id;
          exports.createUserStorage(user.username);
          // res.redirect('/profile/' + req.session.username);
          res.send({signedIn: true, user: user});
        }
       })
    // res.send({signedIn: true, user: username});
  } else{
    res.redirect('/');
  }
}


exports.deleteFolderRecursive = function (userDir) {
    if( fs.existsSync(userDir) ) {
      fs.readdirSync(userDir).forEach(function(file) {
        var curPath = userDir + "/" + file;
          if(fs.statSync(curPath).isDirectory()) { // recurse
              exports.deleteFolderRecursive(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(userDir);
    }
  }

exports.logoutUser = function(req, res){
  let username = req.session.username;
  if(username !== null){
    let userDir = path.join(__dirname, '../dist') + '/' + username;
    Promise.resolve(exports.deleteFolderRecursive(userDir))
  .then(function(){
    req.session.destroy(function (err) {
    if (err) return next(err)
    })
  })
  }
  res.redirect('/')
};

exports.userBills = function(req, res){
  exports.getBillsOwner(req, res);
};


const generateHashedPW = async (pw) => {
  try {  
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pw, salt);
    return hash;
  } catch(err){
    console.log(err)
  }
};

exports.signInUser = async function(req, res) {
  let { username, password } = req.body
  if(req.session.username){
    res.redirect('/profile/' + req.session.username);
  }

   User.findOne({username: username})
   .exec(function(err, user){
    if(user === null) {
      console.log('no user found on signin');
      // res.redirect('/login');
      res.sendStatus(500);
    } else {
      bcrypt.compare(password, user.password, function(err, res) {
        if(err) throw Error; 
        else if(res === true){
          req.session.username = user.username;
          req.session.userID = user.id;
          exports.createUserStorage(user.username);
          res.send(user)
        }
      })
    }
   })
   .catch(err => {
    console.log(err);
    res.status(500).send(err);
   })
};


exports.userSignUp = async function(req, res) {
  let { email, firstName, lastName, password, username } = req.body;

  password = await generateHashedPW(password)
    
  console.log(password);

    User.findOne({username: username, email: email})
   .exec(function(err, user){
      if(user === null) {
        let newUser = new User({
          username,
          firstName,
          lastName,
          email,
          password,
          bills: []
        });
        newUser.save(function(err, newUser){
          if(err){
            res.status(500).send(err);
          } else {
            req.session.username = newUser.username;
            req.session.userID = newUser.id;
            res.status(200).send(newUser);
          }
        });
      } else {
        console.log('Account already exists.');
        res.redirect('/');
      }
    })
    .catch(err => {
      console.log(err)
    })
};


exports.getBillsOwner = function(req, res){
  Bill.find({owner: req.session.username})
  .exec(function(error, bills){
    if(error){
      throw error;
    }
    exports.createBillImages(req.session.username, bills);
    res.status(200).send(bills);
  })
};

/*===================================
Add Bill Helpers
====================================*/

exports.selectDebtors = function(debtors){
  return debtors.map(debtor => {
    return Debtor.findOne({email: debtor.email})
      .exec(function(err, debt){
        let newDebtor;
        if(debt === null){
          newDebtor = new Debtor({
            firstName: debtor.fName,
            lastName: debtor.lName,
            email: debtor.email
          });
          newDebtor.save(function(err, newdebtor){
            if(err){
              res.status(500).send(err)
            }
            return newdebtor;
          })
        } else {        
          return debt;
        }
      })
  });

}

exports.addBill = function(req, res) {
  let { bill } = req.body;
  let { username } = req.session;
  let { billName, billDate, code, totalAmount, totalDebt, image } = bill;
  let debtors = exports.selectDebtors(bill.debtors);
  Promise.all(debtors)
  .then(debtors => {
    let debtorArr = debtors.map((debtor, idx) => {
      return {debtorId: debtor._id, owed: bill[idx].owed, paidAmount: 0}
    })
    console.log(debtorArr)
    // adding new properties to the debtors objects
    // for ( var i = 0; i < values.length; i++ ) {
    //   debtorArr.push({debtorId: values[i]._id, owed: debtorsInfo.debtors[i].owed, paidAmount: 0});
    // }

    let newBill = new Bill({
      name: billName,
      date: billDate,
      owner: username,
      code: code,
      amount: totalAmount,
      debt: totalDebt,
      image: image,
      debtors: debtorArr
    });
    
    newBill.save()
    .then(newbill => {
      User.findOne({ username: username }).exec()
      .then(user => {
        user.bills.push({billId: newbill._id, code: newbill.code});
        user.save()
          .then(user => {
            console.log('last cl: user', user);
            // fs.unlink('./temp/' + req.file.billPhoto.path);
            res.send(user);
          })
          .catch(err => {
            console.log('user.bills.push error:', err);
            res.sendStatus(500);
          });
      })
      .catch(err => {
        console.log('User.findOne error:', err);
        res.sendStatus(500);
      });
    })
    .catch(err => {
      console.log('newBill.save error:', err);
      res.sendStatus(500);
    });
  })
  .catch(err => {
    console.log('newBill.save error:', err);
    res.sendStatus(500);
  });
}

//Create a temp directory and store bill images for user once they sign in
exports.createUserStorage = function(username){
  let newDir = path.join(__dirname, '../dist') + '/' + username;
  if (!fs.existsSync(newDir)){ //checks if dir exist
    fs.mkdirSync(newDir);
  }
}

exports.createBillImages = function(user, bills){
  let targetDir = path.join(__dirname, '../dist') + '/' + user;
  bills.forEach(bill => {
    let imgPath = targetDir + '/' + bill.name + '.jpg';
    console.log(bill.image.data);
    let imageData = bill.image.data;
    fs.writeFile(imgPath, imageData, 'base64', function(err){
      if(err){
        throw err
      }
    })
  })
}
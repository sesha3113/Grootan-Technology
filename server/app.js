const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Details');

app.use(bodyParser.json());

const Details = mongoose.model('details');

const mongouri =
  'mongodb+srv://seshaprasan3113:gundatii3113@cluster0.us3z3.mongodb.net/Grootan_base?retryWrites=true&w=majority';

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongo ');
});
mongoose.connection.on('error', (err) => {
  console.log('error', err);
});

app.get('/', (req, res) => {
  Details.find({}).then((data) => {
    res.send(data);
  });
});

app.post('/send-data', (req, res) => {
  const details = new Details({
    name: req.body.name,
    age: req.body.age,
    dob: req.body.dob,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    more: {
      address_line1: req.body.more.address_line1,
      address_line2: req.body.more.address_line2,
      address_line3: req.body.more.address_line3,
      phone: req.body.more.phone,
    },
  });
  details.save().then((data) => console.log(data));
  res.send(this.data);
});

app.post('/login', (req, res) => {
  //const {name, phone} = req.body;
  const name = req.body.name;
  const age = req.body.age;
  //console.log(phone);
  //console.log("hello");
  if (!age || !name) {
    res.status(422).json('0');
    console.log('no data');
    // res.send('0');
  } else {
    Details.findOne({name: name}).then((savedUser) => {
      //console.log(savedUser);
      console.log(age);
      console.log(savedUser.age);
      if (savedUser) {
        if (age === savedUser.age) {
          console.log('match');
          res.send(savedUser);
          console.log('here');
        } else {
          console.log('not matched');
          res.send("non");
        }
      } else {
        res.status(422).json('0');
      }
    });
  }
});

app.listen(3000, () => {
  console.log('server running....');
});

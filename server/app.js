const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Students');
require('./Teachers');

app.use(bodyParser.json());

const Students = mongoose.model('students');
const Teachers = mongoose.model('Teachers');
const mongouri =
  'mongodb+srv://seshaprasan3113:gundatii3113@cluster0-us3z3.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo ');
});
mongoose.connection.on('error', err => {
  console.log('error', err);
});

app.get('/', (req, res) => {
  res.send('welcome');
});

app.get('/view', (req, res) => {
  Students.findOne({rollnum: req.body.rollnum}, {}).then(data =>
    console.log(data),
  );
  res.send(this.data);
  console.log('retrieving');
  res.send(this.data);
});

app.get('/view-all', (req, res) => {
  Students.find({}).then(data => console.log(data));
  res.send(this.data);
  console.log('retrieving all');
  res.send(this.data);
});

app.post('/send-student-data', (req, res) => {
  const student = new Students({
    name: req.body.name,
    email: req.body.email,
    batch: req.body.batch,
    department: req.body.department,
    section: req.body.section,
    rollnum: req.body.rollnum,
    picture: req.body.picture,
    password: req.body.password,
    phone: req.body.phone,
  });
  student.save().then(data => console.log(data));
  res.send(this.data);
});

app.post('/student-delete', (req, res) => {
  const {_id} = req.body;
  console.log('received at app', _id);
  Students.findOneAndRemove({_id}).then(data => {
    console.log(data);
    res.send(data);
  });
});

app.post('/student-update', (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;
  console.log('at update received', _id);
  console.log('at update received', name);
  Students.findByIdAndUpdate(_id, {
    $set: {
      name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      rollnum: req.body.rollnum,
      batch: req.body.batch,
      department: req.body.department,
      section: req.body.section,
    },
  }).then(data => {
    console.log(data);
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('server running');
});

app.post('/student-singin', (req, res) => {
  const {rollnum, password} = req.body;
  if (!rollnum || !password) {
    res.status(422).json('0');
    // res.send('0');
  } else {
    Students.findOne({rollnum: rollnum}).then(savedUser => {
      if (savedUser) {
        if (password === savedUser.password) {
          console.log('match');
          res.send(savedUser);
        } else {
          console.log('not matched');
          res.send('0');
        }
      } else {
        res.status(422).json('0');
      }
    });
  }
});

/////Teachers from here

app.post('/send-teacher-data', (req, res) => {
  const teachers = new Teachers({
    name: req.body.name,
    email: req.body.email,
    batch: req.body.batch,
    department: req.body.department,
    section: req.body.section,
    picture: req.body.picture,
    password: req.body.password,
    phone: req.body.phone,
  });
  teachers.save().then(data => console.log(data));
  res.send(this.data);
});

app.post('/teacher-singin', (req, res) => {
  const {phone, password} = req.body;
  if (!phone || !password) {
    res.status(422).json('0');
    // res.send('0');
  } else {
    Teachers.findOne({phone: phone}).then(savedUser => {
      if (savedUser) {
        if (password === savedUser.password) {
          console.log('match');
          res.send(savedUser);
        } else {
          console.log('not matched');
          res.send('0');
        }
      } else {
        res.status(422).json('0');
      }
    });
  }
});

app.post('/teacher-update', (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;
  console.log('at update received', _id);
  console.log('at update received', name);
  Teachers.findByIdAndUpdate(_id, {
    $set: {
      name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      batch: req.body.batch,
      department: req.body.department,
      section: req.body.section,
    },
  }).then(data => {
    console.log(data);
    res.send(data);
  });
});

app.post('/teacher-delete', (req, res) => {
  const {_id} = req.body;
  console.log('received at app', _id);
  Teachers.findOneAndRemove({_id}).then(data => {
    console.log(data);
    res.send(data);
  });
});

////called with teacher detail
app.post('/fetch-student-data', (req, res) => {
  const {batch, section, department} = req.body;
  console.log(batch);
  console.log(section);
  console.log(department);
  if (!batch || !section || !department) {
    res.status(422).json('0s');
    // res.send('0');
  } else {
    var student_data = Students.find({
      batch: batch,
      section: section,
      department: department,
    }).then(savedUser => {
      if (savedUser) {
        res.send(savedUser);
        res.send(student_data);
      }
    });
  }
});

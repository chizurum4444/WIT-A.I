const express = require('express');
const session = require('express-session');
const { v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const model = require('./model/model.js');
const path = require('path');
const app = express();

// Session tracking
app.use(session({
  genid: () => uuidv4(),
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true},
  secret: 'weloveally'

}))

// Allow access to POST body.
app.use(express.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const PORT = process.env.PORT || 5500;
app.set('port', process.env.PORT || 5500)

app.listen(app.get('port'), () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

// Serve a static files for all files in public
app.use(express.static(path.join(__dirname, '../../public'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));

// Placeholder
let usernames = ['admin', 'test'];
function userExists(toFind) {
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i] === toFind) {
            return true;
        }
    }

    return false;
}

app.get('/', (req, response) => {
  response.sendFile(path.join(__dirname, '../../public/html/main.html'));
});

app.get('*', (req, response) => {
  response.sendFile(path.join(__dirname, '../../public', 'html', req.url));
});

app.get('/login', function (request, response) {
  response.sendFile(path.join(__dirname, '../../public/html/login.html'));
});


app.post('/processLogin', async function (request, response) {
  const username = request.body.un;
  const password = request.body.pwd;

  if (!userExists(username)) {
    return response.redirect('/login');
  }
  //Alternative way of finding multiple usernames in the database
  // const user = await model.User.findOne({ username: username });
  // if (!user) {
  //   // user not found
  //   return response.redirect('/login');
  // }

  const passwordMatch = await bcrypt.compare(password, user.hashPassword);
  if (!passwordMatch) {
    // password doesn't match
    return response.redirect('/login');
  }

  // set session cookie
  request.session.username = username;

  response.redirect('/');
});

app.get('/signup', function (request, response) {
  response.sendFile(path.join(__dirname, '../../public/html/signup.html'));
});

app.post('/processRegistration', function (request, response) {
  let username = request.body.un;
  let password = request.body.pwd;

  if (userExists(username)) {
    response.redirect('/signup.html');
  } else {
      usernames.push(username);

      request.session.username = username;

      response.redirect('/login.html');
  }

  let userData = {
    firstName: request.body.fn,
    lastName: request.body.ln,
    username: request.body.un,
    email: request.body.em,
    hashPassword: request.body.pwd
  };

  let newUser = new model.Student(userData);
  newUser.save()
      .then((res) => {
          // Insert successful
          console.log('User added:', res);
      }).catch((err) => {
          // Insert failed
          console.error('Unable to add user:', err);
      });

});

app.get('/logout', function (request, response) {
  request.session.username = '';
  response.redirect('/');
});

app.get('/todo', function (request, response) {
  response.sendFile(path.join(__dirname, '../../public/html/todo.html'));
});

app.get('/pomodoro', function (request, response) {
  response.sendFile(path.join(__dirname, '../../public/html/pomodoro.html'));
});

app.get('/video', function (request, response) {
  response.sendFile(path.join(__dirname, '../../public/html/video.html'));
});








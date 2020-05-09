const express = require('express');
const bodyParser = require('body-parser');

const ConnectDB = require('./db');

//Routes
const taskRoutes = require('./routes/tasks-routes');
const eventRoutes = require('./routes/events-routes');
const guestRoutes = require('./routes/guests-routes');
const userRoutes = require('./routes/users-routes');
const emailRoutes = require('./routes/email-routes');

const app = express();
ConnectDB();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
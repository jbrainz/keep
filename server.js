const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect to Database
connectDB();

//Init MiddleWare
app.use(express.json({ extended: false }));

app.use('/api/users', require('./resources/users'));
app.use('/api/auth', require('./resources/auth'));
app.use('/api/contacts', require('./resources/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

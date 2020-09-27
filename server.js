const express = require('express');

const app = express();

app.use('/api/users', require('./resources/users'));
app.use('/api/auth', require('./resources/auth'));
app.use('/api/contacts', require('./resources/contacts'));

app.get('/', (req, res) => res.send('Hello World'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

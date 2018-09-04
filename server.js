const express = require('express');
const app = express();
app.listen(1010);

app.use(express.static('public'));
app.use(express.static('node_modules'));
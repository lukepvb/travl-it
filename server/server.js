//has server data

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 8080;

const app = express();



app.use(bodyParser.json());












app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });




app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });


app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });
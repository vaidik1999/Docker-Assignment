const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parse');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/', (req, res, next) => {
  const filePath = "../data/"+req.body.file;
  const product = req.body['product'];
  console.log(product)

  let sum = 0;
  fs.createReadStream(filePath)
    .pipe(csv.parse())
    .on('error', (err) => {
      console.log("SSS")
      res.status(200).json({ file:req.body.file,error: "Input file not in CSV format." });
    })
    .on('data', (row) => {
   
      if (row[0] === product && !isNaN(parseInt(row[1]))) {
        console.log("H",sum)
        sum += parseInt(row[1]);
      }
    })
    .on('end', () => {
      console.log("END")

      res.json({ file: req.body['file'], sum });
    })
    
});

app.listen(3000);
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require('request');
const { error } = require('console');
const app = express();

app.use(bodyParser.json())

app.post('/calculate',(req, res) => {

    const file = req.body.file
    const product = req.body.product
    const filePath = "../data/"+ file
        

        if (file === null || !file) {
            res.json({file:null,error: "Invalid JSON input."}); 
        }
        
        else if(fs.existsSync(filePath)) {
            request.post(
                'http://calculate:3000/',
                { json: req.body },
                function (error, response, body) {
                    console.log(body)
                    res.json(body);
                }
            );
        }
        else{
            console.log("File not found", file);
        }  
    }
);

app.listen(6000);
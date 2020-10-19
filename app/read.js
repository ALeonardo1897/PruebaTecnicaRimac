const serverless = require('serverless-http');
const express = require('express')
const fetch   = require('node-fetch');
const AWS = require('aws-sdk');
const Util = require("./util/Util");

const app = express()

app.get('/swapi', function (req, res) {
    fetch('https://swapi.py4e.com/api/people/')
    .then( res => res.json())
    .then( englishData => {
        res.send(Util.Cast(englishData));
    })
})

const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.get('/api', function (req, res) {
    
    let param = {
      TableName: "PeopleStarWars"  
    };

    dynamoDb.scan(param,(err,data)=>{
        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                result: data.Items
            });
        }
    });

})

module.exports.handler = serverless(app);
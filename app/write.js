const serverless = require('serverless-http');
const { body, validationResult } = require('express-validator');
const express = require('express');
const AWS = require('aws-sdk');
const uuid = require('uuid');


const dynamoDb = new AWS.DynamoDB.DocumentClient();
const app = express();

app.use(express.json());

app.post('/api', [
    body("nombre").isAlpha().withMessage("Solo carácteres alfabéticos"),
    body("altura").isInt().withMessage("Solo carácteres númericos enteros"),
    body("masa").isInt().withMessage("Solo carácteres númericos enteros"),
    body("colorCabello").isAlpha().withMessage("Solo carácteres alfabéticos"),
    body("colorPiel").isAlpha().withMessage("Solo carácteres alfabéticos"),
    body("colorOjos").isAlpha().withMessage("Solo carácteres alfabéticos"),
    body("añoNacimiento").isAlphanumeric().withMessage("Solo carácteres alfabéticos y númericos"),
    body("genero").isAlpha().withMessage("Solo carácteres alfabéticos"),
    body("mundoNatal").isAlpha().withMessage("Solo carácteres alfabéticos"),
    body("peliculas").isArray().withMessage("Solo un array de strings"),
    body("especies").isArray().withMessage("Solo un array de strings"),
    body("vehiculos").isArray().withMessage("Solo un array de strings"),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Setting creation date
    req.body.id = uuid.v1();
    req.body.creado = Date.now();

    let param = {
        TableName: "PeopleStarWars",
        Item: req.body,
    };

    dynamoDb.put(param,(err,data)=>{
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {
            res.status(201).send({
                success: true,
                result: param.Item,
            });
        }
    })

})

module.exports.handler = serverless(app);
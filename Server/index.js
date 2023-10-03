const mongoURI = 'mongodb://localhost:27017';
const {MongoClient}= require ('mongodb');
const client = new MongoClient (mongoURI);
const dbSwapi = 'swapi'
const express = require ("express");
const app= express();

app.use(express.json());

app.get("/swapi/characters", async (req , res)=> {
    try {
        const database = client.db(dbSwapi);
        const charactersCol = database.collection('characters');
        const characters = await charactersCol.find().toArray();
        res.send(characters);
       //res.send({message: "Hello world"});
        console.log('Characters: ' +JSON.stringify(characters));
        await client.close();
    } catch {
        
        console.log ("Error");
    }
});

app.listen(3001);
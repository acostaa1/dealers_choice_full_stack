const { syncDB, models:{Menu, Item} } = require( "./db");
const express = require('express');
const app = express();
const path = require('path')
const port = process.env.PORT || 3000

const startUp =  async () => {
    try {
        await syncDB();
        console.log('connected to DB!');
        app.listen(port, ()=> {
            console.log(`listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startUp(); 



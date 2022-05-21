const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const cors = require('cors');
const { response } = require('express');
const { readdirSync } = require('fs');

const port = 8080;


const app = express();

app.use(express.static(path.join(__dirname, 'static')));

//INDEX.HTML
app.get('/', (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/datetime', (req, resp)=>{  
    const currentDate = new Date();
    const currentDateFormat = `${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
    resp.writeHead(200);
    resp.end(currentDateFormat);
});


app.get('/random', (req, resp) =>{
    const randomNumber = Math.round(Math.random() * 100);
    resp.writeHead(200);
    resp.end(`${randomNumber}`);
});

app.get('/bigger', (req, resp) =>{
    console.log(req.url);
    console.log(req.query);
    //VALIDATE
    if (isNaN(Number(req.query.x))){
        resp.writeHead(400);
        resp.end(`${req.query.x} is not a number`);
    }
    if (isNaN(Number(req.query.y))){
        resp.writeHead(400);
        resp.end(`${req.query.y} is not a number`);
    }
    //VALID
    const x = Number(req.query.x);
    const y = Number(req.query.y);

    if (x > y){
        resp.writeHead(400);
        resp.end(`${x} > ${y}`);
    }
    else if (y > x){      
        resp.writeHead(400);
        resp.end(`${y} > ${x}`);
        
    }
    else {
        resp.writeHead(400);
        resp.end(`${y} = ${x}`);
    }
});

app.get('/targil', (req, resp) =>{
    console.log(req.url);
    console.log(req.query);

    if (isNaN(Number(req.query.a))){
        resp.writeHead(400);
        resp.end(`${req.query.a} is not a number`);
    }
    if (isNaN(Number(req.query.b))){
        resp.writeHead(400);
        resp.end(`${req.query.b} is not a number`);
    }
    if (isNaN(Number(req.query.sum))){
        resp.writeHead(400);
        resp.end(`${req.query.sum} is not a number`);
    }
    //VALID
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const sum = Number(req.query.sum);

    if (a + b == sum){
        resp.sendFile(path.join(__dirname, 'correct.html'));
    }
    else {
        resp.sendFile(path.join(__dirname, 'wrong.html'));
    }
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})
const http = require('http');
const express = require ('express');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/cats', (req, res) => {
    res.send('<h1>MEOW!</h1>');
})

app.get('/dogs', (req, res)=> {
    res.send('<h1>WOOF!</h1>')
})

app.get('/cats_and_dogs', (req, res) => {
    res.send('<h1>Dogs and cats living together ... mass hysteria!!!</h1>')
})

app.get('/greet/:handle', (req, res) => {
    const { handle } = req.params;
    res.send (`<h1>Hello, ${handle}!</h1>`);
});


//I don't get this - but okay.
app.get('/year', (req, res)=> {
    const { age } = req.query;
    const year = 2020;
    const calcAge = year - parseInt(age, )
    res.send (`<h1>You were born in: ${calcAge}`);
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
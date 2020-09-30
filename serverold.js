const http = require('http'); //core http module
const express = require ('express'); //3rd party express module
const data = require('./dataold'); //local data module

const hostname = '127.0.0.1'; //local host, our computer
const port = 3000; //port to run server on

const app = express(); //creating express app

const server = http.createServer(app); //use app to handle server requests

//homepage route
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

//about page
app.get('/about', (req, res) => {
    //sends back html h1 tag
    res. send('<h1>About the page</h1>')
})

//friends list
app.get('/friends', (req, res) => {
    //setup empty string
    let friend = '';
    //loop over each item in the data
    for (let index = 0; index < data.length; index++) {
        const friend = data[index];
        //append html to the friend string for each friend in the data
        friends += `<li><a href="/friends/${friend.name}"> ${friend.name}</a></li>`
    }
    //send back the list of friends
    res. send (`
    <ul>
        ${friends}
    </ul>
    `)
})

//friend detail page )uses route parameters indicated by: handle 
//route parameter is handle
app.get('/friends/:handle', (req, res) => {
    //destructure the route params to get the handle from the URL
    const { handle } = req.params;
    //const handle = req.params.handle does the same thing from above ^
    // console.log(req.params.handle)
    //find the first friend in the data that matches the route param 'handle'
    const friend = data.find(element => {
        if (element.handle === req.params.handle) {
            return true;
        }
        return false;
    })
    //if it couldn't find a friend
    if (!friend) {
        res
        .status(404) //set status to 404(not found)
        // send back an error
        .send(`<h1>Dah heck, you got no friends with that handle: ${req.params.handle}</h1>`)
        // if we did find a friend
    } else {
        //use the details to send back a page with their info
    res.send(`
    <h1>${friend.name}</h1>
    <h3>${friend.handle}</h3>
    <p>${friend.skill}</p>
    `)
    }
})

//it helps reroute anything if the user puts in a weird thing like http//google.com/jfiesjfiosjfiosjfioj
//handle all missing pages
app.get('*', (req, res) => {
    // res.send('<h1>This ain\'t the homepage</h1>')
    res.status(404).send('404 - page not found')
})
// const server = http.createServer((req, res) => {
//     console.log('The URL is: ', req.url);

//     if (req.url === '/') {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World')
//     } else if (req.url === '/styles.css') {
//         const css = fs.readFileSync('styles.css', 'utf8');
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end(css)
//     } else {
//         res.statusCode = 200;
//         res.setHeader ('Content-Type', 'text/plain');
//         res.end('This ain\'t the home page')
//     }
// });


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
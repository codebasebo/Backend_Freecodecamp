require('dotenv').config();

// Log the required message for the Node console challenge
console.log("Hello World");

let express = require('express');
let app = express();
//let bodyParser = require('body-parser');
let bodyParser = require('body-parser');

//Enable trust proxy to get correct IP address
app.enable(`trust proxy`);

// Mount body-parser middleware to parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.urlencoded({extended: false}));

// Root-level request logger middleware
app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
// app.use(function(req, res, next) {
//   console.log(req.method + " " + req.path + " - " + req.ip);
//   next();
// });

app.get('/json', function(req, res) {
    let responseMessage = {"message": "Hello json"};

    if (process.env.MESSAGE_STYLE === "uppercase") {
        responseMessage.message = responseMessage.message.toUpperCase();

    }
    res.json(responseMessage);
})

// Serve static assets from the /public directory
app.use('/public', express.static(__dirname + '/public'));

// Serve "Hello Express" on GET / route
// app.get('/', function(req, res) {
//   res.send('Hello Express');
// });

const absolutePath = __dirname + '/views/index.html';

app.get('/', function(req, res) {
    res.sendFile(absolutePath);
});

// app.get('/json', function(req, res) {
//     res.json({"message": "Hello json"});
    
// })


// Chain middleware to echo back route parameters
app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time": req.time});
});

app.get('/:word/echo', function(req, res) {
    res.json({"echo": req.params.word});
})

// API endpoint to handle query parameters
app.get('/name', function(req, res) {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({"name": `${firstName} ${lastName}`});
});
// API endpoint to handle POST requests with URL-encoded data
app.post('/name', function(req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({"name": `${firstName} ${lastName}`});
});
// app.route('/name')
//   .get((req, res) => {
//     const { first, last } = req.query;
//     res.json({ name: `${first} ${last}` });
//   })
//   .post((req, res) => {
//     // You’ll handle POST here in the next challenge
//   });






























 
module.exports = app;

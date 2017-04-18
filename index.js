/**
 *
 * Created by 宇 on 2017/4/4.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var book_route = require('./controllers/book');
var admin_route = require("./controllers/admin");
var reader_route = require("./controllers/reader");

app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');

app.get('/borrow', (req, res)=>{
    res.render('borrow');
});

app.get('/return', (req, res)=>{
    res.render('return');
});

app.get('/bookquery', (req, res)=>{
    res.render('bookquery');
});

app.get("/", (req, res) => {
    res.render('index');
});

app.get('/login', (req, res)=>{
    res.render('login', {error: null});
});

app.get('/profile', (req, res)=>{
    res.render('profile');
});

app.get('/instorage', (req, res)=>{
    res.render('instorage');
});

app.get('/users', (req, res)=>{
    res.render('users');
});

app.use("/book", book_route);
app.use("/reader", reader_route);
app.use("/admin", admin_route);


app.listen(3100);
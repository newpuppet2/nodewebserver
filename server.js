const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/Partials');
app.use((req,res,next)=> {
res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=> {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log + '/n', (err)=> {
if (err){
console.log('unable to append to server.log');
}
});
next();
});

hbs.registerHelper('getCurrentYear', ()=> {
return new Date().getFullYear()
});

hbs.registerHelper('screamIT', (text)=> {
return text.toUpperCase();
});




app.get('/', (req, res) => {
res.render('home.hbs',{
pageTitle: 'home',
home: 'entry',
welcomemessage: 'welcome welcome',
//date: new Date().getFullYear()
});
});


app.get('/about', (req, res) => {
res.render('about.hbs',{
pageTitle: 'about',
//date: new Date().getFullYear()
});
});

app.get('/bad', (req, res) => {

res.send({errorMessage:'unable to handle requests'});
});

app.listen(3000);

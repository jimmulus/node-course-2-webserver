const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Be back soon!'
//     });
// });

app.use(express.static(__dirname + '/public'));

app.use((req,res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) => {
        if (err) {
            consol.log('Unable to append to server.log.')
        }
    });
    next();
});

hbs.registerHelper ('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //response.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        name: 'Jim',
        likes:[
            'Hobbies',
            'Coding',
            'Computer',
            'TV'
        ],
        welcomeText: `Welcome to the home page.`
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});


app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        projectsMessage: 'Here al my projects will be listed'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorCode: 401,
        errorMessage: 'Cannot complete request'
    });
});



app.listen(port, () => {
    console.log(`Server is up on port ${port} ...`)
});
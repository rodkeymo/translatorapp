//bring in express, body-parser, and ejs template engine

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const ejs = require('ejs');

//translate api 

const translate = require('node-google-translate-skidz');

//initialize application
const app = express()

//setting up the ejs template engine

app.set( 'view engine', 'html');
app.engine('html',ejs.renderFile);

app.use(express.static(__dirname +'/public'));

//parse the middleware
app.use (express.urlencoded({extended:true}));


app.get('/', (req, res) =>{
    res.render('index.ejs');
});

// post the form data to post route
app.post('/translate',(req, res) => {  

    // get form data from the request body 
    const text = req.body.text;


     // destination language
    const language = req.body.language;

    translate(text, {to: language}).then(response => {
       res.render('index.ejs', {translatedText:response.text})
    }).catch(err => {
        console.error(err);
    });
})


// Port varibale
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`App runnning on port ${PORT}`)
})
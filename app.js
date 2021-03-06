const express = require('express');
const app = express();
// const mailer = require('express-mailer');

// static files
app.use(express.static('assets'));
app.use('/css', express.static(__dirname + 'assets/css'));
app.use('/js', express.static(__dirname + 'assets/js'));
app.use('/images', express.static(__dirname + 'assets/images'));

// Read proprties
app.use(express.urlencoded({
    extended: false
}));
app.locals.data = {
    'nombrePlace': '',
    'idVol': '',
    'extrs': []
};
// Set views
app.set('view engine', 'ejs');
app.use('/', require('./router'))
app.listen(5000, () => {
    console.log('is runnign');
});
const express = require('express');
const router = express.Router();

const connexion = require('./database/db');

// navigation 
router.get('/', (req, res) => {
    res.render('home.ejs')
})
router.get('/aeroport', (req, res) => {
    res.render('aeroport.ejs')

})


const crud = require('./controllers/crud');
// insert Destination depart
router.post('/Destination', crud.saveDestination);

// Remplir select 
router.get('/home', crud.getDestination);
router.post('/saveVols', crud.saveVols);
router.get('/vols', crud.destinationVols);


// Read Reservation
router.get('/admin', crud.getReservation);



// Get plan
router.get('/search', crud.getPlan);
// router.get('/dd', function (req, res) {
//     var sql = "SELECT * FROM vols WHERE fk_depart = 3 && fk_arrive = 2  && date_depart = '2021-12-12' && capacite<20"

//     connexion.query(sql, (error, results) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(results);
//         }
//     })

// });




module.exports = router;
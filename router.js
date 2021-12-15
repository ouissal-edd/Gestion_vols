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
router.get('/reservation', (req, res) => {
    res.render('reservation.ejs')

})

router.get('/ticket', (req, res) => {
    res.render('ticket.ejs')

})


const crud = require('./controllers/crud');
router.post('/Destination', crud.saveDestination);

router.get('/home', crud.getDestination);
router.post('/saveVols', crud.saveVols);
router.get('/vols', crud.destinationVols);

router.get('/admin', crud.getReservation);

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    connexion.query('DELETE FROM reservation WHERE  id_res =?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/admin');
        }
    })
})


router.post('/search', crud.getPlan);
router.post('/send', crud.sedEmaill);

router.post('/saveReservation', crud.saveReservation);





module.exports = router;
const {
    query
} = require('express');
const connexion = require('../database/db');


// Admin
exports.saveDestination = (req, res) => {
    const location = req.body.locationone;
    // console.log(location);
    var sql = 'INSERT INTO aeroport SET ?';
    connexion.query(sql, {
        location: location
    }, (error, results) => {
        if (error) {} else {
            res.redirect('/aeroport');
        }
    })

}

exports.getReservation = (req, res) => {
    var sql = `SELECT * FROM reservation INNER JOIN users ON reservation.fk_user = users.id INNER JOIN vols ON reservation.fk_vol = vols.id INNER JOIN extras ON reservation.fk_extras = extras.id INNER JOIN aeroport ON vols.fk_depart = aeroport.id INNER JOIN aeroport a ON vols.fk_depart = a.id`
    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('dashboard.ejs', {
                data: results
            });
        }
    })

}




// user
exports.getDestination = (req, res) => {

    sql = `SELECT * FROM aeroport `
    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('home.ejs', {
                destination: results
            });
        }

    })
}


exports.saveVols = (req, res) => {

    const depart = req.body.depart;
    const arrive = req.body.arrive;
    const heur_depart = req.body.heur_depart;
    const heur_arrive = req.body.heur_arrive;
    const date = req.body.date;
    const datearriver = req.body.datearriver;
    const capacite = req.body.capacite;

    var sql = "INSERT INTO vols  (fk_depart , fk_arrive , heur_depart,heur_arrive, date_depart, date_arrive, capacite ) VALUES(" + depart + "," + arrive + ",'" + heur_depart + "', '" + heur_arrive + "' ,'" + date + "', '" + datearriver + "',  " + capacite + " )"
    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log(results)
            res.redirect('/vols');
        }
    })
}

exports.destinationVols = (req, res) => {

    sql = `SELECT * FROM aeroport `
    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('vols.ejs', {
                destination: results
            });
        }

    })
}




exports.getPlan = (req, res) => {

    const depart = req.body.start;
    const arrive = req.body.end;
    const date = req.body.datee;
    console.log('daaaaaaaaaaaaaaaaaaaaaaaaa', depart, arrive, date);

    // var sql = "SELECT * FROM vols WHERE fk_depart =" + depart + " , fk_arrive=" + arrive + ", date_depart='" + date + "'"
    // connexion.query(sql, (error, results) => {
    //     if (error) {
    //         throw error;
    //     } else {
    //         console.log(results)
    //         res.redirect('/home');
    //     }
    // })
}
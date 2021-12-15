const {
    query
} = require('express');
const connexion = require('../database/db');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

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
    var sql = `SELECT * FROM reservation INNER JOIN users ON reservation.fk_user = users.id INNER JOIN vols ON reservation.fk_vol = vols.id_vol  INNER JOIN aeroport ON vols.fk_depart = aeroport.id INNER JOIN aeroport a ON vols.fk_depart = a.id`
    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log(results)
            res.render('dashboard.ejs', {
                data: results
            });
        }
    })

}




// user
exports.getDestination = (req, res) => {

    sql = `SELECT * FROM aeroport `
    sql2 = `SELECT * FROM aeroport_arrive `

    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            const destination = results
            // res.render('home.ejs', {
            //     destination: results
            // });

            connexion.query(sql2, (error, result) => {
                if (error) {
                    throw error;
                } else {

                    res.render('home.ejs', {
                        destination: destination,
                        arrive: result

                    });
                }

            })
        }

    })
}

// Vols Admin
exports.saveVols = (req, res) => {

    const depart = req.body.depart;
    const arrive = req.body.arrive;
    const heur_depart = req.body.heur_depart;
    const heur_arrive = req.body.heur_arrive;
    const date = req.body.date;
    const datearriver = req.body.datearriver;
    const capacite = req.body.capacite;
    const prix = req.body.prix;


    var sql = "INSERT INTO vols  (fk_depart , fk_arrive , heur_depart,heur_arrive, date_depart, date_arrive, capacite ,prix) VALUES(" + depart + "," + arrive + ",'" + heur_depart + "', '" + heur_arrive + "' ,'" + date + "', '" + datearriver + "',  " + capacite + "," + prix + " )"
    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log(results)
            res.redirect('/vols');
        }
    })
}




// ------
exports.destinationVols = (req, res) => {

    sql = `SELECT * FROM aeroport `
    sql2 = `SELECT * FROM aeroport_arrive `

    sql3 = `SELECT * FROM vols INNER JOIN aeroport on vols.fk_depart=aeroport.id INNER JOIN aeroport_arrive  on vols.fk_arrive=aeroport_arrive.id_arrive  `

    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {

            var destination = results
            connexion.query(sql2, (error, results) => {
                if (error) {
                    throw error;
                } else {
                    const arrive = results;
                    connexion.query(sql3, (error, result) => {
                        if (error) {
                            throw error;
                        } else {
                            console.log(result)
                            res.render('vols.ejs', {
                                vols: result,
                                destination: destination,
                                arrive: arrive

                            });
                        }
                    })




                }

            })



        }

    })
}




exports.getPlan = (req, res) => {

    const depart = req.body.start;
    const arrive = req.body.end;
    const date = req.body.datee;
    var sql2 = "SELECT * FROM extras";
    var sql = "SELECT * FROM vols WHERE fk_depart =" + depart + " && fk_arrive=" + arrive + "&& date_depart='" + date + "'"
    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            let destination = results;
            connexion.query(sql2, function (err, result) {
                if (err) {
                    throw err
                } else {
                    var extra = result;
                    res.render('reservation.ejs', {
                        safiVols: destination,
                        extras: extra
                    });
                }
            });
        }

    })
}




exports.saveReservation = (req, res) => {

    const Nom = req.body.nom;
    const Prenom = req.body.prenom;
    const Email = req.body.email;
    const Tel = req.body.tel;

    const nbr_place = req.app.locals.data.nombrePlace = req.body.NombrePlace;
    const id_vols = req.app.locals.data.idVol = req.body.voll;
    const extras = req.app.locals.data.extrs = req.body.extraa;



    var sql = "INSERT INTO users  (nom,prenom,email,tel) VALUES('" + Nom + "','" + Prenom + "','" + Email + "', '" + Tel + "')";
    var sql2 = "UPDATE vols SET capacite = capacite+" + nbr_place + " WHERE id_vol= " + id_vols + "";
    var sql3 = 'SELECT * FROM users ORDER BY id DESC LIMIT 1';
    var sql5 = 'SELECT * FROM reservation ORDER BY id_res DESC LIMIT 1';

    connexion.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log('lwla dazt');
            connexion.query(sql2, (error, results) => {
                if (error) {
                    throw error;
                } else {
                    console.log('tanya dazt')

                    connexion.query(sql2, (error, results) => {
                        if (error) {
                            throw error;
                        } else {
                            console.log('talta dazt')

                            connexion.query(sql3, (error, results) => {
                                if (error) {
                                    throw error;
                                } else {
                                    console.log('rab3a dazt')

                                    const last_id_user = results[0].id;
                                    var sql4 = "INSERT INTO reservation  (nombre_pers,fk_user,fk_vol) VALUES(" + nbr_place + "," + last_id_user + ",'" + id_vols + "')";
                                    connexion.query(sql4, (error, results) => {
                                        if (error) {
                                            throw error;
                                        } else {
                                            console.log('khamasa dazt')

                                            connexion.query(sql5, (error, results) => {
                                                if (error) {
                                                    throw error;
                                                } else {
                                                    console.log('sadsa dazt')

                                                    const last_id_reservation = results[0].id_res;
                                                    var sql4 = "INSERT INTO extras_vols  (fk_reservation,fk_extras) VALUES(" + last_id_reservation + ",'" + extras + "')";
                                                    connexion.query(sql4, (error, results) => {
                                                        if (error) {
                                                            throw error;
                                                        } else {
                                                            console.log('aller pour ticket')
                                                            //   ---------------------------------------------------------
                                                            connexion.query(sql5, (error, results) => {
                                                                if (error) {
                                                                    throw error;
                                                                } else {
                                                                    const last_reservation = results[0].id_res;

                                                                    sql6 = "SELECT * FROM reservation INNER join users on reservation.fk_user=users.id INNER join vols on reservation.fk_vol=vols.id_vol INNER join aeroport on vols.fk_depart = aeroport.id INNER JOIN aeroport_arrive  on vols.fk_arrive=aeroport_arrive.id_arrive WHERE id_res= " + last_reservation + ""
                                                                    connexion.query(sql6, (error, results) => {
                                                                        if (error) {
                                                                            throw error;
                                                                        } else {
                                                                            console.log(results[0])
                                                                            const last_reservation = results[0];
                                                                            res.render('ticket.ejs', {
                                                                                reserv: results,

                                                                            });


                                                                        }
                                                                    })



                                                                }
                                                            })


                                                            // ------------------------------------

                                                        }
                                                    })
                                                }
                                            })

                                        }
                                    })
                                }
                            })

                        }
                    })
                }
            })
        }
    })
}


exports.sedEmaill = (req, res) => {

    // Step 1
    // SEND MAIL 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'safiair282@gmail.com',
            pass: 'Youcode2021'
        }
    });

    // Step 2
    let mailOptions = {
        from: 'safiair282@gmail.com', // TODO: email sender
        to: Email, // TODO: email receiver
        subject: 'Reservation vols',
        // text: 'Wooohooo it works!!'
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log(err);
        }
        return console.log('Email sent!!!');
    });





}
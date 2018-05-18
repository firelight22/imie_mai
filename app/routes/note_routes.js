
module.exports = function(app, db) {

    // SEND PUSH
    var FCM = require('fcm-node');

    var serverKey = require('./json-Quentin.json'); //put the generated private key path here

    var fcm = new FCM(serverKey);

    var ObjectID = require('mongodb').ObjectID;
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.get('/message/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('messages').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.get('/message', (req, res) => {
        db.collection('messages').find((err, items) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                items.toArray(function(err, docs) {
                    console.log("Found the following records");
                    // console.log(docs);
                    res.send(docs);
                });
            }
        });
    });
    app.post('/message', (req, res) => {
        const message = { message: req.body.message,pseudo: req.body.pseudo};

        function messageFormat(message, pseudo) {
            return messageT = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: '/topics/message',
                // collapse_key: 'your_collapse_key',

                notification: {
                    title: pseudo,
                    body: message
                },

                data: {  //you can send only notification or only data(or include both)
                    my_key: 'my value',
                    my_another_key: 'my another value'
                }
            };
        }

        // SEND NO SQL
        db.collection('messages').insert(message, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                // SEND PUSH
                fcm.send(messageFormat(req.body.message, req.body.pseudo), function(err, response){
                    if (err) {
                        console.log("Something has gone wrong!");
                        console.log(err);
                    } else {
                        console.log("PUSH ENVOYE");
                        res.send("Good");
                    }
                });
            }
        });
    });
};

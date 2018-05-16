
module.exports = function(app, db) {

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
                    console.log(docs)
                    res.send(docs);
                });
            }
          });
      });
      app.post('/message', (req, res) => {
        const message = { message: req.body.message,pseudo: req.body.pseudo};
        db.collection('messages').insert(message, (err, result) => {
          if (err) {
            res.send({ 'error': 'An error has occurred' });
          } else {
            res.send(result.ops[0]);
          }
        });
      });
};

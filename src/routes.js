const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const config = require('../config/config.json');

const { connect } = require('./connect/mongoConnect');

let db, collection;

router.use(bodyParser.text());

// gets a list of fields for querying, ** cache disabled **
router.get('/test', async (req, res, next) => {
  try {
    db = await connect();
    collection = db.collection('categories');
    const sample = await collection.findOne();
    console.log(sample);
    res.json(Object.keys(sample));
    //setCache(req.query.user, 'fields', result);
    console.info('/test response OK');
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;
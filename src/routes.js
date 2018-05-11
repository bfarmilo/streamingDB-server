const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const config = require('../config/config.json');

const { connect } = require('./connect/mongoConnect');

let db;
let collection;

const collectionList = [
  'categories',
  'offerings',
  'services',
  'verticals'
]

router.use(bodyParser.text());

// gets a list of fields for querying, ** cache disabled **
router.get('/test', async (req, res, next) => {
  try {
    if (!db) {
      db = await connect();
    }
    collection = db.collection(collectionList.includes(req.query.collection) ? req.query.collection : 'categories');
    const sample = await collection.findOne();
    res.json(Object.keys(sample));
    //setCache(req.query.user, 'fields', result);
    console.info(`/test to ${collectionList.includes(req.query.collection) ? req.query.collection : 'categories'} collection response OK`);
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;
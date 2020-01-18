const router = require('express').Router()

router.get('/societies', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM societies', (error, results) => {
    if (error) throw error;

    res.json(results);
  });
});

router.get('/societies/:id(\\d+)', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM societies WHERE id=?', [req.param.id], (error, results) => {
    if (error) throw error;

    res.json(results[0]);
  });
});

router.get('/societies/:id(\\d+)/events', (res, req) => {
  req.app.locals.connection.query('SELECT * FROM events WHERE society_id=? ORDER BY datetime DESC', [req.param.id], (error, results) => {
    if (error) throw error;

    res.json(results);
  });
});

router.get('/events', (res, req) => {
  req.app.locals.connection.query('SELECT * FROM events ORDER BY datetime DESC', (error, results) => {
    if (error) throw error;

    res.json(results);
  })
});

router.get('/events/:id(\\d+)', (res, req) => {
  req.app.locals.connection.query('SELECT * FROM events WHERE id=? ORDER BY datetime DESC', [req.param.id], (error, results) => {
    if (error) throw error;

    res.json(results[0]);
  });
});

module.exports = router

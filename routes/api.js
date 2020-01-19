const router = require('express').Router()

const isLoggedIn = (req, res, next) => {
  const key;

  if (!(key = req.get('X-AUTH-KEY')) || !(key in app.locals.sessions)) {
    return res.status(403).json({
      error: "The user must be logged in to perform this action.",
      is_logged_in: false
    });
  }

  req.auth_key = req.get('X-AUTH-KEY');

  return next(req, res, next);
};

router.get('/logout', isLoggedIn, (req, res) => {
  delete app.locals.sessions[req.auth_key];

  return res.redirect('/');
});

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

router.get('/societies/:id(\\d+)/events', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM events WHERE society_id=? ORDER BY datetime DESC', [req.param.id], (error, results) => {
    if (error) throw error;

    res.json(results);
  });
});

router.post('/societies', isLoggedIn, (req, res) => {
  app.locals.connection.query('INSERT INTO societies (user_upi, name, image, description, category) VALUES (?, ?, ?, ?, ?)', [
    app.locals.sessions[req.auth_key].upi,
    req.body.name,
    req.body.image,
    req.body.description,
    req.body.category
  ], (error) => {
    if (error) throw error;

    return res.json({
      success: true,
      society_id: results.insertId
    });
  });
});


router.get('/events', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM events ORDER BY datetime DESC', (error, results) => {
    if (error) throw error;

    res.json(results);
  })
});

router.get('/events/:id(\\d+)', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM events WHERE id=? ORDER BY datetime DESC', [req.param.id], (error, results) => {
    if (error) throw error;

    res.json(results[0]);
  });
});

router.post('/events', isLoggedIn, (req, res) => {
  app.locals.connection.query('INSERT INTO events (society_id, name, summary, description, image, category) VALUES (?, ?, ?, ?, ?, ?)', [
    req.body.society_id,
    req.body.name,
    req.body.summary,
    req.body.description,
    req.body.image,
    req.body.category
  ], (error) => {
    if (error) throw error;

    return res.json({
      success: true,
      event_id: results.insertId
    });
  });
});

router.get('/societies/:id(\\d+)/faqs', (req, res) => {
  app.locals.connection.query('SELECT question, answer FROM faqs WHERE society_id = ?', [req.param.id], (error, results) => {
    if (error) throw error;

    return res.json(results);
  });
});

router.post('/societies/:id(\\d+)/faqs', (req, res) => {
  app.locals.connection.query('INSERT INTO faqs (society_id, question, answer) VALUES (?, ?, ?)', [
    req.param.society_id,
    req.body.question,
    req.body.answer
  ], (error) => {
    if (error) throw error;

    return res.json({
      success: true
    });
  });
});

module.exports = router

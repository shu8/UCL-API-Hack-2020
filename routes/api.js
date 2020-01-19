const router = require('express').Router()

const isLoggedIn = (req, res, next) => {
  let key;

  if (!(key = req.get('X-AUTH-KEY')) || !(key in req.app.locals.sessions)) {
    return res.status(403).json({
      error: "The user must be logged in to perform this action.",
      is_logged_in: false
    });
  }

  req.auth_key = req.get('X-AUTH-KEY');

  next();
};

router.get('/logout', isLoggedIn, (req, res) => {
  delete req.app.locals.sessions[req.auth_key];

  return res.redirect('/');
});

router.get('/societies', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM societies', (error, results) => {
    if (error) throw error.message;

    res.json(results);
  });
});

router.get('/societies/:id(\\d+)', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM societies WHERE id = ?', [req.params.id], (error, results) => {
    if (error) throw error.message;

    res.json(results);
  });
});

router.get('/societies/:id(\\d+)/events', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM events WHERE society_id=? ORDER BY datetime DESC', [req.params.id], (error, results) => {
    if (error) throw error.message;

    res.json(results);
  });
});

router.post('/societies', isLoggedIn, (req, res) => {
  req.app.locals.connection.query('INSERT INTO societies (user_upi, name, image, description, category) VALUES (?, ?, ?, ?, ?)', [
    req.app.locals.sessions[req.auth_key].upi,
    req.body.name,
    req.body.image,
    req.body.description,
    req.body.category
  ], (error, results) => {
    if (error) throw error.message;

    return res.json({
      success: true,
      society_id: results.insertId
    });
  });
});

router.get('/societies/category/:category', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM societies WHERE category LIKE ?', ['%' + req.params.category + '%'], (error, results) => {
    if (error) throw error.message;

    res.json(results);
  });
});

router.get('/events', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM events ORDER BY datetime DESC', (error, results) => {
    if (error) throw error.message;

    res.json(results);
  })
});

router.get('/events/:id(\\d+)', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM events WHERE id=? ORDER BY datetime DESC', [req.params.id], (error, results) => {
    if (error) throw error.message;

    res.json(results);
  });
});

router.post('/events', isLoggedIn, (req, res) => {
  req.app.locals.connection.query('INSERT INTO events (society_id, name, summary, description, image, category, datetime) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    req.body.society_id,
    req.body.name,
    req.body.summary,
    req.body.description,
    req.body.image,
    req.body.category,
    req.body.datetime
  ], (error, results) => {
    if (error) throw error.message;

    return res.json({
      success: true,
      event_id: results.insertId
    });
  });
});

router.get('/societies/:id(\\d+)/faqs', (req, res) => {
  req.app.locals.connection.query('SELECT question, answer FROM faqs WHERE society_id = ?', [req.params.id], (error, results) => {
    if (error) throw error.message;

    return res.json(results);
  });
});

router.post('/societies/:id(\\d+)/faqs', isLoggedIn, (req, res) => {
  req.app.locals.connection.query('INSERT INTO faqs (society_id, question, answer) VALUES (?, ?, ?)', [
    req.params.id,
    req.body.question,
    req.body.answer
  ], (error, results) => {
    if (error) throw error.message;

    return res.json({
      success: true,
      faq_id: results.insertId
    });
  });
});


router.get('/faqs', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM faqs', (error, results) => {
    if (error) throw error.message;

    return res.json(results);
  });
});

router.get('/societies/:id(\\d+)/roles', (req, res) => {
  req.app.locals.connection.query('SELECT * FROM society_roles WHERE society_id = ?', [req.params.id], (error, results) => {
    if (error) throw error.message;

    return res.json(results);
  });
});

router.post('/societies/:id(\\d+)/roles', isLoggedIn, (req, res) => {
  req.app.locals.connection.query('INSERT INTO society_roles (society_id, name, user_upi, role_description) VALUES (?, ?, ?, ?)', [
    req.params.society_id,
    req.body.name,
    req.app.locals.sessions[req.auth_key].upi,
    req.body.description
  ], (error, results) => {
    if (error) throw error.message;

    return res.json({
      success: true,
      role_id: results.insertId
    });
  });
});

router.get('/following', isLoggedIn, (req, res) => {
  req.app.locals.connection.query('SELECT * FROM followed_societies WHERE user_upi = ?', [req.app.locals.sessions[req.auth_key].upi], (error, results) => {
    if (error) throw error.message;

    return res.json(results);
  });
});


router.post('/following', isLoggedIn, (req, res) => {
  req.app.locals.connection.query('INSERT INTO followed_societies (user_upi, society_id) VALUES (?, ?)', [
    req.app.locals.sessions[req.auth_key].upi,
    req.body.society_id
  ], (error, results) => {
    if (error) throw error.message;

    return res.json({
      success: true,
      society_follow_id: results.insertId
    });
  });
});

module.exports = router

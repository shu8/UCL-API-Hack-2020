app.get('/api/events', (res, req) => {
  connection.query('SELECT * FROM events', (error, results) => {
      if (error) throw error;
      res.json(results);
  })
})
app.get('/events/:id', (res, req) => {
  connection.query('SELECT * FROM events WHERE id=?',[req.param.id],  (error, results) => {
    if (error) throw error;
    res.json(results);
  })
})
app.get('/events-for-society/:id', (res, req) => {
  connection.query('SELECT * FROM events WHERE society_id=?',[req.param.society_id],  (error, results) => {
    if (error) throw error;
    res.json(results);
  })
})

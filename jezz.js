

app.get('/societies', (req, res) => {
    connection.query('SELECT * FROM societies', (error, results) => {
        if (error) throw error;
        
        res.json(results);
    });
});

app.get('/societies/:id', (req, res) => {
    connection.query('SELECT * FROM societies WHERE id=?', [req.param.id], (error, results) => {
        if (error) throw error;
        
        res.json(results);
    });
})
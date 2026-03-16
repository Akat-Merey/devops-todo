const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.post('/', async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({error: 'Title is required'});
    }
    try {
        const result = await db.query(
            'INSERT INTO todos (title, done) VALUES ($1, false) RETURNING *', [title]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { title } = req.body;
    try {
        const result = await db.query(
            'UPDATE todos SET title = COALESCE($1, title), done = COEALESCE($2, done) WHERE id = $3 RETURNING *', 
            [title, done, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'TODO not found(((' })
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query(
            'DELETE FROM todos WHERE id = $1 RETURNING *', 
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'TODO not found(((' })
        }
        res.json({ message: 'DELETED URAAA' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
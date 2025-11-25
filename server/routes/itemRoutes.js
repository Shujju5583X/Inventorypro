const express = require('express');
const Item = require('../models/Item');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({ where: { userId: req.user.id } });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, category, quantity, price, status } = req.body;
        const item = await Item.create({
            name, category, quantity, price, status, userId: req.user.id
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, quantity, price, status } = req.body;
        const item = await Item.findOne({ where: { id, userId: req.user.id } });

        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.name = name;
        item.category = category;
        item.quantity = quantity;
        item.price = price;
        item.status = status;
        await item.save();

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Item.destroy({ where: { id, userId: req.user.id } });
        if (!result) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

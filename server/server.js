const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to sync database:', err);
    });

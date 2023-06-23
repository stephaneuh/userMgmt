const express = require('express');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');

// Connect to your PostgreSQL database
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'postgres',
});

// Define a model for your table
class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'user',
    }
);

// Create the Express.js server
const app = express();
const PORT = 3000;

// Parse JSON request body
app.use(express.json());

// API endpoint for paginated data with search
app.get('/users', async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    try {
        let whereCondition = {}; // Object to hold the search conditions

        if (search) {
            // Add search conditions to the where object
            whereCondition = {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${search}%`, // Case-insensitive search for name
                        },
                    },
                    {
                        email: {
                            [Op.iLike]: `%${search}%`, // Case-insensitive search for email
                        },
                    },
                ],
            };
        }

        // Fetch paginated data from the "users" table with search conditions
        const users = await User.findAndCountAll({
            where: whereCondition,
            offset,
            limit: parseInt(limit),
        });

        const totalPages = Math.ceil(users.count / limit);

        res.set('X-Total-Pages', totalPages); // Set the X-Total-Pages header

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
sequelize
    .sync() // Sync the defined models with the database
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

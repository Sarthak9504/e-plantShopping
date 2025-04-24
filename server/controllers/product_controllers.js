const db = require('../config');

exports.getAllProducts = (req, res) => {
    const query = 'SELECT * FROM products';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        // Group products by category
        const categorized = {};

        results.forEach(product => {
            const category = product.category;
            if (!categorized[category]) {
                categorized[category] = [];
            }
            categorized[category].push({
                name: product.name,
                image: product.image,
                description: product.description,
                cost: product.cost
            });
        });

        // Convert to array format
        const responseArray = Object.entries(categorized).map(([category, groceries]) => ({
            category,
            groceries
        }));

        res.json(responseArray);
    });
};

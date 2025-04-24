const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth_routes');
const productRoutes = require('./routes/product_routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
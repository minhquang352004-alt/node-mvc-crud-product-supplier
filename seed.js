require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');

const run = async() => {
    await connectDB();
    await Supplier.deleteMany({});
    await Product.deleteMany({});

    const s1 = await Supplier.create({ name: 'Supplier A', address: 'Address A', phone: '0123456789' });
    const s2 = await Supplier.create({ name: 'Supplier B', address: 'Address B', phone: '0987654321' });

    await Product.create({ name: 'Product 1', address: 'P Address 1', phone: '01111', supplier: s1._id });
    await Product.create({ name: 'Product 2', address: 'P Address 2', phone: '02222', supplier: s2._id });

    console.log('Seed done');
    mongoose.connection.close();
};

run().catch(err => console.error(err));
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Web: list
exports.index = async(req, res) => {
    try {
        const products = await Product.find().populate('supplier').sort({ createdAt: -1 });
        res.render('products/index', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Web: new form
exports.newForm = async(req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.render('products/new', { product: {}, suppliers });
    } catch (err) {
        console.error(err);
        res.redirect('/products');
    }
};

// Web: create
exports.create = async(req, res) => {
    try {
        const { name, address, phone, supplier } = req.body;
        const product = new Product({ name, address, phone, supplier });
        await product.save();
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(400).redirect('/products');
    }
};

// Web: edit form
exports.editForm = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const suppliers = await Supplier.find();
        if (!product) return res.redirect('/products');
        res.render('products/edit', { product, suppliers });
    } catch (err) {
        console.error(err);
        res.redirect('/products');
    }
};

// Web: update
exports.update = async(req, res) => {
    try {
        const { name, address, phone, supplier } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, address, phone, supplier }, { runValidators: true });
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(400).redirect('/products');
    }
};

// Web: delete
exports.delete = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.redirect('/products');
    }
};

/* --- API (JSON) --- */

exports.apiIndex = async(req, res) => {
    try {
        const products = await Product.find().populate('supplier');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.apiShow = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplier');
        if (!product) return res.status(404).json({ error: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.apiCreate = async(req, res) => {
    try {
        const { name, address, phone, supplier } = req.body;
        const product = new Product({ name, address, phone, supplier });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.apiUpdate = async(req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.apiDelete = async(req, res) => {
    try {
        const removed = await Product.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
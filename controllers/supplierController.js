const Supplier = require('../models/Supplier');

// Web: list
exports.index = async(req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ createdAt: -1 });
        res.render('suppliers/index', { suppliers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Web: new form
exports.newForm = (req, res) => {
    res.render('suppliers/new', { supplier: {} });
};

// Web: create
exports.create = async(req, res) => {
    try {
        const { name, address, phone } = req.body;
        const supplier = new Supplier({ name, address, phone });
        await supplier.save();
        res.redirect('/suppliers');
    } catch (err) {
        console.error(err);
        res.status(400).render('suppliers/new', { supplier: req.body, error: 'Validation error' });
    }
};

// Web: edit form
exports.editForm = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.redirect('/suppliers');
        res.render('suppliers/edit', { supplier });
    } catch (err) {
        console.error(err);
        res.redirect('/suppliers');
    }
};

// Web: update
exports.update = async(req, res) => {
    try {
        const { name, address, phone } = req.body;
        await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone }, { runValidators: true });
        res.redirect('/suppliers');
    } catch (err) {
        console.error(err);
        res.status(400).redirect('/suppliers');
    }
};

// Web: delete
exports.delete = async(req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.redirect('/suppliers');
    } catch (err) {
        console.error(err);
        res.redirect('/suppliers');
    }
};

/* --- API (JSON) --- */

exports.apiIndex = async(req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.apiShow = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ error: 'Not found' });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.apiCreate = async(req, res) => {
    try {
        const { name, address, phone } = req.body;
        const supplier = new Supplier({ name, address, phone });
        await supplier.save();
        res.status(201).json(supplier);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.apiUpdate = async(req, res) => {
    try {
        const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.apiDelete = async(req, res) => {
    try {
        const removed = await Supplier.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
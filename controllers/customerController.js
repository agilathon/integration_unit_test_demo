const { Op } = require('sequelize');
const db = require('../models');
const { getUsersInfo } = require('../utils/utils');
const { ValidationError } = require('../utils/customErrors');

async function getAll(req, res) {
    // #swagger.ignore = true
    let users;
    try {
        users = await db.User.findAll();
    } catch (error) {
        console.log(
            'There was an error to querying users',
            JSON.stringify(err),
        );
    }
    const allUsers = getUsersInfo(users);
    res.render('home', { users: allUsers });
}

async function add(req, res) {
    // #swagger.ignore = true
    const { id, name, email, phone } = req.body;
    const errorMsgs = [];
    if (!name) errorMsgs.push({ message: 'Please provie your name' });
    if (!email) errorMsgs.push({ message: 'Please provie your email' });
    if (!phone) errorMsgs.push({ message: 'Please provie your phone number' });
    // TODO: Validate and sanitize inputs
    if (name && email && phone) {
        // Update information if user already exists
        if (id) {
            const user = await db.User.findByPk(id);
            user.name = name;
            user.email = email;
            user.phone = phone;
            await user.save();
            res.redirect('/customers');
        } else {
            // Save new user to db
            try {
                await db.User.create({
                    name,
                    email,
                    phone,
                });
                res.redirect('/customers');
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        // Show error messages above form
        res.render('add', {
            errorMsgs,
            name,
            email,
            phone,
        });
    }
}

async function update(req, res) {
    // #swagger.ignore = true
    // Retrieve userId from URL
    const { userId } = req.params;
    // Find the user with userId
    const user = await db.User.findByPk(userId);
    const { id, name, email, phone } = user;
    // Render the add user form and pre-populate it with current name, email, and phone
    res.render('add', {
        id,
        name,
        email,
        phone,
    });
}

async function remove(req, res) {
    // #swagger.ignore = true
    // Retrieve userId from URL
    const { userId } = req.params;
    // Delete user
    await db.User.destroy({ where: { id: userId } });
    res.render('deleted');
}

async function search(req, res) {
    // #swagger.ignore = true
    const { q } = req.query;
    let users;
    try {
        users = await db.User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${q}%` } },
                    { email: { [Op.like]: `%${q}%` } },
                    { phone: { [Op.like]: `%${q}%` } },
                ],
            },
        });
    } catch (error) {
        console.log(error);
    }
    const allUsers = getUsersInfo(users);
    res.render('home', { users: allUsers });
}

// json block
async function getAllJson(req, res) {
    let users;
    try {
        users = await db.User.findAll();
        const allUsers = getUsersInfo(users);
        res.json({ users: allUsers });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function addJson(req, res) {
    const { id, name, email, phone } = req.body;
    const errorMsgs = [];

    try {
        if (!name) errorMsgs.push({ message: 'Please provie your name' });
        if (!email) errorMsgs.push({ message: 'Please provie your email' });
        if (!phone) errorMsgs.push({ message: 'Please provie your phone number' });

        if (errorMsgs.length) {
            throw new ValidationError(errorMsgs.toString());
        }
        // TODO: Validate and sanitize inputs
        if (name && email && phone) {
            // Update information if user already exists
            if (id) {
                const user = await db.User.findByPk(id);
                user.name = name;
                user.email = email;
                user.phone = phone;
                const saved = await user.save();
                res.status(200).json(saved);
            } else {
                // Save new user to db
                const created = await db.User.create({
                    name,
                    email,
                    phone,
                });
                res.status(201).json(created);
            }
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json(error);
        }
        res.status(500).json(error);
    }
}

async function updateJson(req, res) {
    /* #swagger.responses[200] = {
        description: 'Some description...',
        schema: {
            name: 'Jhon Doe',
            age: 29,
            about: ''
        }
    } */
    // Retrieve userId from URL
    let user = req.body;
    // Find the user with userId
    const { id, name, email, phone } = user;
    user = await db.User.findByPk(id);

    try {
        user.name = name;
        user.email = email;
        user.phone = phone;
        const userSaved = await user.save();
        res.status(200).json(userSaved);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function removeJson(req, res) {
    // Retrieve userId from URL
    const { userId } = req.params;
    try {
        // Delete user
        const deleted = await db.User.destroy({ where: { id: userId } });
        res.json(deleted);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function searchJson(req, res) {
    const { q } = req.query;
    let users;
    try {
        users = await db.User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${q}%` } },
                    { email: { [Op.like]: `%${q}%` } },
                    { phone: { [Op.like]: `%${q}%` } },
                ],
            },
        });

        const allUsers = getUsersInfo(users);
        res.json({ users: allUsers });
    } catch (error) {
        res.status(500).json(error);
    }
}
// json block

module.exports = { getAll, add, remove, update, search, getAllJson, addJson, removeJson, updateJson, searchJson };

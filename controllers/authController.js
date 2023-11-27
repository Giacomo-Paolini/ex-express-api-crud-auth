const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePasswords } = require('../utilities/password');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const data = req.body;
    data.password = await hashPassword(data.password);

    const user = await prisma.user.create({
        data,
     });

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user })
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user });
}

module.exports = {
    register,
    login
}
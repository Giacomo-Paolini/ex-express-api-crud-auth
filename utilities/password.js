const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    if (!password || typeof password !== 'string') {
        throw new Error('Invalid password');
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

async function comparePasswords(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

module.exports = {
    hashPassword,
    comparePasswords
}
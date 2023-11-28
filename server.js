const express = require('express');
const dotenv = require('dotenv');
const postsRouter = require('./routers/postsRouter');
const authRouter = require('./routers/authRouter');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

dotenv.config();

app.use(cors());

app.use(express.json());

app.use('/posts', postsRouter);

app.use('', authRouter);


app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});